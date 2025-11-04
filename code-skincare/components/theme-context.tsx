"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  isDark: boolean
  toggleDark: () => void
  background: string
  setBackground: (bg: string) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [background, setBackgroundState] = useState("rose")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const savedBackground = localStorage.getItem("profileSettings")

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark
    setIsDark(shouldBeDark)

    if (savedBackground) {
      try {
        const settings = JSON.parse(savedBackground)
        setBackgroundState(settings.background || "rose")
      } catch {
        setBackgroundState("rose")
      }
    }

    applyTheme(shouldBeDark)
    setMounted(true)
  }, [])

  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }

  const toggleDark = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem("theme", newIsDark ? "dark" : "light")
    applyTheme(newIsDark)
  }

  const setBackground = (bg: string) => {
    setBackgroundState(bg)
    const profileSettings = localStorage.getItem("profileSettings")
    let settings = { background: "rose", theme: "light", notifications: true, displayName: "" }

    if (profileSettings) {
      try {
        settings = JSON.parse(profileSettings)
      } catch {
        // ignore
      }
    }

    settings.background = bg
    localStorage.setItem("profileSettings", JSON.stringify(settings))
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark, background, setBackground, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
