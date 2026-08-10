"use client";

import {
    ArrowUpRight,
} from "lucide-react";
import Animate from "@/components/reusable/Animate";
import { services } from "./_components/service";
import Link from "next/link";

export default function Services() {
    return (
        <section id="services" className="py-24">
            <div className="container">

                {/* Heading */}
                <Animate type="fadeDown">
                    <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                                Our Services
                            </p>

                            <h2 className="mt-3 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                                Everything You Need
                                <span className="text-primary">
                                    {" "}To Rent Better.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-md text-lg leading-8 text-muted-foreground">
                            From finding the perfect home to managing your
                            property, RentNest brings the entire rental
                            experience into one simple platform.
                        </p>

                    </div>
                </Animate>

                {/* Service List */}
                <div className="border-t border-border">

                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <Animate
                                key={service.number}
                                type="fadeUp"
                                delay={index * 0.08}
                            >
                                <div className="group relative border-b border-border py-8 md:py-10">

                                    <div className="grid items-center gap-6 md:grid-cols-[90px_70px_1fr_150px_60px]">

                                        {/* Number */}
                                        <div className="text-2xl font-semibold text-muted-foreground/40 transition-colors duration-300 group-hover:text-primary">
                                            {service.number}
                                        </div>

                                        {/* Icon */}
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <div className="mb-2 flex flex-wrap items-center gap-3">

                                                <h3 className="text-2xl font-semibold md:text-3xl">
                                                    {service.title}
                                                </h3>

                                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                                    {service.tag}
                                                </span>

                                            </div>

                                            <p className="max-w-2xl leading-7 text-muted-foreground">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Explore */}
                                        {service.href ? (
                                            <Link href={service.href as string}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="hidden text-right text-sm font-medium text-muted-foreground md:block">
                                                    Explore
                                                </div>

                                                {/* Arrow */}
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                                                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                                                </div>
                                            </Link>

                                        )
                                            : (
                                                <div className="hidden text-right text-sm font-medium text-muted-foreground md:block">
                                                     Explore After Booking
                                                </div>
                                            )}

                                    </div>

                                    {/* Hover line */}
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />

                                </div>
                            </Animate>
                        );
                    })}

                </div>

                {/* Bottom Statement */}
                <Animate type="fadeUp" delay={0.4}>
                    <div className="mt-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

                        <div>
                            <p className="text-2xl font-semibold">
                                One platform. Every rental need.
                            </p>

                            <p className="mt-2 text-muted-foreground">
                                Built to make renting simpler for everyone.
                            </p>
                        </div>

                        <button className="group flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all duration-300 hover:gap-5 hover:shadow-lg hover:shadow-primary/20">
                            Explore Services

                            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                        </button>

                    </div>
                </Animate>

            </div>
        </section>
    );
}