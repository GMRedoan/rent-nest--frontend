"use client";

import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMyRentalHistory } from "@/types/rental/rental";
import { FileX, CheckCircle2, XCircle } from "lucide-react";
import Animate from "@/components/reusable/Animate";
import { useState } from "react";
import UpdateRentalStatusModal from "./UpdateRentalStatusModal";

interface Props {
    requests: IMyRentalHistory[];
}

export default function PropertyRentalRequestTable({
    requests,
}: Props) {
    const [selectedRequest, setSelectedRequest] =
        useState<IMyRentalHistory | null>(null);

    const [action, setAction] = useState<
        "APPROVED" | "REJECTED" | null
    >(null);

    const [open, setOpen] = useState(false);

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center py-20">
                <FileX className="mb-4 h-14 w-14 text-muted-foreground" />

                <h3 className="text-xl font-semibold">
                    No Rental Requests
                </h3>

                <p className="mt-2 text-muted-foreground">
                    No tenant has requested your properties yet.
                </p>
            </div>
        );
    }

    return (
        <Animate className="overflow-hidden rounded-2xl border bg-background">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>

                        <TableHead>Tenant</TableHead>

                        <TableHead>Rental Period</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id}>
                            {/* Property */}

                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-semibold">
                                            {request.property.title}
                                        </p>

                                        <span className="font-semibold text-primary text-xs">
                                            ৳{request.property.price}
                                        </span>

                                        <span className="text-muted-foreground text-xs">
                                            {" "}
                                            /month
                                        </span>

                                    </div>
                                </div>
                            </TableCell>

                            {/* Tenant */}

                            <TableCell>
                                <div>
                                    <p className="font-medium">
                                        {request.tenant?.name ?? "Unknown"}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {request.tenant?.email}
                                    </p>
                                </div>
                            </TableCell>

                            {/* Rental Period */}

                            <TableCell>
                                <div className="text-sm">
                                    <p>
                                        {format(
                                            new Date(request.startDate),
                                            "dd MMM yyyy"
                                        )}
                                    </p>

                                    <p className="text-muted-foreground">
                                        {request.endDate
                                            ? format(
                                                new Date(request.endDate),
                                                "dd MMM yyyy"
                                            )
                                            : "Open End"}
                                    </p>
                                </div>
                            </TableCell>

                            {/* Status */}

                            <TableCell>
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
                            </TableCell>

                            {/* Actions */}

                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        size="xs"
                                        className="gap-1 py-4!"
                                        disabled={
                                            request.status === "APPROVED" || request.status === "REJECTED"
                                        }
                                        onClick={() => {
                                            setSelectedRequest(request);
                                            setAction("APPROVED");
                                            setOpen(true);
                                        }}
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        Approve
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="gap-1"
                                        disabled={
                                            request.status === "REJECTED"
                                        }
                                        onClick={() => {
                                            setSelectedRequest(request);
                                            setAction("REJECTED");
                                            setOpen(true);
                                        }}
                                    >
                                        <XCircle className="h-4 w-4" />
                                        Reject
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedRequest && action && (
                <UpdateRentalStatusModal
                    open={open}
                    onOpenChange={setOpen}
                    request={selectedRequest}
                    action={action}
                />
            )}
        </Animate>
    );
}