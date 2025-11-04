"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/theme-context"
import Link from "next/link"

interface ProfileSettings {
  background: string
  theme: string
  notifications: boolean
  displayName: string
}

export default function ProfilePage() {
  const [settings, setSettings] = useState<ProfileSettings>({
    background: "rose",
    theme: "light",
    notifications: true,
    displayName: "",
  })
  const [isSaved, setIsSaved] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const { background, setBackground, isDark } = useTheme()

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push("/")
    }

    const savedSettings = localStorage.getItem("profileSettings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to load settings")
      }
    }

    if (user && !settings.displayName) {
      setSettings((prev) => ({ ...prev, displayName: user.name }))
    }
  }, [user, router])

  const handleSave = () => {
    localStorage.setItem("profileSettings", JSON.stringify(settings))
    setBackground(settings.background)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const backgroundOptions = [
    { name: "rose", label: "Rose Pink", gradient: "from-rose-50 to-pink-50" },
    { name: "blue", label: "Sky Blue", gradient: "from-blue-50 to-cyan-50" },
    { name: "purple", label: "Purple Haze", gradient: "from-purple-50 to-violet-50" },
    { name: "green", label: "Mint Green", gradient: "from-green-50 to-emerald-50" },
  ]

  const backgroundGradients: Record<string, string> = {
    rose: "from-rose-50 to-pink-50 dark:from-slate-950 dark:to-slate-900",
    blue: "from-blue-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900",
    purple: "from-purple-50 to-violet-50 dark:from-slate-950 dark:to-slate-900",
    green: "from-green-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900",
  }

  if (!mounted || !user) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${backgroundGradients[background]} flex items-center justify-center`}
      >
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradients[background]} transition-colors duration-300`}>
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
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Profile Settings</h2>

        <div className="grid gap-6">
          {/* User Info */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">User Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-rose-500"
                />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{user.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={settings.displayName}
                  onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          </Card>

          {/* Background Theme */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Background Theme</h3>
            <div className="grid grid-cols-2 gap-4">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => setSettings({ ...settings, background: bg.name })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    settings.background === bg.name
                      ? `border-rose-500 shadow-lg bg-gradient-to-br ${bg.gradient}`
                      : `border-slate-200 dark:border-slate-700 bg-gradient-to-br ${bg.gradient}`
                  }`}
                >
                  <p className="font-semibold text-slate-900">{bg.label}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Preferences</h3>
            <div className="flex items-center justify-between">
              <label className="text-slate-700 dark:text-slate-300">Enable Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3"
            >
              {isSaved ? "✓ Saved!" : "Save Settings"}
            </Button>
            <Button
              onClick={() => {
                logout()
                router.push("/")
              }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
            >
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
