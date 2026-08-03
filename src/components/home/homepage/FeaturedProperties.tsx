import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Animate from "@/components/reusable/Animate";
import { IProperty } from "@/types/property/property";
import PropertyCard from "@/app/(HomeLayout)/properties/_components/propertyCard";
import { Button } from "@/components/ui/button";

interface Props {
    properties: IProperty[];
}

export default function FeaturedProperties({
    properties,
}: Props) {
    const featuredProperties = properties.slice(0, 6);

    return (
        <section className="py-14">
            <div className="container">
                {/* Section Header */}
                <Animate type="fadeDown">
                    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                                Featured Listings
                            </p>

                            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                                Explore Our Featured
                                <span className="text-primary"> Properties</span>
                            </h2>

                            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                                Browse a curated collection of premium rental
                                properties chosen for their quality, location,
                                and comfort. Find your next home with confidence.
                            </p>
                        </div>

                        <Link
                            href="/properties"
                        >
                            <Button className="py-6!">
                             View All Properties
                            <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </Animate>

                {/* Properties */}
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {featuredProperties.map((property, index) => (
                        <Animate
                            key={property.id}
                            type="fadeUp"
                            delay={index * 0.08}
                        >
                            <PropertyCard property={property} />
                        </Animate>
                    ))}
                </div>

                {/* Empty State */}
                {featuredProperties.length === 0 && (
                    <Animate type="fade">
                        <div className="rounded-3xl border border-dashed py-20 text-center">
                            <h3 className="text-2xl font-semibold">
                                No Featured Properties Yet
                            </h3>

                            <p className="mt-3 text-muted-foreground">
                                New properties will appear here as soon as they
                                are listed.
                            </p>
                        </div>
                    </Animate>
                )}
            </div>
        </section>
    );
}