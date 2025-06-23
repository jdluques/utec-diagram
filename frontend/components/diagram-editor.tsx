"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { diagramAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Code, Upload, Download, Play, ArrowLeft, FileText, Clipboard } from "lucide-react"
import Link from "next/link"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

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
    
    lb &gt;&gt; web &gt;&gt; db`,

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

export function DiagramEditor() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [diagramType, setDiagramType] = useState<"aws" | "er" | "json">("aws")
  const [code, setCode] = useState("")
  const [generatedDiagram, setGeneratedDiagram] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTypeChange = (type: "aws" | "er" | "json") => {
    setDiagramType(type)
    if (!code.trim()) {
      setCode(DIAGRAM_EXAMPLES[type])
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/plain") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCode(content)
        toast({
          title: "File uploaded",
          description: "Code has been loaded from file",
        })
      }
      reader.readAsText(file)
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a .txt file",
        variant: "destructive",
      })
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setCode(text)
      toast({
        title: "Pasted from clipboard",
        description: "Code has been pasted successfully",
      })
    } catch (error) {
      toast({
        title: "Clipboard error",
        description: "Failed to read from clipboard",
        variant: "destructive",
      })
    }
  }

  const handleGenerateDiagram = async () => {
    if (!code.trim()) {
      toast({
        title: "No code provided",
        description: "Please enter some code before generating",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await diagramAPI.generateDiagram(code, diagramType)

      if (response.success && response.diagramUrl) {
        setGeneratedDiagram(response.diagramUrl)
        toast({
          title: "Diagram generated",
          description: "Your diagram has been created successfully",
        })
      } else {
        toast({
          title: "Generation failed",
          description: response.message || "Failed to generate diagram",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadDiagram = () => {
    if (generatedDiagram) {
      const link = document.createElement("a")
      link.href = generatedDiagram
      link.download = `diagram-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const loadExample = () => {
    setCode(DIAGRAM_EXAMPLES[diagramType])
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Diagram Editor</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {user?.name}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Editor Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Code className="w-5 h-5" />
                      <span>Code Editor</span>
                    </CardTitle>
                    <CardDescription>Write your diagram definition code</CardDescription>
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
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePasteFromClipboard}>
                    <Clipboard className="w-4 h-4 mr-2" />
                    Paste
                  </Button>
                  <Button variant="outline" size="sm" onClick={loadExample}>
                    <FileText className="w-4 h-4 mr-2" />
                    Load Example
                  </Button>
                </div>

                {/* Code Textarea */}
                <Textarea
                  placeholder={`Enter your ${diagramType.toUpperCase()} diagram code here...`}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                />

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateDiagram}
                  disabled={loading || !code.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      Generating Diagram...
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

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Diagram Preview</CardTitle>
                    <CardDescription>Your generated diagram will appear here</CardDescription>
                  </div>
                  {generatedDiagram && (
                    <Button variant="outline" size="sm" onClick={handleDownloadDiagram}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LoadingSpinner className="mx-auto mb-4" />
                      <p className="text-slate-600">Generating your diagram...</p>
                    </div>
                  </div>
                ) : generatedDiagram ? (
                  <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                    <img
                      src={generatedDiagram || "/placeholder.svg"}
                      alt="Generated Diagram"
                      className="w-full h-full object-contain cursor-zoom-in"
                      onClick={() => window.open(generatedDiagram, "_blank")}
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

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips & Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {diagramType === "aws" && (
                  <div className="space-y-2">
                    <p className="font-medium text-orange-700">AWS Architecture:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Use the diagrams library syntax</li>
                      <li>Import services from diagrams.aws.*</li>
                      <li>Connect components with &gt;&gt; operator</li>
                      <li>Set show=False to prevent display</li>
                    </ul>
                  </div>
                )}
                {diagramType === "er" && (
                  <div className="space-y-2">
                    <p className="font-medium text-green-700">Entity-Relationship:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Define entities with [EntityName]</li>
                      <li>List attributes below each entity</li>
                      <li>Mark primary keys with (PK)</li>
                      <li>Mark foreign keys with (FK)</li>
                      <li>Define relationships at the end</li>
                    </ul>
                  </div>
                )}
                {diagramType === "json" && (
                  <div className="space-y-2">
                    <p className="font-medium text-purple-700">JSON Structure:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Use valid JSON syntax</li>
                      <li>Nest objects to show hierarchy</li>
                      <li>Use arrays for collections</li>
                      <li>Include type hints as values</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
