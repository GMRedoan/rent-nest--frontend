"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createReview } from "@/server/review/review.service";
import { Toast } from "@/components/reusable/toast";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    propertyId: string;
}

interface FormData {
    comment: string;
}

export default function SubmitReviewModal({
    open,
    onOpenChange,
    propertyId,
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const onSubmit = async (data: FormData) => {
        const result = await createReview({
            propertyId,
            comment: data.comment,
        });

        if (result.success) {
            Toast({
                icon: "success",
                title: "Review submitted successfully",
            });

            reset();

            onOpenChange(false);
        } else {
            Toast({
                icon: "error",
                title: result?.message || "Review failed",
            })
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        Submit Property Review
                    </DialogTitle>

                    <DialogDescription>
                        Share your rental experience with this property.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label>Your Review</Label>

                        <Textarea
                            rows={6}
                            placeholder="Write your experience..."
                            {...register("comment", {
                                required: "Comment is required",
                                minLength: {
                                    value: 10,
                                    message:
                                        "Minimum 10 characters required",
                                },
                            })}
                        />

                        {errors.comment && (
                            <p className="text-sm text-destructive">
                                {errors.comment.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Submitting..."
                            : "Submit Review"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}