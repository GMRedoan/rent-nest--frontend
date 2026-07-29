/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    BadgeCheck,
    ChevronRight,
    LogOut,
    Menu,
    Phone,
    Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/shared/theme/ThemeToggle";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useIsMobile } from "@/components/hooks/useMobile";
import { Container } from "./Container";
import { logoutAction } from "@/server/auth/auth.service";
import Image from "next/image";
import { Toast } from "../reusable/toast";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface NavbarProps {
    className?: string;
    logo?: LogoProps;
    menu?: MenuItem[];
}

interface LogoProps {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
}

const defaultMenu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Properties", url: "/properties" },
    { title: "Contact", url: "/contact" },
    { title: "Blogs", url: "/blogs" },
];

const Navbar = ({ menu = defaultMenu }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // logout
    const handleLogOut = async () => {
        try {
            const result = await logoutAction();

            if (!result.success) {
                Toast({
                    icon: "error",
                    title: result?.message || "Login failed",
                });
                return;
            }

            Toast({
                icon: "success",
                title: "Logout successful",
            });

        } catch (error: any) {
            Toast({
                icon: "error",
                title: error?.message || "Logout failed",
            });
        }
    };

    return (
        <motion.section
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={clsx(
                "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full",
                scrolled ? "top-4 container px-4" : "top-0 max-w-full",
            )}
        >
            <section
                className={clsx(
                    "transition-all duration-500 flex justify-center w-full",
                    scrolled
                        ? "rounded-xl bg-background/60 backdrop-blur-sm shadow-[0_0_25px_rgba(0,0,0,0.2)]"
                        : "bg-background/80",
                )}
            >
                <Container className={`${scrolled && "px-3!"}`}>
                    <div className="w-full">
                        <DesktopMenu
                            menu={menu}
                            scrolled={scrolled}
                            userEmail={userEmail}
                            setUserEmail={setUserEmail}
                            // user={user}
                            handleLogOut={handleLogOut}
                        />

                        <MobileMenu
                            menu={menu}
                            userEmail={userEmail}
                            setUserEmail={setUserEmail}
                            // user={user}
                            handleLogOut={handleLogOut}
                        />
                    </div>
                </Container>
            </section>
        </motion.section>
    );
};

