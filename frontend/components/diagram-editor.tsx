"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Code, Upload, Clipboard, FileText, Play, Download, Github, ZoomIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { diagramAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { GitHubLoaderModal } from "@/components/github-loader-modal"
import { ImageZoomModal } from "@/components/image-zoom-modal"

/* -------------------------------------------------------------------------- */
/*                              Example snippets                              */
/* -------------------------------------------------------------------------- */
const DIAGRAM_EXAMPLES = {
  aws: `# AWS Architecture Example
from diagrams import Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS
from diagrams.aws.network import ELB

with Diagram("Web Service", show=False):
    lb = ELB("Load Balancer")
    web = EC2("Web Server")
    db = RDS("Database")
    
    lb >> web >> db`,

  er: `# Entity-Relationship Example
[User]
id (PK)
name
email
created_at

[Post]
id (PK)
title
content
user_id (FK)
created_at

[Comment]
id (PK)
content
post_id (FK)
user_id (FK)
created_at

User ||--o{ Post
Post ||--o{ Comment
User ||--o{ Comment`,

  json: `{
  "user": {
    "id": "string",
    "profile": {
      "name": "string",
      "email": "string",
      "preferences": {
        "theme": "light|dark",
        "notifications": "boolean"
      }
    },
    "posts": [
      {
        "id": "string",
        "title": "string",
        "content": "string",
        "tags": ["string"],
        "metadata": {
          "created_at": "datetime",
          "updated_at": "datetime"
        }
      }
    ]
  }
}`,
}

/* -------------------------------------------------------------------------- */

export function DiagramEditor() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [diagramType, setDiagramType] = useState<"aws" | "er" | "json">("aws")
  const [code, setCode] = useState("")
  const [generatedDiagram, setGeneratedDiagram] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [githubModalOpen, setGithubModalOpen] = useState(false)
  const [zoomModalOpen, setZoomModalOpen] = useState(false)

  /* --------------------- Helpers for GitHub file retrieval ---------------------- */
  const handleLoadFromGitHub = () => {
    setGithubModalOpen(true)
  }

  const handleZoomPreview = () => {
    if (generatedDiagram) {
      setZoomModalOpen(true)
    }
  }

  /* ------------------------------ File handlers ------------------------------ */
  const handleTypeChange = (type: "aws" | "er" | "json") => {
    setDiagramType(type)
    if (!code.trim()) setCode(DIAGRAM_EXAMPLES[type])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== "text/plain") {
      toast({
        title: "Invalid file",
        description: "Only .txt files are supported",
        variant: "destructive",
      })
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCode(ev.target?.result as string)
      toast({ title: "File uploaded", description: "Content loaded into editor" })
    }
    reader.readAsText(file)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setCode(text)
      toast({ title: "Clipboard", description: "Content pasted successfully" })
    } catch {
      toast({
        title: "Clipboard error",
        description: "Unable to read clipboard",
        variant: "destructive",
      })
    }
  }

  /* ---------------------------- Diagram generation --------------------------- */
  const generateDiagram = async () => {
    if (!code.trim()) {
      toast({
        title: "No code",
        description: "Please add code before generating",
        variant: "destructive",
      })
      return
    }
    setLoading(true)
    try {
      const res = await diagramAPI.generateDiagram(code, diagramType)
      if (!res.success) {
        toast({ title: "Error", description: res.message, variant: "destructive" })
        return
      }
      setGeneratedDiagram(res.diagramUrl!)
      toast({ title: "Success", description: "Diagram generated!" })
    } catch {
      toast({
        title: "Unexpected error",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadDiagram = () => {
    if (!generatedDiagram) return
    const link = document.createElement("a")
    link.href = generatedDiagram
    link.download = `diagram-${Date.now()}.png`
    link.click()
  }

  const loadExample = () => setCode(DIAGRAM_EXAMPLES[diagramType])

  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Diagram Editor</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {user?.name}
          </Badge>
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Code Editor
                    </CardTitle>
                    <CardDescription>Write your diagram code below</CardDescription>
                  </div>
                  <Select value={diagramType} onValueChange={handleTypeChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">AWS Architecture</SelectItem>
                      <SelectItem value="er">Entity-Relationship</SelectItem>
                      <SelectItem value="json">JSON Structure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePaste}>
                    <Clipboard className="w-4 h-4 mr-2" />
                    Paste
                  </Button>
                  <Button variant="outline" size="sm" onClick={loadExample}>
                    <FileText className="w-4 h-4 mr-2" />
                    Load Example
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLoadFromGitHub}>
                    <Github className="w-4 h-4 mr-2" />
                    From GitHub
                  </Button>
                </div>

                <Textarea
                  placeholder={`Enter ${diagramType.toUpperCase()} code here…`}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                />

                <Button
                  onClick={generateDiagram}
                  disabled={loading || !code.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner className="mr-2" /> Generating…
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Generate Diagram
                    </>
                  )}
                </Button>

                <input ref={fileInputRef} type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Diagram Preview</CardTitle>
                    <CardDescription>Generated diagram will appear here</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {generatedDiagram && (
                      <>
                        <Button variant="outline" size="sm" onClick={handleZoomPreview}>
                          <ZoomIn className="w-4 h-4 mr-2" />
                          Zoom
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadDiagram}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="aspect-video bg-slate-100 flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <LoadingSpinner className="mx-auto mb-2" />
                      <p className="text-slate-600 text-sm">Processing…</p>
                    </div>
                  </div>
                ) : generatedDiagram ? (
                  <div
                    className="aspect-video bg-slate-100 rounded-lg overflow-hidden cursor-zoom-in hover:bg-slate-200 transition-colors"
                    onClick={handleZoomPreview}
                  >
                    <img
                      src={generatedDiagram || "/placeholder.svg"}
                      alt="Generated diagram"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 mb-2">No diagram generated yet</p>
                      <p className="text-sm text-slate-500">Write your code and click "Generate Diagram"</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GitHubLoaderModal open={githubModalOpen} onOpenChange={setGithubModalOpen} onCodeLoaded={setCode} />
      <ImageZoomModal
        open={zoomModalOpen}
        onOpenChange={setZoomModalOpen}
        imageUrl={generatedDiagram || ""}
        imageName="Generated Diagram"
      />
    </div>
  )
}
