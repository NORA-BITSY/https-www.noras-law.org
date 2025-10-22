import OpenAI from 'openai'

// Initialize OpenAI client
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
})

// Rate limiting and cost tracking
class RateLimiter {
  private requests: number[] = []
  private maxRequests = 50 // requests per minute
  private windowMs = 60 * 1000 // 1 minute

  canMakeRequest(): boolean {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.windowMs)
    return this.requests.length < this.maxRequests
  }

  recordRequest(): void {
    this.requests.push(Date.now())
  }
}

const rateLimiter = new RateLimiter()

export interface ChatContext {
  mode: 'research' | 'drafting' | 'analysis' | 'education'
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  userInfo?: {
    caseType?: string
    jurisdiction?: string
    experience?: string
  }
}

export interface ChatResponse {
  content: string
  confidence: number
  sources?: string[]
  followUpQuestions?: string[]
}

export interface AnalysisResult {
  violations: Violation[]
  authenticity: AuthenticityReport
  chainOfCustody: ChainOfCustodyReport
  recommendations: string[]
  severity: 'critical' | 'high' | 'medium' | 'low'
  confidence: number
}

export interface Violation {
  type: string
  description: string
  legalBasis: string
  evidence: string[]
  severity: 'critical' | 'high' | 'medium' | 'low'
  remedies: string[]
}

export interface AuthenticityReport {
  isAuthentic: boolean
  issues: string[]
  missingElements: string[]
  recommendations: string[]
}

export interface ChainOfCustodyReport {
  intact: boolean
  gaps: string[]
  timeline: CustodyEvent[]
}

export interface CustodyEvent {
  date: string
  action: string
  actor: string
  verified: boolean
}

export class AIService {
  private openai: OpenAI

  constructor() {
    this.openai = openaiClient
  }

  async chat(message: string, context: ChatContext): Promise<ChatResponse> {
    if (!rateLimiter.canMakeRequest()) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    rateLimiter.recordRequest()

    try {
      const systemPrompt = this.getSystemPrompt(context.mode)

      const messages = [
        { role: 'system' as const, content: systemPrompt },
        ...context.conversationHistory.slice(-10).map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        { role: 'user' as const, content: message }
      ]

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      })

