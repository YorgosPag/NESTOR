"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface OverviewChartProps {
    data: { name: string; total: number }[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <Card className="lg:col-span-4">
        <CardHeader>
            <CardTitle>Επισκόπηση Προϋπολογισμού</CardTitle>
            <CardDescription>
                Συγκεντρωτικός προϋπολογισμός ανά κατάσταση έργου.
            </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `€${new Intl.NumberFormat('el-GR').format(value as number)}`}
                />
                 <Tooltip 
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                 />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  )
}
