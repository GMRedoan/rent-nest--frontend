"use client";

import { deleteProperty } from "@/server/properties/properties.service";
import { useState } from "react";
import { Loader2, Trash2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/reusable/toast";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    propertyId?: string;
    propertyTitle: string;
}

export default function DeletePropertyModal({
    open,
    onOpenChange,
    propertyId,
    propertyTitle,
}: Props) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            if (!propertyId) {
                Toast({
                    icon: "error",
                    title: "Property not found",
                });
                return;
            }

            const result = await deleteProperty(propertyId);

            if (result.success) {
                Toast({
                    icon: "success",
                    title: "Property deleted successfully",
                });

                onOpenChange(false);

                router.refresh();
            } else {
                Toast({
                    icon: "error",
                    title: result.message || "Failed to delete property",
                });
            }
        } catch {
            Toast({
                icon: "error",
                title: "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">

                <DialogHeader className="items-center text-center">

                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                        <TriangleAlert className="h-8 w-8 text-red-600" />
                    </div>

                    <DialogTitle className="text-2xl">
                        Delete Property
                    </DialogTitle>

                    <DialogDescription className="text-base">
                        This action cannot be undone.
                    </DialogDescription>

                </DialogHeader>

                <div className="rounded-xl border bg-muted/40 p-4">

                    <p className="text-sm text-muted-foreground">
                        Property
                    </p>

                    <p className="mt-1 font-semibold">
                        {propertyTitle}
                    </p>

                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Are you sure you want to permanently delete this
                    property?
                </p>

                <DialogFooter className="mt-4 flex-row gap-3">

                    <Button
                        variant="outline"
                        className="flex-1"
                        disabled={loading}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        className="flex-1"
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </>
                        )}
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}