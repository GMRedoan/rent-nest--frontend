"use client";

import Image from "next/image";
import Animate from "@/components/reusable/Animate";

export default function LoginBanner() {
    return (
        <section className="relative hidden lg:flex overflow-hidden">
            <Image
                src="https://i.ibb.co.com/8L7nth8m/vigor-poodo-deao-E9-PJe-KI-unsplash.jpg"
                alt="Property"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            <Animate
                type="fadeUp"
                className="relative z-10 flex h-full items-end p-14 text-white"
            >
                <div className="space-y-5 max-w-md">
                    <h1 className="text-5xl font-bold leading-tight">
                        Find the perfect place to call home.
                    </h1>

                    <p className="text-lg text-gray-200 leading-8">
                        Browse trusted properties, send rental requests, and manage your
                        rentals effortlessly. Whether you are a tenant or a landlord,
                        everything is in one place.
                    </p>
                </div>
            </Animate>
        </section>
    );
}