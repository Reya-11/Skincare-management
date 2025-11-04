"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import Link from "next/link"

interface ProfileDropdownProps {
  isDark: boolean
  onToggleDark: () => void
}

export function ProfileDropdown({ isDark, onToggleDark }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDownloadReport = () => {
    const report = {
      generatedDate: new Date().toISOString(),
      user: user?.name,
      routineData: "Your skincare routine tracking data",
      analyticsData: "Your skin improvement analytics",
    }

    const dataStr = JSON.stringify(report, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `skincare-report-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors"
      >
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-8 h-8 rounded-full border-2 border-rose-500"
        />
        <span className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-rose-100 dark:border-slate-700 overflow-hidden z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-rose-100 dark:border-slate-700 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-slate-700 dark:to-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-rose-500"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="text-lg">⚙️</span>
              <span>Account Settings</span>
            </Link>

            <button
              onClick={() => {
                onToggleDark()
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors text-left"
            >
              <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
              <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="text-lg">👤</span>
              <span>Profile Settings</span>
            </Link>

            <button
              onClick={handleDownloadReport}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors text-left"
            >
              <span className="text-lg">📥</span>
              <span>Download Report</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="p-2 border-t border-rose-100 dark:border-slate-700">
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded"
            >
              <span className="text-lg">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
