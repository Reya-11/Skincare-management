"use client"

import { useState } from "react"
import { RealTimeClock } from "@/components/real-time-clock"
import { RoutineTracker } from "@/components/routine-tracker"
import { ActivesManager } from "@/components/actives-manager"
import { CameraSkinAnalysis } from "@/components/camera-skin-analysis"
import { ProgressDashboard } from "@/components/progress-dashboard"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/components/auth-context"
import { useTheme } from "@/components/theme-context"

export default function Home() {
  const [isAM, setIsAM] = useState(true)
  const [activeTab, setActiveTab] = useState("routine")
  const { user, isLoading } = useAuth()
  const { isDark, toggleDark, background, mounted } = useTheme()

  const backgroundGradients: Record<string, string> = {
    rose: "from-rose-50 to-pink-50 dark:from-slate-950 dark:to-slate-900",
    blue: "from-blue-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900",
    purple: "from-purple-50 to-violet-50 dark:from-slate-950 dark:to-slate-900",
    green: "from-green-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900",
  }

  if (!mounted || isLoading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${backgroundGradients[background]} flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 mx-auto mb-4 animate-pulse"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${backgroundGradients[background]} flex items-center justify-center p-4`}
      >
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              S
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Skin Glow</h1>
            <p className="text-slate-600 dark:text-slate-400">Your Personal Skincare Routine Tracker</p>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Demo: Use any email and password to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradients[background]} transition-colors duration-300`}>
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-rose-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Skin Glow</h1>
          </div>
          <div className="flex items-center gap-4">
            <RealTimeClock onPeriodChange={setIsAM} />
            <ProfileDropdown isDark={isDark} onToggleDark={toggleDark} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-rose-200 dark:border-slate-700 overflow-x-auto">
          {["routine", "actives", "analysis", "progress"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-rose-500 text-rose-600 dark:text-rose-400"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {tab === "routine" && "My Routine"}
              {tab === "actives" && "Actives"}
              {tab === "analysis" && "Analysis"}
              {tab === "progress" && "Progress"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid gap-8">
          {activeTab === "routine" && <RoutineTracker isAM={isAM} />}
          {activeTab === "actives" && <ActivesManager />}
          {activeTab === "analysis" && <CameraSkinAnalysis />}
          {activeTab === "progress" && <ProgressDashboard />}
        </div>
      </main>
    </div>
  )
}
