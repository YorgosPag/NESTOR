import { DashboardClientPage } from "@/components/dashboard/dashboard-client-page";

// This is a temporary, static dashboard page.
// In a real application, you would fetch dynamic data here.
// For example:
// import { getProjects } from '@/lib/firebase/firestore';
// const projects = await getProjects();
// const contacts = await getContacts();

const mockProjects = [
    { id: '1', name: 'Ανακαίνιση στο Μαρούσι', client: 'Ιωάννης Παπαδόπουλος', budget: 14200, progress: 75, status: 'On Track' as const },
    { id: '2', name: 'Αναβάθμιση στην Πάτρα', client: 'Μαρία Γεωργίου', budget: 9500, progress: 25, status: 'Delayed' as const },
    { id: '3', name: 'Προσφορά για Νέα Κατοικία', client: 'Γιώργος Νικολάου', budget: 25000, progress: 0, status: 'Quotation' as const },
];

const mockContacts = [];


export default async function DashboardPage() {
    // In a real app, you would fetch your data here
    const projects = mockProjects;
    const contacts = mockContacts;

    return <DashboardClientPage projects={projects} contacts={contacts} />;
}
