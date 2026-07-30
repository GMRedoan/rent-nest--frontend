"use client";

import Link from "next/link";
import {
    Building2,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import Animate from "@/components/reusable/Animate";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const exploreLinks = [
    {
        label: "Browse Properties",
        href: "/properties",
    },
    {
        label: "Apartments",
        href: "/properties?type=apartment",
    },
    {
        label: "Houses",
        href: "/properties?type=house",
    },
    {
        label: "Become a Landlord",
        href: "/register",
    },
];

const companyLinks = [
    {
        label: "About Us",
        href: "/about",
    },
    {
        label: "Contact",
        href: "/contact",
    },
    {
        label: "FAQ",
        href: "/faq",
    },
    {
        label: "Privacy Policy",
        href: "/privacy-policy",
    },
];

const socials = [
    {
        icon: FaFacebook,
        href: "#",
    },
    {
        icon: FaInstagram,
        href: "#",
    },
    {
        icon: FaTwitter,
        href: "#",
    },
    {
        icon: FaLinkedin,
        href: "#",
    },
];

export default function Footer() {
    return (
        <footer className="border-t bg-muted/30">

            <Animate className="container mx-auto px-6 py-16">

                <div className="grid gap-12 lg:grid-cols-4">

                    {/* Brand */}

                    <div className="space-y-5">

                        <Link
                            href="/"
                            className="flex items-center gap-2 text-2xl font-bold"
                        >
                            <Building2 className="h-7 w-7 text-primary" />

                            RentNest
                        </Link>

                        <p className="max-w-sm leading-7 text-muted-foreground">
                            RentNest connects tenants and landlords through a
                            secure, modern, and easy-to-use rental platform.
                            Find your next home with confidence.
                        </p>

                        <div className="flex gap-3">

                            {socials.map(({ icon: Icon, href }, index) => (
                                <Link
                                    key={index}
                                    href={href}
                                    className="rounded-full border p-2.5 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}

                        </div>

                    </div>

                    {/* Explore */}

                    <div>

                        <h3 className="mb-5 text-lg font-semibold">
                            Explore
                        </h3>

                        <ul className="space-y-3">

                            {exploreLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* Company */}

                    <div>

                        <h3 className="mb-5 text-lg font-semibold">
                            Company
                        </h3>

                        <ul className="space-y-3">

                            {companyLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-5 text-lg font-semibold">
                            Contact
                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 h-5 w-5 text-primary" />
                                <p className="text-muted-foreground">
                                    Barishal, Bangladesh
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <p className="text-muted-foreground">
                                    support@rentnest.com
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <p className="text-muted-foreground">
                                    +880 1700-000000
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">

                    <p>
                        © {new Date().getFullYear()} RentNest. All rights reserved.
                    </p>

                    <div className="flex gap-6">

                        <Link
                            href="/terms"
                            className="hover:text-primary"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/privacy-policy"
                            className="hover:text-primary"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/cookies"
                            className="hover:text-primary"
                        >
                            Cookies
                        </Link>

                    </div>

                </div>

            </Animate>

        </footer>
    );
}