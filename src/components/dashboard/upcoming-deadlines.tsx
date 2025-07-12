"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Contact } from '@/types';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { el } from 'date-fns/locale';
import { AlertTriangle, CalendarClock } from 'lucide-react';

interface Deadline {
    projectId: string;
    projectTitle: string;
    stageId: string;
    stageTitle: string;
    deadline: string;
    assigneeContactId?: string;
}

interface UpcomingDeadlinesProps {
    deadlines: Deadline[];
    contacts: Contact[];
}

const getInitials = (name: string = '') => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export function UpcomingDeadlines({ deadlines, contacts }: UpcomingDeadlinesProps) {
    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarClock className="h-5 w-5" />
                    Προσεχείς Προθεσμίες
                </CardTitle>
                <CardDescription>
                    Οι 5 πιο κοντινές προθεσμίες στα ενεργά έργα σας.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {deadlines.length > 0 ? (
                    <ul className="space-y-4">
                        {deadlines.map((deadline) => {
                            const assignee = contacts.find(c => c.id === deadline.assigneeContactId);
                            const distance = formatDistanceToNow(parseISO(deadline.deadline), { addSuffix: true, locale: el });
                            return (
                                <li key={deadline.stageId} className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                                    <div className="flex-grow">
                                        <Link href={`/projects/${deadline.projectId}`} className="font-semibold hover:underline">
                                            {deadline.stageTitle}
                                        </Link>
                                        <p className="text-sm text-muted-foreground">{deadline.projectTitle}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-sm font-medium text-primary">{distance}</p>
                                            {assignee && (
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                     <Avatar className="h-5 w-5">
                                                        <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                                                        <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{assignee.name.split(' ')[0]}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        Δεν υπάρχουν προσεχείς προθεσμίες.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
