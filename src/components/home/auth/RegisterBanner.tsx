"use client";

import Animate from "@/components/reusable/Animate";
import Image from "next/image";

export default function RegisterBanner() {
    return (
        <section className="relative hidden lg:flex overflow-hidden">
            <Image
                src="https://i.ibb.co.com/DPgsG7Mq/mike-von-y-ib-WWp-Oi-L0-unsplash.jpg"
                alt="Modern Apartment"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            <Animate
                type="fadeUp"
                className="relative z-10 flex h-full items-end p-14 text-white"
            >
                <div className="max-w-md space-y-5">
                    <h2 className="text-5xl font-bold leading-tight">
                        Start Your Rental Journey.
                    </h2>

                    <p className="text-lg text-gray-200 leading-8">
                        Whether you are looking for your next home or listing your property,
                        RentNest makes renting simple, secure, and effortless.
                    </p>
                </div>
            </Animate>
        </section>
    );
}