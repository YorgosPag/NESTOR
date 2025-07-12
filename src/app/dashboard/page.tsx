import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Briefcase, FileText, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
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
            <div className="text-4xl font-bold">€23,700</div>
            <p className="text-xs text-muted-foreground">Σε 2 ενεργά έργα</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Έργα εντός Χρονοδιαγράμματος</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">από σύνολο 2 ενεργών</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Έργα σε Καθυστέρηση</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground">Απαιτούν προσοχή</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Προσφορές σε εκκρεμότητα</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1</div>
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
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Προσεχείς Προθεσμίες</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                <div>
                  <p className="font-medium">Παραγγελία Κουφωμάτων</p>
                  <p className="text-sm text-muted-foreground">σε 5 ημέρες</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                <div>
                  <p className="font-medium">Εγκατάσταση Αντλίας</p>
                  <p className="text-sm text-muted-foreground">σε 12 ημέρες</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Recent Projects & Offers */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Πρόσφατα Ενεργά Έργα</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ανακαίνιση στο Μαρούσι</CardTitle>
                <CardDescription>Ιωάννης Παπαδόπουλος</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Πρόοδος</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">€14,200</span>
                <Button variant="outline" size="sm">Προβολή</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Αναβάθμιση στην Πάτρα</CardTitle>
                <CardDescription>Μαρία Γεωργίου</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Πρόοδος</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <Progress value={25} />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">€9,500</span>
                <Button variant="outline" size="sm">Προβολή</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div>
           <h2 className="text-2xl font-semibold tracking-tight">Πρόσφατες Προσφορές</h2>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Προσφορά για Νέα Κατοικία</CardTitle>
                  <CardDescription>Ιωάννης Παπαδόπουλος</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Πρόοδος</span>
                    <span className="text-sm font-medium">0%</span>
                  </div>
                  <Progress value={0} />
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                   <span className="text-lg font-bold">€25,000</span>
                   <Button variant="outline" size="sm">Προβολή</Button>
                </CardFooter>
              </Card>
           </div>
        </div>
      </section>
    </main>
  );
}
