
"use client";

import type { Project, MasterIntervention, Contact, Stage, StageStatus } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { format, parseISO } from 'date-fns';
import { el } from 'date-fns/locale';
import { AlertTriangle, CheckCircle, FileText, Loader, Info, PlusCircle, BotMessageSquare, Pencil } from 'lucide-react';
import React from "react";
// import { generateReminder, type GenerateReminderOutput } from "@/ai/flows/ai-smart-reminders";
import { useToast } from "@/hooks/use-toast";

const statusVariantMap: Record<Project['status'], "default" | "secondary" | "destructive"> = {
  'On Track': 'default',
  'Delayed': 'destructive',
  'Completed': 'secondary',
  'Quotation': 'secondary',
};

const stageStatusIconMap: Record<StageStatus, React.ElementType> = {
    'pending': Info,
    'in progress': Loader,
    'completed': CheckCircle,
    'failed': AlertTriangle
};

const stageStatusColorMap: Record<StageStatus, string> = {
    'pending': 'text-gray-500',
    'in progress': 'text-blue-500 animate-spin',
    'completed': 'text-green-500',
    'failed': 'text-red-500'
};

const getInitials = (name: string = '') => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

type StageCardProps = {
  stage: Stage;
  contacts: Contact[];
  project: Project;
};

