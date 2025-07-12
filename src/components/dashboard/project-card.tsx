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
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  project: Project;
  contacts: Contact[];
}

const statusVariantMap: Record<Project['status'], "default" | "secondary" | "destructive" | "outline"> = {
  'On Track': 'default',
  'Delayed': 'destructive',
  'Completed': 'secondary',
  'Quotation': 'outline',
};

const statusTextMap: Record<Project['status'], string> = {
    'On Track': 'Σε εξέλιξη',
    'Delayed': 'Σε καθυστέρηση',
    'Completed': 'Ολοκληρωμένο',
    'Quotation': 'Προσφορά',
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

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base leading-tight font-semibold">{project.title}</CardTitle>
            <Badge variant={statusVariantMap[project.status]} className="flex-shrink-0">{statusTextMap[project.status]}</Badge>
        </div>
        {owner && (
            <CardDescription className="flex items-center gap-2 pt-1">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={owner?.avatarUrl} alt={owner?.name} />
                    <AvatarFallback>{getInitials(owner?.name)}</AvatarFallback>
                </Avatar>
                <span>{owner?.name}</span>
            </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
         {project.status !== 'Quotation' && (
           <>
             <div className="text-xs text-muted-foreground mb-1">
                Πρόοδος: {project.progress}%
             </div>
             <Progress value={project.progress} className="h-2" />
           </>
         )}
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
