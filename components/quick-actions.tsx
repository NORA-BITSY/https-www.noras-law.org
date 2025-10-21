'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  FileText,
  Upload,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Zap,
  Shield,
  Scale,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  priority: 'high' | 'medium' | 'low'
  category: 'urgent' | 'filing' | 'evidence' | 'communication'
  action: () => void
}

export function QuickActions() {
  const [completedActions, setCompletedActions] = useState<string[]>([])

  const quickActions: QuickAction[] = [
    {
      id: 'upload-evidence',
      title: 'Upload Evidence',
      description: 'Securely upload and verify case documents',
      icon: <Upload className="h-5 w-5" />,
      color: 'from-blue-500 to-cyan-500',
      priority: 'high',
      category: 'evidence',
      action: () => console.log('Upload evidence')
    },
    {
      id: 'file-motion',
      title: 'File Emergency Motion',
      description: 'Generate and file urgent court motion',
      icon: <FileText className="h-5 w-5" />,
      color: 'from-red-500 to-pink-500',
      priority: 'high',
      category: 'urgent',
      action: () => console.log('File motion')
    },
    {
      id: 'check-deadlines',
      title: 'Check Deadlines',
      description: 'Review upcoming court deadlines',
      icon: <Clock className="h-5 w-5" />,
      color: 'from-yellow-500 to-orange-500',
      priority: 'high',
      category: 'urgent',
      action: () => console.log('Check deadlines')
    },
    {
      id: 'contact-attorney',
      title: 'Contact Attorney',
      description: 'Schedule consultation with legal counsel',
      icon: <Users className="h-5 w-5" />,
      color: 'from-green-500 to-teal-500',
      priority: 'medium',
      category: 'communication',
      action: () => console.log('Contact attorney')
    },
    {
      id: 'analyze-document',
      title: 'Analyze Document',
      description: 'AI-powered analysis of court documents',
      icon: <Search className="h-5 w-5" />,
      color: 'from-purple-500 to-indigo-500',
      priority: 'medium',
      category: 'evidence',
      action: () => console.log('Analyze document')
    },
    {
      id: 'start-petition',
      title: 'Start Petition',
      description: 'Create civil rights reform petition',
      icon: <Plus className="h-5 w-5" />,
      color: 'from-indigo-500 to-purple-500',
      priority: 'low',
      category: 'filing',
      action: () => console.log('Start petition')
    }
  ]

  const urgentActions = quickActions.filter(action => action.priority === 'high')
  const pendingActions = quickActions.filter(action => !completedActions.includes(action.id))

  const handleActionComplete = (actionId: string) => {
    setCompletedActions(prev => [...prev, actionId])
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-950/20'
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20'
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-950/20'
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20'
    }
  }

  return (
    <div className="space-y-4">
      {/* Urgent Actions Alert */}
      {urgentActions.length > 0 && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 dark:text-red-100">
            Urgent Actions Required
          </AlertTitle>
          <AlertDescription className="text-red-800 dark:text-red-200">
            {urgentActions.length} high-priority action{urgentActions.length > 1 ? 's' : ''} need immediate attention
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-lg group",
                completedActions.includes(action.id) && "opacity-60"
              )}
              onClick={() => {
                action.action()
                handleActionComplete(action.id)
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white group-hover:scale-110 transition-transform",
                    action.color
                  )}>
                    {action.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", getPriorityColor(action.priority))}
                    >
                      {action.priority}
                    </Badge>
                    {completedActions.includes(action.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-base">{action.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm">
                  {action.description}
                </CardDescription>
                <Button
                  className="w-full mt-3"
                  size="sm"
                  variant={action.priority === 'high' ? 'default' : 'outline'}
                  disabled={completedActions.includes(action.id)}
                >
                  {completedActions.includes(action.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Take Action
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Action Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {urgentActions.length}
              </div>
              <div className="text-xs text-muted-foreground">Urgent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {pendingActions.length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {completedActions.length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((completedActions.length / quickActions.length) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedActions.slice(-3).reverse().map((actionId) => {
              const action = quickActions.find(a => a.id === actionId)
              if (!action) return null

              return (
                <div key={actionId} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                  <div className={cn(
                    "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white",
                    action.color
                  )}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Completed • {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              )
            })}
            {completedActions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">Complete actions to see your progress here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
