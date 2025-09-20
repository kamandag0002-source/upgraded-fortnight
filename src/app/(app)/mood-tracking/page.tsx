"use client";

import { AppHeader } from "@/components/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useAppContext } from "@/hooks/use-app-context";
import { format } from "date-fns";
import type { Mood } from "@/lib/types";

const moodToValue: Record<Mood, number> = {
  Sad: 1,
  Anxious: 2,
  Neutral: 3,
  Calm: 4,
  Happy: 5,
};

const valueToMood: Record<number, Mood> = {
  1: "Sad",
  2: "Anxious",
  3: "Neutral",
  4: "Calm",
  5: "Happy",
};

export default function MoodTrackingPage() {
  const { moodHistory } = useAppContext();

  const chartData = moodHistory.map((record) => ({
    time: format(record.timestamp, "HH:mm"),
    date: format(record.timestamp, "MMM d"),
    moodValue: moodToValue[record.mood],
    energyLevel: record.energyLevel,
  }));

  const chartConfig = {
    mood: {
      label: "Mood",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader
        title="Mood Tracking"
        description="Visualize your emotional journey through the day."
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6 pt-0">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Mood Over Time</CardTitle>
            <CardDescription>
              This chart shows your mood for the current session.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {moodHistory.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    domain={[0, 6]}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(value) => valueToMood[value] || ""}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <Tooltip
                    cursor={{ stroke: "hsl(var(--accent))", strokeWidth: 2, strokeDasharray: "3 3" }}
                    content={<ChartTooltipContent 
                      formatter={(value) => `${valueToMood[value as number]}`}
                      labelFormatter={(label, payload) => {
                        if(payload && payload[0]) {
                          return `${payload[0].payload.date}, ${label}`
                        }
                        return label;
                      }}
                    />}
                  />
                  <Line
                    dataKey="moodValue"
                    type="monotone"
                    stroke="var(--color-mood)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-mood)",
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <p className="text-lg text-muted-foreground">No mood data recorded yet.</p>
                <p>Complete a daily check-in to start tracking your mood.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
