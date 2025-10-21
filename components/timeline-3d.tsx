'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Scale,
  Users,
  TrendingUp,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineEvent {
  id: string
  date: Date
  title: string
  description: string
  type: 'court' | 'filing' | 'hearing' | 'deadline' | 'milestone' | 'evidence'
  status: 'completed' | 'upcoming' | 'overdue' | 'in-progress'
  caseId?: string
  documents?: string[]
  participants?: string[]
}

interface CaseData {
  id: string
  title: string
  status: string
  events: TimelineEvent[]
}

const mockCaseData: CaseData = {
  id: '2024-001',
  title: 'Smith Family Court Case',
  status: 'active',
  events: [
    {
      id: '1',
      date: new Date('2024-01-15'),
      title: 'Petition Filed',
      description: 'Initial petition for custody filed with family court',
      type: 'filing',
      status: 'completed',
      caseId: '2024-001',
      documents: ['petition.pdf', 'service-documents.pdf']
    },
    {
      id: '2',
      date: new Date('2024-01-20'),
      title: 'Emergency Hearing',
      description: 'Temporary custody hearing scheduled',
      type: 'hearing',
      status: 'completed',
      caseId: '2024-001',
      participants: ['Judge Johnson', 'Attorney Smith', 'CPS Worker']
    },
    {
      id: '3',
      date: new Date('2024-02-01'),
      title: 'Discovery Deadline',
      description: 'All discovery requests must be filed',
      type: 'deadline',
      status: 'completed',
      caseId: '2024-001'
    },
    {
      id: '4',
      date: new Date('2024-02-15'),
      title: 'Toxicology Report Received',
      description: 'Independent lab results received and analyzed',
      type: 'evidence',
      status: 'completed',
      caseId: '2024-001',
      documents: ['toxicology-report.pdf']
    },
    {
      id: '5',
      date: new Date('2024-03-01'),
      title: 'Motion for Summary Judgment',
      description: 'File motion challenging evidence sufficiency',
      type: 'deadline',
      status: 'upcoming',
      caseId: '2024-001'
    },
    {
      id: '6',
      date: new Date('2024-03-15'),
      title: 'Pre-Trial Conference',
      description: 'Final pre-trial preparation meeting',
      type: 'court',
      status: 'upcoming',
      caseId: '2024-001',
      participants: ['Judge Johnson', 'Attorney Smith', 'Attorney Davis']
    },
    {
      id: '7',
      date: new Date('2024-04-01'),
      title: 'Trial Date',
      description: 'Full custody trial begins',
      type: 'court',
      status: 'upcoming',
      caseId: '2024-001'
    }
  ]
}

const eventTypeColors = {
  court: 'bg-blue-500',
  filing: 'bg-green-500',
  hearing: 'bg-purple-500',
  deadline: 'bg-red-500',
  milestone: 'bg-yellow-500',
  evidence: 'bg-indigo-500'
}

const eventTypeIcons = {
  court: <Scale className="h-4 w-4" />,
  filing: <FileText className="h-4 w-4" />,
  hearing: <Users className="h-4 w-4" />,
  deadline: <Clock className="h-4 w-4" />,
  milestone: <TrendingUp className="h-4 w-4" />,
  evidence: <FileText className="h-4 w-4" />
}

export function Timeline3D({ caseData }: { caseData?: CaseData }) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const data = caseData || mockCaseData
  const sortedEvents = data.events.sort((a, b) => a.date.getTime() - b.date.getTime())

  const getEventPosition = (event: TimelineEvent, index: number) => {
    const totalEvents = sortedEvents.length
    const angle = (index / totalEvents) * Math.PI * 2
    const radius = 120
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    return { x, z, angle }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'upcoming': return 'bg-blue-500'
      case 'overdue': return 'bg-red-500'
      case 'in-progress': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const upcomingEvents = sortedEvents.filter(event =>
    event.status === 'upcoming' || event.status === 'in-progress'
  )

  const overdueEvents = sortedEvents.filter(event => event.status === 'overdue')

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotation(rotation + 45)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {overdueEvents.length > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {overdueEvents.length} Overdue
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {upcomingEvents.length} Upcoming
          </Badge>
        </div>
      </div>

      {/* 3D Timeline Container */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Case Timeline - {data.title}
          </CardTitle>
          <CardDescription>
            Interactive 3D visualization of case progression and key events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            ref={containerRef}
            className="relative h-[400px] w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Timeline Ring */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `scale(${zoom}) rotateY(${rotation}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Central Timeline */}
              <div className="relative">
                {/* Timeline Circle */}
                <div className="w-[240px] h-[240px] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-full relative">
                  {/* Events */}
                  {sortedEvents.map((event, index) => {
                    const position = getEventPosition(event, index)
                    return (
                      <motion.div
                        key={event.id}
                        className="absolute cursor-pointer"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) translate(${position.x}px, ${position.z}px)`,
                          transformStyle: 'preserve-3d'
                        }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="relative">
                          {/* Event Node */}
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border-2 border-white shadow-lg",
                              eventTypeColors[event.type],
                              event.status === 'completed' && "ring-2 ring-green-300",
                              event.status === 'overdue' && "ring-2 ring-red-300 animate-pulse"
                            )}
                          />
                          {/* Event Label */}
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow text-xs font-medium">
                              {event.title}
                            </div>
                            <div className="text-xs text-muted-foreground text-center mt-1">
                              {event.date.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Center Hub */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Scale className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg">
              <div className="text-sm font-medium mb-2">Event Types</div>
              <div className="space-y-1">
                {Object.entries(eventTypeColors).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2 text-xs">
                    <div className={cn("w-3 h-3 rounded-full", color)} />
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Details */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      eventTypeColors[selectedEvent.type]
                    )} />
                    <h3 className="font-semibold">{selectedEvent.title}</h3>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                    ×
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedEvent.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <Badge className={cn("text-xs", getStatusColor(selectedEvent.status))}>
                    {selectedEvent.status}
                  </Badge>

                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.description}
                  </p>

                  {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Participants</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedEvent.participants.map((participant, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEvent.documents && selectedEvent.documents.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Documents</div>
                      <div className="space-y-1">
                        {selectedEvent.documents.map((doc, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <FileText className="h-3 w-3" />
                            <span>{doc}</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {sortedEvents.filter(e => e.status === 'completed').length}
                </div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {upcomingEvents.length}
                </div>
                <div className="text-xs text-muted-foreground">Upcoming</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <div>
                <div className="text-2xl font-bold">
                  {overdueEvents.length}
                </div>
                <div className="text-xs text-muted-foreground">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.ceil((sortedEvents[sortedEvents.length - 1]?.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-xs text-muted-foreground">Days to Trial</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
