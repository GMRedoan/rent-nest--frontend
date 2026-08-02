"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteCategory } from "@/server/categories/categories.service";
import { ICategory } from "@/types/category/category";
import { Toast } from "@/components/reusable/toast";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: ICategory;
}

export default function DeleteCategoryModal({
    open,
    onOpenChange,
    category,
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteCategory(category.id);

            if (result.success) {
                Toast({
                    icon: "success",
                    title: "Category deleted successfully",
                });

                onOpenChange(false);
                router.refresh();
            } else {
                Toast({
                    icon: "error",
                    title: "Failed to delete category",
                });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Trash2 className="h-5 w-5" />
                        Delete Category
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">

                    <div className="mb-4 flex items-center gap-3">

                        <div className="rounded-full bg-destructive/10 p-3">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>

                        <div>
                            <h4 className="font-semibold">
                                {category.name}
                            </h4>

                            <Badge
                                variant="secondary"
                                className="mt-1"
                            >
                                Property Category
                            </Badge>
                        </div>

                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">
                        Deleting this category may affect properties that are
                        currently assigned to it. Make sure it is no longer in
                        use before continuing.
                    </p>

                </div>

                <DialogFooter>

                    <Button
                        variant="secondary"
                        disabled={isPending}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Category
                            </>
                        )}
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}