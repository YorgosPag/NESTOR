"use client";

import type { MasterIntervention } from "@/lib/interventions-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type AdminClientPageProps = {
    masterInterventions: MasterIntervention[];
};

export function AdminClientPage({ masterInterventions }: AdminClientPageProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Κατάλογος Παρεμβάσεων</h1>
                    <p className="text-muted-foreground">
                        Διαχειριστείτε τις πρότυπες παρεμβάσεις και τα στάδιά τους.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2" />
                    Νέα Παρέμβαση
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Λίστα Παρεμβάσεων</CardTitle>
                    <CardDescription>
                        Εδώ μπορείτε να δείτε και να επεξεργαστείτε τις διαθέσιμες παρεμβάσεις που χρησιμοποιούνται στα έργα.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {masterInterventions.map((intervention) => (
                            <AccordionItem key={intervention.id} value={intervention.id}>
                                <AccordionTrigger className="text-lg font-medium">
                                    {intervention.name}
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 pl-4">
                                    <p className="text-muted-foreground">{intervention.description}</p>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Επεξεργασία Παρέμβασης</Button>
                                        <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Διαγραφή Παρέμβασης</Button>
                                    </div>

                                    <h4 className="font-semibold mt-6">Στάδια Παρέμβασης</h4>
                                    <ul className="space-y-3 list-disc pl-5">
                                        {intervention.stages.map((stage) => (
                                            <li key={stage.id}>
                                                <span className="font-medium">{stage.name}:</span>
                                                <span className="text-muted-foreground ml-2">{stage.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
