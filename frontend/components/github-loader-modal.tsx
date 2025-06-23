"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Github, ExternalLink, FileText } from "lucide-react"

interface GitHubLoaderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCodeLoaded: (code: string) => void
}

export function GitHubLoaderModal({ open, onOpenChange, onCodeLoaded }: GitHubLoaderModalProps) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const convertGitHubUrlToRaw = (githubUrl: string) => {
    // Convert GitHub blob URL to raw URL
    const match = githubUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+\.txt)$/i)
    if (!match) return null
    const [, owner, repo, branch, path] = match
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
  }

  const handleLoad = async () => {
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a GitHub file URL",
        variant: "destructive",
      })
      return
    }

    const rawUrl = convertGitHubUrlToRaw(url.trim())
    if (!rawUrl) {
      toast({
        title: "Invalid URL format",
        description: "Please provide a valid GitHub file URL ending in .txt",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(rawUrl)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const content = await response.text()
      onCodeLoaded(content)
      onOpenChange(false)
      setUrl("")

      toast({
        title: "Successfully loaded",
        description: "File content has been loaded into the editor",
      })
    } catch (error) {
      toast({
        title: "Failed to load file",
        description: "Make sure the repository is public and the file exists",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setUrl("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            Load from GitHub
          </DialogTitle>
          <DialogDescription>Load diagram code from a public GitHub repository</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="github-url">GitHub File URL</Label>
            <Input
              id="github-url"
              placeholder="https://github.com/user/repo/blob/main/diagram.txt"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="text-sm"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileText className="w-4 h-4 flex-shrink-0" />
              Supported URL format:
            </div>
            <div className="bg-white p-3 rounded border">
              <code className="text-xs text-slate-600 break-all leading-relaxed">
                https://github.com/username/repository/blob/branch/path/file.txt
              </code>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5" />
              <span>Repository must be public and file must end with .txt</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleLoad}
              disabled={loading || !url.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Github className="w-4 h-4 mr-2" />
                  Load File
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
