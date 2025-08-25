export interface Intern {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  tutor: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'ending_soon' | 'completed' | 'renewed';
  contractType: 'stage' | 'apprentissage';
  skills: string[];
  projects: Project[];
  evaluations: Evaluation[];
  documents: Document[];
  profileImage?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'in_progress' | 'completed' | 'on_hold';
  skills: string[];
}

export interface Evaluation {
  id: string;
  internId: string;
  evaluatorId: string;
  evaluatorName: string;
  type: 'tutor' | 'self' | '360_feedback' | 'manager';
  date: string;
  softSkills: SkillRating[];
  hardSkills: SkillRating[];
  overallScore: number;
  comments: string;
  recommendations: string;
}

export interface SkillRating {
  skill: string;
  rating: number; // 1-5
}

export interface Document {
  id: string;
  name: string;
  type: 'cv' | 'contract' | 'report' | 'evaluation' | 'other';
  url: string;
  uploadDate: string;
}

export interface Notification {
  id: string;
  type: 'contract_expiring' | 'evaluation_due' | 'renewal_proposal' | 'hiring_recommendation';
  title: string;
  message: string;
  internId?: string;
  date: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  internCount: number;
}

export interface KPI {
  totalActiveInterns: number;
  contractsEndingSoon: number;
  conversionRate: number; // percentage
  averageEvaluationScore: number;
  departmentDistribution: { department: string; count: number }[];
  monthlyHirings: { month: string; hires: number }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'tutor' | 'manager';
  department?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  notifications: {
    contractExpiry: boolean;
    evaluationReminders: boolean;
    emailNotifications: boolean;
  };
  dataRetention: {
    archiveAfterMonths: number;
    autoDeleteAfterYears: number;
  };
}

export type NavigationItem = {
  id: string;
  name: string;
  icon: string;
  path: string;
  badge?: number;
};