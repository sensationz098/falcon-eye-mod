"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type departmentType = {
  name: string | null;
  count: number;
};
export default function BarCharts({ dep }: { dep: departmentType[] }) {
  console.log("HELLO", dep);
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Total Number of Employees </CardTitle>
        <CardDescription>Each Department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dep}
            layout="vertical"
            margin={{
              left: 30,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
            />

            <XAxis type="number" dataKey="count" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={5}>
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
