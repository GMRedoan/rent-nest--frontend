"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
    MapPin,
    Home,
    CalendarDays,
    MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Animate from "@/components/reusable/Animate";
import { ILandlordReview } from "@/types/review/review";
 

interface Props {
    review: ILandlordReview;
}


export default function LandlordReviewCard({
    review,
}: Props) {
    return (
        <Animate type="fadeUp">
            <Card
                className="overflow-hidden rounded-2xl border-border/60
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                ">
                {/* Property Image */}
                <div className="relative h-52 w-full">
                    <Image
                        src={review.property.images[0]}
                        alt={review.property.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute left-4 top-4">

                        <Badge>
                            {review.property.propertyType}
                        </Badge>
                    </div>
                </div>
                <CardContent className="space-y-5 p-6">
                    {/* Property */}
                    <div>

                        <h3 className="text-xl font-bold">
                            {review.property.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {review.property.location}
                        </div>
                    </div>
                    {/* Review */}
                    <div
                        className="
                        rounded-xl
                        bg-muted/50
                        p-4
                        "
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <MessageSquare
                                className="h-4 w-4 text-primary"
                            />
                            <span className="font-semibold">
                                Tenant Review
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {review.comment}
                        </p>
                    </div>
                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Home
                                className="h-4 w-4 text-primary"
                            />
                            <span>
                                ৳{review.property.price}/month
                            </span>

                        </div>
                        <div className="flex items-center gap-2">

                            <CalendarDays
                                className="h-4 w-4 text-primary"
                            />
                            <span>
                                {format(
                                    new Date(review.createdAt),
                                    "dd MMM yyyy"
                                )}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Animate>
    );
}