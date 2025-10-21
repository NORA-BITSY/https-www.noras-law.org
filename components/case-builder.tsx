'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  FileText,
  Scale,
  Gavel,
  Shield,
  AlertTriangle,
  Download,
  Save,
  Eye,
  Plus,
  X,
  Calendar,
  User,
  Building,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit3
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CaseData {
  plaintiffs: Party[]
  defendants: Party[]
  facts: Fact[]
  claims: Claim[]
  reliefRequested: Relief[]
  jurisdiction: JurisdictionBasis
  venue: string
  exhibits: Exhibit[]
}

interface Party {
  id: string
  name: string
  capacity: string
  address: string
  represented: boolean
  attorney?: string
}

interface Fact {
  id: string
  date: string
  description: string
  evidence: string[]
  exhibit?: string
}

interface Claim {
  id: string
  type: string
  statute: string
  defendants: string[]
  elements: string[]
  facts: string[]
}

interface Relief {
  id: string
  type: 'declaratory' | 'injunctive' | 'damages' | 'other'
  description: string
}

interface JurisdictionBasis {
  federal: boolean
  statute: string
  amount?: number
}

interface Exhibit {
  id: string
  title: string
  description: string
  file?: File
}

const documentTypes = [
  { id: 'complaint', name: 'Federal Complaint', icon: <FileText className="h-4 w-4" /> },
  { id: 'tro', name: 'TRO Motion', icon: <AlertTriangle className="h-4 w-4" /> },
  { id: 'pi', name: 'Preliminary Injunction', icon: <Shield className="h-4 w-4" /> },
  { id: 'declaration', name: 'Declaration', icon: <FileCheck className="h-4 w-4" /> },
  { id: 'exhibit-index', name: 'Exhibit Index', icon: <FileText className="h-4 w-4" /> },
  { id: 'proposed-order', name: 'Proposed Order', icon: <Gavel className="h-4 w-4" /> }
]

const claimTypes = [
  {
    id: '1983-due-process',
    name: '§ 1983 - Due Process (14th Amendment)',
    statute: '42 U.S.C. § 1983',
    elements: [
      'Deprivation of life, liberty, or property',
      'Without due process of law',
      'Under color of state law'
    ]
  },
  {
    id: '1983-first-amendment',
    name: '§ 1983 - First Amendment Retaliation',
    statute: '42 U.S.C. § 1983',
    elements: [
      'Protected speech or conduct',
      'Adverse action by defendant',
      'Causal connection between protected activity and adverse action',
      'Under color of state law'
    ]
  },
  {
    id: '1983-fourth-amendment',
    name: '§ 1983 - Fourth Amendment',
    statute: '42 U.S.C. § 1983',
    elements: [
      'Unreasonable search or seizure',
      'Of person or property',
      'Under color of state law'
    ]
  },
  {
    id: 'monell',
    name: 'Monell - Municipal Liability',
    statute: 'Monell v. Dept. of Social Services',
    elements: [
      'Official policy or custom',
      'Deliberate indifference',
      'Moving force behind constitutional violation',
      'Causation'
    ]
  },
  {
    id: '1985',
    name: '§ 1985(3) - Conspiracy',
    statute: '42 U.S.C. § 1985(3)',
    elements: [
      'Conspiracy between two or more persons',
      'Purpose of depriving equal protection or privileges',
      'Act in furtherance of conspiracy',
      'Injury to person or property'
    ]
  }
]

