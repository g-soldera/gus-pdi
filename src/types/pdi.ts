export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Status = 'completed' | 'in-progress' | 'not-started' | 'deprioritized';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  description: string;
  category: string;
  type: 'hard' | 'soft';
}

export interface MilestoneObjective {
  text: string;
  completed: boolean;
  completionJustification?: string; // Comentário obrigatório para fechar o item
}

export interface Milestone {
  id: string;
  title: string;
  displayName?: string;
  description: string;
  status: Status;
  progress: number;
  deadline: string;
  notes?: string;
  relatedSkills: string[];
  relatedResources: string[];
  archived?: boolean;
  objectives?: MilestoneObjective[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: Status;
  impact: string;
  technologies: string[];
  relatedSkills: string[];
  relatedMilestones: string[];
  relatedResources: string[];
  url?: string;
  urlTooltip?: string;
  objectives?: MilestoneObjective[];
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  status: Status;
  category: string; // subcategory
  parentCategory?: string; // e.g., Livros, Mentoria, Certificação
  subCategory?: string; // finer grouping label
  image?: string;
  isSpecialization?: boolean;
  relatedSkills: string[];
  relatedMilestones: string[];
}

export interface PersonalInfo {
  name: string;
  birthDate: string;
  startDate?: string;
  experienceStartDate?: string;
  bankStartDate?: string;
  company: string;
  department: string;
  currentRole: string;
  targetRole: string;
  targetTimelineMonths: number;
  profileImage: string;
  timelineTarget?: string;
  seniorTargetDate?: string;
}
