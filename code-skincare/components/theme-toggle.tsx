"use client"

import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  isDark: boolean
  onToggle: (isDark: boolean) => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const toggleTheme = () => {
    const newIsDark = !isDark
    onToggle(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <Button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100"
      size="sm"
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  )
}
