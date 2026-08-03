import Animate from "@/components/reusable/Animate";
import { getCategories } from "@/server/categories/categories.service";
import { getProperties } from "@/server/properties/properties.service";
import { allRentalRequest } from "@/server/rental/rental.service";
import { allUsers } from "@/server/user/user.service";
import {
    Users,
    Building2,
    FolderOpen,
    ClipboardList,
    ShieldCheck,
    Activity,
    CircleCheckBig,
    Clock3,
    ArrowRight,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Admin Dashboard | Rent Nest",
    description: "A property rental app",
};

export default async function AdminDashboardPage () {
    const user = await allUsers();
    const property = await getProperties();
    const rental = await allRentalRequest();
    const categories = await getCategories();
    const userCount = user.data?.length || 0;
    const propertyCount = property.data?.length || 0;
    const rentalCount = rental.data?.length || 0;
    const categoryCount = categories.data?.length || 0;
    return (
        <div className="space-y-10">
            {/* Hero */}
            <Animate type="fadeDown">
                <div className="relative overflow-hidden rounded-3xl">
                    <Image
                        src="https://i.ibb.co.com/Xx0TPtpD/dillon-kydd-2ke-CPb73a-QY-unsplash.jpg"
                        alt="property"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10 px-10 py-14 text-white">
                        <p className="text-sm uppercase tracking-[0.3em]">
                            Administration Panel
                        </p>
                        <h1 className="mt-3 text-4xl md:text-5xl font-bold">
                            Welcome Back, <span className="text-primary">Admin</span> 👋
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg text-white/80">
                            Monitor users, properties, rental requests and
                            platform activities from one centralized dashboard.
                            Everything important is only a click away.
                        </p>
                    </div>
                </div>
            </Animate>

            {/* Statistics */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {[
                    {
                        icon: Users,
                        title: "Total Users",
                        value: userCount.toString(),
                        color: "text-blue-600",
                    },
                    {
                        icon: Building2,
                        title: "Properties",
                        value: propertyCount.toString(),
                        color: "text-green-600",
                    },
                    {
                        icon: ClipboardList,
                        title: "Rental Requests",
                        value: rentalCount.toString(),
                        color: "text-orange-500",
                    },
                    {
                        icon: FolderOpen,
                        title: "Categories",
                        value:  categoryCount.toString(),
                        color: "text-purple-600",
                    },
                ].map((card, index) => (
                    <Animate
                        key={card.title}
                        type="fadeUp"
                        delay={index * 0.1}
                    >
                        <div className="rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground">
                                       {card.title}
                                    </p>

                                    <h3 className="mt-2 text-4xl font-bold">
                                        {card.value}
                                    </h3>
                                </div>
                                <div className="rounded-xl bg-primary/10 p-4">
                                    <card.icon
                                        className={`h-8 w-8 ${card.color}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Animate>
                ))}

            </div>

            {/* Two Column */}
            <div className="grid gap-8 lg:grid-cols-2">

                {/* Quick Actions */}
                <Animate type="fadeLeft">

                    <div className="rounded-2xl border bg-card p-8">
                        <h2 className="text-2xl font-bold">
                            Quick Actions
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Frequently used management shortcuts.
                        </p>
                        <div className="mt-8 space-y-4">

                            {[
                                {
                                    title: "Manage Users",
                                    href: "/dashboard/admin/users",
                                },
                                {
                                    title: "Manage Properties",
                                    href: "/dashboard/admin/properties",
                                },
                                {
                                    title: "Rental Requests",
                                    href: "/dashboard/admin/requests",
                                },
                                {
                                    title: "Property Categories",
                                    href: "/dashboard/admin/categories",
                                },
                            ].map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="flex items-center justify-between rounded-xl border p-4 transition hover:border-primary hover:bg-primary/5"
                                >
                                    <span className="font-medium">
                                        {item.title}
                                    </span>

                                    <ArrowRight className="h-5 w-5 text-primary" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </Animate>

                {/* Platform Health */}
                <Animate type="fadeRight">
                    <div className="rounded-2xl border bg-card p-8">
                        <h2 className="text-2xl font-bold">
                            Platform Health
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Overall system status and operational summary.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between border p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-6 w-6 text-green-600" />
                                    <span>Security Status</span>
                                </div>
                                <span className="font-semibold text-green-600">
                                    Protected
                                </span>
                            </div>
                            <div className="flex items-center justify-between border p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Activity className="h-6 w-6 text-blue-600" />
                                    <span>API Services</span>
                                </div>
                                <span className="font-semibold text-blue-600">
                                    Online
                                </span>
                            </div>
                            <div className="flex items-center justify-between border p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <CircleCheckBig className="h-6 w-6 text-primary" />
                                    <span>Database</span>
                                </div>
                                <span className="font-semibold">
                                    Healthy
                                </span>
                            </div>
                            <div className="flex items-center justify-between border p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Clock3 className="h-6 w-6 text-orange-500" />
                                    <span>Last Backup</span>
                                </div>
                                <span className="font-semibold text-orange-500">
                                    Today
                                </span>
                            </div>
                        </div>
                    </div>
                </Animate>
            </div>

            {/* Tips */}

            <Animate type="fadeUp">
                <div className="rounded-3xl border bg-linear-to-r from-primary/10 via-background to-primary/5 p-10">
                    <h2 className="text-3xl font-bold">
                        Administrator Tips
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Keep the RentNest platform secure and well organized.
                    </p>
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            "Review new rental requests daily.",
                            "Keep categories organized",
                            "Monitor suspicious user activity.",
                            "Regularly verify listed properties.",
                        ].map((tip, index) => (
                            <Animate
                                key={tip}
                                type="zoom"
                                delay={index * 0.1}
                            >
                                <div className="rounded-2xl border bg-background p-6 shadow-sm">

                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                                        0{index + 1}
                                    </div>
                                    <p className="leading-7">
                                        {tip}
                                    </p>
                                </div>
                            </Animate>
                        ))}
                    </div>
                </div>
            </Animate>
        </div>
    );
}