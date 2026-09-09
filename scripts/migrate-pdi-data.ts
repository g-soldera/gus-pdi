import { backupPdiData } from './backup-pdi-data';
import { seedSkills, seedMilestones, seedProjects, seedResources, seedPersonalInfo } from '../lib/supabase/seeder';
import { getSkills, getMilestones, getProjects, getResources, getPersonalInfo } from '../src/data/pdiData';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../lib/supabase/types';

/**
 * Main migration script for pdiData.ts → Supabase
 * 
 * Execution flow:
 * 1. Backup original data (DI-01)
 * 2. Load source data from pdiData.ts
 * 3. Migrate each entity type with error handling
 * 4. Verify record counts match
 * 5. Report summary
 * 
 * Idempotent: safe to re-run multiple times (UPSERT logic in seeder)
 * 
 * Usage: tsx scripts/migrate-pdi-data.ts
 */

interface MigrationResult {
  entity: string;
  sourceCount: number;
  targetCount: number;
  insertedCount: number;
  errors: string[];
}

/**
 * Create Supabase client with service_role key for verification queries.
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
 * Query table record count from Supabase.
 */
async function getTableCount(table: string): Promise<number> {
  const client = createServiceClient();
  const { count, error } = await client
    .from(table as any)
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Failed to count ${table}: ${error.message}`);
  }

  return count || 0;
}

/**
 * Main migration function.
 */
async function migrate(): Promise<void> {
  const startTime = Date.now();
  console.log('[migrate] ========================================');
  console.log('[migrate] PDI Data Migration: pdiData.ts → Supabase');
  console.log('[migrate] ========================================');
  console.log(`[migrate] Started: ${new Date().toISOString()}`);

  try {
    // Step 1: Backup
    console.log('\n[migrate] Step 1: Backup');
    console.log('[migrate] ----------------------------------------');
    const backupPath = await backupPdiData();

    // Step 2: Load source data
    console.log('\n[migrate] Step 2: Load Source Data');
    console.log('[migrate] ----------------------------------------');
    const skills = await getSkills();
    const milestones = await getMilestones();
    const projects = await getProjects();
    const resources = await getResources();
    const personalInfo = await getPersonalInfo();

    console.log(`[migrate] Skills: ${skills.length}`);
    console.log(`[migrate] Milestones: ${milestones.length}`);
    console.log(`[migrate] Projects: ${projects.length}`);
    console.log(`[migrate] Resources: ${resources.length}`);
    console.log(`[migrate] PersonalInfo: 1`);

    const results: MigrationResult[] = [];

    // Step 3: Migrate each entity type
    console.log('\n[migrate] Step 3: Migrate Entities');
    console.log('[migrate] ----------------------------------------');

    // Skills
    console.log('[migrate] Migrating skills...');
    const skillsResult = await seedSkills(skills);
    results.push({
      entity: 'skills',
      sourceCount: skills.length,
      targetCount: await getTableCount('skills'),
      insertedCount: skillsResult.count,
      errors: skillsResult.errors
    });

    // Milestones
    console.log('[migrate] Migrating milestones...');
    const milestonesResult = await seedMilestones(milestones);
    results.push({
      entity: 'milestones',
      sourceCount: milestones.length,
      targetCount: await getTableCount('milestones'),
      insertedCount: milestonesResult.count,
      errors: milestonesResult.errors
    });

    // Projects
    console.log('[migrate] Migrating projects...');
    const projectsResult = await seedProjects(projects);
    results.push({
      entity: 'projects',
      sourceCount: projects.length,
      targetCount: await getTableCount('projects'),
      insertedCount: projectsResult.count,
      errors: projectsResult.errors
    });

    // Resources
    console.log('[migrate] Migrating resources...');
    const resourcesResult = await seedResources(resources);
    results.push({
      entity: 'resources',
      sourceCount: resources.length,
      targetCount: await getTableCount('resources'),
      insertedCount: resourcesResult.count,
      errors: resourcesResult.errors
    });

    // PersonalInfo
    console.log('[migrate] Migrating personalInfo...');
    if (personalInfo) {
      const personalInfoResult = await seedPersonalInfo(personalInfo);
      results.push({
        entity: 'personal_info',
        sourceCount: 1,
        targetCount: await getTableCount('personal_info'),
        insertedCount: personalInfoResult.count,
        errors: personalInfoResult.errors
      });
    }

    // Step 4: Verification
    console.log('\n[migrate] Step 4: Verification');
    console.log('[migrate] ----------------------------------------');

    let totalSuccess = 0;
    let totalErrors = 0;

    console.log('\n[migrate] Record Count Comparison:');
    for (const result of results) {
      const match = result.sourceCount === result.targetCount ? '✓' : '⚠';
      console.log(`[migrate] ${match} ${result.entity.padEnd(15)}: ${result.sourceCount.toString().padStart(3)} (source) → ${result.targetCount.toString().padStart(3)} (Supabase)`);

      if (result.errors.length > 0) {
        console.warn(`[migrate]   Errors: ${result.errors.length}`);
        result.errors.forEach(err => console.warn(`[migrate]     - ${err}`));
        totalErrors += result.errors.length;
      } else {
        totalSuccess += result.insertedCount;
      }
    }

    // Step 5: Summary
    console.log('\n[migrate] Step 5: Summary');
    console.log('[migrate] ----------------------------------------');

    const elapsedMs = Date.now() - startTime;
    const elapsedSec = (elapsedMs / 1000).toFixed(2);

    console.log(`[migrate] ✓ Migration completed in ${elapsedSec}s`);
    console.log(`[migrate] ✓ Total records migrated: ${totalSuccess}`);
    if (totalErrors > 0) {
      console.warn(`[migrate] ⚠ Total errors: ${totalErrors}`);
    }
    console.log(`[migrate] ✓ Backup created: ${backupPath}`);
    console.log(`[migrate] Finished: ${new Date().toISOString()}`);
    console.log('[migrate] ========================================');

    // Exit with appropriate code
    if (totalErrors > 0) {
      console.log('[migrate] Partial success (some records failed to migrate)');
      process.exit(0); // Partial success is acceptable
    } else {
      console.log('[migrate] Complete success');
      process.exit(0);
    }
  } catch (error) {
    console.error('[migrate] ✗ Fatal error:', error instanceof Error ? error.message : error);
    console.error('[migrate] Migration failed');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  migrate();
}
