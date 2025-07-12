
"use client";

import * as React from 'react';
import { addDays, format, startOfMonth } from 'date-fns';
import { el } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StageStatus } from '@/types';
import Link from 'next/link';

type CalendarEvent = {
    date: Date;
    title: string;
    projectTitle: string;
    status: StageStatus;
    projectId: string;
}

type CalendarViewProps = {
    events: CalendarEvent[];
};

export function CalendarView({ events }: CalendarViewProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(new Date()));

    const eventsByDate = React.useMemo(() => {
        return events.reduce((acc, event) => {
            const day = format(new Date(event.date), 'yyyy-MM-dd');
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push(event);
            return acc;
        }, {} as Record<string, CalendarEvent[]>);
    }, [events]);

    const selectedDayEvents = React.useMemo(() => {
        if (!date) return [];
        const day = format(date, 'yyyy-MM-dd');
        return eventsByDate[day] || [];
    }, [date, eventsByDate]);

    const statusVariantMap: Record<StageStatus, "default" | "secondary" | "destructive"> = {
        'pending': 'secondary',
        'in progress': 'default',
        'completed': 'secondary', // Or a different color like green if you add it to variants
        'failed': 'destructive'
    };
    
    const statusTextMap: Record<StageStatus, string> = {
        'pending': 'Σε αναμονή',
        'in progress': 'Σε εξέλιξη',
        'completed': 'Ολοκληρωμένο',
        'failed': 'Απέτυχε'
    };

    const DayContent = (dayProps: { date: Date }) => {
        const day = format(dayProps.date, 'yyyy-MM-dd');
        const dailyEvents = eventsByDate[day];
        if (dailyEvents && dailyEvents.length > 0) {
            return (
                <div className="relative h-full w-full">
                    {dayProps.date.getDate()}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-0.5">
                       {dailyEvents.slice(0, 2).map((event, index) => (
                          <div key={index} className={cn(
                               "h-1.5 w-1.5 rounded-full",
                               event.status === 'completed' && 'bg-green-500',
                               event.status === 'in progress' && 'bg-blue-500',
                               event.status === 'pending' && 'bg-gray-400',
                               event.status === 'failed' && 'bg-red-500',
                               new Date(event.date) < new Date() && event.status !== 'completed' && 'bg-yellow-500'
                           )} />
                       ))}
                    </div>
                </div>
            );
        }
        return <div>{dayProps.date.getDate()}</div>;
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        locale={el}
                        className="p-4"
                        classNames={{
                            day_today: 'bg-accent/50',
                        }}
                        components={{
                            Day: DayContent
                        }}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {date ? format(date, 'd MMMM yyyy', { locale: el }) : 'Επιλέξτε Ημερομηνία'}
                    </CardTitle>
                    <CardDescription>
                        Προθεσμίες για την επιλεγμένη ημέρα.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedDayEvents.length > 0 ? (
                        <ul className="space-y-4">
                            {selectedDayEvents.map((event, index) => (
                                <li key={index} className="flex flex-col p-3 bg-muted/50 rounded-lg">
                                    <Link href={`/project/${event.projectId}`} className="font-semibold hover:underline">{event.title}</Link>
                                    <p className="text-sm text-muted-foreground">{event.projectTitle}</p>
                                    <Badge variant={statusVariantMap[event.status]} className="mt-2 w-fit">{statusTextMap[event.status]}</Badge>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">Δεν υπάρχουν προθεσμίες για αυτήν την ημέρα.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
