import Image from "next/image";
import { CheckCircle2, Home, ShieldCheck, Users } from "lucide-react";
import Animate from "@/components/reusable/Animate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Rent Nest",
    description: "Browse all available rental properties.",
};

export default function AboutSection() {
    const features = [
        {
            icon: Home,
            title: "Verified Properties",
            description:
                "Browse quality rental homes, apartments, studios, and commercial spaces listed by trusted landlords.",
        },
        {
            icon: ShieldCheck,
            title: "Secure Booking",
            description:
                "Submit rental requests and complete payments securely through our streamlined rental process.",
        },
        {
            icon: Users,
            title: "Trusted Community",
            description:
                "We connect landlords and tenants with a transparent and reliable rental experience.",
        },
    ];

    return (
        <section className="py-24 md:py-34">
            <div className="container">
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    {/* Left */}

                    <Animate type="fadeRight">
                        <div className="relative">
                            <Image
                                src="https://i.ibb.co/8L7nth8m/vigor-poodo-deao-E9-PJe-KI-unsplash.jpg"
                                alt="About RentNest"
                                width={650}
                                height={700}
                                className="rounded-3xl object-cover shadow-xl"
                            />

                            <div className="absolute -bottom-8 -right-8 rounded-2xl border bg-background p-6 shadow-xl">
                                <p className="text-4xl font-bold text-primary">
                                    500+
                                </p>

                                <p className="mt-1 text-muted-foreground">
                                    Happy Renters
                                </p>
                            </div>
                        </div>
                    </Animate>

                    {/* Right */}

                    <Animate type="fadeLeft">
                        <p className="font-semibold uppercase tracking-[0.25em] text-primary">
                            About RentNest
                        </p>

                        <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
                            Making Property Rentals
                            <span className="text-primary">
                                {" "}Simple & Secure
                            </span>
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            RentNest is a modern rental platform that brings
                            landlords and tenants together in one trusted place.
                            From discovering the perfect property to submitting
                            rental requests and completing secure online
                            payments, every step is designed to be simple,
                            transparent, and hassle-free.
                        </p>

                        <div className="mt-8 space-y-5">
                            {features.map((item, index) => (
                                <Animate
                                    key={item.title}
                                    type="fadeUp"
                                    delay={index * 0.15}
                                >
                                    <div className="flex gap-4 rounded-2xl border p-5 transition hover:border-primary hover:shadow-md">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </Animate>
                            ))}
                        </div>

                        <Animate type="fadeUp" delay={0.5}>
                            <div className="mt-10 rounded-2xl bg-primary/10 p-6">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-6 w-6 text-primary" />

                                    <p className="leading-7">
                                        Whether you are searching for your next
                                        home or managing rental properties,
                                        RentNest provides a reliable experience
                                        with verified listings, secure payments,
                                        and an intuitive dashboard for every
                                        user.
                                    </p>
                                </div>
                            </div>
                        </Animate>
                    </Animate>
                </div>
            </div>
        </section>
    );
}