
import { getAllProjects } from "@/lib/data";
import { getContacts } from "@/lib/contacts-data";
import { DashboardClientPage } from "@/components/dashboard/dashboard-client-page";

export default async function DashboardPage() {
  const [projects, contacts] = await Promise.all([
    getAllProjects(),
    getContacts(),
  ]);

  return <DashboardClientPage projects={projects} contacts={contacts} />;
}
