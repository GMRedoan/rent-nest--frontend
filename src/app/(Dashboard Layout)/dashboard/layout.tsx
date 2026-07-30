import DashboardNavbar from "@/components/dashboard/dashboardNavbar";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset>
                <DashboardNavbar />

                <main className="flex-1 p-6 bg-muted/30 min-h-screen">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}