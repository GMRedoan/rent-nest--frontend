import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CreditCard,
    FileText,
    Home,
    Search,
    Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Animate from "@/components/reusable/Animate";
import { getUser } from "@/server/user/user.service";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tenant Dashboard",
    description: "A property rental app",
};

export default async function TenantDashboardPage() {
    const result = await getUser();
    const user = result.data;

    const quickActions = [
        {
            title: "Browse Properties",
            description: "Explore verified rental properties.",
            icon: Search,
            href: "/properties",
        },
        {
            title: "Rental Requests",
            description: "Track your rental applications.",
            icon: FileText,
            href: "/dashboard/tenant/myRequests",
        },
        {
            title: "Payments",
            description: "Manage your rental payments.",
            icon: CreditCard,
            href: "/dashboard/tenant/paymentHistory",
        },
        {
            title: "Reviews",
            description: "Share your rental experience.",
            icon: Star,
            href: "/dashboard/tenant/review",
        },
    ];

    return (
        <div className="space-y-10">
            {/* Hero Banner */}
            <Animate type="fadeUp" delay={0.6}>

                <section className="relative overflow-hidden rounded-3xl min-h-90">

                    <Image
                        src="https://i.ibb.co.com/r20jDjht/mike-von-y-ib-WWp-Oi-L0-unsplash.jpg"
                        alt="Modern apartment"
                        fill
                        priority
                        className="object-cover object-[center_60%]"
                    />
                     {/* Overlay */}

                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />

                    <div className="relative z-10 flex h-full min-h-90 items-center p-8 lg:p-12">

                        <div className="max-w-2xl text-white">

                            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/70">
                                Welcome Back
                            </p>
                            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                                Find a place you can call
                                <span className="text-primary">
                                    {" "}home
                                </span>
                            </h1>

                            <p className="mt-5 max-w-xl text-white/80">
                                Hello {user?.name}. Manage your rental requests,
                                payments and property journey from your personal
                                dashboard.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">

                                <Button asChild>
                                    <Link href="/properties">
                                        Explore Properties
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="secondary"
                                >
                                    <p>
                                        My Requests
                                    </p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

            </Animate>

            {/* Quick Actions */}
            <section>
                <Animate
                    type="zoom"
                >
                    <div className="mb-6">

                        <h2 className="text-3xl font-bold">
                            Quick  <span className="text-primary">Actions</span>
                        </h2>
                        <p className="mt-1 text-muted-foreground">
                            Access your important rental features quickly.
                        </p>
                    </div>

                </Animate>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                    {
                        quickActions.map((item, index) => {

                            const Icon = item.icon;

                            return (

                                <Animate
                                    key={item.title}
                                    type="fadeUp"
                                    delay={index * 0.1}
                                >

                                    <Link href={item.href}>

                                        <Card
                                            className="
                                            group h-full rounded-2xl
                                            border-border/60
                                            transition-all
                                            duration-300
                                            hover:-translate-y-2
                                            hover:border-primary/40
                                            hover:shadow-xl
                                            "
                                        >

                                            <CardContent className="p-6">

                                                <div
                                                    className="
                                                    mb-5 flex h-14 w-14
                                                    items-center justify-center
                                                    rounded-2xl
                                                    bg-primary/10
                                                    text-primary
                                                    transition-all
                                                    duration-300
                                                    group-hover:bg-primary
                                                    group-hover:text-primary-foreground
                                                    "
                                                >

                                                    <Icon className="h-7 w-7" />

                                                </div>


                                                <h3 className="font-semibold text-lg">
                                                    {item.title}
                                                </h3>


                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {item.description}
                                                </p>


                                                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">

                                                    Open

                                                    <ArrowRight
                                                        className="
                                                        h-4 w-4
                                                        transition-transform
                                                        group-hover:translate-x-1
                                                        "
                                                    />

                                                </div>


                                            </CardContent>

                                        </Card>

                                    </Link>

                                </Animate>

                            );

                        })
                    }

                </div>
            </section>
            {/* Rental Journey */}
            <Animate
                type="zoom"
            >

                <Card className="rounded-3xl">

                    <CardContent className="p-8">

                        <div className="flex items-center gap-3">

                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <Home />
                            </div>


                            <div>

                                <h2 className="text-xl font-bold">
                                    Your Rental Journey
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Follow these steps to complete your rental.
                                </p>

                            </div>

                        </div>



                        <div className="mt-8 grid gap-5 md:grid-cols-5">

                            {
                                [
                                    "Find Property",
                                    "Send Request",
                                    "Get Approval",
                                    "Complete Payment",
                                    "Enjoy Home",
                                ].map((step, index) => (
                                    <div
                                        key={step}
                                        className="flex items-center gap-3"
                                    >

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            {index + 1}
                                        </div>

                                        <p className="text-sm font-medium">
                                            {step}
                                        </p>

                                    </div>
                                ))
                            }

                        </div>

                    </CardContent>

                </Card>

            </Animate>
        </div>
    );
}