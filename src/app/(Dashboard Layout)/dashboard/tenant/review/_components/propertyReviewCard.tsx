"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMyRentalHistory } from "@/types/rental/rental";
import SubmitReviewModal from "./SubmitReviewModal";
import Animate from "@/components/reusable/Animate";

interface Props {
    rental: IMyRentalHistory;
}

export default function PropertyReviewCard({
    rental,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Animate type="zoom" className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:shadow-lg">
                <div className="relative h-56 w-full">
                    <Image
                        src={rental.property.images[0]}
                        alt={rental.property.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-4 p-5">
                    <h2 className="text-lg font-semibold">
                        {rental.property.title}
                    </h2>

                    <div className="flex items-center gap-2">
                        <Badge variant="outline">{rental.property.propertyType}</Badge>

                        <Badge
                            variant={
                                rental.payment?.status === "PAID"
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {rental.payment?.status ?? "UNPAID"}
                        </Badge>
                    </div>


                    <Button
                        className="w-full"
                        onClick={() => setOpen(true)}
                    >
                        Submit Review
                    </Button>
                </div>
            </Animate>

            <SubmitReviewModal
                open={open}
                onOpenChange={setOpen}
                propertyId={rental.property.id}
            />
        </>
    );
}