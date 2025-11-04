"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark

    setIsDark(shouldBeDark)
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

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem("theme", newIsDark ? "dark" : "light")
    applyTheme(newIsDark)
  }

  if (!mounted) return <>{children}</>

  return <>{typeof children === "function" ? children({ isDark, toggleTheme }) : children}</>
}
