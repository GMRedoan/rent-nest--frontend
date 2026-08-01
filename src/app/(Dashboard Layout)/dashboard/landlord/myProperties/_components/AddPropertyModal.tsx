"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";
import { AddPropertyForm } from "@/types/property/property";
import { useRouter } from "next/navigation";
import { ICategory } from "@/types/category/category";
import { createProperty } from "@/server/properties/properties.service";
import { Toast } from "@/components/reusable/toast";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: ICategory[];
}

const PROPERTY_TYPES = [
    { value: "HOUSE", label: "House" },
    { value: "APARTMENT", label: "Apartment" },
    { value: "STUDIO", label: "Studio" },
    { value: "COMMERCIAL", label: "Commercial" },
    { value: "ROOM", label: "Room" },
] as const;

const AddPropertyModal = ({
    open,
    onOpenChange,
    categories,
}: Props) => {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [imagesError, setImagesError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Omit<AddPropertyForm, "images">>();

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files ?? []);
        if (newFiles.length === 0) return;

        const combined = [...selectedFiles, ...newFiles];
        setSelectedFiles(combined);
        setPreviewImages(combined.map((file) => URL.createObjectURL(file)));
        setImagesError(null);
        e.target.value = "";
    };

    const handleRemoveImage = (index: number) => {
        const combined = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(combined);
        setPreviewImages(combined.map((file) => URL.createObjectURL(file)));
    };

    const onSubmit = async (data: Omit<AddPropertyForm, "images">) => {
        if (selectedFiles.length === 0) {
            setImagesError("Images are required");
            return;
        }

        try {
            setUploading(true);
            const imageUrls = await Promise.all(
                selectedFiles.map((image) => uploadImage(image))
            );

            const payload = {
                title: data.title,
                description: data.description,
                location: data.location,
                propertyType: data.propertyType,
                categoryId: data.categoryId,
                price: Number(data.price),
                images: imageUrls,
            };

            const result = await createProperty(payload);

            if (result.success) {
                Toast({
                    icon: "success",
                    title: "Property added successfully",
                });
                reset();
                setSelectedFiles([]);
                setPreviewImages([]);
                setImagesError(null);
                onOpenChange(false);
                router.refresh();
            } else {
                Toast({
                    icon: "error",
                    title: result.message || "Failed to create property",
                });
            }
        } catch {
            Toast({
                icon: "error",
                title: "Failed to create property",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Add New Property</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 p-4"
                >
                    {/* Title */}
                    <div className="space-y-2">
                        <Label>Property Title</Label>

                        <Input
                            placeholder="Modern Apartment"
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />

                        {errors.title && (
                            <p className="text-sm text-destructive">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>

                        <Textarea
                            rows={4}
                            {...register("description", {
                                required: "Description is required",
                            })}
                        />

                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Price + Location */}
                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="space-y-2">
                            <Label>Price</Label>

                            <Input
                                type="number"
                                {...register("price", {
                                    required: "Price is required",
                                    valueAsNumber: true,
                                })}
                            />

                            {errors.price && (
                                <p className="text-sm text-destructive">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Location</Label>

                            <Input
                                {...register("location", {
                                    required: "Location is required",
                                })}
                            />

                            {errors.location && (
                                <p className="text-sm text-destructive">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Property Type + Category */}
                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="space-y-2">
                            <Label>Property Type</Label>
                            <Select
                                onValueChange={(value) =>
                                    setValue(
                                        "propertyType",
                                        value as AddPropertyForm["propertyType"],
                                        { shouldValidate: true }
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select property type" />
                                </SelectTrigger>

                                <SelectContent>
                                    {PROPERTY_TYPES.map((type) => (
                                        <SelectItem
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.propertyType && (
                                <p className="text-sm text-destructive">
                                    Property type is required
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>

                            <Select
                                onValueChange={(value) =>
                                    setValue("categoryId", value, {
                                        shouldValidate: true,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.categoryId && (
                                <p className="text-sm text-destructive">
                                    Category is required
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Images */}
                    <div className="space-y-3">
                        <Label>Property Images</Label>
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition hover:border-primary">

                            <UploadCloud className="mb-2 h-8 w-8 text-primary" />

                            <p className="text-sm text-muted-foreground">
                                Click to upload images
                            </p>

                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleFilesSelected}
                            />
                        </label>

                        {imagesError && (
                            <p className="text-sm text-destructive">
                                {imagesError}
                            </p>
                        )}

                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-3 gap-3">

                                {previewImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="group relative h-28 overflow-hidden rounded-lg"
                                    >
                                        {/* Blob URLs can't go through next/image's
                                            optimizer (it can't fetch them server-side),
                                            so this must stay unoptimized. */}
                                        <Image
                                            src={image}
                                            alt=""
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 rounded-full bg-black/60 px-1.5 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={uploading}
                    >
                        {uploading
                            ? <>
                                Creating Property...
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </>
                            : "Create Property"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPropertyModal;