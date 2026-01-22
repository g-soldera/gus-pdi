export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Status = 'completed' | 'in-progress' | 'not-started';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  description: string;
  category: string;
  type: 'hard' | 'soft';
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
}
