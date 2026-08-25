export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Status = 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned';

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

export interface SkillImprovement {
  skillId: string;
  delta: number; // 0 = reforço, 1 = +1 nível, 2 = +2 níveis
  rationale: string;
}

export interface Milestone {
  id: string;
  title: string;
  displayName?: string;
  description: string;
  status: Status;
  progress: number;
  deadline: string | null;
  notes?: string;
  relatedSkills: string[];
  relatedResources: string[];
  archived?: boolean;
  objectives?: MilestoneObjective[];
  startPosition?: number;
  endPosition?: number;
  phase?: number | 'secmlops' | CareerLevel;
  blockedBy?: string;
  optional?: boolean;
  decision_status?: 'a_decidir';
  horizon_type?: 'aspirational';
  skillsImprovement?: SkillImprovement[];
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

export interface StudyTopic {
  id: string;
  category: string;
  name: string;
  description: string;
  progress: number;
  resources: string[]; // IDs de Resource
  relatedMilestones: string[]; // IDs de Milestone
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
  currentLevel?: CareerLevel;
  targetLevel?: CareerLevel;
}

export interface CertificationTopic {
  id: string;
  text: string;
  completed: boolean;
}

export interface Certification {
  id: string;
  phase: number | 'parallel';
  title: string;
  issuer: string;
  cost?: string;
  examType: string;
  focus: string;
  note: string;
  optional?: boolean;
  topics: CertificationTopic[];
}

export type CareerLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7';

export interface KPI {
  id: string;
  description: string;
  target: string;
  current?: string;
  achieved: boolean;
  evidence?: string;
}

export interface LevelRequirements {
  level: CareerLevel;
  title: string;
  titleShort?: string; // Versão reduzida para UI
  equivalentRole: string;
  minDuration: string;
  kpis: KPI[];
  behaviors: string[];
  certifications: string[];
  exitCriteria: string;
}

