import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, Construction } from "lucide-react";

// This is a temporary, static dashboard page.
// In a real application, you would fetch dynamic data here.
// For example:
// import { getProjects } from '@/lib/firebase/firestore';
// const projects = await getProjects();

export default function DashboardPage() {
    const kpis = [
        { title: "Έργα", value: "12", icon: Briefcase },
        { title: "Προσφορές", value: "4", icon: FileText },
        { title: "Παρεμβάσεις", value: "89", icon: Construction },
    ];

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Πίνακας Ελέγχou</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {kpis.map((kpi) => (
                    <Card key={kpi.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {kpi.title}
                            </CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Πρόσφατα Ενεργά Έργα</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Placeholder for recent projects list.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Προσεχείς Εργασίες</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p>Placeholder for upcoming tasks.</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
