import {
  fetchSkills,
  fetchMilestones,
  fetchProjects,
  fetchResources,
  fetchPersonalInfo,
} from '@/lib/supabase/queries';
import type { Skill, Milestone, Project, Resource, PersonalInfo } from '@/types/pdi';

/**
 * PDI Data Access Layer
 *
 * Fetches PDI data dynamically from Supabase.
 * Retains fallback structure if Supabase returns empty arrays.
 */

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await fetchSkills();
  if (error || !data) {
    console.error('[pdiData] Error fetching skills from Supabase:', error);
    return [];
  }
  return data;
}

export async function getMilestones(): Promise<Milestone[]> {
  const { data, error } = await fetchMilestones();
  if (error || !data) {
    console.error('[pdiData] Error fetching milestones from Supabase:', error);
    return [];
  }
  return data;
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await fetchProjects();
  if (error || !data) {
    console.error('[pdiData] Error fetching projects from Supabase:', error);
    return [];
  }
  return data;
}

export async function getResources(): Promise<Resource[]> {
  const { data, error } = await fetchResources();
  if (error || !data) {
    console.error('[pdiData] Error fetching resources from Supabase:', error);
    return [];
  }
  return data;
}

export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  const { data, error } = await fetchPersonalInfo();
  if (error || !data) {
    console.error('[pdiData] Error fetching personalInfo from Supabase:', error);
    return null;
  }
  return data;
}
