// Mock API implementation for development
// Replace with actual API calls when backend is ready

interface LoginResponse {
  success: boolean
  token?: string
  user?: {
    id: string
    email: string
    name: string
  }
  message?: string
}

interface RegisterResponse {
  success: boolean
  token?: string
  user?: {
    id: string
    email: string
    name: string
  }
  message?: string
}

interface DiagramResponse {
  success: boolean
  diagramUrl?: string
  diagramId?: string
  message?: string
}

interface Diagram {
  id: string
  name: string
  type: "aws" | "er" | "json"
  code: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

// Mock credentials for testing
const MOCK_CREDENTIALS = {
  email: "demo@utecdiagram.com",
  password: "demo123",
  name: "Demo User",
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authAPI = {
  async login(email: string, password: string): Promise<LoginResponse> {
    await delay(1000) // Simulate network delay

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      return {
        success: true,
        token: "mock_jwt_token_" + Date.now(),
        user: {
          id: "user_1",
          email: MOCK_CREDENTIALS.email,
          name: MOCK_CREDENTIALS.name,
        },
      }
    }

    return {
      success: false,
      message: "Invalid email or password",
    }
  },

  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    await delay(1000)

    // Simulate email already exists
    if (email === "existing@example.com") {
      return {
        success: false,
        message: "Email already exists",
      }
    }

    return {
      success: true,
      token: "mock_jwt_token_" + Date.now(),
      user: {
        id: "user_" + Date.now(),
        email,
        name,
      },
    }
  },
}

export const diagramAPI = {
  async generateDiagram(code: string, type: "aws" | "er" | "json"): Promise<DiagramResponse> {
    await delay(2000) // Simulate processing time

    if (!code.trim()) {
      return {
        success: false,
        message: "Code cannot be empty",
      }
    }

    // Mock successful generation
    const diagramId = "diagram_" + Date.now()
    const mockImageUrl = `/placeholder.svg?height=600&width=800&query=${type}_diagram_${diagramId}`

    // Store in localStorage for persistence
    const existingDiagrams = JSON.parse(localStorage.getItem("user_diagrams") || "[]")
    const newDiagram: Diagram = {
      id: diagramId,
      name: `${type.toUpperCase()} Diagram ${existingDiagrams.length + 1}`,
      type,
      code,
      imageUrl: mockImageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    existingDiagrams.push(newDiagram)
    localStorage.setItem("user_diagrams", JSON.stringify(existingDiagrams))

    return {
      success: true,
      diagramUrl: mockImageUrl,
      diagramId,
    }
  },

  async getUserDiagrams(): Promise<Diagram[]> {
    await delay(500)
    return JSON.parse(localStorage.getItem("user_diagrams") || "[]")
  },

  async deleteDiagram(diagramId: string): Promise<boolean> {
    await delay(500)
    const diagrams = JSON.parse(localStorage.getItem("user_diagrams") || "[]")
    const filteredDiagrams = diagrams.filter((d: Diagram) => d.id !== diagramId)
    localStorage.setItem("user_diagrams", JSON.stringify(filteredDiagrams))
    return true
  },
}

// Utility function to get auth headers
export function getAuthHeaders() {
  const token = localStorage.getItem("auth_token")
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}
