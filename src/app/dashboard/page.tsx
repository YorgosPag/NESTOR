import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart, Briefcase, FileText, AlertTriangle } from "lucide-react";

// This is a temporary, static dashboard page.
// In a real application, you would fetch dynamic data here.
// For example:
// import { getProjects } from '@/lib/firebase/firestore';
// const projects = await getProjects();

export default function DashboardPage() {
  const projects = [
    { id: '1', name: 'Ανακαίνιση στο Μαρούσι', client: 'Ιωάννης Παπαδόπουλος', budget: 14200, progress: 75, status: 'On Track' },
    { id: '2', name: 'Αναβάθμιση στην Πάτρα', client: 'Μαρία Γεωργίου', budget: 9500, progress: 25, status: 'Delayed' },
  ];
  const offers = [
    { id: '3', name: 'Προσφορά για Νέα Κατοικία', client: 'Ιωάννης Παπαδόπουλος', budget: 25000, progress: 0, status: 'Quotation' }
  ];
  const upcomingDeadlines = [
    { task: 'Παραγγελία Κουφωμάτων', dueIn: '5 ημέρες' },
    { task: 'Εγκατάσταση Αντλίας', dueIn: '12 ημέρες' },
  ];

  const activeProjects = projects.filter(p => p.status === 'On Track' || p.status === 'Delayed');
  const onTrackProjects = projects.filter(p => p.status === 'On Track');
  const delayedProjects = projects.filter(p => p.status === 'Delayed');
  const pendingOffers = offers.filter(o => o.status === 'Quotation');
  
  const totalBudget = activeProjects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Πίνακας Ελέγχou</h1>
          <p className="text-muted-foreground">
            Μια γενική επισκόπηση της κατάστασης των έργων και των προσφορών σας.
          </p>
        </div>
        <Button>Δημιουργία Έργου/Προσφοράς</Button>
      </div>

      {/* KPI Grid */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Συνολικός Προϋπολογισμός (Ενεργά)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">€{totalBudget.toLocaleString('el-GR')}</div>
            <p className="text-xs text-muted-foreground">Σε {activeProjects.length} ενεργά έργα</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Έργα εντός Χρονοδιαγράμματος</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{onTrackProjects.length}</div>
            <p className="text-xs text-muted-foreground">από σύνολο {activeProjects.length} ενεργών</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Έργα σε Καθυστέρηση</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-destructive">{delayedProjects.length}</div>
            <p className="text-xs text-muted-foreground">Απαιτούν προσοχή</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Προσφορές σε εκκρεμότητα</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{pendingOffers.length}</div>
            <p className="text-xs text-muted-foreground">Αναμένουν έγκριση</p>
          </CardContent>
        </Card>
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Επισκόπηση Προϋπολογισμού</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
              <BarChart className="h-12 w-12 text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">Το γράφημα θα υλοποιηθεί σε επόμενο βήμα</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Προσεχείς Προθεσμίες</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <p className="font-medium">{deadline.task}</p>
                    <p className="text-sm text-muted-foreground">{deadline.dueIn}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Recent Projects & Offers */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Πρόσφατα Ενεργά Έργα</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            {activeProjects.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <CardDescription>{project.client}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Πρόοδος</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-lg font-bold">€{project.budget.toLocaleString('el-GR')}</span>
                  <Button variant="outline" size="sm">Προβολή</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
           <h2 className="text-2xl font-semibold tracking-tight">Πρόσφατες Προσφορές</h2>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
              {pendingOffers.map(offer => (
                <Card key={offer.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{offer.name}</CardTitle>
                    <CardDescription>{offer.client}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Κατάσταση</span>
                      <span className="text-sm font-medium">Σε προσφορά</span>
                    </div>
                    <Progress value={0} />
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                     <span className="text-lg font-bold">€{offer.budget.toLocaleString('el-GR')}</span>
                     <Button variant="outline" size="sm">Προβολή</Button>
                  </CardFooter>
                </Card>
              ))}
           </div>
        </div>
      </section>
    </main>
  );
}
