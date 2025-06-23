"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"
import { diagramAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Search, Filter, Eye, Download, Trash2, Plus, FileImage } from "lucide-react"
import Link from "next/link"
import { ImageZoomModal } from "@/components/image-zoom-modal"

interface Diagram {
  id: string
  name: string
  type: "aws" | "er" | "json"
  code: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export function DiagramGallery() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [diagrams, setDiagrams] = useState<Diagram[]>([])
  const [filteredDiagrams, setFilteredDiagrams] = useState<Diagram[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [zoomModalOpen, setZoomModalOpen] = useState(false)
  const [zoomImage, setZoomImage] = useState<{ url: string; name: string } | null>(null)

  useEffect(() => {
    loadDiagrams()
  }, [])

  useEffect(() => {
    filterDiagrams()
  }, [diagrams, searchTerm, typeFilter])

  const loadDiagrams = async () => {
    try {
      const userDiagrams = await diagramAPI.getUserDiagrams()
      setDiagrams(userDiagrams)
    } catch (error) {
      console.error("Failed to load diagrams:", error)
      toast({
        title: "Error",
        description: "Failed to load diagrams",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterDiagrams = () => {
    let filtered = diagrams

    if (searchTerm) {
      filtered = filtered.filter(
        (diagram) =>
          diagram.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          diagram.code.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((diagram) => diagram.type === typeFilter)
    }

    setFilteredDiagrams(filtered)
  }

  const handleDeleteDiagram = async (diagramId: string) => {
    try {
      await diagramAPI.deleteDiagram(diagramId)
      setDiagrams(diagrams.filter((d) => d.id !== diagramId))
      toast({
        title: "Diagram deleted",
        description: "The diagram has been removed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete diagram",
        variant: "destructive",
      })
    }
  }

  const handleViewDiagram = (diagram: Diagram) => {
    setSelectedDiagram(diagram)
    setViewModalOpen(true)
  }

  const handleDownloadDiagram = (diagram: Diagram) => {
    const link = document.createElement("a")
    link.href = diagram.imageUrl
    link.download = `${diagram.name.replace(/\s+/g, "_")}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleZoomImage = (imageUrl: string, imageName: string) => {
    setZoomImage({ url: imageUrl, name: imageName })
    setZoomModalOpen(true)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "aws":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "er":
        return "bg-green-100 text-green-800 border-green-200"
      case "json":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "aws":
        return "AWS Architecture"
      case "er":
        return "Entity-Relationship"
      case "json":
        return "JSON Structure"
      default:
        return type.toUpperCase()
    }
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
                <FileImage className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">My Diagrams</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {filteredDiagrams.length} diagrams
            </Badge>
            <Link href="/editor">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Diagram
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search diagrams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="aws">AWS Architecture</SelectItem>
              <SelectItem value="er">Entity-Relationship</SelectItem>
              <SelectItem value="json">JSON Structure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Diagrams Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-slate-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-slate-200 rounded flex-1"></div>
                    <div className="h-8 bg-slate-200 rounded w-8"></div>
                    <div className="h-8 bg-slate-200 rounded w-8"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredDiagrams.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileImage className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {diagrams.length === 0 ? "No diagrams yet" : "No diagrams found"}
              </h3>
              <p className="text-slate-600 mb-4">
                {diagrams.length === 0
                  ? "Create your first diagram to get started"
                  : "Try adjusting your search or filter criteria"}
              </p>
              {diagrams.length === 0 && (
                <Link href="/editor">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Diagram
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiagrams.map((diagram) => (
              <Card key={diagram.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg truncate">{diagram.name}</CardTitle>
                    <Badge className={getTypeColor(diagram.type)}>{getTypeLabel(diagram.type)}</Badge>
                  </div>
                  <CardDescription>Created {new Date(diagram.createdAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="aspect-video bg-slate-100 rounded-lg overflow-hidden cursor-zoom-in"
                    onClick={() => handleZoomImage(diagram.imageUrl, diagram.name)}
                  >
                    <img
                      src={diagram.imageUrl || "/placeholder.svg"}
                      alt={diagram.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDiagram(diagram)} className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadDiagram(diagram)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteDiagram(diagram.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedDiagram?.name}</span>
              {selectedDiagram && (
                <Badge className={getTypeColor(selectedDiagram.type)}>{getTypeLabel(selectedDiagram.type)}</Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Created {selectedDiagram && new Date(selectedDiagram.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedDiagram && (
            <div className="space-y-6">
              {/* Diagram Image */}
              <div className="bg-slate-100 rounded-lg overflow-hidden">
                <img
                  src={selectedDiagram.imageUrl || "/placeholder.svg"}
                  alt={selectedDiagram.name}
                  className="w-full h-auto max-h-96 object-contain mx-auto cursor-zoom-in"
                  onClick={() => handleZoomImage(selectedDiagram.imageUrl, selectedDiagram.name)}
                />
              </div>

              {/* Code */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Source Code</h4>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{selectedDiagram.code}</code>
                </pre>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={() => handleDownloadDiagram(selectedDiagram)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
                <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Zoom Modal */}
      <ImageZoomModal
        open={zoomModalOpen}
        onOpenChange={setZoomModalOpen}
        imageUrl={zoomImage?.url || ""}
        imageName={zoomImage?.name || ""}
      />
    </div>
  )
}
