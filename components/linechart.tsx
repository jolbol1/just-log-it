'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CaloriesFull } from '@/types/models';

export function CardsMetric({ data }: { data: CaloriesFull[] }) {
  return (
    <Card className="mb-4 md:mb-10">
      <CardHeader>
        <CardTitle>Last 7 Entries</CardTitle>
        <CardDescription>
          Trend comparing daily weight fluctuations with calorie intake over the
          past seven entries.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          {data.length >= 7 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 10
                }}
              >
                <YAxis
                  yAxisId="left"
                  domain={['dataMin', 'dataMax + 50']}
                  hide={true}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={['dataMin', 'dataMax + 0.5']}
                  style={{ display: 'none' }}
                  hide={true}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-[hsl(var(--blue))]">
                                Calories
                              </span>
                              <span className="font-bold text-[hsl(var(--blue))]">
                                {payload[0].value}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-primary">
                                Weight
                              </span>
                              <span className="font-bold text-primary">
                                {payload[1].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  strokeWidth={2}
                  yAxisId="left"
                  dataKey="totalCalories"
                  activeDot={{
                    r: 6,
                    style: { fill: 'hsl(var(--blue))' }
                  }}
                  style={
                    {
                      stroke: 'hsl(var(--blue))'
                    } as React.CSSProperties
                  }
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  yAxisId="right"
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    style: { fill: 'hsl(var(--primary))' }
                  }}
                  style={
                    {
                      stroke: 'hsl(var(--primary))'
                    } as React.CSSProperties
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center align-middle h-full">
              <p className="text-center text-muted-foreground">
                Need {7 - data.length} more entries
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
