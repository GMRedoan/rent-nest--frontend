import {
    Home,
    Building2,
    ClipboardList,
    Users,
    Heart,
    User,
    Settings,
} from "lucide-react";
import { MdPayment, MdReviews } from "react-icons/md";

export const sidebarItems = {
    ADMIN: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: Home,
        },
        {
            title: "Users",
            href: "/dashboard/users",
            icon: Users,
        },
        {
            title: "Properties",
            href: "/dashboard/properties",
            icon: Building2,
        },
        {
            title: "Requests",
            href: "/dashboard/requests",
            icon: ClipboardList,
        },
        {
            title: "Profile",
            href: "/dashboard/profile",
            icon: User,
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ],

    LANDLORD: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: Home,
        },
        {
            title: "My Properties",
            href: "/dashboard/my-properties",
            icon: Building2,
        },
        {
            title: "Rental Requests",
            href: "/dashboard/requests",
            icon: ClipboardList,
        },
        {
            title: "Profile",
            href: "/dashboard/profile",
            icon: User,
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ],

    TENANT: [
        {
            title: "Dashboard",
            href: "/dashboard/tenant",
            icon: Home,
        },
        {
            title: "My Requests",
            href: "/dashboard/tenant/myRequests",
            icon: ClipboardList,
        },
        {
            title: "Payment History",
            href: "/dashboard/tenant/paymentHistory",
            icon: MdPayment,
        },
        {
            title: "Review",
            href: "/dashboard/tenant/review",
            icon: MdReviews,
        },
        {
            title: "Profile",
            href: "/dashboard/profile",
            icon: User,
        },
    ],
};