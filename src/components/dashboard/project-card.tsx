
"use client";

import type { Project, Contact } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  contacts: Contact[];
}

const statusVariantMap: Record<Project['status'], "default" | "secondary" | "destructive"> = {
  'On Track': 'default',
  'Delayed': 'destructive',
  'Completed': 'secondary',
  'Quotation': 'secondary',
};

const getInitials = (name: string = '') => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export function ProjectCard({ project, contacts }: ProjectCardProps) {
  const owner = contacts.find((c) => c.id === project.ownerId);

  const totalStages = project.interventions.reduce((sum, i) => sum + i.stages.length, 0);
  const completedStages = project.interventions.reduce((sum, i) => 
      sum + i.stages.filter(s => s.status === 'completed').length, 
  0);
  const progress = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
            <Badge variant={statusVariantMap[project.status]}>{project.status}</Badge>
        </div>
        <CardDescription className="flex items-center gap-2 pt-2">
            <Avatar className="h-6 w-6">
                <AvatarImage src={owner?.avatarUrl} alt={owner?.name} />
                <AvatarFallback>{getInitials(owner?.name)}</AvatarFallback>
            </Avatar>
            <span>{owner?.name || 'Άγνωστος'}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
         <div className="text-sm text-muted-foreground">
            Πρόοδος: {completedStages} / {totalStages} Στάδια
         </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm">
            <span className="text-muted-foreground">Προυπ/σμός: </span>
            <span className="font-bold">€{project.budget.toLocaleString('el-GR')}</span>
        </div>
        <Button asChild variant="outline" size="sm">
            <Link href={`/projects/${project.id}`}>Προβολή</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
