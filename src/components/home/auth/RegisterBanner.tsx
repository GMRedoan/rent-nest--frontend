"use client";

import Animate from "@/components/reusable/Animate";
import Image from "next/image";

export default function RegisterBanner() {
    return (
      <section className="relative hidden lg:flex overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
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
              Whether you are looking for your next home or listing your
              property, RentNest makes renting simple, secure, and effortless.
            </p>
          </div>
        </Animate>
      </section>
    );
}