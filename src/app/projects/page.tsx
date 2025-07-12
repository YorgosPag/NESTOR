
import { getAllProjects } from "@/lib/data";
import { getContacts } from "@/lib/contacts-data";
import { ProjectsListClientPage } from "@/components/projects/projects-list-client-page";

export default async function ProjectsPage() {
    const [projects, contacts] = await Promise.all([
        getAllProjects(),
        getContacts(),
    ]);

    // We don't want to show "Quotation" projects in the main list
    const activeProjects = projects.filter(p => p.status !== 'Quotation');

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
           <ProjectsListClientPage projects={activeProjects} contacts={contacts} />
        </main>
    );
}
