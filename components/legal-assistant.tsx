'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Brain,
  Send,
  Sparkles,
  FileText,
  Scale,
  Shield,
  Book,
  Search,
  MessageSquare,
  Lightbulb,
  AlertCircle,
  ChevronRight,
  Mic,
  Paperclip,
  Download,
  Copy,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AssistantMode {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  systemPrompt: string
  suggestions: string[]
  color: string
}

const assistantModes: AssistantMode[] = [
  {
    id: 'research',
    name: 'Legal Research',
    description: 'Research case law and statutes',
    icon: <Search className="h-4 w-4" />,
    systemPrompt: 'You are a legal research assistant specializing in federal civil rights law...',
    suggestions: [
      'What are my due process rights in family court?',
      'Explain First Amendment retaliation claims',
      'What is qualified immunity?',
      'How does Monell liability work?'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'drafting',
    name: 'Document Drafting',
    description: 'Draft legal documents and motions',
    icon: <FileText className="h-4 w-4" />,
    systemPrompt: 'You are a legal document drafting assistant...',
    suggestions: [
      'Draft a TRO motion',
      'Create a federal complaint',
      'Write a demand letter',
      'Generate exhibit index'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'analysis',
    name: 'Case Analysis',
    description: 'Analyze your case and evidence',
    icon: <Brain className="h-4 w-4" />,
    systemPrompt: 'You are a case analysis expert...',
    suggestions: [
      'Analyze my evidence for constitutional violations',
      'Identify potential claims',
      'Evaluate strength of my case',
      'Find weaknesses in opposing arguments'
    ],
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'education',
    name: 'Rights Education',
    description: 'Learn about your civil rights',
    icon: <Book className="h-4 w-4" />,
    systemPrompt: 'You are a civil rights educator...',
    suggestions: [
      'Explain my constitutional rights',
      'What is procedural due process?',
      'How do I preserve evidence?',
      'What are my appeal options?'
    ],
    color: 'from-amber-500 to-orange-500'
  }
]

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  mode?: string
  attachments?: string[]
}

export function LegalAssistant() {
  const [mode, setMode] = useState<AssistantMode>(assistantModes[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleModeChange = (newMode: AssistantMode) => {
    setMode(newMode)
    // Add a system message about mode change
    const systemMessage: Message = {
      id: Date.now().toString(),
      role: 'system',
      content: `Switched to ${newMode.name} mode. ${newMode.description}`,
      timestamp: new Date(),
      mode: newMode.id
    }
    setMessages(prev => [...prev, systemMessage])
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      mode: mode.id
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsThinking(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(input, mode),
        timestamp: new Date(),
        mode: mode.id
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsThinking(false)
    }, 2000)
  }

  const generateMockResponse = (query: string, currentMode: AssistantMode): string => {
    // This would be replaced with actual AI responses
    const responses: { [key: string]: string } = {
      research: `Based on federal civil rights law, here's what I found regarding "${query}":

## Key Legal Principles

1. **Due Process Rights** (14th Amendment)
   - Procedural due process requires notice and opportunity to be heard
   - Substantive due process protects fundamental rights

2. **First Amendment Protections**
   - Retaliation claims require: (1) protected activity, (2) adverse action, (3) causal connection

3. **Relevant Case Law**
   - *Mathews v. Eldridge*, 424 U.S. 319 (1976) - Due process test
   - *Mt. Healthy v. Doyle*, 429 U.S. 274 (1977) - First Amendment retaliation

## Application to Your Case
Your situation may involve violations of procedural due process if you were denied meaningful opportunity to challenge the evidence...`,

      drafting: `I'll help you draft that document. Here's a template to start with:

## [Document Type]

**Caption**
[Court Name]
[Case Number]

**Introduction**
Plaintiff respectfully submits this [document type] and states:

**Statement of Facts**
1. [Fact 1 with exhibit reference]
2. [Fact 2 with exhibit reference]

**Legal Argument**
The court should grant relief because:
- Point 1: [Legal basis]
- Point 2: [Supporting precedent]

**Conclusion**
For the foregoing reasons, Plaintiff requests...`,

      analysis: `## Case Analysis Summary

**Strengths:**
✓ Clear timeline of events documenting retaliation
✓ Evidence of procedural violations
✓ Documented harm to parent-child relationship

**Potential Claims:**
1. § 1983 - Due Process Violation (14th Amendment)
2. § 1983 - First Amendment Retaliation
3. Monell claim against municipality

**Evidence Gaps:**
- Need authenticated toxicology reports
- Missing chain of custody documentation
- Require expert testimony on testing protocols

**Recommended Next Steps:**
1. File preservation letter immediately
2. Request discovery on testing protocols
3. Depose key witnesses`,

      education: `## Understanding Your Civil Rights

**What Are Civil Rights?**
Civil rights are personal rights guaranteed and protected by the U.S. Constitution and federal laws.

**Key Constitutional Protections:**

**14th Amendment - Due Process & Equal Protection**
- Protects against arbitrary government action
- Ensures fair procedures before deprivation of rights
- Guarantees equal treatment under law

**First Amendment - Free Speech & Association**
- Protects right to speak freely
- Guards against retaliation for protected speech
- Preserves right to associate with family

**How These Apply in Family Court:**
- Right to notice and hearing
- Right to present evidence
- Right to challenge state's evidence
- Protection from retaliation

Would you like me to explain any of these concepts in more detail?`
    }

    return responses[currentMode.id] || 'I understand your question. Let me help you with that...'
  }

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Implement voice recognition
  }

  const handleFileAttach = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="h-[700px] flex flex-col">
      {/* Mode Selector */}
      <div className="mb-6">
        <div className="grid grid-cols-4 gap-3">
          {assistantModes.map((assistantMode) => (
            <motion.div
              key={assistantMode.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all",
                  mode.id === assistantMode.id && "ring-2 ring-primary"
                )}
                onClick={() => handleModeChange(assistantMode)}
              >
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-2 rounded-lg bg-gradient-to-br text-white",
                      assistantMode.color
                    )}>
                      {assistantMode.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{assistantMode.name}</h4>
                      <p className="text-xs text-muted-foreground">{assistantMode.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg bg-gradient-to-br text-white",
                mode.color
              )}>
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Legal AI Assistant</CardTitle>
                <CardDescription>
                  {mode.name} Mode - {mode.description}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              GPT-4 Powered
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">How can I assist you today?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    I'm here to help with your civil rights case
                  </p>

                  {/* Suggestions */}
                  <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                    {mode.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => handleSuggestion(suggestion)}
                      >
                        <ChevronRight className="h-3 w-3 mr-1" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={cn(
                        "flex gap-3",
                        message.role === 'user' && "justify-end",
                        message.role === 'system' && "justify-center"
                      )}
                    >
                      {message.role === 'system' ? (
                        <Badge variant="secondary" className="text-xs">
                          {message.content}
                        </Badge>
                      ) : (
                        <>
                          {message.role === 'assistant' && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className={cn(
                                "bg-gradient-to-br text-white text-xs",
                                mode.color
                              )}>
                                AI
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={cn(
                            "max-w-[80%] rounded-lg px-4 py-2",
                            message.role === 'user'
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}>
                            {message.role === 'assistant' ? (
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                              </div>
                            ) : (
                              <p className="text-sm">{message.content}</p>
                            )}
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {message.role === 'user' && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          )}
                        </>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={cn(
                      "bg-gradient-to-br text-white text-xs",
                      mode.color
                    )}>
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handleFileAttach}
                title="Attach document"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask about ${mode.name.toLowerCase()}...`}
                className="flex-1"
              />
              <Button
                size="icon"
                variant={isListening ? "destructive" : "outline"}
                onClick={handleVoiceInput}
                title="Voice input"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button onClick={handleSend} disabled={!input.trim() || isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                // Handle file upload
              }}
            />
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="ghost" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Export Chat
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                <Copy className="h-3 w-3 mr-1" />
                Copy Response
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Clear Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
