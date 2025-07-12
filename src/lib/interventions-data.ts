// This is a mock data file. In a real application, you would fetch this from a database.

export type MasterIntervention = {
    id: string;
    category: string;
    name: string;
    description: string;
    stages: { id: string; name: string; description: string; }[];
};

const MOCK_INTERVENTIONS: MasterIntervention[] = [
    {
        id: 'ins_01',
        category: 'Μόνωση',
        name: 'Εξωτερική Θερμομόνωση (Κέλυφος)',
        description: 'Εφαρμογή συστήματος εξωτερικής θερμομόνωσης στο κέλυφος του κτιρίου για μείωση των θερμικών απωλειών.',
        stages: [
            { id: 'stage_01_01', name: 'Αυτοψία & Μελέτη', description: 'Επιτόπια αυτοψία για καταγραφή αναγκών και εκπόνηση μελέτης εφαρμογής.' },
            { id: 'stage_01_02', name: 'Προετοιμασία Επιφανειών', description: 'Καθαρισμός, επισκευή και προετοιμασία των εξωτερικών τοίχων.' },
            { id: 'stage_01_03', name: 'Εγκατάσταση Θερμομόνωσης', description: 'Τοποθέτηση θερμομονωτικών πλακών και βασικής στρώσης οπλισμού.' },
            { id: 'stage_01_04', name: 'Τελικό Φινίρισμα', description: 'Εφαρμογή τελικού επιχρίσματος (σοβά) και βαφή.' },
        ]
    },
    {
        id: 'ins_02',
        category: 'Κουφώματα',
        name: 'Αντικατάσταση Κουφωμάτων',
        description: 'Αντικατάσταση παλαιών κουφωμάτων με νέα, ενεργειακά αποδοτικά, με θερμοδιακοπή και διπλούς/τριπλούς υαλοπίνακες.',
        stages: [
            { id: 'stage_02_01', name: 'Επιμέτρηση', description: 'Λήψη ακριβών διαστάσεων για την παραγγελία των νέων κουφωμάτων.' },
            { id: 'stage_02_02', name: 'Παραγγελία & Παραλαβή', description: 'Παραγγελία των κουφωμάτων στον προμηθευτή και έλεγχος κατά την παραλαβή.' },
            { id: 'stage_02_03', name: 'Αποξήλωση Παλαιών', description: 'Προσεκτική αφαίρεση των υφιστάμενων κουφωμάτων.' },
            { id: 'stage_02_04', name: 'Εγκατάσταση & Στεγανοποίηση', description: 'Τοποθέτηση των νέων κουφωμάτων και πλήρης στεγανοποίηση.' },
        ]
    },
    {
        id: 'ins_03',
        category: 'Θέρμανση/Ψύξη',
        name: 'Εγκατάσταση Αντλίας Θερμότητας',
        description: 'Εγκατάσταση συστήματος αντλίας θερμότητας αέρα-νερού για θέρμανση, ψύξη και παραγωγή ζεστού νερού χρήσης.',
        stages: [
             { id: 'stage_03_01', name: 'Μελέτη & Διαστασιολόγηση', description: 'Εκπόνηση μελέτης για την επιλογή της κατάλληλης αντλίας θερμότητας.' },
             { id: 'stage_03_02', name: 'Υδραυλικές & Ηλεκτρολογικές Συνδέσεις', description: 'Εγκατάσταση των απαραίτητων σωληνώσεων και ηλεκτρολογικών παροχών.' },
             { id: 'stage_03_03', name: 'Τοποθέτηση & Θέση σε Λειτουργία', description: 'Εγκατάσταση της εξωτερικής και εσωτερικής μονάδας και αρχική εκκίνηση.' },
        ]
    },
];

export async function getMasterInterventions(): Promise<MasterIntervention[]> {
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_INTERVENTIONS;
}
