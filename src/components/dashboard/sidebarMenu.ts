import {
    Home,
    Building2,
    ClipboardList,
    Users,
    Heart,
    User,
    Settings,
} from "lucide-react";
import { MdCategory, MdPayment, MdRateReview, MdReviews } from "react-icons/md";

export const sidebarItems = {
    ADMIN: [
        {
            title: "Dashboard",
            href: "/dashboard/admin",
            icon: Home,
        },
        {
            title: "Users",
            href: "/dashboard/admin/users",
            icon: Users,
        },
        {
            title: "Properties",
            href: "/dashboard/admin/properties",
            icon: Building2,
        },
        {
            title: "Requests",
            href: "/dashboard/admin/requests",
            icon: ClipboardList,
        },
        {
            title: "Categories",
            href: "/dashboard/admin/categories",
            icon: MdCategory,
        },
        {
            title: "Profile",
            href: "/dashboard/admin/profile",
            icon: User,
        },
    ],

    LANDLORD: [
        {
            title: "Dashboard",
            href: "/dashboard/landlord",
            icon: Home,
        },
        {
            title: "My Properties",
            href: "/dashboard/landlord/myProperties",
            icon: Building2,
        },
        {
            title: "Rental Requests",
            href: "/dashboard/landlord/requests",
            icon: ClipboardList,
        },
        {
            title: "Property Reviews",
            href: "/dashboard/landlord/reviews",
            icon: MdRateReview,
        },
        {
            title: "Profile",
            href: "/dashboard/landlord/profile",
            icon: User,
        }
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
            href: "/dashboard/tenant/profile",
            icon: User,
        },
    ],
};