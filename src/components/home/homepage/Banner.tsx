"use client";

import Link from "next/link";
import { ArrowRight, Building2, House, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Animate from "@/components/reusable/Animate";
import { PropertyStack } from "./_components/PropertyStack";
import { Toast } from "@/components/reusable/toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Hero() {
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
        <section id="home" className="relative overflow-hidden pt-16">
            <div className="container mx-auto grid min-h-[88vh] items-center gap-16 py-16 lg:grid-cols-2">
                {/* Left */}

                <Animate type="fadeRight">
                    <div className="space-y-8">
                        <span className="inline-flex rounded-full border bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            🏡 Trusted Property Rental Platform
                        </span>

                        <div className="space-y-3">
                            <h1
                                className='text-5xl leading-tight font-medium lg:text-7xl'
                            >
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
                                <Link className="text-white" href="/properties">
                                    Explore Properties
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/register">
                                    Become a Landlord
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-6 border-t pt-8">
                            <div>
                                <Building2 className="mb-3 h-8 w-8 text-primary" />
                                <h3 className="text-3xl font-bold">1,500+</h3>
                                <p className="text-muted-foreground">Properties</p>
                            </div>

                            <div className="border-l pl-6">
                                <House className="mb-3 h-8 w-8 text-primary" />
                                <h3 className="text-3xl font-bold">850+</h3>
                                <p className="text-muted-foreground">Happy Tenants</p>
                            </div>

                            <div className="border-l pl-6">
                                <Users className="mb-3 h-8 w-8 text-primary" />
                                <h3 className="text-3xl font-bold">300+</h3>
                                <p className="text-muted-foreground">Landlords</p>
                            </div>
                        </div>
                    </div>
                </Animate>

                {/* Right */}

                <Animate className="pt-15 md:pt-0" type="fadeLeft" delay={0.2}>
                    <PropertyStack />
                </Animate>
            </div>
        </section>
    );
}