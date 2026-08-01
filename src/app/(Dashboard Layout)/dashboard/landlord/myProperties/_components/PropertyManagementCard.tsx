"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
    CalendarDays,
    MapPin,
    Pencil,
    Trash2,
    House,
} from "lucide-react";
import Animate from "@/components/reusable/Animate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { IProperty } from "@/types/property/property";

interface Props {
    property: IProperty;
    onEdit: (property: IProperty) => void;
    onDelete: (property: IProperty) => void;
}

export default function PropertyManagementCard({
    property,
    onEdit,
    onDelete,
}: Props) {
    return (
        <Animate type="fadeUp">
            <Card className="group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    {/* Status */}
                    <Badge
                        className="absolute left-4 top-4"
                        variant={
                            property.status === "AVAILABLE"
                                ? "default"
                                : property.status === "RENTED"
                                    ? "secondary"
                                    : "destructive"
                        }
                    >
                        {property.status}
                    </Badge>

                    {/* Category */}
                    <Badge
                        variant="outline"
                        className="absolute right-4 top-4 bg-background/90 backdrop-blur"
                    >
                        {property.propertyType}
                    </Badge>
                </div>
                <CardContent className="space-y-3 px-6">
                    <div>
                        <h2 className="line-clamp-1 text-xl font-bold">
                            {property.title}
                        </h2>
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {property.location}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-xl border bg-muted/40 p-4">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Monthly Rent
                            </p>
                            <p className="mt-1 text-lg font-bold text-primary">
                                ৳{property.price}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Property Type
                            </p>

                            <div className="mt-1 flex items-center gap-2 font-medium">
                                <House className="h-4 w-4 text-primary" />
                                {property.propertyType}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        Added{" "}
                        {format(
                            new Date(property.createdAt),
                            "dd MMM yyyy"
                        )}
                    </div>
                </CardContent>

                <div className="grid grid-cols-2 gap-3 p-6 pt-0">
                    <Button
                        variant="secondary"
                        onClick={() => onEdit(property)}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={() => onDelete(property)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </Card>
        </Animate>
    );
}