export function CaseBuilder() {
  const [activeDocument, setActiveDocument] = useState('complaint')
  const [caseData, setCaseData] = useState<CaseData>({
    plaintiffs: [],
    defendants: [],
    facts: [],
    claims: [],
    reliefRequested: [],
    jurisdiction: { federal: true, statute: '28 U.S.C. § 1331' },
    venue: '',
    exhibits: []
  })
  const [generating, setGenerating] = useState(false)
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null)

  const addPlaintiff = () => {
    const newPlaintiff: Party = {
      id: Date.now().toString(),
      name: '',
      capacity: 'individually',
      address: '',
      represented: false
    }
    setCaseData(prev => ({
      ...prev,
      plaintiffs: [...prev.plaintiffs, newPlaintiff]
    }))
  }

  const addDefendant = () => {
    const newDefendant: Party = {
      id: Date.now().toString(),
      name: '',
      capacity: 'official capacity',
      address: '',
      represented: false
    }
    setCaseData(prev => ({
      ...prev,
      defendants: [...prev.defendants, newDefendant]
    }))
  }

  const addFact = () => {
    const newFact: Fact = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      description: '',
      evidence: []
    }
    setCaseData(prev => ({
      ...prev,
      facts: [...prev.facts, newFact]
    }))
  }

  const addClaim = (claimType: typeof claimTypes[0]) => {
    const newClaim: Claim = {
      id: Date.now().toString(),
      type: claimType.name,
      statute: claimType.statute,
      defendants: [],
      elements: claimType.elements,
      facts: []
    }
    setCaseData(prev => ({
      ...prev,
      claims: [...prev.claims, newClaim]
    }))
  }

  const generateDocument = async () => {
    setGenerating(true)
    // Simulate document generation
    setTimeout(() => {
      const document = generateMockDocument(activeDocument, caseData)
      setGeneratedDocument(document)
      setGenerating(false)
    }, 3000)
  }

  const generateMockDocument = (type: string, data: CaseData): string => {
    // This would be replaced with actual document generation
    return `
UNITED STATES DISTRICT COURT
[DISTRICT]

${data.plaintiffs.map(p => p.name).join('\n', ')},
    Plaintiff(s),

v.                                          Case No. ___________

${data.defendants.map(d => d.name).join('\n', ')},
    Defendant(s).

VERIFIED COMPLAINT FOR VIOLATIONS OF CIVIL RIGHTS
(42 U.S.C. § 1983, et al.)

INTRODUCTION

1. This is a civil rights action brought pursuant to 42 U.S.C. § 1983 and the United States Constitution...

JURISDICTION AND VENUE

2. This Court has jurisdiction over this action pursuant to ${data.jurisdiction.statute}...

PARTIES

${data.plaintiffs.map((p, i) => `
${3 + i}. Plaintiff ${p.name} is a citizen residing at ${p.address}...
`).join('\n'')}

${data.defendants.map((d, i) => `
${3 + data.plaintiffs.length + i}. Defendant ${d.name} is sued in their ${d.capacity}...
`).join('\n'')}

FACTUAL ALLEGATIONS

${data.facts.map((f, i) => `
${10 + i}. On ${f.date}, ${f.description}
`).join('\n'')}

CLAIMS FOR RELIEF

${data.claims.map((claim, i) => `
COUNT ${i + 1}: ${claim.type}
(Against ${claim.defendants.join('\n', ') || 'All Defendants'})

${20 + i * 5}. Plaintiff incorporates all preceding paragraphs...

${21 + i * 5}. The elements of this claim are:
${claim.elements.map(e => `   • ${e}`).join('\n'\n')}
`).join('\n'\n\n')}

PRAYER FOR RELIEF

WHEREFORE, Plaintiff respectfully requests that this Court:

${data.reliefRequested.map((r, i) => `
${String.fromCharCode(65 + i)}. ${r.description}
`).join('\n'')}

JURY DEMAND

Plaintiff demands trial by jury on all issues so triable.

Respectfully submitted,

_____________________
[Name]
[Bar Number]
[Address]
[Phone]
[Email]
Attorney for Plaintiff

VERIFICATION

I declare under penalty of perjury under the laws of the United States that the foregoing is true and correct.

Executed on [Date]

_____________________
[Plaintiff Name]
    `
  }

  return (
    <div className="space-y-6">
      {/* Document Type Selector */}
      <div className="grid grid-cols-6 gap-3">
        {documentTypes.map((type) => (
          <Card
            key={type.id}
            className={cn(
              "cursor-pointer transition-all",
              activeDocument === type.id && "ring-2 ring-primary"
            )}
            onClick={() => setActiveDocument(type.id)}
          >
            <CardHeader className="p-3">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  {type.icon}
                </div>
                <span className="text-xs font-medium">{type.name}</span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Case Builder Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Case Builder - {documentTypes.find(d => d.id === activeDocument)?.name}
          </CardTitle>
          <CardDescription>
            Build your federal civil rights case step by step
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="parties" className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="parties">Parties</TabsTrigger>
              <TabsTrigger value="facts">Facts</TabsTrigger>
              <TabsTrigger value="claims">Claims</TabsTrigger>
              <TabsTrigger value="relief">Relief</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>

            <TabsContent value="parties" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Plaintiffs</Label>
                    <Button size="sm" onClick={addPlaintiff}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Plaintiff
                    </Button>
                  </div>
                  {caseData.plaintiffs.map((plaintiff, index) => (
                    <Card key={plaintiff.id} className="p-3 mb-2">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs">Name</Label>
                          <Input
                            placeholder="Full name"
                            value={plaintiff.name}
                            onChange={(e) => {
                              const updated = [...caseData.plaintiffs]
                              updated[index].name = e.target.value
                              setCaseData(prev => ({ ...prev, plaintiffs: updated }))
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Capacity</Label>
                          <Select value={plaintiff.capacity}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individually">Individually</SelectItem>
                              <SelectItem value="parent">As Parent/Guardian</SelectItem>
                              <SelectItem value="representative">Representative</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Address</Label>
                          <Input placeholder="City, State" value={plaintiff.address} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Defendants</Label>
                    <Button size="sm" onClick={addDefendant}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Defendant
                    </Button>
                  </div>
                  {caseData.defendants.map((defendant, index) => (
                    <Card key={defendant.id} className="p-3 mb-2">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs">Name</Label>
                          <Input
                            placeholder="Full name and title"
                            value={defendant.name}
                            onChange={(e) => {
                              const updated = [...caseData.defendants]
                              updated[index].name = e.target.value
                              setCaseData(prev => ({ ...prev, defendants: updated }))
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Capacity</Label>
                          <Select value={defendant.capacity}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="official">Official Capacity</SelectItem>
                              <SelectItem value="individual">Individual Capacity</SelectItem>
                              <SelectItem value="both">Both Capacities</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Entity/Agency</Label>
                          <Input placeholder="Department/Agency" value={defendant.address} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="facts" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Factual Allegations</Label>
                <Button size="sm" onClick={addFact}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Fact
                </Button>
              </div>
              <ScrollArea className="h-[400px]">
                {caseData.facts.map((fact, index) => (
                  <Card key={fact.id} className="p-4 mb-3">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <Label className="text-xs">Date</Label>
                          <Input
                            type="date"
                            value={fact.date}
                            onChange={(e) => {
                              const updated = [...caseData.facts]
                              updated[index].date = e.target.value
                              setCaseData(prev => ({ ...prev, facts: updated }))
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs">Exhibit Reference</Label>
                          <Input placeholder="Exhibit A, B, C..." value={fact.exhibit} />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          placeholder="Describe the factual allegation..."
                          value={fact.description}
                          onChange={(e) => {
                            const updated = [...caseData.facts]
                            updated[index].description = e.target.value
                            setCaseData(prev => ({ ...prev, facts: updated }))
                          }}
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="claims" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {claimTypes.map((claimType) => (
                  <Card
                    key={claimType.id}
                    className="cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => addClaim(claimType)}
                  >
                    <CardHeader>
                      <CardTitle className="text-sm">{claimType.name}</CardTitle>
                      <CardDescription className="text-xs">{claimType.statute}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Elements:</p>
                        <ul className="text-xs space-y-0.5">
                          {claimType.elements.map((element, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                              <span>{element}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {caseData.claims.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Claims</Label>
                  {caseData.claims.map((claim, index) => (
                    <Badge key={claim.id} variant="secondary" className="mr-2">
                      {claim.type}
                    </Badge>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="relief" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Relief Requested</Label>
                  <div className="space-y-2 mt-2">
                    {['Declaratory judgment', 'Preliminary injunction', 'Permanent injunction',
                      'Compensatory damages', 'Punitive damages', 'Attorney fees under § 1988'].map((relief) => (
                      <div key={relief} className="flex items-center space-x-2">
                        <Checkbox id={relief} />
                        <label
                          htmlFor={relief}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {relief}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Review Your Case</AlertTitle>
                <AlertDescription>
                  Please review all information before generating documents
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Case Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Plaintiffs:</span>
                      <span className="ml-2">{caseData.plaintiffs.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Defendants:</span>
                      <span className="ml-2">{caseData.defendants.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Facts:</span>
                      <span className="ml-2">{caseData.facts.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Claims:</span>
                      <span className="ml-2">{caseData.claims.length}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={generateDocument}
                    disabled={generating}
                    className="flex-1"
                  >
                    {generating ? 'Generating...' : 'Generate Document'}
                  </Button>
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {generatedDocument && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Generated Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] w-full rounded border p-4">
                      <pre className="text-xs whitespace-pre-wrap">{generatedDocument}</pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