// ====================== Desktop Menu ======================
const DesktopMenu = ({
    menu,
    userEmail,
    setUserEmail,
    isLoggedIn,
    user,
    handleLogOut,
}: any) => {
    return (
        <nav className="hidden items-center justify-between lg:flex">

            <p className="text-2xl font-semibold">RentNest</p>

            <div className="flex items-center gap-6">
                <div className="relative flex items-center gap-6 bg-primary py-3 px-6 clip-path-custom before:content-[''] before:absolute before:top-0 before:-left-9.75 before:h-full before:w-10 before:bg-primary before:[clip-path:polygon(100%_0,100%_100%,0_100%)]">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {menu.map((item: MenuItem) => (
                                <DesktopMenuItem key={item.title} item={item} />
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <AuthButtons
                    isLoggedIn={isLoggedIn}
                    user={user}
                    handleLogOut={handleLogOut}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                />
            </div>
        </nav>
    );
};

// ====================== Auth ======================
const AuthButtons = ({
    isLoggedIn,
    user,
    handleLogOut,
}: any) => {
    // const isMobile = useIsMobile();
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {user ? (
                <Button className="bg-primary lg:bg-background/20 border w-fit">
                    <Link
                        href={"/dashboard"}
                        className="text-sm font-semibold text-background lg:text-foreground"
                    >
                        Dashboard
                    </Link>
                </Button>
            ) : (
                <div>
                    <Link href={'/register'}>
                        <Button
                            className="bg-background/20! border! w-fit text-sm! text-foreground!"
                        >
                            Business Registration
                        </Button>
                    </Link>
                </div>
            )}

            <div className="flex items-center gap-4">
                <ThemeToggle />
                {!isLoggedIn ? (
                    <>
                        {/* customer signin/register */}
                        <div>
                                 <Link href={'/login'}>
                                    <Button
                                        className="text-xs!"
                                    >
                                        LOGIN / REGISTER
                                    </Button>
                                </Link>

                         </div>
                    </>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="rounded-full cursor-pointer">
                                <Avatar>
                                    <AvatarImage src={user?.avatar} alt={user?.name || "User"} />

                                    <AvatarFallback className="font-semibold">
                                        {user?.name?.charAt(0).toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-72 rounded-xl border bg-background p-4 shadow-xl"
                        >
                            {/* Header */}
                            <Link
                                href={"/dashboard"}
                                className="group mb-4 flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-foreground/3 p-3 transition-all hover:border-primary/20 hover:bg-foreground/5"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <Avatar className="h-11 w-11 border">
                                        <AvatarImage
                                            src={user?.avatar}
                                            alt={user?.name || "User"}
                                        />

                                        <AvatarFallback className="font-semibold">
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1">
                                            <p className="truncate text-sm font-semibold">
                                                {user?.name}
                                            </p>
                                            {user?.isVerified && (
                                                <div className="bg-primary text-primary-foreground rounded-full">
                                                    <BadgeCheck className="h-3 w-3" />
                                                </div>
                                            )}
                                        </div>

                                        <p className="truncate text-xs text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground" />
                            </Link>

                            {/* Info */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-3.5 w-3.5" />
                                        Phone
                                    </span>

                                    <span className="font-medium">{user?.phone}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <Shield className="h-3.5 w-3.5" />
                                        Role
                                    </span>

                                    <span className="font-medium">{user?.role?.name}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 border-t pt-3">
                                <button
                                    onClick={handleLogOut}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
};

// ====================== Desktop Menu Item ======================
const DesktopMenuItem = ({ item }: { item: MenuItem }) => {
    const pathname = usePathname();
    const isActive = pathname === item.url;

    if (item.items) {
        return (
            <NavigationMenuItem>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title}>
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link
                    href={item.url}
                    className={clsx(
                        "group/nav relative px-3 py-2 uppercase font-medium text-background transition-all duration-300 hover:bg-background/10 hover:text-background focus:bg-transparent focus:text-background",
                        isActive &&
                        "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-full after:rounded-full after:bg-background/80 font-semibold text-background/80",
                    )}
                >
                    {item.title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

// ====================== Mobile Menu ======================
const MobileMenu = ({
    menu,
    authView,
    setAuthView,
    email,
    setEmail,
    isLoggedIn,
    user,
    handleLogOut,
}: any) => {
    return (
        <div className="block lg:hidden py-2">
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold">rent nest</p>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon">
                            <Menu className="size-4" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="overflow-y-auto lg:hidden">
                        <SheetHeader>
                            <SheetTitle>
                                <p className="text-xl font-bold">rent nest</p>
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-6 p-4">
                            <Accordion
                                type="single"
                                collapsible
                                className="flex w-full flex-col gap-4"
                            >
                                {menu.map((item: MenuItem) => (
                                    <MobileMenuItem key={item.title} item={item} />
                                ))}
                            </Accordion>

                            <AuthButtons
                                isLoggedIn={isLoggedIn}
                                user={user}
                                handleLogOut={handleLogOut}
                                authView={authView}
                                setAuthView={setAuthView}
                                email={email}
                                setEmail={setEmail}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

const MobileMenuItem = ({ item }: { item: MenuItem }) =>
    item.items ? (
        <AccordionItem value={item.title} className="border-b-0">
            <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                {item.title}
            </AccordionTrigger>
            <AccordionContent className="mt-2">
                {item.items.map((subItem) => (
                    <SubMenuLink key={subItem.title} item={subItem} />
                ))}
            </AccordionContent>
        </AccordionItem>
    ) : (
        <Link
            href={item.url}
            className="block text-md font-semibold py-3 px-1 hover:text-primary transition-colors"
        >
            {item.title}
        </Link>
    );

const SubMenuLink = ({ item }: { item: MenuItem }) => (
    <Link
        href={item.url}
        className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
    >
        {item.icon && <div className="text-foreground">{item.icon}</div>}
        <div>
            <div className="text-sm font-semibold">{item.title}</div>
            {item.description && (
                <p className="text-sm leading-snug text-muted-foreground">
                    {item.description}
                </p>
            )}
        </div>
    </Link>
);

export { Navbar };
