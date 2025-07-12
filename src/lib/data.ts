
// This is a mock data file. In a real application, you would fetch this from a database like Firestore.
import type { Project, Contact, Intervention, Stage, StageStatus, FileAttachment, AuditLog } from '@/types';
import { format, addDays, subDays } from 'date-fns';

const TODAY = new Date();

let MOCK_CONTACTS: Contact[] = [
    { id: 'contact_01', name: 'Ιωάννης Παπαδόπουλος', role: 'Owner', email: 'i.papadopoulos@example.com', phone: '2101234567', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 'contact_02', name: 'Μαρία Γεωργίου', role: 'Owner', email: 'm.georgiou@example.com', phone: '2310987654', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 'contact_03', name: 'Γιώργος Νικολάου', role: 'Technician', email: 'g.nikolaou@tech.com', phone: '6971234567', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 'contact_04', name: 'Ελένη Δημητρίου', role: 'Supplier', email: 'info@dimitriou-supplies.gr', phone: '2107654321', avatarUrl: 'https://placehold.co/100x100.png' },
];

let MOCK_PROJECTS: Project[] = [
    {
        id: 'proj_01',
        title: 'Ανακαίνιση στο Μαρούσι',
        ownerId: 'contact_01',
        status: 'On Track',
        budget: 14200,
        createdAt: format(subDays(TODAY, 45), 'yyyy-MM-dd'),
        alerts: 2,
        auditLog: [
            { id: 'log_01', user: 'System', action: 'Stage "Επιμέτρηση" completed', timestamp: format(subDays(TODAY, 30), 'yyyy-MM-dd HH:mm:ss')},
            { id: 'log_02', user: 'Admin', action: 'Status changed for stage "Παραγγελία & Παραλαβή" to in progress', timestamp: format(subDays(TODAY, 2), 'yyyy-MM-dd HH:mm:ss')},
        ],
        interventions: [
            {
                id: 'int_proj01_ins02',
                masterInterventionId: 'ins_02',
                title: 'Αντικατάσταση Κουφωμάτων',
                stages: [
                    { id: 's_01_01', title: 'Επιμέτρηση', deadline: format(subDays(TODAY, 30), 'yyyy-MM-dd'), status: 'completed', assignee: 'contact_03', attachments: [], lastUpdated: format(subDays(TODAY, 30), 'yyyy-MM-dd') },
                    { id: 's_01_02', title: 'Παραγγελία & Παραλαβή', deadline: format(addDays(TODAY, 5), 'yyyy-MM-dd'), status: 'in progress', assignee: 'contact_04', attachments: [], lastUpdated: format(subDays(TODAY, 2), 'yyyy-MM-dd') },
                    { id: 's_01_03', title: 'Αποξήλωση Παλαιών', deadline: format(addDays(TODAY, 15), 'yyyy-MM-dd'), status: 'pending', assignee: 'contact_03', attachments: [], lastUpdated: format(subDays(TODAY, 40), 'yyyy-MM-dd') },
                    { id: 's_01_04', title: 'Εγκατάσταση & Στεγανοποίηση', deadline: format(addDays(TODAY, 20), 'yyyy-MM-dd'), status: 'pending', assignee: 'contact_03', attachments: [], lastUpdated: format(subDays(TODAY, 40), 'yyyy-MM-dd') },
                ]
            }
        ]
    },
    {
        id: 'proj_02',
        title: 'Αναβάθμιση στην Πάτρα',
        ownerId: 'contact_02',
        status: 'Delayed',
        budget: 9500,
        createdAt: format(subDays(TODAY, 60), 'yyyy-MM-dd'),
        alerts: 1,
        auditLog: [
             { id: 'log_03', user: 'Admin', action: 'Note added to "Μελέτη & Διαστασιολόγηση"', timestamp: format(subDays(TODAY, 15), 'yyyy-MM-dd HH:mm:ss')},
        ],
        interventions: [
            {
                id: 'int_proj02_ins03',
                masterInterventionId: 'ins_03',
                title: 'Εγκατάσταση Αντλίας Θερμότητας',
                stages: [
                    { id: 's_02_01', title: 'Μελέτη & Διαστασιολόγηση', deadline: format(subDays(TODAY, 5), 'yyyy-MM-dd'), status: 'in progress', assignee: 'contact_03', attachments: [], notes: 'Καθυστέρηση στην παράδοση της μελέτης από τον μηχανικό.', lastUpdated: format(subDays(TODAY, 15), 'yyyy-MM-dd') },
                    { id: 's_02_02', title: 'Υδραυλικές & Ηλεκτρολογικές Συνδέσεις', deadline: format(addDays(TODAY, 12), 'yyyy-MM-dd'), status: 'pending', assignee: 'contact_03', attachments: [], lastUpdated: format(subDays(TODAY, 50), 'yyyy-MM-dd') },
                    { id: 's_02_03', title: 'Τοποθέτηση & Θέση σε Λειτουργία', deadline: format(addDays(TODAY, 25), 'yyyy-MM-dd'), status: 'pending', assignee: 'contact_03', attachments: [], lastUpdated: format(subDays(TODAY, 50), 'yyyy-MM-dd') },
                ]
            }
        ]
    },
    {
        id: 'proj_04',
        title: 'Μόνωση ταράτσας στην Κηφισιά',
        ownerId: 'contact_02',
        status: 'Completed',
        budget: 5800,
        createdAt: format(subDays(TODAY, 120), 'yyyy-MM-dd'),
        alerts: 0,
        auditLog: [],
        interventions: []
    },
    {
        id: 'proj_03',
        title: 'Προσφορά για Νέα Κατοικία',
        ownerId: 'contact_01',
        status: 'Quotation',
        budget: 25000,
        createdAt: format(subDays(TODAY, 10), 'yyyy-MM-dd'),
        alerts: 0,
        auditLog: [
            { id: 'log_04', user: 'System', action: 'Project created as Quotation', timestamp: format(subDays(TODAY, 10), 'yyyy-MM-dd HH:mm:ss')},
        ],
        interventions: []
    }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllProjects(): Promise<Project[]> {
    await delay(300);
    return JSON.parse(JSON.stringify(MOCK_PROJECTS)); // Deep copy to prevent mutation
}

export async function getProjectById(id: string): Promise<Project | undefined> {
    await delay(200);
    const project = MOCK_PROJECTS.find(p => p.id === id);
    return project ? JSON.parse(JSON.stringify(project)) : undefined;
}

export async function createProject(projectData: { title: string; ownerId: string; budget: number }): Promise<Project> {
    await delay(500);
    const newProject: Project = {
        id: `proj_${Date.now()}`,
        ...projectData,
        status: 'On Track', // Default status
        createdAt: format(new Date(), 'yyyy-MM-dd'),
        alerts: 0,
        auditLog: [
            { id: `log_${Date.now()}`, user: 'Admin', action: 'Project created', timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss') }
        ],
        interventions: [],
    };
    MOCK_PROJECTS.unshift(newProject);
    console.log("Created new project:", newProject);
    return newProject;
}

export async function getAllContacts(): Promise<Contact[]> {
    await delay(100);
    return JSON.parse(JSON.stringify(MOCK_CONTACTS));
}

export async function getContactById(id: string): Promise<Contact | undefined> {
    await delay(100);
    const contact = MOCK_CONTACTS.find(c => c.id === id);
    return contact ? JSON.parse(JSON.stringify(contact)) : undefined;
}

export async function findContextByQuery(query: string): Promise<{ projectId: string; interventionMasterId: string; stageId: string, stageTitle: string, projectTitle: string } | null> {
    await delay(150);
    // This is a very basic mock search. A real implementation would use a more robust search algorithm.
    const lowerQuery = query.toLowerCase();
    for (const project of MOCK_PROJECTS) {
        if (!project.interventions) continue;
        for (const intervention of project.interventions) {
            if(!intervention.stages) continue;
            for (const stage of intervention.stages) {
                if (project.title.toLowerCase().includes(lowerQuery) || stage.title.toLowerCase().includes(lowerQuery)) {
                    return {
                        projectId: project.id,
                        interventionMasterId: intervention.masterInterventionId,
                        stageId: stage.id,
                        stageTitle: stage.title,
                        projectTitle: project.title,
                    };
                }
            }
        }
    }
    return null;
}

export async function updateStageStatus(projectId: string, stageId: string, status: StageStatus): Promise<boolean> {
    await delay(200);
    const project = MOCK_PROJECTS.find(p => p.id === projectId);
    if (project && project.interventions) {
        for (const intervention of project.interventions) {
            if (!intervention.stages) continue;
            const stage = intervention.stages.find(s => s.id === stageId);
            if (stage) {
                stage.status = status;
                stage.lastUpdated = format(new Date(), 'yyyy-MM-dd');
                console.log(`Updated stage ${stageId} to ${status}`);
                return true;
            }
        }
    }
    return false;
}

export async function addFileToStage(projectId: string, stageId: string, file: { name: string; url: string }): Promise<boolean> {
    await delay(400);
    const project = MOCK_PROJECTS.find(p => p.id === projectId);
    if (project && project.interventions) {
        for (const intervention of project.interventions) {
            if(!intervention.stages) continue;
            const stage = intervention.stages.find(s => s.id === stageId);
            if (stage) {
                if (!stage.attachments) {
                    stage.attachments = [];
                }
                const newAttachment: FileAttachment = {
                    id: `file_${Date.now()}`,
                    name: file.name,
                    url: file.url, // In a real app, this would be a GCS URL
                    uploadedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                };
                stage.attachments.push(newAttachment);
                console.log(`Added file ${file.name} to stage ${stageId}`);
                return true;
            }
        }
    }
    return false;
}
