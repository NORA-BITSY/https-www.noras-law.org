'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Search,
  Filter,
  Plus,
  Calendar,
  MapPin,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Star,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Scale,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommunityPost {
  id: string
  author: {
    name: string
    avatar?: string
    verified: boolean
    location: string
  }
  content: string
  timestamp: Date
  likes: number
  replies: number
  shares: number
  tags: string[]
  type: 'discussion' | 'question' | 'success' | 'warning' | 'resource'
  attachments?: string[]
}

interface SupportGroup {
  id: string
  name: string
  description: string
  members: number
  category: string
  lastActivity: Date
  isPrivate: boolean
}

interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  attendees: number
  maxAttendees?: number
  organizer: string
  type: 'workshop' | 'support' | 'legal' | 'advocacy'
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      verified: true,
      location: 'California'
    },
    content: 'Just won my custody case after challenging toxicology evidence! The court agreed that chain of custody was broken. Thank you to everyone who shared their experiences - it gave me the courage to fight.',
    timestamp: new Date('2024-01-15T10:30:00'),
    likes: 24,
    replies: 8,
    shares: 5,
    tags: ['success', 'custody', 'toxicology'],
    type: 'success'
  },
  {
    id: '2',
    author: {
      name: 'Michael Chen',
      verified: false,
      location: 'New York'
    },
    content: 'Question: My ex is threatening to file for emergency custody based on "concerns" about my parenting. I have documentation showing these are retaliatory. What should I do first?',
    timestamp: new Date('2024-01-15T09:15:00'),
    likes: 12,
    replies: 15,
    shares: 2,
    tags: ['question', 'emergency-custody', 'retaliation'],
    type: 'question'
  },
  {
    id: '3',
    author: {
      name: 'Legal Aid Alliance',
      verified: true,
      location: 'National'
    },
    content: '🚨 Important Update: The Supreme Court just ruled on a case involving due process in family court proceedings. This could impact how evidence is admitted in custody cases nationwide.',
    timestamp: new Date('2024-01-15T08:00:00'),
    likes: 45,
    replies: 22,
    shares: 18,
    tags: ['legal-update', 'supreme-court', 'due-process'],
    type: 'resource'
  }
]

const supportGroups: SupportGroup[] = [
  {
    id: '1',
    name: 'Custody Rights Advocates',
    description: 'Support group for parents fighting for their rights in family court',
    members: 1247,
    category: 'Custody',
    lastActivity: new Date('2024-01-15T12:00:00'),
    isPrivate: false
  },
  {
    id: '2',
    name: 'Toxicology Evidence Defense',
    description: 'Discussing strategies for challenging unreliable drug testing',
    members: 892,
    category: 'Evidence',
    lastActivity: new Date('2024-01-14T16:30:00'),
    isPrivate: false
  },
  {
    id: '3',
    name: 'First Amendment in Family Court',
    description: 'Protecting free speech rights during custody proceedings',
    members: 654,
    category: 'Constitutional Rights',
    lastActivity: new Date('2024-01-15T10:45:00'),
    isPrivate: false
  }
]

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Family Court Rights Workshop',
    description: 'Learn your constitutional rights in family court proceedings',
    date: new Date('2024-02-01T14:00:00'),
    location: 'Virtual',
    attendees: 45,
    maxAttendees: 100,
    organizer: 'Civil Rights Legal Foundation',
    type: 'workshop'
  },
  {
    id: '2',
    title: 'Support Group Meeting',
    description: 'Monthly meeting for parents navigating custody battles',
    date: new Date('2024-01-20T19:00:00'),
    location: 'Los Angeles, CA',
    attendees: 12,
    organizer: 'Parent Advocates Network',
    type: 'support'
  }
]

export function Community() {
  const [activeTab, setActiveTab] = useState('feed')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [newPost, setNewPost] = useState('')

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'question': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'resource': return <Shield className="h-4 w-4 text-blue-500" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50 dark:bg-green-950/20'
      case 'question': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20'
      case 'warning': return 'border-red-200 bg-red-50 dark:bg-red-950/20'
      case 'resource': return 'border-blue-200 bg-blue-50 dark:bg-blue-950/20'
      default: return ''
    }
  }

  const handleCreatePost = () => {
    if (!newPost.trim()) return
    // Handle post creation
    setNewPost('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            Community
          </h1>
          <p className="text-muted-foreground">
            Connect with advocates, share experiences, and get support
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Success Stories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="groups">Support Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {/* Create Post */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Share your experience, ask a question, or start a discussion..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      📎 Attach
                    </Button>
                    <Button size="sm" variant="outline">
                      🏷️ Tags
                    </Button>
                  </div>
                  <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className={cn("border-2", getPostTypeColor(post.type))}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{post.author.name}</p>
                            {post.author.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {post.author.location} • {post.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPostTypeIcon(post.type)}
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="mb-3">{post.content}</p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <Button size="sm" variant="ghost" className="gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1">
                          <Reply className="h-4 w-4" />
                          {post.replies}
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1">
                          <Share2 className="h-4 w-4" />
                          {post.shares}
                        </Button>
                      </div>
                      <Button size="sm" variant="outline">
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportGroups.map((group) => (
              <Card key={group.id} className="cursor-pointer hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </div>
                    {group.isPrivate && (
                      <Badge variant="secondary">Private</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-semibold">{group.members.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category</span>
                      <Badge variant="outline">{group.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Activity</span>
                      <span>{group.lastActivity.toLocaleDateString()}</span>
                    </div>
                    <Button className="w-full mt-3">
                      Join Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {event.type === 'workshop' && <Shield className="h-5 w-5" />}
                        {event.type === 'support' && <Users className="h-5 w-5" />}
                        {event.type === 'legal' && <Scale className="h-5 w-5" />}
                        {event.type === 'advocacy' && <AlertTriangle className="h-5 w-5" />}
                        {event.title}
                      </CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {event.attendees} attending
                        {event.maxAttendees && ` / ${event.maxAttendees} max`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Organized by {event.organizer}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    {event.location === 'Virtual' ? 'Join Online' : 'Register'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Legal Resources</CardTitle>
                <CardDescription>
                  Download templates, guides, and legal forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    📄 Motion Templates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📋 Evidence Checklists
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📚 Legal Guides
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>
                  Read how others won their cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    🏆 Custody Victories
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ⚖️ Constitutional Wins
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📖 Case Studies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
