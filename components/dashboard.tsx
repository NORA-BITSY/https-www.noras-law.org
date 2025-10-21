'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Scale,
  FileText,
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Import components
import { QuickActions } from './quick-actions'
import { EvidenceVault } from './evidence-vault'
import { PetitionHub } from './petition-hub'
import { ComplianceTracker } from './compliance-tracker'
import { Timeline3D } from './timeline-3d'

interface DashboardStats {
  activeCases: number
  pendingDeadlines: number
  completedTasks: number
  evidenceItems: number
  petitionsSigned: number
  complianceScore: number
}

const mockStats: DashboardStats = {
  activeCases: 2,
  pendingDeadlines: 5,
  completedTasks: 23,
  evidenceItems: 47,
  petitionsSigned: 12,
  complianceScore: 87
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = mockStats

  const urgentItems = [
    {
      id: '1',
      title: 'Motion for Summary Judgment Due',
      description: 'File by March 1st - 3 days remaining',
      type: 'deadline',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Discovery Responses Overdue',
      description: 'Responses to interrogatories past due',
      type: 'compliance',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Witness Deposition Scheduled',
      description: 'Dr. Smith deposition - Tomorrow 2:00 PM',
      type: 'court',
      priority: 'medium'
    }
  ]

  const recentActivity = [
    {
      id: '1',
      action: 'Evidence Uploaded',
      description: 'Toxicology report added to vault',
      timestamp: '2 hours ago',
      type: 'evidence'
    },
    {
      id: '2',
      action: 'Petition Signed',
      description: 'Signed "Reform Family Court Standards"',
      timestamp: '1 day ago',
      type: 'petition'
    },
    {
      id: '3',
      action: 'Compliance Updated',
      description: 'Discovery deadline marked complete',
      timestamp: '2 days ago',
      type: 'compliance'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nora's Law Dashboard</h1>
          <p className="text-muted-foreground">
            Civil Rights Defense Through Technology
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Protected
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        </div>
      </div>

      {/* Urgent Alerts */}
      {urgentItems.length > 0 && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 dark:text-red-100">
            Urgent Attention Required
          </AlertTitle>
          <AlertDescription className="text-red-800 dark:text-red-200">
            {urgentItems.length} critical item{urgentItems.length > 1 ? 's' : ''} need immediate action
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCases}</div>
            <p className="text-xs text-muted-foreground">
              Currently managed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Deadlines</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.pendingDeadlines}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evidence Items</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.evidenceItems}</div>
            <p className="text-xs text-muted-foreground">
              In secure vault
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Petitions Signed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.petitionsSigned}</div>
            <p className="text-xs text-muted-foreground">
              Active campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.complianceScore}%</div>
            <Progress value={stats.complianceScore} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="petitions">Petitions</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Frequently used tools and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuickActions />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest updates and actions taken
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.action}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {activity.timestamp}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Urgent Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Urgent Items
              </CardTitle>
              <CardDescription>
                Items requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {urgentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="destructive">
                      Take Action
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence">
          <EvidenceVault />
        </TabsContent>

        <TabsContent value="petitions">
          <PetitionHub />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceTracker />
        </TabsContent>

        <TabsContent value="timeline">
          <Timeline3D />
        </TabsContent>

        <TabsContent value="actions">
          <QuickActions />
        </TabsContent>
      </Tabs>
    </div>
  )
}
