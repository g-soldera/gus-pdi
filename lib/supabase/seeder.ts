import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import type { Skill, Milestone, Project, Resource, PersonalInfo } from '../../src/types/pdi';

// Type helper for Supabase insert operations
type SupabaseInsert<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert'];

/**
 * Seeder utility for migrating pdiData.ts to Supabase tables.
 * 
 * Uses service_role key for write operations (bypasses RLS).
 * Per DB-06: UPSERT logic for idempotent migrations.
 * 
 * Usage: Import and call seed functions from migration script.
 */

interface SeedResult {
  count: number;
  errors: string[];
}

/**
 * Create Supabase client with service_role key for seeding.
 * Service role bypasses RLS policies for initial data load.
 */
function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase credentials: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey);
}

/**
 * Seed skills table.
 * Maps TypeScript Skill[] to Supabase insert format.
 */
export async function seedSkills(skills: Skill[]): Promise<SeedResult> {
  console.log(`[seed] Seeding ${skills.length} skills...`);
  const client = createServiceClient();
  const errors: string[] = [];
  let successCount = 0;

  for (const skill of skills) {
    try {
      const insertData: SupabaseInsert<'skills'> = {
        id: skill.id,
        name: skill.name,
        level: skill.level,
        description: skill.description,
        category: skill.category,
        type: skill.type,
        requirements: (skill.requirements || []) as any
      };

      const { error } = await client
        .from('skills')
        .upsert(insertData as any, { onConflict: 'id' });

      if (error) {
        errors.push(`Skill ${skill.id}: ${error.message}`);
      } else {
        successCount++;
      }
    } catch (err) {
      errors.push(`Skill ${skill.id}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`[seed] Skills: ${successCount}/${skills.length} inserted/updated`);
  if (errors.length > 0) {
    console.warn(`[seed] Skills errors: ${errors.length}`);
  }

  return { count: successCount, errors };
}

/**
 * Seed milestones table.
 * Handles JSONB fields (objectives, unlocked_requirements) and UUID arrays.
 */
export async function seedMilestones(milestones: Milestone[]): Promise<SeedResult> {
  console.log(`[seed] Seeding ${milestones.length} milestones...`);
  const client = createServiceClient();
  const errors: string[] = [];
  let successCount = 0;

  for (const milestone of milestones) {
    try {
      const insertData: SupabaseInsert<'milestones'> = {
        id: milestone.id,
        title: milestone.title,
        display_name: milestone.displayName || null,
        description: milestone.description,
        status: milestone.status,
        progress: milestone.progress,
        deadline: milestone.deadline || null,
        notes: milestone.notes || null,
        phase: milestone.phase ? String(milestone.phase) : null,
        archived: milestone.archived || false,
        objectives: (milestone.objectives || []) as any,
        related_skills: milestone.relatedSkills || [],
        related_resources: milestone.relatedResources || [],
        unlocked_requirements: (milestone.unlockedRequirements || []) as any
      };

      const { error } = await client
        .from('milestones')
        .upsert(insertData as any, { onConflict: 'id' });

      if (error) {
        errors.push(`Milestone ${milestone.id}: ${error.message}`);
      } else {
        successCount++;
      }
    } catch (err) {
      errors.push(`Milestone ${milestone.id}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`[seed] Milestones: ${successCount}/${milestones.length} inserted/updated`);
  if (errors.length > 0) {
    console.warn(`[seed] Milestones errors: ${errors.length}`);
  }

  return { count: successCount, errors };
}

/**
 * Seed projects table.
 * Handles text[] for technologies and UUID[] for relations.
 */
export async function seedProjects(projects: Project[]): Promise<SeedResult> {
  console.log(`[seed] Seeding ${projects.length} projects...`);
  const client = createServiceClient();
  const errors: string[] = [];
  let successCount = 0;

  for (const project of projects) {
    try {
      const insertData: SupabaseInsert<'projects'> = {
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        impact: project.impact,
        technologies: project.technologies || [],
        related_skills: project.relatedSkills || [],
        related_milestones: project.relatedMilestones || [],
        related_resources: project.relatedResources || [],
        url: project.url || null
      };

      const { error } = await client
        .from('projects')
        .upsert(insertData as any, { onConflict: 'id' });

      if (error) {
        errors.push(`Project ${project.id}: ${error.message}`);
      } else {
        successCount++;
      }
    } catch (err) {
      errors.push(`Project ${project.id}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`[seed] Projects: ${successCount}/${projects.length} inserted/updated`);
  if (errors.length > 0) {
    console.warn(`[seed] Projects errors: ${errors.length}`);
  }

  return { count: successCount, errors };
}

/**
 * Seed resources table.
 * Handles category hierarchy and UUID[] relations.
 */
export async function seedResources(resources: Resource[]): Promise<SeedResult> {
  console.log(`[seed] Seeding ${resources.length} resources...`);
  const client = createServiceClient();
  const errors: string[] = [];
  let successCount = 0;

  for (const resource of resources) {
    try {
      const insertData: SupabaseInsert<'resources'> = {
        id: resource.id,
        name: resource.name,
        description: resource.description,
        status: resource.status,
        category: resource.category,
        parent_category: resource.parentCategory || null,
        sub_category: resource.subCategory || null,
        image: resource.image || null,
        is_specialization: resource.isSpecialization || false,
        related_skills: resource.relatedSkills || [],
        related_milestones: resource.relatedMilestones || []
      };

      const { error } = await client
        .from('resources')
        .upsert(insertData as any, { onConflict: 'id' });

      if (error) {
        errors.push(`Resource ${resource.id}: ${error.message}`);
      } else {
        successCount++;
      }
    } catch (err) {
      errors.push(`Resource ${resource.id}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`[seed] Resources: ${successCount}/${resources.length} inserted/updated`);
  if (errors.length > 0) {
    console.warn(`[seed] Resources errors: ${errors.length}`);
  }

  return { count: successCount, errors };
}

/**
 * Seed personal_info table (singleton).
 * Converts date strings to ISO format for Supabase timestamp fields.
 */
export async function seedPersonalInfo(info: PersonalInfo): Promise<SeedResult> {
  console.log(`[seed] Seeding personal_info...`);
  const client = createServiceClient();
  const errors: string[] = [];

  try {
    // Delete existing singleton if exists (simpler than complex UPSERT logic)
    await client.from('personal_info').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const insertData: SupabaseInsert<'personal_info'> = {
      name: info.name,
      birth_date: info.birthDate,
      start_date: info.startDate || null,
      experience_start_date: info.experienceStartDate || null,
      bank_start_date: info.bankStartDate || null,
      company: info.company,
      department: info.department,
      current_role: info.currentRole,
      target_role: info.targetRole,
      target_timeline_months: info.targetTimelineMonths,
      profile_image: info.profileImage || null,
      timeline_target: info.timelineTarget || null,
      senior_target_date: info.seniorTargetDate || null,
      current_level: info.currentLevel || null,
      target_level: info.targetLevel || null
    };

    const { error } = await client
      .from('personal_info')
      .insert(insertData as any);

    if (error) {
      errors.push(`PersonalInfo: ${error.message}`);
      console.log(`[seed] PersonalInfo: 0/1 inserted`);
      return { count: 0, errors };
    } else {
      console.log(`[seed] PersonalInfo: 1/1 inserted`);
      return { count: 1, errors: [] };
    }
  } catch (err) {
    errors.push(`PersonalInfo: ${err instanceof Error ? err.message : String(err)}`);
    console.log(`[seed] PersonalInfo: 0/1 inserted`);
    return { count: 0, errors };
  }
}
