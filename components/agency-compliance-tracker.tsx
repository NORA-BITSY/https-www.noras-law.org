'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
  Shield,
  Target,
  TrendingDown,
  Gavel,
  Scale,
  Users,
  Eye,
  X
} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface AgencyObligation {
  id: string
  title: string
  description: string
  category: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'compliant' | 'non-compliant' | 'pending-review' | 'overdue'
  dueDate?: Date
  completedDate?: Date
  caseId?: string
  legalBasis: string[]
  requiredActions: string[]
  evidence: string[]
  violations: string[]
  deadline: Date
  agency: string
}

interface AgencyCategory {
  id: string
  name: string
  description: string
  obligations: AgencyObligation[]
  complianceRate: number
  criticalViolations: number
}

const agencyCategories: AgencyCategory[] = [
  {
    id: 'discovery',
    name: 'Discovery Obligations',
    description: 'Agency compliance with discovery requests and responses',
    complianceRate: 45,
    criticalViolations: 3,
    obligations: [
      {
        id: '1',
        title: 'Respond to Interrogatories',
        description: 'Provide complete responses to interrogatories within 30 days',
        category: 'discovery',
        priority: 'high',
        status: 'non-compliant',
        dueDate: new Date('2024-02-15'),
        caseId: '2024-001',
        legalBasis: ['Minnesota Rules of Civil Procedure 33', 'Federal Rule of Civil Procedure 33'],
        requiredActions: [
          'Answer each interrogatory fully and completely',
          'Object specifically to any improper questions',
          'Provide privilege log for withheld information'
        ],
        evidence: [],
        violations: ['Response provided after 45-day delay', 'Incomplete answers to 12 of 25 interrogatories'],
        deadline: new Date('2024-02-15'),
        agency: 'Pierce County DHS'
      },
      {
        id: '2',
        title: 'Produce Requested Documents',
        description: 'Provide all responsive documents in response to document requests',
        category: 'discovery',
        priority: 'high',
        status: 'non-compliant',
        dueDate: new Date('2024-02-20'),
        caseId: '2024-001',
        legalBasis: ['Minnesota Rules of Civil Procedure 34', 'Federal Rule of Civil Procedure 34'],
        requiredActions: [
          'Conduct reasonable search for responsive documents',
          'Produce documents in native format',
          'Provide privilege log for withheld documents'
        ],
        evidence: [],
        violations: ['Failed to produce toxicology lab records', 'No privilege log provided'],
        deadline: new Date('2024-02-20'),
        agency: 'Pierce County DHS'
      }
    ]
  },
  {
    id: 'due-process',
    name: 'Due Process Requirements',
    description: 'Compliance with constitutional due process obligations',
    complianceRate: 30,
    criticalViolations: 5,
    obligations: [
      {
        id: '3',
        title: 'Provide Timely Notice',
        description: 'Give proper notice of hearings and proceedings to all parties',
        category: 'due-process',
        priority: 'critical',
        status: 'non-compliant',
        dueDate: new Date('2024-01-10'),
        caseId: '2024-001',
        legalBasis: ['14th Amendment Due Process Clause', 'Minnesota Statutes § 260C.151'],
        requiredActions: [
          'Provide written notice 10 days before hearing',
          'Include all required information in notice',
          'Serve notice by certified mail or personal service'
        ],
        evidence: [],
        violations: ['Notice provided only 3 days before emergency hearing', 'Incomplete notice lacking case facts'],
        deadline: new Date('2024-01-10'),
        agency: 'Pierce County Court'
      },
      {
        id: '4',
        title: 'Impartial Decision Maker',
        description: 'Ensure judge has no conflicts of interest in the case',
        category: 'due-process',
        priority: 'critical',
        status: 'pending-review',
        caseId: '2024-001',
        legalBasis: ['14th Amendment Due Process Clause', 'Code of Judicial Conduct'],
        requiredActions: [
          'Disclose any relationships with parties',
          'Recuse if impartiality cannot be assured',
          'Document recusal decisions'
        ],
        evidence: [],
        violations: [],
        deadline: new Date('2024-01-05'),
        agency: 'Pierce County Court'
      }
    ]
  },
  {
    id: 'evidence-standards',
    name: 'Evidence Standards',
    description: 'Compliance with evidence collection and authentication requirements',
    complianceRate: 20,
    criticalViolations: 4,
    obligations: [
      {
        id: '5',
        title: 'Authenticate Forensic Evidence',
        description: 'Provide proper authentication for all forensic testing results',
        category: 'evidence-standards',
        priority: 'critical',
        status: 'non-compliant',
        dueDate: new Date('2024-02-01'),
        caseId: '2024-001',
        legalBasis: ['Minnesota Rules of Evidence 901', 'Federal Rules of Evidence 901'],
        requiredActions: [
          'Provide complete chain of custody documentation',
          'Verify laboratory accreditation and certification',
          'Authenticate testing methodology and validation'
        ],
        evidence: [],
        violations: ['No laboratory records provided', 'Evidence created on personal computer', 'Scientifically impossible results'],
        deadline: new Date('2024-02-01'),
        agency: 'Pierce County DHS'
      },
      {
        id: '6',
        title: 'Preserve Evidence',
        description: 'Maintain integrity of all evidence in the case',
        category: 'evidence-standards',
        priority: 'high',
        status: 'non-compliant',
        caseId: '2024-001',
        legalBasis: ['Minnesota Statutes § 260C.197', 'Federal Rules of Civil Procedure 37'],
        requiredActions: [
          'Issue preservation letters to all parties',
          'Document chain of custody for all evidence',
          'Prevent spoliation of evidence'
        ],
        evidence: [],
        violations: ['Failed to preserve original toxicology samples', 'No chain of custody documentation'],
        deadline: new Date('2024-01-15'),
        agency: 'Pierce County DHS'
      }
    ]
  }
]

