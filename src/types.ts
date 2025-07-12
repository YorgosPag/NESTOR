
export type StageStatus = 'pending' | 'in progress' | 'completed' | 'failed';

export type FileAttachment = {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
};

export type AuditLog = {
    id: string;
    user: string;
    action: string;
    timestamp: string;
    details?: string;
};

export type Stage = {
  id: string;
  title: string;
  deadline: string; // YYYY-MM-DD
  status: StageStatus;
  assignee?: string; // Contact ID
  attachments: FileAttachment[];
  notes?: string;
  lastUpdated: string;
};

export type Intervention = {
  id: string; // e.g., 'int_proj01_ins01'
  masterInterventionId: string; // e.g., 'ins_01'
  title: string;
  stages: Stage[];
};

export type Contact = {
    id: string;
    name: string;
    role: string; // e.g., 'Owner', 'Technician', 'Supplier'
    email: string;
    phone: string;
    avatarUrl?: string;
};

export type Project = {
  id: string;
  title: string;
  ownerId: string; // Contact ID
  status: 'Quotation' | 'On Track' | 'Delayed' | 'Completed';
  budget: number;
  interventions: Intervention[];
  createdAt: string; // YYYY-MM-DD
  alerts?: number;
  auditLog?: AuditLog[];
};
