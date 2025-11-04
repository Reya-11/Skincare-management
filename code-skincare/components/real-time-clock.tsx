"use client"

import { useState, useEffect } from "react"

interface RealTimeClockProps {
  onPeriodChange: (isAM: boolean) => void
}

export function RealTimeClock({ onPeriodChange }: RealTimeClockProps) {
  const [time, setTime] = useState("")
  const [isAM, setIsAM] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      const isPM = hours >= 12
      const displayHours = hours % 12 || 12

      setTime(
        `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      )
      setIsAM(!isPM)
      onPeriodChange(!isPM)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [onPeriodChange])

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-rose-100 dark:bg-slate-800 border border-rose-200 dark:border-slate-700">
      <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
        <span className="text-lg font-bold text-rose-600 dark:text-rose-400">{time}</span>
      </div>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400">
        {isAM ? "AM" : "PM"}
      </span>
    </div>
  )
}
