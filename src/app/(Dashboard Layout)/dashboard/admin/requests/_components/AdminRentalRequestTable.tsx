"use client";

import Image from "next/image";
import { format } from "date-fns";
import { FileX } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { IMyRentalHistory } from "@/types/rental/rental";
import Animate from "@/components/reusable/Animate";

interface Props {
    requests: IMyRentalHistory[];
}

export default function AdminRentalRequestTable({
    requests,
}: Props) {
    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border py-20">
                <FileX className="mb-4 h-14 w-14 text-muted-foreground" />

                <h3 className="text-xl font-semibold">
                    No Rental Requests Found
                </h3>

                <p className="mt-2 text-muted-foreground">
                    There are currently no rental requests.
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
                        <TableHead>Property</TableHead>
                        <TableHead>Request</TableHead>
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

                                        <p className="text-sm text-primary">
                                            ৳{request.property.price} <span className="text-muted-foreground">/ month</span>

                                        </p>
                                    </div>
                                </div>
                            </TableCell>

                            {/* Tenant */}
                            <TableCell>
                                <div>
                                    <p className="font-medium">
                                        {request.tenant?.name}
                                    </p>
                                    <p className="text-sm text-blue-400">{request.tenant?.email}</p>
                                    <p className="text-sm text-muted-foreground">
                                       Requested on: {format(
                                            new Date(request.createdAt ?? 0),
                                            "dd MMM yyyy"
                                        )}
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
                                        to{" "}
                                        {request.endDate
                                            ? format(
                                                new Date(request.endDate),
                                                "dd MMM yyyy"
                                            )
                                            : "N/A"}
                                    </p>
                                </div>
                            </TableCell>

                            {/* Property Status */}
                            <TableCell>
                                <Badge
                                    variant={
                                        request.property.status === "AVAILABLE"
                                            ? "default"
                                            : "link"
                                    }
                                >
                                    {request.property.status}
                                </Badge>

                            </TableCell>
                            {/* Request Status */}
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Animate>
    );
}