import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cases: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          case_type: string
          jurisdiction: string
          status: 'draft' | 'active' | 'closed' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          case_type: string
          jurisdiction: string
          status?: 'draft' | 'active' | 'closed' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          case_type?: string
          jurisdiction?: string
          status?: 'draft' | 'active' | 'closed' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          case_id: string
          user_id: string
          filename: string
          file_path: string
          file_type: string
          file_size: number
          extracted_text: string | null
          metadata: any
          uploaded_at: string
        }
        Insert: {
          id?: string
          case_id: string
          user_id: string
          filename: string
          file_path: string
          file_type: string
          file_size: number
          extracted_text?: string | null
          metadata?: any
          uploaded_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          user_id?: string
          filename?: string
          file_path?: string
          file_type?: string
          file_size?: number
          extracted_text?: string | null
          metadata?: any
          uploaded_at?: string
        }
      }
      evidence: {
        Row: {
          id: string
          case_id: string
          user_id: string
          title: string
          description: string | null
          evidence_type: string
          source: string
          date_obtained: string
          chain_of_custody: any
          authenticity_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id: string
          user_id: string
          title: string
          description?: string | null
          evidence_type: string
          source: string
          date_obtained: string
          chain_of_custody?: any
          authenticity_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          user_id?: string
          title?: string
          description?: string | null
          evidence_type?: string
          source?: string
          date_obtained?: string
          chain_of_custody?: any
          authenticity_score?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      violations: {
        Row: {
          id: string
          case_id: string
          user_id: string
          violation_type: string
          description: string
          legal_basis: string
          severity: 'critical' | 'high' | 'medium' | 'low'
          evidence_ids: string[]
          status: 'identified' | 'investigating' | 'resolved' | 'dismissed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id: string
          user_id: string
          violation_type: string
          description: string
          legal_basis: string
          severity?: 'critical' | 'high' | 'medium' | 'low'
          evidence_ids?: string[]
          status?: 'identified' | 'investigating' | 'resolved' | 'dismissed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          user_id?: string
          violation_type?: string
          description?: string
          legal_basis?: string
          severity?: 'critical' | 'high' | 'medium' | 'low'
          evidence_ids?: string[]
          status?: 'identified' | 'investigating' | 'resolved' | 'dismissed'
          created_at?: string
          updated_at?: string
        }
      }
      ai_conversations: {
        Row: {
          id: string
          user_id: string
          case_id: string | null
          mode: 'research' | 'drafting' | 'analysis' | 'education'
          messages: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          case_id?: string | null
          mode?: 'research' | 'drafting' | 'analysis' | 'education'
          messages?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          case_id?: string | null
          mode?: 'research' | 'drafting' | 'analysis' | 'education'
          messages?: any[]
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
