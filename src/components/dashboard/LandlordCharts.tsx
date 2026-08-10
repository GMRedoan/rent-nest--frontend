"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

interface LandlordChartsProps {
    propertyStatusData: {
        status: string;
        count: number;
    }[];

    requestData: {
        month: string;
        requests: number;
    }[];
}

const propertyChartConfig = {
    count: {
        label: "Properties",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

const requestChartConfig = {
    requests: {
        label: "Requests",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export default function LandlordCharts({
    propertyStatusData,
    requestData,
}: LandlordChartsProps) {
    return (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">

            {/* Property Status */}
            <Card className="rounded-3xl">
                <CardHeader className="pt-4">
                    <CardTitle>Property Overview</CardTitle>

                    <p className="text-sm text-muted-foreground">
                        Current status of your properties
                    </p>
                </CardHeader>

                <CardContent>
                    <ChartContainer
                        config={propertyChartConfig}
                        className="min-h-70 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={propertyStatusData}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="status"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                            />

                            <YAxis
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                            />

                            <ChartTooltip
                                content={<ChartTooltipContent />}
                            />

                            <Bar
                                dataKey="count"
                                fill="var(--color-count)"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Rental Requests */}
            <Card className="rounded-3xl">
                <CardHeader className="pt-4">
                    <CardTitle>Rental Requests</CardTitle>

                    <p className="text-sm text-muted-foreground">
                        Rental requests received over the last 6 months
                    </p>
                </CardHeader>

                <CardContent>
                    <ChartContainer
                        config={requestChartConfig}
                        className="min-h-70 w-full"
                    >
                        <LineChart data={requestData}>
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                            />

                            <ChartTooltip
                                content={<ChartTooltipContent />}
                            />

                            <Line
                                type="monotone"
                                dataKey="requests"
                                stroke="var(--color-requests)"
                                strokeWidth={3}
                                dot={{
                                    fill: "var(--color-requests)",
                                    r: 4,
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

        </div>
    );
}