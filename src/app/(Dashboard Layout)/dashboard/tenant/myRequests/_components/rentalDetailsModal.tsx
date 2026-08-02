"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
    CalendarDays,
    Home,
    DollarSign,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IMyRentalHistory } from "@/types/rental/rental";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    request: IMyRentalHistory | null;
}

export default function RentalDetailsModal({
    open,
    onOpenChange,
    request,
}: Props) {
    if (!request) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-auto p-8">

                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Rental Request Details
                    </DialogTitle>
                </DialogHeader>

                {/* Property Image */}
                <div className="flex gap-6">
                    <Image
                        src={request.property.images[0]}
                        alt={request.property.title}
                        width={400}
                        height={350}
                        className="rounded-xl object-cover"
                    />
                    <Image
                        src={request.property.images[1]}
                        alt={request.property.title}
                        width={400}
                        height={350}
                        className="rounded-xl object-cover"
                    />

                </div>

                {/* Property */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                        {request.property.title}
                    </h2>

                    <p className="text-muted-foreground">
                        {request.property.location}
                    </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-5">
                    <Info
                        icon={<Home className="h-4 w-4" />}
                        label="Property Type"
                        value={request.property.propertyType}
                    />

                    <Info
                        icon={<DollarSign className="h-4 w-4" />}
                        label="Monthly Rent"
                        value={`৳${request.property.price}`}
                    />

                    <Info
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Start Date"
                        value={format(
                            new Date(request.startDate),
                            "dd MMM yyyy"
                        )}
                    />

                    <Info
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="End Date"
                        value={
                            request.endDate
                                ? format(
                                    new Date(request.endDate),
                                    "dd MMM yyyy"
                                )
                                : "Not Specified"
                        }
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">
                            Your Message
                        </h3>

                        <p className="rounded-lg bg-muted p-4 text-sm">
                            {request.message}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Badge
                            variant={
                                request.status === "APPROVED"
                                    ? "default"
                                    : request.status === "REJECTED"
                                        ? "destructive"
                                        : "pending"
                            }
                        >
                            {request.status}
                        </Badge>

                        <Badge
                            variant={
                                request.payment?.status === "PAID"
                                    ? "default"
                                    : "outline"
                            }
                        >
                            {request.payment?.status ?? "UNPAID"}
                        </Badge>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}

function Info({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border p-4">

            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                {icon}
                <span className="text-sm">{label}</span>
            </div>

            <p className="font-semibold">
                {value}
            </p>

        </div>
    );
}