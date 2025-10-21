import * as pdfParse from 'pdf-parse'
import { createWorker } from 'tesseract.js'

export interface ProcessedDocument {
  text: string
  metadata: {
    pageCount?: number
    wordCount: number
    language?: string
    extractedDate?: Date
    confidence: number
  }
  sections: DocumentSection[]
}

export interface DocumentSection {
  title: string
  content: string
  pageNumber?: number
  confidence: number
}

export class DocumentProcessor {
  private tesseractWorker: Tesseract.Worker | null = null

  async initializeOCR(): Promise<void> {
    if (!this.tesseractWorker) {
      this.tesseractWorker = await createWorker('eng')
    }
  }

  async processFile(file: File): Promise<ProcessedDocument> {
    const fileType = file.type.toLowerCase()

    let text = ''
    let metadata: ProcessedDocument['metadata'] = {
      wordCount: 0,
      confidence: 0
    }

    try {
      if (fileType.includes('pdf')) {
        const result = await this.processPDF(file)
        text = result.text
        metadata = {
          ...metadata,
          pageCount: result.pageCount,
          wordCount: this.countWords(text),
          confidence: 0.95 // PDF extraction is generally reliable
        }
      } else if (fileType.includes('image')) {
        await this.initializeOCR()
        if (this.tesseractWorker) {
          const { data } = await this.tesseractWorker.recognize(file)
          text = data.text
          metadata = {
            ...metadata,
            wordCount: this.countWords(text),
            confidence: data.confidence / 100
          }
        }
      } else {
        // Plain text files
        text = await file.text()
        metadata = {
          ...metadata,
          wordCount: this.countWords(text),
          confidence: 1.0
        }
      }

      const sections = this.extractSections(text)

      return {
        text,
        metadata,
        sections
      }
    } catch (error) {
      console.error('Document processing error:', error)
      throw new Error(`Failed to process document: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async processPDF(file: File): Promise<{ text: string; pageCount: number }> {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    try {
      const data = await (pdfParse as any)(buffer)
      return {
        text: data.text,
        pageCount: data.numpages
      }
    } catch (error) {
      console.error('PDF parsing error:', error)
      throw new Error('Failed to parse PDF document')
    }
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  private extractSections(text: string): DocumentSection[] {
    const sections: DocumentSection[] = []

    // Common legal document section patterns
    const sectionPatterns = [
      // Court document patterns
      /^(?:I{1,3}\.|A\.|1\.)\s+(.+)$/gm, // Roman numerals, letters, numbers
      /^(?:INTRODUCTION|BACKGROUND|FACTS|ARGUMENT|CONCLUSION|ORDER)$/gm,
      /^(?:Plaintiff|Defendant|Court|Judge|Case|No\.|Date)/gm,

      // CPS/Family Court patterns
      /^(?:PETITION|COMPLAINT|RESPONSE|MOTION|ORDER|REPORT)$/gm,
      /^(?:Child|Parent|Guardian|Attorney|Social Worker)/gm,

      // Medical/Toxicology patterns
      /^(?:LABORATORY REPORT|TOXICOLOGY RESULTS|ANALYSIS|METHODOLOGY)$/gm,
      /^(?:Patient|Specimen|Test|Result|Reference Range)/gm,

      // General patterns
      /^([A-Z][A-Z\s]{2,}):/gm, // ALL CAPS headers
      /^(\d+\.)\s+(.+)$/gm, // Numbered sections
    ]

    const lines = text.split('\n')
    let currentSection: Partial<DocumentSection> | null = null

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Check if line matches any section pattern
      const isSectionHeader = sectionPatterns.some(pattern => pattern.test(line))

      if (isSectionHeader && line.length > 0) {
        // Save previous section if exists
        if (currentSection && currentSection.title && currentSection.content) {
          sections.push(currentSection as DocumentSection)
        }

        // Start new section
        currentSection = {
          title: line,
          content: '',
          confidence: 0.8
        }
      } else if (currentSection && line.length > 0) {
        // Add to current section
        currentSection.content = (currentSection.content || '') + line + '\n'
      }
    }

    // Add final section
    if (currentSection && currentSection.title && currentSection.content) {
      sections.push(currentSection as DocumentSection)
    }

    // If no sections found, create a single section with all content
    if (sections.length === 0) {
      sections.push({
        title: 'Document Content',
        content: text,
        confidence: 0.9
      })
    }

    return sections
  }

  async cleanup(): Promise<void> {
    if (this.tesseractWorker) {
      await this.tesseractWorker.terminate()
      this.tesseractWorker = null
    }
  }
}

export const documentProcessor = new DocumentProcessor()