      return {
        content: response.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response.',
        confidence: 0.85, // Would be calculated based on model confidence
        sources: this.extractSources(response.choices[0]?.message?.content || ''),
        followUpQuestions: this.generateFollowUpQuestions(response.choices[0]?.message?.content || '', context.mode)
      }
    } catch (error) {
      console.error('AI Chat Error:', error)
      throw new Error('Failed to generate AI response. Please try again.')
    }
  }

  async analyzeDocument(text: string, type: 'constitutional' | 'toxicology' | 'cps' | 'court-order'): Promise<AnalysisResult> {
    if (!rateLimiter.canMakeRequest()) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    rateLimiter.recordRequest()

    try {
      const analysisPrompt = this.getAnalysisPrompt(type)

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: analysisPrompt },
          { role: 'user', content: `Analyze this document:\n\n${text}` }
        ],
        temperature: 0.3,
        max_tokens: 3000,
      })

      return this.parseAnalysisResponse(response.choices[0]?.message?.content || '', type)
    } catch (error) {
      console.error('Document Analysis Error:', error)
      throw new Error('Failed to analyze document. Please try again.')
    }
  }

  async generateDocument(template: string, data: any): Promise<string> {
    if (!rateLimiter.canMakeRequest()) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    rateLimiter.recordRequest()

    try {
      const prompt = `Generate a legal document using this template and data:

Template: ${template}
Data: ${JSON.stringify(data, null, 2)}

Generate a complete, professional legal document.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'You are a legal document drafting expert. Generate accurate, professional legal documents.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 4000,
      })

      return response.choices[0]?.message?.content || 'Unable to generate document.'
    } catch (error) {
      console.error('Document Generation Error:', error)
      throw new Error('Failed to generate document. Please try again.')
    }
  }

  private getSystemPrompt(mode: ChatContext['mode']): string {
    const prompts = {
      research: `You are a legal research assistant specializing in federal civil rights law, particularly family court and CPS cases. You have extensive knowledge of:

- Constitutional law (14th Amendment due process and equal protection)
- Federal civil rights statutes (42 U.S.C. § 1983)
- Family court procedures and standards
- CPS investigation protocols and requirements
- Case law precedents in civil rights litigation

Provide accurate, well-researched answers with citations to relevant laws and cases. Always explain legal concepts clearly and suggest next steps for legal action.`,

      drafting: `You are a legal document drafting specialist for civil rights litigation. You help draft:

- Federal complaints under 42 U.S.C. § 1983
- Motions for preliminary injunctions and TROs
- Discovery requests and responses
- Appeals and briefs
- Preservation letters and demands

Ensure all documents follow proper legal formatting, include appropriate legal citations, and meet court requirements. Always include placeholders for case-specific information.`,

      analysis: `You are a civil rights case analysis expert. You help evaluate:

- Strength of constitutional claims
- Evidence sufficiency and admissibility
- Potential defenses and counterarguments
- Case strategy and litigation approach
- Settlement considerations
- Appeal prospects

Provide balanced analysis with both strengths and weaknesses. Suggest evidence gathering strategies and alternative legal theories.`,

      education: `You are a civil rights educator helping parents understand their rights in family court and CPS cases. Explain:

- Constitutional protections for parents and families
- Due process requirements in child welfare proceedings
- Parental rights under the 14th Amendment
- How to identify potential civil rights violations
- Steps to protect and preserve evidence
- When and how to seek legal counsel

Use clear, accessible language. Focus on empowering parents with knowledge while being sensitive to their situation.`
    }

    return prompts[mode]
  }

  private getAnalysisPrompt(type: string): string {
    const prompts = {
      constitutional: `Analyze this document for potential constitutional violations, particularly in the context of family court and CPS proceedings. Look for:

- Due process violations (notice, hearing, impartial decision-maker)
- Equal protection violations (discriminatory treatment)
- First Amendment violations (retaliation, free speech)
- Procedural irregularities
- Missing required elements

Provide specific citations to constitutional provisions and relevant case law. Assess severity and suggest remedies.`,

      toxicology: `Analyze this toxicology report for compliance with forensic standards and potential evidentiary issues:

- LIMS system validation and accreditation
- Chain of custody documentation
- Testing methodology and validation
- Quality control procedures
- Result interpretation and reporting
- Authentication requirements

Identify any gaps or issues that could affect admissibility in court.`,

      cps: `Review this CPS record for procedural compliance and potential civil rights violations:

- Investigation protocols followed
- Due process afforded to family
- Evidence collection standards
- Documentation requirements
- Timelines and deadlines met
- Required notifications provided

Flag any deviations from standard procedures or constitutional requirements.`,

      'court-order': `Analyze this court order for legal sufficiency and compliance:

- Proper jurisdiction and venue
- Adequate findings of fact and conclusions of law
- Constitutional standards met
- Notice requirements satisfied
- Right to counsel considerations
- Appeal rights preserved

Identify any legal deficiencies or irregularities.`
    }

    return prompts[type as keyof typeof prompts] || prompts.constitutional
  }

  private parseAnalysisResponse(response: string, type: string): AnalysisResult {
    // This would use more sophisticated parsing, but for now we'll structure it
    try {
      // Extract violations from the response
      const violations: Violation[] = []
      const lines = response.split('\n')

      let currentViolation: Partial<Violation> | null = null

      for (const line of lines) {
        if (line.toLowerCase().includes('violation') || line.toLowerCase().includes('issue')) {
          if (currentViolation && currentViolation.type) {
            violations.push(currentViolation as Violation)
          }
          currentViolation = {
            type: line.replace(/^(violation|issue)?:?\s*/i, ''),
            severity: 'medium',
            evidence: [],
            remedies: []
          }
        } else if (currentViolation) {
          if (line.includes('Legal basis:') || line.includes('Citation:')) {
            currentViolation.legalBasis = line.replace(/^(Legal basis|Citation)?:?\s*/i, '')
          } else if (line.includes('Severity:') || line.includes('Priority:')) {
            const severity = line.toLowerCase().match(/(critical|high|medium|low)/)?.[1] as any
            if (severity) currentViolation.severity = severity
          } else if (line.includes('Remedy:') || line.includes('Recommendation:')) {
            currentViolation.remedies?.push(line.replace(/^(Remedy|Recommendation)?:?\s*/i, ''))
          } else if (line.trim()) {
            currentViolation.description = (currentViolation.description || '') + line + ' '
          }
        }
      }

      if (currentViolation && currentViolation.type) {
        violations.push(currentViolation as Violation)
      }

      // Determine overall severity
      const severityLevels = { critical: 4, high: 3, medium: 2, low: 1 }
      const maxSeverity = violations.length > 0
        ? violations.reduce((max, v) => Math.max(max, severityLevels[v.severity] || 2), 0)
        : 1

      const severityMap = { 4: 'critical', 3: 'high', 2: 'medium', 1: 'low' } as const

      return {
        violations,
        authenticity: {
          isAuthentic: !response.toLowerCase().includes('inauthentic') && !response.toLowerCase().includes('forged'),
          issues: [],
          missingElements: [],
          recommendations: ['Document appears authentic']
        },
        chainOfCustody: {
          intact: !response.toLowerCase().includes('chain') || !response.toLowerCase().includes('broken'),
          gaps: [],
          timeline: []
        },
        recommendations: ['Consult with legal counsel', 'Preserve all related documents'],
        severity: severityMap[maxSeverity as keyof typeof severityMap] || 'medium',
        confidence: 0.8
      }
    } catch (error) {
      console.error('Error parsing analysis response:', error)
      return {
        violations: [],
        authenticity: { isAuthentic: true, issues: [], missingElements: [], recommendations: [] },
        chainOfCustody: { intact: true, gaps: [], timeline: [] },
        recommendations: ['Manual review recommended'],
        severity: 'low',
        confidence: 0.5
      }
    }
  }

  private extractSources(content: string): string[] {
    // Extract legal citations and references
    const sources: string[] = []
    const citationRegex = /(42 U\.S\.C\. § \d+|[A-Z][a-z]+ v\. [A-Z][a-z]+|\d+ U\.S\. \d+)/g
    const matches = content.match(citationRegex)
    if (matches) {
      sources.push(...matches)
    }
    return sources
  }

  private generateFollowUpQuestions(response: string, mode: string): string[] {
    const questions = []

    if (mode === 'research') {
      questions.push('Would you like me to research specific case law?', 'Need help understanding these legal concepts?')
    } else if (mode === 'drafting') {
      questions.push('Would you like me to modify this document?', 'Need help with filing procedures?')
    } else if (mode === 'analysis') {
      questions.push('Would you like me to analyze specific evidence?', 'Need help with case strategy?')
    } else if (mode === 'education') {
      questions.push('Would you like more details on any of these rights?', 'Need help understanding next steps?')
    }

    return questions.slice(0, 2)
  }
}

export const aiService = new AIService()
