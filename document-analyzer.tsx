'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Shield,
  Search,
  Download,
  Brain,
  Fingerprint,
  Link,
  AlertCircle,
  FileWarning,
  ShieldAlert
} from 'lucide-react'
import { analyzeDocument } from '@/lib/document-analysis'
import { validateToxicologyReport } from '@/lib/toxicology-validator'
import { detectConstitutionalViolations } from '@/lib/violation-detector'
import { cn } from '@/lib/utils'

interface AnalysisResult {
  documentType: string
  violations: Violation[]
  authenticity: AuthenticityReport
  chainOfCustody: ChainOfCustodyReport
  recommendations: string[]
  severity: 'critical' | 'high' | 'medium' | 'low'
}

interface Violation {
  type: string
  description: string
  legalBasis: string
  evidence: string[]
  severity: 'critical' | 'high' | 'medium' | 'low'
  remedies: string[]
}

interface AuthenticityReport {
  isAuthentic: boolean
  issues: string[]
  missingElements: string[]
  recommendations: string[]
}

interface ChainOfCustodyReport {
  intact: boolean
  gaps: string[]
  timeline: CustodyEvent[]
}

interface CustodyEvent {
  date: string
  action: string
  actor: string
  verified: boolean
}

export function DocumentAnalyzer() {
  const [files, setFiles] = useState<File[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<Map<string, AnalysisResult>>(new Map())
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/*': ['.txt', '.csv']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  })

  const analyzeDocuments = async () => {
    setAnalyzing(true)
    setProgress(0)
    
    const totalFiles = files.length
    const newResults = new Map<string, AnalysisResult>()

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setProgress(((i + 1) / totalFiles) * 100)

      try {
        // Perform comprehensive analysis
        const result = await analyzeDocument(file)
        newResults.set(file.name, result)
      } catch (error) {
        console.error('Analysis failed for', file.name, error)
      }
    }

    setResults(newResults)
    setAnalyzing(false)
    if (files.length > 0) {
      setSelectedFile(files[0].name)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'secondary'
      default: return 'default'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <ShieldAlert className="h-4 w-4" />
      case 'high': return <AlertTriangle className="h-4 w-4" />
      case 'medium': return <AlertCircle className="h-4 w-4" />
      case 'low': return <FileWarning className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const selectedResult = selectedFile ? results.get(selectedFile) : null

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Document Intelligence Engine
          </CardTitle>
          <CardDescription>
            Upload court documents for AI-powered constitutional violation detection and authenticity verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop documents here' : 'Drag & drop documents'}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to select files (PDF, images, text)
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              All documents are encrypted and analyzed locally
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Uploaded Documents ({files.length})</h4>
                <Button 
                  onClick={analyzeDocuments} 
                  disabled={analyzing}
                  className="gap-2"
                >
                  {analyzing ? (
                    <>Analyzing...</>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Analyze All
                    </>
                  )}
                </Button>
              </div>
              
              {analyzing && (
                <Progress value={progress} className="h-2" />
              )}

              <ScrollArea className="h-32 border rounded-lg p-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer",
                      selectedFile === file.name && "bg-muted"
                    )}
                    onClick={() => setSelectedFile(file.name)}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    {results.has(file.name) && (
                      <Badge variant={getSeverityColor(results.get(file.name)!.severity)}>
                        {getSeverityIcon(results.get(file.name)!.severity)}
                      </Badge>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <AnimatePresence mode="wait">
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Analysis Results: {selectedFile}</CardTitle>
                    <CardDescription>
                      Document Type: {selectedResult.documentType}
                    </CardDescription>
                  </div>
                  <Badge variant={getSeverityColor(selectedResult.severity)} className="gap-1">
                    {getSeverityIcon(selectedResult.severity)}
                    <span>{selectedResult.severity.toUpperCase()}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="violations" className="space-y-4">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="violations">
                      Violations ({selectedResult.violations.length})
                    </TabsTrigger>
                    <TabsTrigger value="authenticity">
                      Authenticity
                    </TabsTrigger>
                    <TabsTrigger value="chain">
                      Chain of Custody
                    </TabsTrigger>
                    <TabsTrigger value="recommendations">
                      Actions
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="violations" className="space-y-4">
                    {selectedResult.violations.length === 0 ? (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>No Violations Detected</AlertTitle>
                        <AlertDescription>
                          This document appears to comply with constitutional requirements.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      selectedResult.violations.map((violation, index) => (
                        <Alert
                          key={index}
                          className={cn(
                            "border-2",
                            violation.severity === 'critical' && "border-red-500 bg-red-50 dark:bg-red-950/20",
                            violation.severity === 'high' && "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                          )}
                        >
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle className="flex items-center gap-2">
                            {violation.type}
                            <Badge variant={getSeverityColor(violation.severity)} className="ml-2">
                              {violation.severity}
                            </Badge>
                          </AlertTitle>
                          <AlertDescription className="space-y-2 mt-2">
                            <p>{violation.description}</p>
                            <div>
                              <p className="font-semibold text-sm">Legal Basis:</p>
                              <p className="text-sm">{violation.legalBasis}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-sm">Recommended Remedies:</p>
                              <ul className="list-disc list-inside text-sm">
                                {violation.remedies.map((remedy, i) => (
                                  <li key={i}>{remedy}</li>
                                ))}
                              </ul>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="authenticity" className="space-y-4">
                    <Alert className={selectedResult.authenticity.isAuthentic ? '' : 'border-red-500'}>
                      <Shield className="h-4 w-4" />
                      <AlertTitle>
                        {selectedResult.authenticity.isAuthentic ? 'Document Authenticated' : 'Authentication Issues Detected'}
                      </AlertTitle>
                      <AlertDescription>
                        {selectedResult.authenticity.isAuthentic ? (
                          <p>This document meets authentication requirements.</p>
                        ) : (
                          <div className="space-y-2 mt-2">
                            <p className="font-semibold">Issues Found:</p>
                            <ul className="list-disc list-inside">
                              {selectedResult.authenticity.issues.map((issue, i) => (
                                <li key={i}>{issue}</li>
                              ))}
                            </ul>
                            <p className="font-semibold mt-2">Missing Elements:</p>
                            <ul className="list-disc list-inside">
                              {selectedResult.authenticity.missingElements.map((element, i) => (
                                <li key={i}>{element}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="chain" className="space-y-4">
                    <Alert className={selectedResult.chainOfCustody.intact ? '' : 'border-orange-500'}>
                      <Link className="h-4 w-4" />
                      <AlertTitle>
                        Chain of Custody {selectedResult.chainOfCustody.intact ? 'Intact' : 'Compromised'}
                      </AlertTitle>
                      <AlertDescription>
                        {selectedResult.chainOfCustody.gaps.length > 0 && (
                          <div className="space-y-2 mt-2">
                            <p className="font-semibold">Gaps Identified:</p>
                            <ul className="list-disc list-inside">
                              {selectedResult.chainOfCustody.gaps.map((gap, i) => (
                                <li key={i}>{gap}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="mt-4">
                          <p className="font-semibold">Custody Timeline:</p>
                          <div className="space-y-1 mt-2">
                            {selectedResult.chainOfCustody.timeline.map((event, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                {event.verified ? (
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                ) : (
                                  <XCircle className="h-3 w-3 text-red-500" />
                                )}
                                <span className="font-mono text-xs">{event.date}</span>
                                <span>{event.action} by {event.actor}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recommended Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedResult.recommendations.map((rec, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <p className="text-sm">{rec}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export Report
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Shield className="h-4 w-4" />
                            Generate Legal Response
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
