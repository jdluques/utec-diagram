"use client"

import { DiagramGallery } from "@/components/diagram-gallery"
import { ProtectedRoute } from "@/components/protected-route"

export default function DiagramsPage() {
  return (
    <ProtectedRoute>
      <DiagramGallery />
    </ProtectedRoute>
  )
}
