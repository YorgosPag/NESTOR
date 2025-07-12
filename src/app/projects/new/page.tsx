
import { CreateProjectForm } from "@/components/projects/create-project-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getContacts } from "@/lib/contacts-data";

export default async function NewProjectPage() {
    const contacts = await getContacts();
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="mx-auto grid w-full max-w-2xl gap-2">
                 <h1 className="text-3xl font-semibold">Δημιουργία Νέου Έργου</h1>
                 <p className="text-sm text-muted-foreground">Συμπληρώστε τις παρακάτω πληροφορίες για να δημιουργήσετε ένα νέο έργο.</p>
            </div>
            <div className="max-w-2xl mx-auto w-full mt-4">
                <CreateProjectForm contacts={contacts}/>
            </div>
        </main>
    )
}
