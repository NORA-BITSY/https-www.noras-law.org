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
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  FileText,
  Shield,
  Target,
  TrendingUp,
  X,
  CheckSquare,
  Square
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComplianceItem {
  id: string
  title: string
  description: string
  category: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  dueDate?: Date
  completedDate?: Date
  caseId?: string
  requirements: string[]
  evidence: string[]
}

interface ComplianceCategory {
  id: string
  name: string
  description: string
  items: ComplianceItem[]
  progress: number
}

const complianceCategories: ComplianceCategory[] = [
  {
    id: 'discovery',
    name: 'Discovery Compliance',
    description: 'Ensure all discovery requests are properly filed and tracked',
    progress: 75,
    items: [
      {
        id: '1',
        title: 'File Initial Discovery Requests',
        description: 'Submit interrogatories, requests for production, and admissions',
        category: 'discovery',
        priority: 'high',
        status: 'completed',
        dueDate: new Date('2024-02-01'),
        completedDate: new Date('2024-01-28'),
        caseId: '2024-001',
        requirements: [
          'Serve interrogatories within 30 days of answer',
          'Include requests for medical records',
          'Request toxicology testing protocols'
        ],
        evidence: ['discovery-requests.pdf', 'service-confirmation.pdf']
      },
      {
        id: '2',
        title: 'Respond to Defendant\'s Discovery',
        description: 'Review and respond to opposing party\'s discovery requests',
        category: 'discovery',
        priority: 'high',
        status: 'in-progress',
        dueDate: new Date('2024-03-15'),
        caseId: '2024-001',
        requirements: [
          'Review all requests for relevance',
          'Prepare privilege log if needed',
          'File responses by deadline'
        ],
        evidence: []
      }
    ]
  },
  {
    id: 'evidence',
    name: 'Evidence Preservation',
    description: 'Preserve and document all evidence in the case',
    progress: 60,
    items: [
      {
        id: '3',
        title: 'Send Preservation Letter',
        description: 'Notify all parties of duty to preserve evidence',
        category: 'evidence',
        priority: 'high',
        status: 'completed',
        dueDate: new Date('2024-01-15'),
        completedDate: new Date('2024-01-10'),
        caseId: '2024-001',
        requirements: [
          'Identify all potential evidence sources',
          'Send formal preservation letter',
          'Document receipt confirmations'
        ],
        evidence: ['preservation-letter.pdf', 'certified-mail-receipt.pdf']
      },
      {
        id: '4',
        title: 'Document Chain of Custody',
        description: 'Establish and maintain chain of custody for all evidence',
        category: 'evidence',
        priority: 'medium',
        status: 'pending',
        dueDate: new Date('2024-04-01'),
        caseId: '2024-001',
        requirements: [
          'Photograph evidence in place',
          'Document transfer procedures',
          'Maintain custody logs'
        ],
        evidence: []
      }
    ]
  },
  {
    id: 'court-dates',
    name: 'Court Deadlines',
    description: 'Track all court-imposed deadlines and filing requirements',
    progress: 90,
    items: [
      {
        id: '5',
        title: 'File Motion for Summary Judgment',
        description: 'Prepare and file motion challenging evidence sufficiency',
        category: 'court-dates',
        priority: 'high',
        status: 'pending',
        dueDate: new Date('2024-03-01'),
        caseId: '2024-001',
        requirements: [
          'Complete legal research',
          'Draft motion and memorandum',
          'File with court clerk'
        ],
        evidence: []
      },
      {
        id: '6',
        title: 'Prepare for Depositions',
        description: 'Schedule and prepare for key witness depositions',
        category: 'court-dates',
        priority: 'medium',
        status: 'in-progress',
        dueDate: new Date('2024-03-20'),
        caseId: '2024-001',
        requirements: [
          'Identify key witnesses',
          'Prepare deposition outlines',
          'Coordinate with counsel'
        ],
        evidence: ['witness-list.pdf']
      }
    ]
  }
]

export function ComplianceTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [completedItems, setCompletedItems] = useState<string[]>(['1', '3'])

  const toggleItemCompletion = (itemId: string) => {
    setCompletedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      case 'overdue': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-950/20'
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20'
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-950/20'
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20'
    }
  }

  const filteredItems = selectedCategory
    ? complianceCategories.find(cat => cat.id === selectedCategory)?.items || []
    : complianceCategories.flatMap(cat => cat.items)

  const statusFilteredItems = filterStatus === 'all'
    ? filteredItems
    : filteredItems.filter(item => item.status === filterStatus)

  const overallProgress = Math.round(
    complianceCategories.reduce((sum, cat) => sum + cat.progress, 0) / complianceCategories.length
  )

  const upcomingDeadlines = filteredItems
    .filter(item => item.dueDate && item.status !== 'completed')
    .sort((a, b) => (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Items</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredItems.filter(item => item.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {filteredItems.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">
              within next 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredItems.filter(item => item.priority === 'high' && item.status !== 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Deadlines Alert */}
      {upcomingDeadlines.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Upcoming Deadlines</AlertTitle>
          <AlertDescription>
            <div className="space-y-1">
              {upcomingDeadlines.slice(0, 3).map(item => (
                <div key={item.id} className="text-sm">
                  <strong>{item.title}</strong> - Due {item.dueDate?.toLocaleDateString()}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance Tracker
          </CardTitle>
          <CardDescription>
            Track case requirements, deadlines, and compliance obligations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="categories" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="categories">By Category</TabsTrigger>
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                <TabsTrigger value="checklist">Checklist</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            <TabsContent value="categories" className="space-y-6">
              {complianceCategories.map((category) => (
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
                          <div className="text-2xl font-bold">{category.progress}%</div>
                          <Progress value={category.progress} className="w-24 h-2 mt-1" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <Checkbox
                              checked={completedItems.includes(item.id)}
                              onChange={() => toggleItemCompletion(item.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <Badge
                                  className={cn("text-xs", getStatusColor(item.status))}
                                >
                                  {item.status}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={cn("text-xs", getPriorityColor(item.priority))}
                                >
                                  {item.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {item.description}
                              </p>
                              {item.dueDate && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  Due: {item.dueDate.toLocaleDateString()}
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

            <TabsContent value="timeline" className="space-y-4">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {statusFilteredItems
                    .sort((a, b) => (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0))
                    .map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-3 h-3 rounded-full border-2",
                            item.status === 'completed' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
                          )} />
                          {index < statusFilteredItems.length - 1 && (
                            <div className="w-px h-16 bg-gray-200 mt-2" />
                          )}
                        </div>
                        <Card className="flex-1">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">{item.title}</h4>
                                  <Badge
                                    className={cn("text-xs", getStatusColor(item.status))}
                                  >
                                    {item.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>Category: {item.category}</span>
                                  {item.dueDate && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {item.dueDate.toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Checkbox
                                checked={completedItems.includes(item.id)}
                                onChange={() => toggleItemCompletion(item.id)}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="checklist" className="space-y-4">
              <div className="space-y-2">
                {statusFilteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <Checkbox
                      checked={completedItems.includes(item.id)}
                      onChange={() => toggleItemCompletion(item.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.title}</span>
                        <Badge
                          className={cn("text-xs", getStatusColor(item.status))}
                        >
                          {item.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn("text-xs", getPriorityColor(item.priority))}
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    {item.dueDate && (
                      <div className="text-xs text-muted-foreground">
                        {item.dueDate.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