function StageCard({ stage, contacts, project }: StageCardProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  // const [reminder, setReminder] = React.useState<GenerateReminderOutput | null>(null);
  const { toast } = useToast();

  const assignee = contacts.find(c => c.id === stage.assignee);
  const Icon = stageStatusIconMap[stage.status];
  const iconColor = stageStatusColorMap[stage.status];
  
  const handleGenerateReminder = async () => {
    setIsLoading(true);
    // setReminder(null);
    toast({
        title: "Coming Soon!",
        description: "Η λειτουργία έξυπνης υπενθύμισης δεν είναι ακόμα διαθέσιμη."
    });
    setIsLoading(false);
    // try {
    //   const result = await generateReminder({
    //     projectName: project.title,
    //     stageName: stage.title,
    //     deadline: stage.deadline,
    //     status: stage.status,
    //     lastUpdated: stage.lastUpdated,
    //     notes: stage.notes
    //   });
    //   setReminder(result);
    // } catch (error) {
    //   console.error("Failed to generate reminder:", error);
    //   toast({
    //     variant: "destructive",
    //     title: "Σφάλμα",
    //     description: "Δεν ήταν δυνατή η δημιουργία της υπενθύμισης."
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="p-4 border rounded-lg bg-card flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${iconColor}`} />
            <div>
                <h4 className="font-semibold text-lg">{stage.title}</h4>
                <p className="text-sm text-muted-foreground">
                    Προθεσμία: {format(parseISO(stage.deadline), 'dd/MM/yyyy')}
                </p>
            </div>
        </div>
        <Badge variant={stage.status === 'completed' ? 'secondary' : 'default'}>
            {stage.status}
        </Badge>
      </div>

      <div className="pl-9 space-y-4">
        {assignee && (
            <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Ανάδοχος:</span>
                <Avatar className="h-6 w-6">
                    <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                    <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{assignee.name}</span>
            </div>
        )}
        
        {stage.notes && (
            <p className="text-sm text-muted-foreground bg-amber-50 border border-amber-200 rounded-md p-2">
                <span className="font-semibold">Σημειώσεις:</span> {stage.notes}
            </p>
        )}

        {stage.attachments.length > 0 && (
            <div>
                <h5 className="text-sm font-medium mb-2">Συνημμένα</h5>
                <ul className="flex flex-col gap-2">
                    {stage.attachments.map(file => (
                        <li key={file.id}>
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                <FileText className="h-4 w-4" />
                                {file.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleGenerateReminder} disabled={isLoading}>
                {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <BotMessageSquare className="mr-2 h-4 w-4" />}
                Έξυπνη Υπενθύμιση
            </Button>
            <Button variant="ghost" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Επεξεργασία
            </Button>
        </div>

        {/* {reminder && (
             <Alert variant={reminder.urgencyLevel === 'high' ? 'destructive' : 'default'}>
              <BotMessageSquare className="h-4 w-4" />
              <AlertTitle>{reminder.reminder}</AlertTitle>
              <AlertDescription className="space-y-2 mt-2">
                <p><strong>Αξιολόγηση Κινδύνου:</strong> {reminder.riskAssessment}</p>
                <div>
                    <strong>Προτεινόμενα Επόμενα Βήματα:</strong>
                    <ul className="list-disc pl-5">
                       {reminder.suggestedNextSteps.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                </div>
              </AlertDescription>
            </Alert>
        )} */}
      </div>
    </div>
  );
}


export function ProjectDetails({ project, masterInterventions, contacts }: { project: Project, masterInterventions: MasterIntervention[], contacts: Contact[] }) {
    const owner = contacts.find(c => c.id === project.ownerId);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                    <div className="flex items-center gap-4 mt-2">
                       {owner && (
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={owner.avatarUrl} alt={owner.name} />
                                <AvatarFallback>{getInitials(owner.name)}</AvatarFallback>
                            </Avatar>
                            <span>{owner.name}</span>
                         </div>
                       )}
                       <Badge variant={statusVariantMap[project.status]} className="text-base px-3 py-1">{project.status}</Badge>
                    </div>
                </div>
                <div className="flex gap-2">
                   <Button>
                     <PlusCircle className="mr-2" />
                     Προσθήκη Παρέμβασης
                   </Button>
                </div>
            </header>
            
            <Separator />

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-semibold">Παρεμβάσεις & Στάδια</h2>
                    {project.interventions.length > 0 ? (
                        <Accordion type="multiple" defaultValue={project.interventions.map(i => i.id)} className="w-full space-y-4">
                            {project.interventions.map(intervention => (
                                <Card key={intervention.id} className="overflow-hidden">
                                  <AccordionItem value={intervention.id} className="border-b-0">
                                      <AccordionTrigger className="bg-muted/50 px-6 py-4 text-xl font-semibold hover:no-underline">
                                        {intervention.title}
                                      </AccordionTrigger>
                                      <AccordionContent className="p-6 pt-2 space-y-4">
                                          {intervention.stages.map(stage => (
                                              <StageCard key={stage.id} stage={stage} contacts={contacts} project={project} />
                                          ))}
                                      </AccordionContent>
                                  </AccordionItem>
                                </Card>
                            ))}
                        </Accordion>
                    ) : (
                        <Card className="flex items-center justify-center p-12 bg-muted/30">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold">Δεν υπάρχουν παρεμβάσεις</h3>
                                <p className="text-muted-foreground mt-1">Προσθέστε την πρώτη παρέμβαση για να ξεκινήσετε.</p>
                                <Button className="mt-4">
                                    <PlusCircle className="mr-2" />
                                    Προσθήκη Παρέμβασης
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar Info */}
                <aside className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Σύνοψη Έργου</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Προϋπολογισμός</span>
                                <span className="font-bold text-lg">€{project.budget.toLocaleString('el-GR')}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Ημ/νία Δημιουργίας</span>
                                <span className="font-medium">{format(parseISO(project.createdAt), 'dd MMMM yyyy', { locale: el })}</span>
                            </div>
                        </CardContent>
                    </Card>
                    
                    {project.auditLog && project.auditLog.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Δραστηριότητα</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                  {project.auditLog.slice(0, 5).map(log => (
                                    <li key={log.id} className="flex items-start gap-3 text-sm">
                                      <Avatar className="h-8 w-8 mt-1">
                                         <AvatarImage src={`/avatars/${log.user}.png`} alt={log.user} />
                                         <AvatarFallback>{getInitials(log.user)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p><span className="font-semibold">{log.user}</span>: {log.action}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {format(parseISO(log.timestamp), 'dd/MM/yy HH:mm')}
                                        </p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </aside>
            </div>
        </main>
    );
}
