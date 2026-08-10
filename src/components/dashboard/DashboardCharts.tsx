/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Animate from "@/components/reusable/Animate";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#9333ea", "#0d9488", "#e11d48"];

type MonthlyPoint = { month: string; requests: number };
type CategoryPoint = { name: string; properties: number };
type StatusPoint = { name: string; value: number };

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border bg-card px-3 py-2 shadow-lg">
            {label && (
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                    {label}
                </p>
            )}
            {payload.map((item: any) => (
                <p key={item.dataKey ?? item.name} className="text-sm font-semibold">
                    <span
                        className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                        style={{ backgroundColor: item.color ?? item.fill }}
                    />
                    {item.name}: {item.value}
                </p>
            ))}
        </div>
    );
}

export default function DashboardCharts({
    monthlyRequests,
    categoryBreakdown,
    statusBreakdown,
}: {
    monthlyRequests: MonthlyPoint[];
    categoryBreakdown: CategoryPoint[];
    statusBreakdown: StatusPoint[];
}) {
    const totalStatus = statusBreakdown.reduce((sum, s) => sum + s.value, 0);

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Rental requests trend — Line chart */}
            <Animate type="fadeUp">
                <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Rental Requests Trend</h3>
                            <p className="text-sm text-muted-foreground">
                                Requests received over the last 6 months
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 h-70 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyRequests} margin={{ left: -20, right: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "currentColor" }}
                                    className="text-muted-foreground"
                                />
                                <YAxis
                                    allowDecimals={false}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "currentColor" }}
                                    className="text-muted-foreground"
                                />
                                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#f97316", strokeWidth: 1, strokeDasharray: "4 4" }} />
                                <Line
                                    type="monotone"
                                    dataKey="requests"
                                    name="Requests"
                                    stroke="#f97316"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#f97316" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Animate>

            {/* Rental status breakdown — Pie chart */}
            <Animate type="fadeUp" delay={0.1}>
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-bold">Request Status</h3>
                    <p className="text-sm text-muted-foreground">
                        Breakdown by current status
                    </p>
                    <div className="mt-4 h-58 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusBreakdown}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={3}
                                >
                                    {statusBreakdown.map((entry, index) => (
                                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                                    ))}
                                </Pie>
                                <Tooltip content={<ChartTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-2 space-y-2">
                        {statusBreakdown.map((entry, index) => (
                            <div key={entry.name} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <span
                                        className="h-2.5 w-2.5 rounded-full"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    {entry.name}
                                </span>
                                <span className="font-medium text-muted-foreground">
                                    {totalStatus ? Math.round((entry.value / totalStatus) * 100) : 0}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Animate>

            {/* Properties by category — Bar chart */}
            <Animate type="fadeUp" delay={0.15}>
                <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-3">
                    <h3 className="text-lg font-bold">Properties by Category</h3>
                    <p className="text-sm text-muted-foreground">
                        Distribution of listed properties across categories
                    </p>
                    <div className="mt-6 h-65 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryBreakdown} margin={{ left: -20, right: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "currentColor" }}
                                    className="text-muted-foreground"
                                />
                                <YAxis
                                    allowDecimals={false}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "currentColor" }}
                                    className="text-muted-foreground"
                                />
                                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(37, 99, 235, 0.08)" }} />
                                <Legend />
                                <Bar dataKey="properties" name="Properties" radius={[6, 6, 0, 0]}>
                                    {categoryBreakdown.map((entry, index) => (
                                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Animate>
        </div>
    );
}