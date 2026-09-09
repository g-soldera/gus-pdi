#!/usr/bin/env tsx

/**
 * Database Export Script
 * 
 * Dumps current Supabase tables into a valid pdiData.ts format for manual rollback.
 * Useful for:
 * - Creating fallback data snapshots
 * - Rolling back from DB to static data
 * - Testing integrity comparisons
 * 
 * Usage:
 *   node scripts/export-db.ts > src/data/pdiData-backup.ts
 *   node scripts/export-db.ts --output backups/pdiData-$(date +%Y%m%d).ts
 */

import { createPublicClient } from '../lib/supabase/client'
import * as fs from 'fs'
import * as path from 'path'

interface ExportOptions {
  output?: string
  pretty?: boolean
}

/**
 * Export all PDI entities from Supabase to TypeScript format
 */
async function exportDatabase(options: ExportOptions = {}): Promise<string> {
  const supabase = createPublicClient()
  
  console.error('[export-db] Fetching data from Supabase...')

  // Fetch all entities
  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true })

  const { data: milestones, error: milestonesError } = await supabase
    .from('milestones')
    .select('*')
    .order('phase', { ascending: true })
    .order('archived', { ascending: true })

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('status', { ascending: true })
    .order('title', { ascending: true })

  const { data: resources, error: resourcesError } = await supabase
    .from('resources')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true })

  const { data: personalInfo, error: personalInfoError } = await supabase
    .from('personal_info')
    .select('*')
    .single()

  // Check for errors
  const errors = [
    skillsError && `skills: ${skillsError.message}`,
    milestonesError && `milestones: ${milestonesError.message}`,
    projectsError && `projects: ${projectsError.message}`,
    resourcesError && `resources: ${resourcesError.message}`,
    personalInfoError && `personal_info: ${personalInfoError.message}`
  ].filter(Boolean)

  if (errors.length > 0) {
    throw new Error(`Failed to fetch data:\n${errors.join('\n')}`)
  }

  console.error('[export-db] Data fetched successfully')
  console.error(`  Skills: ${skills?.length || 0}`)
  console.error(`  Milestones: ${milestones?.length || 0}`)
  console.error(`  Projects: ${projects?.length || 0}`)
  console.error(`  Resources: ${resources?.length || 0}`)
  console.error(`  Personal Info: ${personalInfo ? 'YES' : 'NO'}`)

  // Generate TypeScript file content
  const indent = options.pretty ? 2 : 0
  const timestamp = new Date().toISOString()
  
  const output = `/**
 * PDI Data Export from Supabase
 * 
 * Generated: ${timestamp}
 * 
 * This file contains a snapshot of the PDI database at export time.
 * Can be used as fallback data or for testing integrity comparisons.
 */

import type { Skill, Milestone, Project, Resource, PersonalInfo } from '@/types/pdi'

export const skills: Skill[] = ${JSON.stringify(skills || [], null, indent)}

export const milestones: Milestone[] = ${JSON.stringify(milestones || [], null, indent)}

export const projects: Project[] = ${JSON.stringify(projects || [], null, indent)}

export const resources: Resource[] = ${JSON.stringify(resources || [], null, indent)}

export const personalInfo: PersonalInfo = ${JSON.stringify(personalInfo || null, null, indent)}

// Async getters for compatibility with pdiData.ts interface
export async function getSkills(): Promise<Skill[]> {
  return skills
}

export async function getMilestones(): Promise<Milestone[]> {
  return milestones
}

export async function getProjects(): Promise<Project[]> {
  return projects
}

export async function getResources(): Promise<Resource[]> {
  return resources
}

export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  return personalInfo
}
`

  return output
}

/**
 * Parse command line arguments
 */
function parseArgs(): ExportOptions {
  const args = process.argv.slice(2)
  const options: ExportOptions = { pretty: true }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    
    if (arg === '--output' || arg === '-o') {
      options.output = args[++i]
    } else if (arg === '--compact') {
      options.pretty = false
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Database Export Script

Usage:
  node scripts/export-db.ts [options]

Options:
  --output, -o <path>   Write output to file instead of stdout
  --compact             Minify JSON output (no pretty-printing)
  --help, -h            Show this help message

Examples:
  node scripts/export-db.ts > backups/pdiData-backup.ts
  node scripts/export-db.ts --output backups/pdiData-$(date +%Y%m%d).ts
  node scripts/export-db.ts --compact --output dist/pdiData-min.ts
`)
      process.exit(0)
    }
  }

  return options
}

/**
 * Main execution
 */
async function main() {
  try {
    const options = parseArgs()
    const output = await exportDatabase(options)

    if (options.output) {
      const outputPath = path.resolve(process.cwd(), options.output)
      const outputDir = path.dirname(outputPath)
      
      // Ensure directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }
      
      fs.writeFileSync(outputPath, output, 'utf-8')
      console.error(`[export-db] Export written to: ${outputPath}`)
    } else {
      // Write to stdout (can be redirected with >)
      console.log(output)
    }

    console.error('[export-db] Export complete')
  } catch (err) {
    console.error('[export-db] Export failed:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

main()
