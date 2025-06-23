"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { diagramAPI } from "@/lib/api"
import { Code, Plus, FileImage, Settings, LogOut, User } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Diagram {
  id: string
  name: string
  type: "aws" | "er" | "json"
  code: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export function Dashboard() {
  const { user, logout } = useAuth()
  const [diagrams, setDiagrams] = useState<Diagram[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDiagrams()
  }, [])

  const loadDiagrams = async () => {
    try {
      const userDiagrams = await diagramAPI.getUserDiagrams()
      setDiagrams(userDiagrams)
    } catch (error) {
      console.error("Failed to load diagrams:", error)
    } finally {
      setLoading(false)
    }
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">UTEC Diagram</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/editor">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Diagram
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.name?.split(" ")[0]}!</h1>
          <p className="text-slate-600">Create and manage your technical diagrams with ease</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/editor">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-slate-200 hover:border-blue-300">
              <CardHeader className="text-center py-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-slate-900">Create New Diagram</CardTitle>
                <CardDescription>Start with a blank canvas and write your diagram code</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/diagrams">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileImage className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-slate-900">View All Diagrams</CardTitle>
                <CardDescription>Browse and manage your existing diagrams</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center py-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-slate-900">Settings</CardTitle>
              <CardDescription>Customize your workspace and preferences</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Diagrams */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Diagrams</h2>
            <Link href="/diagrams">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-slate-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : diagrams.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileImage className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No diagrams yet</h3>
                <p className="text-slate-600 mb-4">Create your first diagram to get started with UTEC Diagram</p>
                <Link href="/editor">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Diagram
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diagrams.slice(0, 6).map((diagram) => (
                <Card key={diagram.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg truncate">{diagram.name}</CardTitle>
                      <Badge className={getTypeColor(diagram.type)}>{getTypeLabel(diagram.type)}</Badge>
                    </div>
                    <CardDescription>Created {new Date(diagram.createdAt).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                      <img
                        src={diagram.imageUrl || "/placeholder.svg"}
                        alt={diagram.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
