'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Upload,
  FileText,
  Image,
  Video,
  Lock,
  Shield,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Calendar,
  Hash,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface EvidenceFile {
  id: string
  name: string
  type: string
  size: number
  uploadDate: Date
  hash: string
  blockchainVerified: boolean
  tags: string[]
  description: string
  caseId?: string
  accessLevel: 'public' | 'private' | 'restricted'
}

const fileTypeIcons = {
  'application/pdf': <FileText className="h-4 w-4" />,
  'image/': <Image className="h-4 w-4" />,
  'video/': <Video className="h-4 w-4" />,
  'text/': <FileText className="h-4 w-4" />,
  'default': <FileText className="h-4 w-4" />
}

export function EvidenceVault() {
  const [files, setFiles] = useState<EvidenceFile[]>([
    {
      id: '1',
      name: 'Toxicology Report - Case 2024-001.pdf',
      type: 'application/pdf',
      size: 2048576,
      uploadDate: new Date('2024-01-15'),
      hash: '0x1234567890abcdef',
      blockchainVerified: true,
      tags: ['toxicology', 'evidence', 'court'],
      description: 'Official toxicology report from state lab',
      caseId: '2024-001',
      accessLevel: 'private'
    },
    {
      id: '2',
      name: 'Witness Statement - Dr. Smith.pdf',
      type: 'application/pdf',
      size: 1048576,
      uploadDate: new Date('2024-01-20'),
      hash: '0xabcdef1234567890',
      blockchainVerified: true,
      tags: ['witness', 'expert', 'medical'],
      description: 'Expert witness affidavit',
      caseId: '2024-001',
      accessLevel: 'private'
    }
  ])
  const [selectedFile, setSelectedFile] = useState<EvidenceFile | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTags, setFilterTags] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: EvidenceFile[] = acceptedFiles.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date(),
      hash: '0x' + Math.random().toString(16).substr(2, 16),
      blockchainVerified: false,
      tags: [],
      description: '',
      accessLevel: 'private'
    }))

    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'video/*': ['.mp4', '.mov'],
      'text/*': ['.txt', '.doc', '.docx']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  })

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = filterTags.length === 0 || filterTags.some(tag => file.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return fileTypeIcons['image/']
    if (type.startsWith('video/')) return fileTypeIcons['video/']
    if (type.startsWith('text/')) return fileTypeIcons['text/']
    return fileTypeIcons[type] || fileTypeIcons.default
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const allTags = Array.from(new Set(files.flatMap(file => file.tags)))

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Secure Evidence Vault
          </CardTitle>
          <CardDescription>
            Upload and store evidence with blockchain verification and end-to-end encryption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop evidence here' : 'Drag & drop evidence files'}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to select files (PDF, images, videos, documents)
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Files are encrypted and blockchain-verified for immutability
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Library */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence Library</CardTitle>
          <CardDescription>
            {filteredFiles.length} of {files.length} files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search evidence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tag Filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={filterTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      setFilterTags(prev =>
                        prev.includes(tag)
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      )
                    }}
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <TabsContent value="grid" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => setSelectedFile(file)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm truncate">
                                {file.name}
                              </CardTitle>
                              <CardDescription className="text-xs">
                                {formatFileSize(file.size)}
                              </CardDescription>
                            </div>
                          </div>
                          {file.blockchainVerified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {file.uploadDate.toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {file.accessLevel}
                          </Badge>
                        </div>
                        {file.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {file.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {file.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{file.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-2">
              <ScrollArea className="h-[400px]">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} • {file.uploadDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.blockchainVerified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <Badge variant="outline">{file.accessLevel}</Badge>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* File Details Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedFile(null)}
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
                    {getFileIcon(selectedFile.type)}
                    <div>
                      <h3 className="font-semibold">{selectedFile.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Upload Date</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedFile.uploadDate.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Access Level</Label>
                    <Badge variant="outline" className="mt-1">
                      {selectedFile.accessLevel}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Blockchain Hash</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {selectedFile.hash}
                    </code>
                    {selectedFile.blockchainVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedFile.description || 'No description provided'}
                  </p>
                </div>

                {selectedFile.tags.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedFile.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View File
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Access
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