export function AgencyComplianceTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedObligation, setSelectedObligation] = useState<AgencyObligation | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500'
      case 'non-compliant': return 'bg-red-500'
      case 'pending-review': return 'bg-yellow-500'
      case 'overdue': return 'bg-red-600'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 dark:bg-red-950/20'
      case 'high': return 'text-orange-600 bg-orange-50 dark:bg-orange-950/20'
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20'
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-950/20'
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20'
    }
  }

  const filteredObligations = selectedCategory
    ? agencyCategories.find(cat => cat.id === selectedCategory)?.obligations || []
    : agencyCategories.flatMap(cat => cat.obligations)

  const statusFilteredObligations = filterStatus === 'all'
    ? filteredObligations
    : filteredObligations.filter(obligation => obligation.status === filterStatus)

  const overallComplianceRate = Math.round(
    agencyCategories.reduce((sum, cat) => sum + cat.complianceRate, 0) / agencyCategories.length
  )

  const totalCriticalViolations = agencyCategories.reduce((sum, cat) => sum + cat.criticalViolations, 0)

  const overdueObligations = filteredObligations.filter(obligation =>
    obligation.dueDate && obligation.status === 'non-compliant' && obligation.dueDate < new Date()
  )

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overallComplianceRate}%</div>
            <Progress value={overallComplianceRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Agency obligations met
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalCriticalViolations}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Obligations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueObligations.length}</div>
            <p className="text-xs text-muted-foreground">
              Past deadline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Compliant</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredObligations.filter(o => o.status === 'non-compliant').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active violations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Violations Alert */}
      {totalCriticalViolations > 0 && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 dark:text-red-100">
            Critical Agency Violations Detected
          </AlertTitle>
          <AlertDescription className="text-red-800 dark:text-red-200">
            {totalCriticalViolations} critical violations require immediate legal action. These may constitute civil rights violations.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Agency Compliance Tracker
          </CardTitle>
          <CardDescription>
            Monitor agency compliance with legal obligations, deadlines, and constitutional requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="categories" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="categories">By Category</TabsTrigger>
                <TabsTrigger value="violations">Violations</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                  <option value="pending-review">Pending Review</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            <TabsContent value="categories" className="space-y-6">
              {agencyCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">{category.complianceRate}%</div>
                          <Progress value={category.complianceRate} className="w-24 h-2 mt-1" />
                          <div className="text-xs text-muted-foreground mt-1">
                            {category.criticalViolations} critical violations
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.obligations.map((obligation) => (
                          <div
                            key={obligation.id}
                            className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer"
                            onClick={() => setSelectedObligation(obligation)}
                          >
                            <div className="w-3 h-3 rounded-full mt-2 border-2 flex-shrink-0"
                                 style={{ backgroundColor: getStatusColor(obligation.status) }} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{obligation.title}</h4>
                                <Badge
                                  className={cn("text-xs", getStatusColor(obligation.status))}
                                >
                                  {obligation.status.replace('-', ' ')}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={cn("text-xs", getPriorityColor(obligation.priority))}
                                >
                                  {obligation.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {obligation.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Agency: {obligation.agency}</span>
                                {obligation.dueDate && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Due: {obligation.dueDate.toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                              {obligation.violations.length > 0 && (
                                <div className="mt-2 p-2 bg-red-50 dark:bg-red-950/20 rounded text-xs">
                                  <strong>Violations:</strong> {obligation.violations.join('; ')}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="violations" className="space-y-4">
              <div className="space-y-3">
                {statusFilteredObligations
                  .filter(obligation => obligation.violations.length > 0)
                  .map((obligation) => (
                    <Card key={obligation.id} className="border-red-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg text-red-900 dark:text-red-100">
                              {obligation.title}
                            </CardTitle>
                            <CardDescription className="text-red-700 dark:text-red-300">
                              {obligation.agency} • {obligation.category}
                            </CardDescription>
                          </div>
                          <Badge className="bg-red-500">
                            {obligation.priority} priority
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm mb-2">Legal Basis:</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {obligation.legalBasis.map((basis: string, index: number) => (
                                <li key={index}>• {basis}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-sm mb-2">Violations:</h5>
                            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                              {obligation.violations.map((violation: string, index: number) => (
                                <li key={index}>• {violation}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-sm mb-2">Required Actions:</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {obligation.requiredActions.map((action: string, index: number) => (
                                <li key={index}>• {action}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="destructive">
                              File Motion to Compel
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Evidence
                            </Button>
                            <Button size="sm" variant="outline">
                              Document Violation
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {statusFilteredObligations
                    .sort((a, b) => (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0))
                    .map((obligation, index) => (
                      <motion.div
                        key={obligation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-3 h-3 rounded-full border-2",
                            obligation.status === 'compliant' ? 'bg-green-500 border-green-500' : 'bg-red-500 border-red-500'
                          )} />
                          {index < statusFilteredObligations.length - 1 && (
                            <div className="w-px h-16 bg-gray-200 mt-2" />
                          )}
                        </div>
                        <Card className="flex-1">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">{obligation.title}</h4>
                                  <Badge
                                    className={cn("text-xs", getStatusColor(obligation.status))}
                                  >
                                    {obligation.status.replace('-', ' ')}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {obligation.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>Agency: {obligation.agency}</span>
                                  {obligation.dueDate && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {obligation.dueDate.toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                                {obligation.violations.length > 0 && (
                                  <div className="mt-2 text-xs text-red-600">
                                    Violations: {obligation.violations.join('; ')}
                                  </div>
                                )}
                              </div>
                              <Button size="sm" variant="outline">
                                Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Obligation Details Modal */}
      <AnimatePresence>
        {selectedObligation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedObligation(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-4 h-4 rounded-full",
                      getStatusColor(selectedObligation.status)
                    )} />
                    <div>
                      <h3 className="font-semibold">{selectedObligation.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedObligation.agency} • {selectedObligation.category}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedObligation(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedObligation.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedObligation.dueDate?.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge className={cn("mt-1", getStatusColor(selectedObligation.status))}>
                      {selectedObligation.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Legal Basis</Label>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    {selectedObligation.legalBasis.map((basis, index) => (
                      <li key={index}>• {basis}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label className="text-sm font-medium">Required Actions</Label>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    {selectedObligation.requiredActions.map((action, index) => (
                      <li key={index}>• {action}</li>
                    ))}
                  </ul>
                </div>

                {selectedObligation.violations.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-red-600">Violations</Label>
                    <ul className="text-sm text-red-700 dark:text-red-300 mt-1 space-y-1">
                      {selectedObligation.violations.map((violation, index) => (
                        <li key={index}>• {violation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Motion to Compel
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Related Evidence
                  </Button>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Report to Oversight
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
