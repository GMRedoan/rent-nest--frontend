"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    MapPin,
    ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IProperty } from "@/types/property/property";
import RentalRequestModal from "@/components/Rental/ RentalRequestModal";

interface Props {
    property: IProperty;
}

export default function PropertyDetails({
    property,
}: Props) {


    return (
        <section className="py-22">
            {/* Back */}
            <Button
                variant="ghost"
                asChild
                className="mb-8"
            >
                <Link href="/properties">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Properties
                </Link>
            </Button>

            <div className="grid gap-10 lg:grid-cols-2">

                {/* Images */}
                <div className="space-y-4">

                    <div className="relative h-112 overflow-hidden rounded-3xl">

                        <Image
                            src={property.images[0]}
                            alt={property.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">

                        {property.images
                            .slice(1)
                            .map((image, index) => (

                                <div
                                    key={index}
                                    className="relative h-40 overflow-hidden rounded-xl"
                                >
                                    <Image
                                        src={image}
                                        alt="Property image"
                                        fill
                                        className="object-cover"
                                    />

                                </div>

                            ))}
                    </div>
                </div>
                {/* Information */}

                <Card className="space-y-6 rounded-3xl p-8">
                    <div className="flex justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {property.title}
                            </h1>
                            <div className="mt-3 flex items-center gap-2 text-muted-foreground">

                                <MapPin className="h-5 w-5" />

                                {property.location}

                            </div>

                        </div>
                        <Badge>
                            {property.status}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-3">

                        <Badge variant="secondary">
                            {property.propertyType}
                        </Badge>


                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Calendar className="h-4 w-4" />

                            {new Date(property.createdAt)
                                .toLocaleDateString()
                            }

                        </div>

                    </div>
                    <div>

                        <p className="text-4xl font-bold text-primary">

                            ৳{property.price}

                            <span className="text-base font-normal text-muted-foreground">
                                /month
                            </span>

                        </p>

                    </div>
                    <div>

                        <h2 className="mb-2 text-xl font-semibold">
                            Description
                        </h2>

                        <p className="leading-7 text-muted-foreground min-h-50">
                            {property.description}
                        </p>

                    </div>
                    {/* <Button
                        size="lg"
                        className="w-full"
                        disabled={property.status === "RENTED"}
                    >
                        {property.status === "RENTED"
                            ? "Already Rented"
                            : "Request Rental"
                        }

                    </Button> */}
            <RentalRequestModal property={property} />
                </Card>
            </div>
        </section>
    );
}