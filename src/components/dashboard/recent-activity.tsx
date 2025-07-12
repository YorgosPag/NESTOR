
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { AuditLog } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { el } from "date-fns/locale";

interface RecentActivityProps {
    logs: AuditLog[];
}

const getInitials = (name: string = 'S') => {
    if (name === 'System') return 'SY';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export function RecentActivity({ logs }: RecentActivityProps) {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Πρόσφατη Δραστηριότητα</CardTitle>
        <CardDescription>
            Οι τελευταίες 5 ενέργειες που καταγράφηκαν στο σύστημα.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {logs.map(log => (
             <div key={log.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/avatars/${log.user}.png`} alt={log.user} />
                  <AvatarFallback>{getInitials(log.user)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <span className="font-bold">{log.user}</span>: {log.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                     {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true, locale: el })}
                  </p>
                </div>
              </div>
          ))}
          {logs.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">Δεν υπάρχει πρόσφατη δραστηριότητα.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
