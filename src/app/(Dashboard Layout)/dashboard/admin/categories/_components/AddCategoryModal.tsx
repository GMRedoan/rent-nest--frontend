"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle } from "lucide-react";
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
import { createCategory } from "@/server/categories/categories.service";
import { Toast } from "@/components/reusable/toast";
import { ICategory } from "@/types/category/category";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddCategoryModal({
    open,
    onOpenChange,
}: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<ICategory>();

    const onSubmit = async (data: ICategory) => {
        const result = await createCategory(data);

        if (result.success) {
            Toast({
                icon: "success",
                title: "Category created successfully",
            });

            reset();
            onOpenChange(false);
            router.refresh();
        } else {
            Toast({
                icon: "error",
                title: "Failed to create category",
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
                        <PlusCircle className="h-5 w-5 text-primary" />
                        Add Category
                    </DialogTitle>
                    <DialogDescription>
                        Create a new property category for your platform.
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
                            placeholder="e.g. Apartment"
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
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create Category
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}