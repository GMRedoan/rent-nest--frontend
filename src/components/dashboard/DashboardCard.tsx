"use client";

import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    subtitle?: string;
}

export default function DashboardCard({
    title,
    value,
    icon,
    subtitle,
}: DashboardCardProps) {
    return (
        <Card className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold tracking-tight">
                        {value}
                    </h3>

                    {subtitle && (
                        <p className="mt-2 text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    {icon}
                </div>
            </CardContent>

            <div className="flex items-center justify-end px-6 pb-4 text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                Overview
            </div>
        </Card>
    );
}