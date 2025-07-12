
"use client";

import type { Project, Contact } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/dashboard/project-card";

interface ProjectsListClientPageProps {
  projects: Project[];
  contacts: Contact[];
}

export function ProjectsListClientPage({ projects, contacts }: ProjectsListClientPageProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Λίστα Έργων</h1>
          <p className="text-muted-foreground">
            Περιηγηθείτε και διαχειριστείτε όλα τα ενεργά σας έργα.
          </p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Δημιουργία Έργου
          </Link>
        </Button>
      </div>
      
      {projects.length > 0 ? (
        <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} contacts={contacts} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    Δεν βρέθηκαν ενεργά έργα
                </h3>
                <p className="text-sm text-muted-foreground">
                    Ξεκινήστε δημιουργώντας το πρώτο σας έργο.
                </p>
                <Button className="mt-4" asChild>
                   <Link href="/projects/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Δημιουργία Έργου
                    </Link>
                </Button>
            </div>
        </div>
      )}
    </>
  );
}
