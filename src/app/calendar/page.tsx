
import { getAllProjects } from "@/lib/data";
import { CalendarView } from "@/components/calendar/calendar-view";
import type { Project } from "@/types";

export default async function CalendarPage() {
    const projects: Project[] = await getAllProjects();
    const events = projects
        .filter(p => p && p.interventions)
        .flatMap(project => 
            project.interventions
                .filter(i => i && i.stages)
                .flatMap(intervention => 
                    intervention.stages
                        .filter(s => s && s.deadline)
                        .map(stage => ({
                            date: new Date(stage.deadline),
                            title: stage.title,
                            projectTitle: project.title,
                            status: stage.status,
                            projectId: project.id,
                        }))
                )
        );

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Ημερολόγιο Προθεσμιών</h1>
                    <p className="text-muted-foreground">Μια οπτική επισκόπηση των προθεσμιών σε όλα τα έργα.</p>
                </div>
            </div>
            <CalendarView events={JSON.parse(JSON.stringify(events))} />
        </main>
    );
}
