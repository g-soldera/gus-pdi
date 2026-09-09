import * as fs from 'fs';
import * as path from 'path';
import { skills, milestones, projects, resources, personalInfo } from '../src/data/pdiData';

/**
 * Backup utility for pdiData.ts
 * 
 * Creates a timestamped JSON backup of all PDI entities before migration.
 * Per DI-01: Always backup before data operations.
 * 
 * Usage: tsx scripts/backup-pdi-data.ts
 */

export async function backupPdiData(): Promise<string> {
  try {
    console.log('[backup] Starting PDI data backup...');

    // Verify source data exists
    const sourcePath = path.resolve(__dirname, '../src/data/pdiData.ts');
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source file not found: ${sourcePath}`);
    }

    // Create backups directory if not exists
    const backupsDir = path.resolve(__dirname, '../backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
      console.log('[backup] Created backups directory');
    }

    // Generate timestamped filename
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    const backupFilename = `pdi-data-${timestamp}.json`;
    const backupPath = path.join(backupsDir, backupFilename);

    // Create backup object
    const backup = {
      timestamp: new Date().toISOString(),
      source: 'src/data/pdiData.ts',
      entities: {
        skills: skills.length,
        milestones: milestones.length,
        projects: projects.length,
        resources: resources.length,
        personalInfo: 1
      },
      data: {
        skills,
        milestones,
        projects,
        resources,
        personalInfo
      }
    };

    // Write backup to filesystem
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2), 'utf-8');

    // Verify backup written successfully
    const stats = fs.statSync(backupPath);
    if (stats.size === 0) {
      throw new Error('Backup file written but size is 0 bytes');
    }

    console.log(`[backup] ✓ Backup created successfully`);
    console.log(`[backup]   Path: ${backupPath}`);
    console.log(`[backup]   Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`[backup]   Entities: ${backup.entities.skills} skills, ${backup.entities.milestones} milestones, ${backup.entities.projects} projects, ${backup.entities.resources} resources, ${backup.entities.personalInfo} personal_info`);

    return backupPath;
  } catch (error) {
    console.error('[backup] ✗ Backup failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  backupPdiData()
    .then(() => {
      console.log('[backup] Backup complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('[backup] Fatal error:', error);
      process.exit(1);
    });
}
