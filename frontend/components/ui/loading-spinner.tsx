import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return <div className={cn("animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600", className)} />
}
