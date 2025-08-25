import { Intern, Evaluation, Notification, Department, KPI, User, Project } from '../types';

export const mockInterns: Intern[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@example.com',
    phone: '+33 1 23 45 67 89',
    department: 'Développement',
    tutor: 'Jean Martin',
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    status: 'active',
    contractType: 'stage',
    skills: ['React', 'JavaScript', 'CSS'],
    projects: [
      {
        id: 'p1',
        name: 'Application E-commerce',
        description: 'Développement d\'une interface utilisateur moderne',
        startDate: '2024-02-01',
        status: 'in_progress',
        skills: ['React', 'TypeScript']
      }
    ],
    evaluations: [],
    documents: [
      {
        id: 'd1',
        name: 'CV_Marie_Dubois.pdf',
        type: 'cv',
        url: '/documents/cv_marie.pdf',
        uploadDate: '2024-01-10'
      }
    ],
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    firstName: 'Thomas',
    lastName: 'Bernard',
    email: 'thomas.bernard@example.com',
    phone: '+33 1 23 45 67 90',
    department: 'Marketing',
    tutor: 'Sophie Leclerc',
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    status: 'active',
    contractType: 'stage',
    skills: ['Marketing Digital', 'Analytics', 'SEO'],
    projects: [
      {
        id: 'p2',
        name: 'Campagne Social Media',
        description: 'Stratégie de communication digitale',
        startDate: '2024-02-15',
        status: 'in_progress',
        skills: ['Marketing Digital', 'Communication']
      }
    ],
    evaluations: [],
    documents: [],
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Moreau',
    email: 'emma.moreau@example.com',
    phone: '+33 1 23 45 67 91',
    department: 'Design',
    tutor: 'Paul Durand',
    startDate: '2023-12-01',
    endDate: '2024-06-01',
    status: 'ending_soon',
    contractType: 'stage',
    skills: ['UI/UX', 'Figma', 'Adobe Creative'],
    projects: [
      {
        id: 'p3',
        name: 'Refonte Interface',
        description: 'Amélioration de l\'expérience utilisateur',
        startDate: '2024-01-01',
        endDate: '2024-05-15',
        status: 'completed',
        skills: ['UI/UX', 'Prototypage']
      }
    ],
    evaluations: [],
    documents: [],
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@example.com',
    phone: '+33 1 23 45 67 92',
    department: 'Développement',
    tutor: 'Jean Martin',
    startDate: '2024-03-01',
    endDate: '2024-09-01',
    status: 'active',
    contractType: 'apprentissage',
    skills: ['Python', 'Django', 'PostgreSQL'],
    projects: [],
    evaluations: [],
    documents: [],
    profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    firstName: 'Léa',
    lastName: 'Roux',
    email: 'lea.roux@example.com',
    phone: '+33 1 23 45 67 93',
    department: 'RH',
    tutor: 'Claire Rousseau',
    startDate: '2023-10-01',
    endDate: '2024-04-01',
    status: 'completed',
    contractType: 'stage',
    skills: ['Recrutement', 'GPEC', 'Droit du travail'],
    projects: [],
    evaluations: [],
    documents: []
  }
];

export const mockEvaluations: Evaluation[] = [
  {
    id: 'e1',
    internId: '1',
    evaluatorId: 'tutor1',
    evaluatorName: 'Jean Martin',
    type: 'tutor',
    date: '2024-03-15',
    softSkills: [
      { skill: 'Communication', rating: 4 },
      { skill: 'Autonomie', rating: 3 },
      { skill: 'Travail en équipe', rating: 5 }
    ],
    hardSkills: [
      { skill: 'React', rating: 4 },
      { skill: 'JavaScript', rating: 4 },
      { skill: 'CSS', rating: 3 }
    ],
    overallScore: 4.0,
    comments: 'Excellent travail, très motivée et impliquée dans ses projets.',
    recommendations: 'Continuer le développement des compétences techniques avancées.'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'contract_expiring',
    title: 'Contrat arrivant à échéance',
    message: 'Le contrat d\'Emma Moreau se termine dans 15 jours',
    internId: '3',
    date: '2024-05-15',
    read: false,
    priority: 'high'
  },
  {
    id: 'n2',
    type: 'evaluation_due',
    title: 'Évaluation en attente',
    message: 'Évaluation trimestrielle de Thomas Bernard à réaliser',
    internId: '2',
    date: '2024-05-10',
    read: false,
    priority: 'medium'
  }
];

export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Développement', manager: 'Jean Martin', internCount: 2 },
  { id: 'd2', name: 'Marketing', manager: 'Sophie Leclerc', internCount: 1 },
  { id: 'd3', name: 'Design', manager: 'Paul Durand', internCount: 1 },
  { id: 'd4', name: 'RH', manager: 'Claire Rousseau', internCount: 1 }
];

export const mockKPIs: KPI = {
  totalActiveInterns: 4,
  contractsEndingSoon: 1,
  conversionRate: 75,
  averageEvaluationScore: 4.0,
  departmentDistribution: [
    { department: 'Développement', count: 2 },
    { department: 'Marketing', count: 1 },
    { department: 'Design', count: 1 },
    { department: 'RH', count: 1 }
  ],
  monthlyHirings: [
    { month: 'Jan 2024', hires: 2 },
    { month: 'Fév 2024', hires: 1 },
    { month: 'Mar 2024', hires: 3 },
    { month: 'Avr 2024', hires: 1 },
    { month: 'Mai 2024', hires: 2 }
  ]
};

export const mockUser: User = {
  id: '1',
  name: 'Admin RH',
  email: 'admin@company.com',
  role: 'hr',
  department: 'Ressources Humaines'
};