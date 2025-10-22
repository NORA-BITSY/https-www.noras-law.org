'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Users,
  Target,
  TrendingUp,
  Share2,
  Heart,
  MessageSquare,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Filter,
  Search,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Petition {
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
  updates: PetitionUpdate[]
}

interface PetitionUpdate {
  id: string
  date: Date
  title: string
  content: string
  type: 'progress' | 'milestone' | 'news'
}

const petitions: Petition[] = [
  {
    id: '1',
    title: 'Reform Family Court Due Process Standards',
    description: 'Demand that family courts implement proper due process protections for parents facing child removal proceedings.',
    goal: 10000,
    signatures: 7542,
    status: 'active',
    category: 'Court Reform',
    createdAt: new Date('2024-01-01'),
    deadline: new Date('2024-06-01'),
    creator: 'Nora\'s Law Foundation',
    location: 'National',
    tags: ['due-process', 'family-court', 'reform'],
    updates: [
      {
        id: '1',
        date: new Date('2024-02-15'),
        title: 'Major Victory: State Legislature Hearing Scheduled',
        content: 'Our petition has caught the attention of state legislators. A public hearing is scheduled for March 15th.',
        type: 'milestone'
      }
    ]
  },
  {
    id: '2',
    title: 'Mandate Independent Toxicology Testing',
    description: 'Require independent, accredited laboratories for all drug testing in child welfare cases.',
    goal: 5000,
    signatures: 4231,
    status: 'active',
    category: 'Testing Standards',
    createdAt: new Date('2024-01-15'),
    deadline: new Date('2024-07-01'),
    creator: 'Civil Rights Alliance',
    location: 'National',
    tags: ['toxicology', 'testing', 'independence'],
    updates: [
      {
        id: '2',
        date: new Date('2024-02-20'),
        title: 'Expert Panel Formed',
        content: 'Leading toxicologists have joined our cause to review current testing protocols.',
        type: 'progress'
      }
    ]
  },
  {
    id: '3',
    title: 'Protect Parental Rights in Emergency Situations',
    description: 'Establish clear guidelines for when emergency child removal is justified and require immediate judicial review.',
    goal: 8000,
    signatures: 6789,
    status: 'active',
    category: 'Emergency Procedures',
    createdAt: new Date('2024-02-01'),
    deadline: new Date('2024-08-01'),
    creator: 'Family Rights Coalition',
    location: 'National',
    tags: ['emergency', 'judicial-review', 'rights'],
    updates: []
  }
]

const categories = ['All', 'Court Reform', 'Testing Standards', 'Emergency Procedures', 'Training', 'Funding']

export function PetitionHub() {
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [signedPetitions, setSignedPetitions] = useState<string[]>(['1']) // Mock signed petitions

  const filteredPetitions = petitions.filter(petition => {
    const matchesSearch = petition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         petition.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || petition.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalSignatures = petitions.reduce((sum, p) => sum + p.signatures, 0)
  const activePetitions = petitions.filter(p => p.status === 'active').length
  const completedGoals = petitions.filter(p => p.signatures >= p.goal).length

  const signPetition = (petitionId: string) => {
    if (!signedPetitions.includes(petitionId)) {
      setSignedPetitions(prev => [...prev, petitionId])
      // In real app, this would update the petition's signature count
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'expired': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Signatures</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSignatures.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all petitions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Petitions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePetitions}</div>
            <p className="text-xs text-muted-foreground">
              Currently collecting signatures
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedGoals}</div>
            <p className="text-xs text-muted-foreground">
              Petitions reached target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7</div>
            <p className="text-xs text-muted-foreground">
              Based on engagement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Civil Rights Petitions
          </CardTitle>
          <CardDescription>
            Join the movement to reform family court practices and protect constitutional rights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="browse">Browse Petitions</TabsTrigger>
                <TabsTrigger value="my-petitions">My Signatures</TabsTrigger>
                <TabsTrigger value="create">Start Petition</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search petitions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <TabsContent value="browse" className="space-y-4">
              <div className="grid gap-4">
                {filteredPetitions.map((petition) => (
                  <motion.div
                    key={petition.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card className="cursor-pointer hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {petition.category}
                              </Badge>
                              <Badge
                                className={cn("text-xs", getStatusColor(petition.status))}
                              >
                                {petition.status}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                              {petition.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">
                              {petition.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {petition.signatures.toLocaleString()} signatures
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                Goal: {petition.goal.toLocaleString()}
                              </span>
                              {petition.deadline && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  Ends: {petition.deadline.toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold mb-2">
                              {Math.round(getProgressPercentage(petition.signatures, petition.goal))}%
                            </div>
                            <Progress
                              value={getProgressPercentage(petition.signatures, petition.goal)}
                              className="w-24 h-2"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              Created by {petition.creator}
                            </span>
                            {petition.location && (
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {petition.location}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPetition(petition)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Discuss
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => signPetition(petition.id)}
                              disabled={signedPetitions.includes(petition.id)}
                            >
                              {signedPetitions.includes(petition.id) ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Signed
                                </>
                              ) : (
                                <>
                                  <Heart className="h-4 w-4 mr-1" />
                                  Sign Petition
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        {petition.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {petition.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="my-petitions" className="space-y-4">
              <div className="grid gap-4">
                {petitions.filter(p => signedPetitions.includes(p.id)).map((petition) => (
                  <Card key={petition.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{petition.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Signed on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {petition.signatures.toLocaleString()} signatures
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Petition Guidelines</AlertTitle>
                <AlertDescription>
                  Petitions must focus on civil rights issues in family court. All petitions are reviewed for compliance with platform policies.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Start a New Petition</CardTitle>
                  <CardDescription>
                    Create a petition to advocate for civil rights reforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Petition Title</Label>
                    <Input id="title" placeholder="Clear, concise title for your petition" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Explain the issue and what change you want to see..."
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal">Signature Goal</Label>
                      <Input id="goal" type="number" placeholder="1000" />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Deadline (Optional)</Label>
                      <Input id="deadline" type="date" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select id="category" className="w-full px-3 py-2 border rounded-md">
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <Button className="w-full">
                    Create Petition
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Petition Details Modal */}
      <AnimatePresence>
        {selectedPetition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPetition(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPetition.title}</h2>
                    <p className="text-muted-foreground">
                      Created by {selectedPetition.creator}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPetition(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="max-h-96">
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">About This Petition</h3>
                    <p className="text-muted-foreground">{selectedPetition.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {selectedPetition.signatures.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Signatures</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {selectedPetition.goal.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Goal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {Math.round(getProgressPercentage(selectedPetition.signatures, selectedPetition.goal))}%
                      </div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                  </div>

                  <Progress
                    value={getProgressPercentage(selectedPetition.signatures, selectedPetition.goal)}
                    className="h-3"
                  />

                  {selectedPetition.updates.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-4">Recent Updates</h3>
                      <div className="space-y-4">
                        {selectedPetition.updates.map((update) => (
                          <Card key={update.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium">{update.title}</h4>
                                    <Badge variant="outline" className="text-xs">
                                      {update.type}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {update.content}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {update.date.toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={() => signPetition(selectedPetition.id)}
                      disabled={signedPetitions.includes(selectedPetition.id)}
                    >
                      {signedPetitions.includes(selectedPetition.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Already Signed
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          Sign This Petition
                        </>
                      )}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
