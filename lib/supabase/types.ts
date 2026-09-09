/**
 * Auto-generated type definitions.
 * Keep in sync with docs/pdi-schema.sql.
 * 
 * Generated from Supabase schema:
 * - Tables: skills, milestones, projects, resources, personal_info
 * - Enums: status_enum, skill_type_enum
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      skills: {
        Row: {
          id: string
          name: string
          level: number
          description: string
          category: string
          type: 'hard' | 'soft'
          requirements: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          level: number
          description: string
          category: string
          type: 'hard' | 'soft'
          requirements?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          level?: number
          description?: string
          category?: string
          type?: 'hard' | 'soft'
          requirements?: Json
          created_at?: string
          updated_at?: string
        }
      }
      milestones: {
        Row: {
          id: string
          title: string
          display_name: string | null
          description: string
          status: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          progress: number
          deadline: string | null
          notes: string | null
          phase: string | null
          archived: boolean
          objectives: Json
          related_skills: string[]
          related_resources: string[]
          unlocked_requirements: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          display_name?: string | null
          description: string
          status: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          progress?: number
          deadline?: string | null
          notes?: string | null
          phase?: string | null
          archived?: boolean
          objectives?: Json
          related_skills?: string[]
          related_resources?: string[]
          unlocked_requirements?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          display_name?: string | null
          description?: string
          status?: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          progress?: number
          deadline?: string | null
          notes?: string | null
          phase?: string | null
          archived?: boolean
          objectives?: Json
          related_skills?: string[]
          related_resources?: string[]
          unlocked_requirements?: Json
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          status: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          impact: string
          technologies: string[]
          related_skills: string[]
          related_milestones: string[]
          related_resources: string[]
          url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          impact: string
          technologies?: string[]
          related_skills?: string[]
          related_milestones?: string[]
          related_resources?: string[]
          url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          impact?: string
          technologies?: string[]
          related_skills?: string[]
          related_milestones?: string[]
          related_resources?: string[]
          url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          name: string
          description: string
          status: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          category: string
          parent_category: string | null
          sub_category: string | null
          image: string | null
          is_specialization: boolean
          related_skills: string[]
          related_milestones: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          status: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          category: string
          parent_category?: string | null
          sub_category?: string | null
          image?: string | null
          is_specialization?: boolean
          related_skills?: string[]
          related_milestones?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          status?: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
          category?: string
          parent_category?: string | null
          sub_category?: string | null
          image?: string | null
          is_specialization?: boolean
          related_skills?: string[]
          related_milestones?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      personal_info: {
        Row: {
          id: string
          name: string
          birth_date: string
          start_date: string | null
          experience_start_date: string | null
          bank_start_date: string | null
          company: string
          department: string
          current_role: string
          target_role: string
          target_timeline_months: number
          profile_image: string | null
          timeline_target: string | null
          senior_target_date: string | null
          current_level: string | null
          target_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          birth_date: string
          start_date?: string | null
          experience_start_date?: string | null
          bank_start_date?: string | null
          company: string
          department: string
          current_role: string
          target_role: string
          target_timeline_months: number
          profile_image?: string | null
          timeline_target?: string | null
          senior_target_date?: string | null
          current_level?: string | null
          target_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          birth_date?: string
          start_date?: string | null
          experience_start_date?: string | null
          bank_start_date?: string | null
          company?: string
          department?: string
          current_role?: string
          target_role?: string
          target_timeline_months?: number
          profile_image?: string | null
          timeline_target?: string | null
          senior_target_date?: string | null
          current_level?: string | null
          target_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      status_enum: 'completed' | 'in-progress' | 'not-started' | 'deprioritized' | 'planned'
      skill_type_enum: 'hard' | 'soft'
    }
  }
}
