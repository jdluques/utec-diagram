"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"
import { Code, Zap, Shield, Cloud, Database, FileJson } from "lucide-react"

export function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const handleAuthClick = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">UTEC Diagram</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => handleAuthClick("login")}
              className="text-slate-700 hover:text-slate-900"
            >
              Sign In
            </Button>
            <Button onClick={() => handleAuthClick("register")} className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            Serverless • Cloud-Native • Enterprise Ready
          </Badge>
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Transform Code into
            <span className="text-blue-600 block">Professional Diagrams</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Generate, edit, and visualize technical diagrams from code definitions. Built for developers, architects,
            and technical teams who value precision and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => handleAuthClick("register")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Start Creating Diagrams
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAuthClick("login")}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg"
            >
              Sign In
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Demo credentials: <code className="bg-slate-100 px-2 py-1 rounded">demo@utecdiagram.com</code> /{" "}
            <code className="bg-slate-100 px-2 py-1 rounded">demo123</code>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Diagram Generation</h2>
            <p className="text-lg text-slate-600">Support for multiple diagram types with enterprise-grade features</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-slate-900">AWS Architecture</CardTitle>
                <CardDescription>
                  Create professional AWS architecture diagrams with all major services and components
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-slate-900">Entity-Relationship</CardTitle>
                <CardDescription>
                  Design database schemas and relationships with clean, professional ER diagrams
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FileJson className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-slate-900">JSON Structures</CardTitle>
                <CardDescription>Visualize complex JSON data structures and API schemas with clarity</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Built for Enterprise Teams</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Lightning Fast Generation</h3>
                    <p className="text-slate-600">
                      Generate complex diagrams in seconds with our optimized serverless architecture
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Secure & Reliable</h3>
                    <p className="text-slate-600">
                      Enterprise-grade security with AWS infrastructure and protected API endpoints
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Code-First Approach</h3>
                    <p className="text-slate-600">
                      Version control your diagrams alongside your code for better documentation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="bg-slate-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                <div className="mb-2"># AWS Architecture Example</div>
                <div className="text-blue-400">from diagrams import Diagram</div>
                <div className="text-blue-400">from diagrams.aws.compute import EC2</div>
                <div className="text-blue-400">from diagrams.aws.database import RDS</div>
                <div className="mt-2">
                  <div className="text-yellow-400">with Diagram(&quot;Web Service&quot;):</div>
                  <div className="ml-4 text-white">web = EC2(&quot;Web Server&quot;)</div>
                  <div className="ml-4 text-white">db = RDS(&quot;Database&quot;)</div>
                  <div className="ml-4 text-white">web &gt;&gt; db</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Documentation?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers and architects who trust UTEC Diagram for their technical documentation needs.
          </p>
          <Button
            size="lg"
            onClick={() => handleAuthClick("register")}
            className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-3 text-lg font-semibold"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">UTEC Diagram</span>
          </div>
          <p className="text-sm">© 2025 UTEC Diagram. Built for the Cloud Computing Hackathon.</p>
        </div>
      </footer>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} mode={authMode} onModeChange={setAuthMode} />
    </div>
  )
}
