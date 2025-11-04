"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/components/auth-context"

interface LoginFormProps {
  onSuccess?: () => void
  isSignup?: boolean
}

export function LoginForm({ onSuccess, isSignup = false }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isSignup) {
        if (!name || !email || !password) {
          setError("All fields are required")
          return
        }
        await signup(email, name, password)
      } else {
        if (!email || !password) {
          setError("Email and password are required")
          return
        }
        await login(email, password)
      }
      onSuccess?.()
    } catch (err) {
      setError("Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-8 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">
        {isSignup ? "Create Account" : "Welcome Back"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-rose-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-rose-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-rose-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-2"
        >
          {isLoading ? "Loading..." : isSignup ? "Create Account" : "Sign In"}
        </Button>
      </form>
    </Card>
  )
}
