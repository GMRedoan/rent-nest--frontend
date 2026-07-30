/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import { Home, LogOut } from "lucide-react";
import { sidebarItems } from "./sidebarMenu";
import { useAuth } from "@/provider/AuthProvider";
import { MdOutlineBroadcastOnHome } from "react-icons/md";
import { Toast } from "../reusable/toast";
import Swal from "sweetalert2";
import { logoutAction } from "@/server/auth/auth.service";

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { state } = useSidebar();
    const collapsed = state === "collapsed";
    const { user, setUser } = useAuth();
    const items =
        sidebarItems[user?.role as keyof typeof sidebarItems] ?? [];
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
                setUser(null);
                Swal.fire({
                    icon: "success",
                    title: "Logout successful",
                    text: "You have been logged out successfully",
                    confirmButtonColor: "#4CAF50"
                })
            } catch (error: any) {
                Toast({
                    icon: "error",
                    title: error?.message || "Logout failed",
                });
            }
        };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="mb-12">
                <Link
                    href="/"
                    className="flex h-11.5 items-center justify-center transition-colors duration-300 hover:text-primary"
                >
                    {collapsed ? (
                        <MdOutlineBroadcastOnHome size={26} />
                    ) : (
                        <span className="text-2xl font-bold">
                            Rent Nest
                        </span>
                    )}
                </Link>
                {
                    collapsed ? (""): (<div><h1 className = "text-center">{user?.role} DASHBOARD</h1></div>
)
                }
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>

                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>

                                            <SidebarMenuButton
                                                asChild
                                                isActive={
                                                    pathname === item.href
                                                }
                                            >
                                                <Link href={item.href}>
                                                    <item.icon />
                                                    <span>
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>

                                        </TooltipTrigger>

                                        <TooltipContent
                                            side="right"
                                        >
                                            {item.title}
                                        </TooltipContent>

                                    </Tooltip>

                                </TooltipProvider>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>

                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="hover:text-red-500 cursor-pointer transition-all duration-300 flex justify-center" onClick={handleLogOut}>
                             <LogOut />
                             <span>
                                Logout
                            </span>

                        </SidebarMenuButton>

                    </SidebarMenuItem>

                </SidebarMenu>

            </SidebarFooter>
        </Sidebar>
    );
}