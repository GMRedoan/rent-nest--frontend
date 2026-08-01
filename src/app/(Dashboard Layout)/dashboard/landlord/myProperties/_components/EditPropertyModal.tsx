/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
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
import { IProperty } from "@/types/property/property";
import { useRouter } from "next/navigation";
import { ICategory } from "@/types/category/category";
import { updateProperty } from "@/server/properties/properties.service";
import { Toast } from "@/components/reusable/toast";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: ICategory[];
    property: IProperty;
}

const PROPERTY_TYPES = [
    { value: "HOUSE", label: "House" },
    { value: "APARTMENT", label: "Apartment" },
    { value: "STUDIO", label: "Studio" },
    { value: "COMMERCIAL", label: "Commercial" },
    { value: "ROOM", label: "Room" },
] as const;

type EditFormFields = Omit<AddPropertyForm, "images">;

const EditPropertyModal = ({
    open,
    onOpenChange,
    categories,
    property,
}: Props) => {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [existingImages, setExistingImages] = useState<string[]>(
        property.images ?? []
    );
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);
    const [imagesError, setImagesError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<EditFormFields>({
        defaultValues: {
            title: property?.title,
            description: property?.description,
            location: property?.location,
            price: property?.price,
            propertyType: property?.propertyType,
            categoryId: property?.categoryId,
        },
    });

    useEffect(() => {
        if (!open) return;

        reset({
            title: property?.title,
            description: property?.description,
            location: property?.location,
            price: property?.price,
            propertyType: property?.propertyType,
            categoryId: property?.categoryId,
        });
        setExistingImages(property?.images ?? []);
        setNewFiles([]);
        setNewPreviews([]);
        setImagesError(null);
     }, [open, property?.id]);

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(e.target.files ?? []);
        if (picked.length === 0) return;

        const combined = [...newFiles, ...picked];
        setNewFiles(combined);
        setNewPreviews(combined.map((file) => URL.createObjectURL(file)));
        setImagesError(null);
        e.target.value = "";
    };

    const handleRemoveExisting = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveNew = (index: number) => {
        const combined = newFiles.filter((_, i) => i !== index);
        setNewFiles(combined);
        setNewPreviews(combined.map((file) => URL.createObjectURL(file)));
    };

    const onSubmit = async (data: EditFormFields) => {
        if (existingImages.length === 0 && newFiles.length === 0) {
            setImagesError("At least one image is required");
            return;
        }

        try {
            setUploading(true);

            const uploadedUrls = await Promise.all(
                newFiles.map((file) => uploadImage(file))
            );

            const payload = {
                title: data.title,
                description: data.description,
                location: data.location,
                propertyType: data.propertyType,
                categoryId: data.categoryId,
                price: Number(data.price),
                images: [...existingImages, ...uploadedUrls],
            };

            if (!property.id) {
                Toast({
                    icon: "error",
                    title: "Property ID is missing",
                });
                return;
            }
            const result = await updateProperty(property.id, payload);

            if (result.success) {
                Toast({
                    icon: "success",
                    title: "Property updated successfully",
                });
                setNewFiles([]);
                setNewPreviews([]);
                setImagesError(null);
                onOpenChange(false);
                router.refresh();
            } else {
                Toast({
                    icon: "error",
                    title: result.message || "Failed to update property",
                });
            }
        } catch {
            Toast({
                icon: "error",
                title: "Failed to update property",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        Edit  <span className="text-primary">Property</span>
                    </DialogTitle>
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
                                value={property.propertyType}
                                onValueChange={(value) =>
                                    setValue(
                                        "propertyType",
                                        value as EditFormFields["propertyType"],
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
                                value={property.categoryId}
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
                                Click to upload more images
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

                        {(existingImages.length > 0 || newPreviews.length > 0) && (
                            <div className="grid grid-cols-3 gap-3">

                                {/* Already-saved images */}
                                {existingImages.map((url, index) => (
                                    <div
                                        key={`existing-${index}`}
                                        className="group relative h-28 overflow-hidden rounded-lg"
                                    >
                                        <Image
                                            src={url}
                                            alt=""
                                            fill
                                            className="object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExisting(index)}
                                            className="absolute top-1 right-1 rounded-full bg-black/60 px-1.5 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}

                                {/* Newly picked, not-yet-uploaded images */}
                                {newPreviews.map((url, index) => (
                                    <div
                                        key={`new-${index}`}
                                        className="group relative h-28 overflow-hidden rounded-lg"
                                    >
                                        <Image
                                            src={url}
                                            alt=""
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />

                                        <span className="absolute bottom-1 left-1 rounded bg-primary/90 px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                                            New
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveNew(index)}
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
                            ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving Changes...</>
                            : "Save Changes"}
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditPropertyModal;