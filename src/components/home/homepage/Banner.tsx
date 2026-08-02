"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, House, Users } from "lucide-react";

import Animate from "@/components/reusable/Animate";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Toast } from "@/components/reusable/toast";

export default function HeroBanner() {
    const searchParams = useSearchParams();
    useEffect(() => {
        if (searchParams.get("error") === "unauthorized") {
            Toast({
                icon: "info",
                title: "You're already logged in! Please logout first.",
            })
        }
    }, [searchParams]);
    return (
        <section className="relative overflow-hidden py-16">

            <div className="container mx-auto grid min-h-[88vh] items-center gap-16 py-16 lg:grid-cols-2">

                {/* Left */}

                <Animate type="fadeRight">

                    <div className="space-y-8">

                        <span className="inline-flex rounded-full border bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            🏡 Trusted Property Rental Platform
                        </span>

                        <div className="space-y-5">

                            <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">
                                Find Your
                                <span className="text-primary">
                                    {" "}Perfect Home
                                </span>
                                <br />
                                Effortlessly.
                            </h1>

                            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                                Browse verified rental properties, send booking
                                requests instantly, and communicate directly
                                with trusted landlords through RentNest.
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-4">

                            <Button size="lg" asChild>
                                <Link 
                                className="text-white"
                                href="/properties">
                                    Explore Properties
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="secondary"
                                asChild
                                className="py-5"
                            >
                                <Link href="/register">
                                    Become a Landlord
                                </Link>
                            </Button>

                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-8">

                            <div>
                                <Building2 className="mb-3 h-8 w-8 text-primary" />
                                <h3 className="text-3xl font-bold">
                                    1,500+
                                </h3>
                                <p className="text-muted-foreground">
                                    Properties
                                </p>
                            </div>

                            <div>
                                <House className="mb-3 h-8 w-8 text-primary" />
                                <h3 className="text-3xl font-bold">
                                    850+
                                </h3>
                                <p className="text-muted-foreground">
                                    Happy Tenants
                                </p>
                            </div>

                            <div>
                                <Users className="mb-3 h-8 w-8 text-primary" />
                                <h3 className="text-3xl font-bold">
                                    300+
                                </h3>
                                <p className="text-muted-foreground">
                                    Landlords
                                </p>
                            </div>

                        </div>

                    </div>

                </Animate>

                {/* Right */}

                <Animate type="fadeLeft" delay={0.2}>
                    <div className="relative mx-auto h-162 w-full max-w-2xl">

                        {/* Background Glow */}
                        <div className="absolute inset-0 rounded-[40px] bg-linear-to-br from-primary/20 via-transparent to-primary/5 blur-3xl" />

                        {/* Main Image */}
                        <div className="relative h-full overflow-hidden rounded-[32px] shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                                alt="Luxury Property"
                                fill
                                priority
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                        </div>

                        {/* Property Card */}
                        <div className="absolute bottom-8 left-8 rounded-2xl bg-background/90 p-5 shadow-xl backdrop-blur-md">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                Featured Property
                            </p>

                            <h3 className="mt-2 text-xl font-bold">
                                Luxury Family Apartment
                            </h3>

                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                📍 Gulshan, Dhaka
                            </div>

                            <p className="mt-3 text-2xl font-bold text-primary">
                                $850<span className="text-base text-muted-foreground"> / month</span>
                            </p>
                        </div>

                    </div>
                </Animate>
            </div>

        </section>
    );
}