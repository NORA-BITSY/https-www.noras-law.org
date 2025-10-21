// Core Types for Nora's Law Platform

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'attorney'
  createdAt: Date
  lastLogin: Date
}

export interface Case {
  id: string
  title: string
  description: string
  status: 'active' | 'pending' | 'closed' | 'archived'
  userId: string
  createdAt: Date
  updatedAt: Date
  courtType: 'family' | 'civil' | 'criminal'
  jurisdiction: string
  caseNumber?: string
}

export interface Evidence {
  id: string
  caseId: string
  name: string
  type: string
  size: number
  hash: string
  blockchainVerified: boolean
  uploadDate: Date
  tags: string[]
  description?: string
  accessLevel: 'public' | 'private' | 'restricted'
}

export interface Petition {
  id: string
  title: string
  description: string
  goal: number
  signatures: number
  status: 'active' | 'completed' | 'expired'
  category: string
  createdAt: Date
  deadline?: Date
  creator: string
  location?: string
  tags: string[]
}

export interface ComplianceItem {
  id: string
  caseId: string
  title: string
  description: string
  category: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  dueDate?: Date
  completedDate?: Date
  requirements: string[]
  evidence: string[]
}

export interface TimelineEvent {
  id: string
  caseId: string
  date: Date
  title: string
  description: string
  type: 'court' | 'filing' | 'hearing' | 'deadline' | 'milestone' | 'evidence'
  status: 'completed' | 'upcoming' | 'overdue' | 'in-progress'
  documents?: string[]
  participants?: string[]
}

export interface DocumentAnalysis {
  id: string
  documentId: string
  analysisType: 'constitutional' | 'toxicology' | 'chain-of-custody' | 'general'
  results: AnalysisResult[]
  confidence: number
  analyzedAt: Date
}

export interface AnalysisResult {
  type: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  legalBasis?: string
  evidence: string[]
  recommendations: string[]
}

export interface ChatMessage {
  id: string
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface Conversation {
  id: string
  userId: string
  title: string
  mode: 'research' | 'drafting' | 'analysis'
  createdAt: Date
  updatedAt: Date
  messages: ChatMessage[]
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface CaseForm {
  title: string
  description: string
  courtType: string
  jurisdiction: string
}

export interface PetitionForm {
  title: string
  description: string
  goal: number
  deadline?: Date
  category: string
  tags: string[]
}

// Component Props Types
export interface DashboardProps {
  user: User
  stats: DashboardStats
}

export interface DashboardStats {
  activeCases: number
  pendingDeadlines: number
  completedTasks: number
  evidenceItems: number
  petitionsSigned: number
  complianceScore: number
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]
