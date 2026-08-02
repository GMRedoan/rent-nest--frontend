"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { IMyRentalHistory } from "@/types/rental/rental";
import { updateRentalReqStatus } from "@/server/rental/rental.service";
import { Toast } from "@/components/reusable/toast";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    request: IMyRentalHistory;
    action: "APPROVED" | "REJECTED";
}

export default function UpdateRentalStatusModal({
    open,
    onOpenChange,
    request,
    action,
}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const isApprove = action === "APPROVED";
    const handleUpdate = async () => {
        try {
            setLoading(true);

            const result = await updateRentalReqStatus(
                request.id,
                action
            );

            if (result.success) {
                Toast({
                    icon: "success",
                    title: "Request updated successfully",
                });

                onOpenChange(false);

                router.refresh();
            } else {
                Toast({
                    icon: "error",
                    title: result.message ?? "Something went wrong",
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
            <DialogContent className="sm:max-w-lg">
                <DialogHeader className="items-center text-center">
                    <div
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${isApprove
                                ? "bg-green-100 dark:bg-green-950"
                                : "bg-red-100 dark:bg-red-950"
                            }`}
                    >
                        {isApprove ? (
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                        )}
                    </div>

                    <DialogTitle className="text-2xl">
                        {isApprove
                            ? "Approve Rental Request"
                            : "Reject Rental Request"}
                    </DialogTitle>

                    <DialogDescription>
                        Please review the request before continuing.
                    </DialogDescription>

                </DialogHeader>

                {/* Property */}

                <div className="rounded-xl border bg-muted/40 p-4">

                    <div className="flex items-center gap-4">

                        <Image
                            src={request.property.images[0]}
                            alt={request.property.title}
                            width={70}
                            height={70}
                            className="h-16 w-16 rounded-lg object-cover"
                        />

                        <div>

                            <h3 className="font-semibold">
                                {request.property.title}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {request.property.location}
                            </p>

                            <p className="font-medium text-primary">
                                ৳{request.property.price}/month
                            </p>

                        </div>

                    </div>

                </div>

                {/* Details */}

                <div className="space-y-4 rounded-xl border p-4">

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Tenant
                        </span>

                        <span className="font-medium">
                            {request.tenant?.name}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Email
                        </span>

                        <span className="font-medium">
                            {request.tenant?.email}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            Current Status
                        </span>

                        <Badge
                            variant={
                                request.status === "APPROVED"
                                    ? "default"
                                    : request.status === "PENDING"
                                        ? "pending"
                                        : "destructive"
                            }
                        >
                            {request.status}
                        </Badge>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">
                            New Status
                        </span>

                        <Badge
                            className={
                                isApprove
                                    ? "bg-green-600 hover:bg-green-600"
                                    : ""
                            }
                            variant={
                                isApprove
                                    ? "default"
                                    : "destructive"
                            }
                        >
                            {action}
                        </Badge>
                    </div>

                </div>

                <DialogFooter className="mt-4 gap-2">

                    <Button
                        variant="destructive"
                        disabled={loading}
                        onClick={() => onOpenChange(false)}
                        className="p-5!"   
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={loading}
                        variant={
                            isApprove
                                ? "default"
                                : "destructive"
                        }
                        onClick={handleUpdate}
                        className="p-5!"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                {isApprove ? (
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                ) : (
                                    <XCircle className="mr-2 h-4 w-4" />
                                )}

                                {isApprove
                                    ? "Approve Request"
                                    : "Reject Request"}
                            </>
                        )}
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}