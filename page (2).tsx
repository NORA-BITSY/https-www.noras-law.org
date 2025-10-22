'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DocumentAnalyzer } from '@/components/document-analyzer'
import { CaseBuilder } from '@/components/case-builder'
import { LegalAssistant } from '@/components/legal-assistant'
import { EvidenceVault } from '@/components/evidence-vault'
import { PetitionHub } from '@/components/petition-hub'
import { ComplianceTracker } from '@/components/compliance-tracker'
import { Timeline3D } from '@/components/timeline-3d'
import { QuickActions } from '@/components/quick-actions'
import { CaseMetrics } from '@/components/case-metrics'
import { 
  FileText, 
  Shield, 
  Scale, 
  Users, 
  AlertCircle,
  Gavel,
  Brain,
  Lock,
  TrendingUp,
  Calendar
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [activeCase, setActiveCase] = useState(null)
  const [metrics, setMetrics] = useState({
    documentsAnalyzed: 0,
    violationsDetected: 0,
    petitionSignatures: 0,
    activeCases: 0
  })

  useEffect(() => {
    // Fetch user's case data and metrics
    fetchUserMetrics()
  }, [user])

  const fetchUserMetrics = async () => {
    // Implementation for fetching metrics
  }

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Document Intelligence',
      description: 'AI-powered analysis of court documents for constitutional violations',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Evidence Vault',
      description: 'Secure, encrypted storage with blockchain verification',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: 'Case Builder',
      description: 'Generate federal complaints, TROs, and legal documents',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'Legal AI Assistant',
      description: 'Expert guidance on civil rights and constitutional law',
      color: 'from-green-500 to-teal-500'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section with 3D Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Nora's Law Civil Rights Platform
            </CardTitle>
            <CardDescription className="text-lg">
              Defending Constitutional Rights Through Technology & Advocacy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <QuickActions />
                <CaseMetrics metrics={metrics} />
              </div>
              <div className="h-[300px]">
                <Timeline3D caseData={activeCase} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alert Banner for Urgent Actions */}
      {activeCase?.urgentActions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 dark:bg-red-950/30 border-2 border-red-500 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                Urgent Action Required
              </h3>
              <p className="text-red-700 dark:text-red-300">
                {activeCase.urgentActions[0]?.description}
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Take Action
            </Button>
          </div>
        </motion.div>
      )}

      {/* Main Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Workspace Tabs */}
      <Card className="border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gavel className="h-6 w-6" />
            Litigation Command Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="analyzer" className="space-y-6">
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="analyzer">Analyze</TabsTrigger>
              <TabsTrigger value="builder">Build Case</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
              <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="petitions">Petitions</TabsTrigger>
            </TabsList>

            <TabsContent value="analyzer" className="space-y-4">
              <DocumentAnalyzer />
            </TabsContent>

            <TabsContent value="builder" className="space-y-4">
              <CaseBuilder />
            </TabsContent>

            <TabsContent value="evidence" className="space-y-4">
              <EvidenceVault />
            </TabsContent>

            <TabsContent value="assistant" className="space-y-4">
              <LegalAssistant />
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <ComplianceTracker />
            </TabsContent>

            <TabsContent value="petitions" className="space-y-4">
              <PetitionHub />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Community & Support Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with others defending their rights
            </p>
            <Button variant="outline" className="w-full">
              Join Community
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Impact Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Cases Won</span>
                <span className="font-bold">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Rights Restored</span>
                <span className="font-bold">1,823</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">
                <p className="font-semibold">TRO Response Due</p>
                <p className="text-muted-foreground">March 15, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
