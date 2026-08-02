"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICategory } from "@/types/category/category";
import { Toast } from "@/components/reusable/toast";
import { updateCategory } from "@/server/categories/categories.service";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: ICategory;
}

export default function EditCategoryModal({
    open,
    onOpenChange,
    category,
}: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ICategory>();

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
            });
        }
    }, [category, reset]);

    const onSubmit = async (payload: ICategory) => {
        const result = await updateCategory(category.id, payload);
        if (result.success) {
            Toast({
                icon: "success",
                title: "Category updated successfully",
            });

            onOpenChange(false);
            router.refresh();
        } else {
            Toast({
                icon: "error",
                title: "Failed to update category",
            });
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Pencil className="h-5 w-5 text-primary" />
                        Edit Category
                    </DialogTitle>
                    <DialogDescription>
                        Update the category name.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-2">

                        <Label htmlFor="name">
                            Category Name
                        </Label>

                        <Input
                            id="name"
                            placeholder="Category name"
                            {...register("name", {
                                required: "Category name is required",
                            })}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}

                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Update Category
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}