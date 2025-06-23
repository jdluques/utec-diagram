"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AuthModal } from "@/components/auth-modal"
import { useState, useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      setAuthModalOpen(true)
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Authentication Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to access this page</p>
        </div>
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} mode="login" onModeChange={() => {}} />
      </div>
    )
  }

  return <>{children}</>
}
