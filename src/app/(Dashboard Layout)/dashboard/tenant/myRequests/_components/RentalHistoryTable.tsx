"use client";

import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
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
import { FileX } from "lucide-react";
import { useState } from "react";
import RentalDetailsModal from "./rentalDetailsModal";

interface Props {
    requests: IMyRentalHistory[];
}

export default function RentalHistoryTable({
    requests,
}: Props) {
    const [selectedRequest, setSelectedRequest] =
        useState<IMyRentalHistory | null>(null);

    const [open, setOpen] = useState(false);

    const handleView = (request: IMyRentalHistory) => {
        setSelectedRequest(request);
        setOpen(true);
    };

    if(requests.length === 0){
        return (
            <div className="flex flex-col items-center py-20">
                <FileX className="mb-4 h-14 w-14 text-muted-foreground" />

                <h3 className="text-xl font-semibold">
                    No Rental Requests
                </h3>

                <p className="mt-2 text-muted-foreground">
                    You have not requested any property yet.
                </p>

                <Button asChild className="mt-6">
                    <Link href="/properties">
                        Browse Properties
                    </Link>
                </Button>
            </div>
        )
    }
    return (
        <div className="rounded-2xl border bg-background">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Request Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id}>

                            {/* Property */}

                            <TableCell>

                                <div className="flex items-center gap-3">

                                    <Image
                                        src={request.property.images[0]}
                                        alt={request.property.title}
                                        width={50}
                                        height={10}
                                        className="rounded-md object-cover h-10"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {request.property.title}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            ৳{request.property.price}/month
                                        </p>

                                    </div>

                                </div>
                            </TableCell>
                            <TableCell>
                                {format(
                                    new Date(request.startDate),
                                    "dd MMM yyyy"
                                )}
                            </TableCell>

                            <TableCell>
                                {request.endDate
                                    ? format(
                                        new Date(request.endDate),
                                        "dd MMM yyyy"
                                    )
                                    : "—"}
                            </TableCell>
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

                            <TableCell>
                                {request.payment?.status === "PAID" ? (
                                    <Button
                                        size="sm"
                                        disabled
                                        className="bg-green-600! px-4 py-4!"
                                    >
                                        Paid
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        disabled={
                                            request.status !== "APPROVED"
                                        }
                                    >
                                        Pay Now
                                    </Button>
                                )}
                            </TableCell>
                            <TableCell className="text-right">

                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => handleView(request)}>
                                         View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <RentalDetailsModal
                open={open}
                onOpenChange={setOpen}
                request={selectedRequest}
            />
        </div>
    );
}