"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, name: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse saved user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newUser: User = {
        id: Math.random().toString(),
        email,
        name: email.split("@")[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, name: string, password: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newUser: User = {
        id: Math.random().toString(),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
