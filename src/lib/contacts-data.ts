
import type { Contact } from '@/types';

// This is a mock data file. In a real application, you would fetch this from a database like Firestore.
const MOCK_CONTACTS: Contact[] = [
    { id: 'contact_01', name: 'Ιωάννης Παπαδόπουλος', role: 'Owner', email: 'i.papadopoulos@example.com', phone: '2101234567', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 'contact_02', name: 'Μαρία Γεωργίου', role: 'Owner', email: 'm.georgiou@example.com', phone: '2310987654', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 'contact_03', name: 'Γιώργος Νικολάου', role: 'Technician', email: 'g.nikolaou@tech.com', phone: '6971234567', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 'contact_04', name: 'Ελένη Δημητρίου', role: 'Supplier', email: 'info@dimitriou-supplies.gr', phone: '2107654321', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 'contact_05', name: 'Kλιματισμός Αθηνών Α.Ε.', role: 'Supplier', email: 'sales@klimatismos-athens.com', phone: '2105556677', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 'contact_06', name: 'Αλέξανδρος Βασιλείου', role: 'Engineer', email: 'a.vasileiou@engineers.gr', phone: '6944556677', avatarUrl: 'https://placehold.co/100x100.png' },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getContacts(): Promise<Contact[]> {
    await delay(300);
    return JSON.parse(JSON.stringify(MOCK_CONTACTS)); // Deep copy to prevent mutation
}

export async function createContact(contactData: Omit<Contact, 'id' | 'avatarUrl'>): Promise<Contact> {
    await delay(500);
    const newContact: Contact = {
        id: `contact_${Date.now()}`,
        ...contactData,
        avatarUrl: 'https://placehold.co/100x100.png',
    };
    MOCK_CONTACTS.unshift(newContact); // Add to the beginning of the list
    console.log("Created new contact:", newContact);
    return newContact;
}
