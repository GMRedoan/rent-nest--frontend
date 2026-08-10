import { Service } from "@/types/service/service";
import {
    Building2,
    Search,
    ShieldCheck,
    WalletCards,
    KeyRound,
} from "lucide-react";

export const services: Service[] = [
    {
        number: "01",
        title: "Find Your Next Home",
        description:
            "Discover carefully listed rental properties that match your location, budget, and lifestyle.",
        icon: Search,
        tag: "For Tenants",
        href: "/properties",
    },
    {
        number: "02",
        title: "List Your Property",
        description:
            "Reach genuine renters by showcasing your property with detailed information and beautiful listings.",
        icon: Building2,
        tag: "For Landlords",
        href: "/dashboard/landlord/myProperties",
    },
    {
        number: "03",
        title: "Verified Properties",
        description:
            "Explore trustworthy rental options with transparent information so you can make confident decisions.",
        icon: ShieldCheck,
        tag: "Trusted",
        href: "#properties",
    },
    {
        number: "04",
        title: "Secure Payments",
        description:
            "Make rental payments through a secure and convenient process without unnecessary complications.",
        icon: WalletCards,
        tag: "Secure",
    },
    {
        number: "05",
        title: "Simple Move-In",
        description:
            "From discovering a property to getting the keys, RentNest keeps the entire rental journey simple.",
        icon: KeyRound,
        tag: "Hassle-Free",
    },
];
