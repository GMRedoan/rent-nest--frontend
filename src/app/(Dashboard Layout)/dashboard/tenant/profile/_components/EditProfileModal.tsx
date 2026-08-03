/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IUpdateProfile, IUserProfile } from "@/types/auth/auth";
import { useAuth } from "@/provider/AuthProvider";
import { updateUser } from "@/server/user/user.service";
import { Toast } from "@/components/reusable/toast";
import { uploadImage } from "@/lib/uploadImage";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: IUserProfile;
    userId: string;
}


export default function EditProfileModal({
    open,
    onOpenChange,
    user,
    userId,
}: Props) {
    const { refreshUser } = useAuth();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState(user?.profilePhoto ?? "");
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IUpdateProfile>({
        defaultValues: {
            name: user.name,
            phone: user.phone,
            bio: user.bio ?? "",
            profilePhoto: user.profilePhoto ?? "",
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                name: user.name,
                phone: user.phone,
                bio: user.bio ?? "",
                profilePhoto: user.profilePhoto ?? "",
            });

            setPreview(user.profilePhoto ?? "");
            setSelectedFile(null);
        }
    }, [open, reset, user]);

    const handleImage = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (payload: IUpdateProfile) => {
        let imageUrl = user?.profilePhoto;

        try {
            if (selectedFile) {
                setUploading(true);
                imageUrl = await uploadImage(selectedFile);
                setUploading(false);
            }

            const result = await updateUser(userId, {
                ...payload,
                profilePhoto: imageUrl ?? "",
            });
            if (result.success) {
                await refreshUser();
                onOpenChange(false);
                Toast({
                    icon: "success",
                    title: "Profile updated successfully",
                })
                } else {
                Toast({
                    icon: "error",
                    title: "Failed to update profile",
                });
            }
        } catch {
            Toast({
                icon: "error",
                title: "An error occurred while updating profile",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Edit Profile</DialogTitle>

                    <DialogDescription>
                        Update your profile information.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Avatar */}

                    <div className="flex flex-col items-center gap-3">
                        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-primary/20">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-muted text-3xl font-bold">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        <Label
                            htmlFor="photo"
                            className="cursor-pointer"
                        >
                            <div className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted">
                                <Camera className="h-4 w-4" />
                                Change Photo
                            </div>
                        </Label>

                        <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImage}
                        />
                    </div>

                    {/* Name */}

                    <div className="space-y-2">
                        <Label>Name</Label>

                        <Input
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />

                        <p className="text-sm text-destructive">
                            {errors.name?.message}
                        </p>
                    </div>

                    {/* Email */}

                    <div className="space-y-2">
                        <Label>Email</Label>

                        <Input
                            value={user?.email}
                            disabled
                        />
                    </div>

                    {/* Phone */}

                    <div className="space-y-2">
                        <Label>Phone</Label>

                        <Input
                            {...register("phone", {
                                required: "Phone is required",
                            })}
                        />

                        <p className="text-sm text-destructive">
                            {errors.phone?.message}
                        </p>
                    </div>

                    {/* Bio */}

                    <div className="space-y-2">
                        <Label>Bio</Label>

                        <Textarea
                            rows={4}
                            placeholder="Tell us something about yourself..."
                            {...register("bio")}
                        />
                    </div>

                    <Button
                        className="w-full"
                        disabled={
                            isSubmitting || uploading
                        }
                    >
                        {isSubmitting || uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}