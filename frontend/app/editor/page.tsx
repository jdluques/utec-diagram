"use client"

import { DiagramEditor } from "@/components/diagram-editor"
import { ProtectedRoute } from "@/components/protected-route"

export default function EditorPage() {
  return (
    <ProtectedRoute>
      <DiagramEditor />
    </ProtectedRoute>
  )
}
