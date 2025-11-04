"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/components/auth-context"
import Link from "next/link"
import { useEffect } from "react"

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-rose-100 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Skin Glow</h1>
          </Link>
          <Link href="/">
            <Button className="bg-slate-500 hover:bg-slate-600 text-white">Back to App</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Account Settings</h2>

        <div className="grid gap-6">
          {/* Account Info */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Name</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Email</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">User ID</p>
                <p className="text-lg font-mono text-slate-900 dark:text-white">{user.id}</p>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Security</h3>
            <div className="space-y-3">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2">
                Change Password
              </Button>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2">
                Two-Factor Authentication
              </Button>
            </div>
          </Card>

          {/* Data Settings */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Data & Privacy</h3>
            <div className="space-y-3">
              <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2">
                Export My Data
              </Button>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2">
                Delete Account
              </Button>
            </div>
          </Card>

          {/* Navigation */}
          <Link href="/profile">
            <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3">
              Go to Profile Settings
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
