"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", male: 186, female: 80 },
    { month: "February", male: 305, female: 200 },
    { month: "March", male: 237, female: 120 },
    { month: "April", male: 73, female: 190 },
    { month: "May", male: 209, female: 130 },
    { month: "June", male: 214, female: 140 },
    { month: "July", male: 250, female: 160 },
    { month: "August", male: 270, female: 180 },
    { month: "September", male: 290, female: 200 },
    { month: "October", male: 310, female: 220 },
    { month: "November", male: 330, female: 240 },
    { month: "December", male: 350, female: 260 },
]

const chartConfig = {
    male: {
        label: "Male",
        color: "blue",
    },
    female: {
        label: "Female",
        color: "red",
    },
} satisfies ChartConfig

export function ChartStudent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Male vs Female</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="male" fill="var(--color-male)" radius={4} />
                        <Bar dataKey="female" fill="var(--color-female)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 12 months
                </div>
            </CardFooter>
        </Card>
    )
}
