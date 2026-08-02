"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IProperty } from "@/types/property/property";
import Animate from "@/components/reusable/Animate";

interface Props {
    property: IProperty;
}

export default function PropertyCard({ property }: Props) {
    return (
        <Animate type="zoom">
        <Card className="group overflow-hidden rounded-2xl border-0 bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

            <div className="relative h-64 overflow-hidden">

                <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <Badge
                    className="absolute left-4 top-4"
                    variant={
                        property.status === "AVAILABLE"
                            ? "default"
                            : "link"
                    }
                >
                    {property.status}
                </Badge>

                <Badge
                    variant="outline"
                    className="absolute right-4 top-4 bg-background/90"
                >
                    {property.propertyType}
                </Badge>
            </div>

            <div className="space-y-4 p-5">

                <div>
                    <h2 className="line-clamp-1 text-xl font-bold">
                        {property.title}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {property.location}
                    </p>
                </div>

                <div className="flex items-center justify-between">

                    <p className="text-3xl font-bold text-primary">
                        ৳{property.price}
                    </p>

                    <span className="text-sm text-muted-foreground">
                        /month
                    </span>

                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(property.createdAt ?? 0), "dd MMM yyyy")}
                </div>
 
                <Button asChild className="w-full">
                    <Link href={`/properties/${property.id}`}>
                        View Details
                    </Link>
                </Button>

            </div>
        </Card>
        </Animate>
    );
}