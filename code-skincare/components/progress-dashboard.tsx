"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface ProgressData {
  date: string
  hydration: number
  clarity: number
  radiance: number
  texture: number
}

export function ProgressDashboard() {
  const [progressData] = useState<ProgressData[]>([
    { date: "Day 1", hydration: 60, clarity: 55, radiance: 50, texture: 52 },
    { date: "Day 7", hydration: 68, clarity: 62, radiance: 60, texture: 65 },
    { date: "Day 14", hydration: 75, clarity: 70, radiance: 72, texture: 75 },
    { date: "Day 21", hydration: 80, clarity: 78, radiance: 82, texture: 85 },
    { date: "Day 28", hydration: 85, clarity: 85, radiance: 88, texture: 90 },
  ])

  const [completionData] = useState([
    { week: "Week 1", completed: 65 },
    { week: "Week 2", completed: 72 },
    { week: "Week 3", completed: 85 },
    { week: "Week 4", completed: 92 },
  ])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Your Progress</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 border-blue-200 dark:border-slate-600">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Hydration</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">+25%</div>
          <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">From baseline</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-slate-800 dark:to-slate-700 border-emerald-200 dark:border-slate-600">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Clarity</div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+30%</div>
          <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">From baseline</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-800 dark:to-slate-700 border-amber-200 dark:border-slate-600">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Radiance</div>
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">+38%</div>
          <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">From baseline</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-slate-800 dark:to-slate-700 border-rose-200 dark:border-slate-600">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Texture</div>
          <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">+38%</div>
          <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">From baseline</div>
        </Card>
      </div>

      {/* Progress Line Chart - CSS Alternative */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">4-Week Improvement</h3>
        <div className="space-y-6">
          {progressData.map((data, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">{data.date}</span>
                <span className="text-slate-600 dark:text-slate-400 text-xs">
                  H: {data.hydration}% | C: {data.clarity}% | R: {data.radiance}% | T: {data.texture}%
                </span>
              </div>
              <div className="flex gap-1 h-8">
                <div
                  className="bg-blue-500 rounded flex-1 opacity-80"
                  style={{ height: "100%", width: `${data.hydration}%`, maxWidth: "100%" }}
                  title={`Hydration: ${data.hydration}%`}
                />
                <div
                  className="bg-emerald-500 rounded flex-1 opacity-80"
                  style={{ height: "100%", width: `${data.clarity}%`, maxWidth: "100%" }}
                  title={`Clarity: ${data.clarity}%`}
                />
                <div
                  className="bg-amber-500 rounded flex-1 opacity-80"
                  style={{ height: "100%", width: `${data.radiance}%`, maxWidth: "100%" }}
                  title={`Radiance: ${data.radiance}%`}
                />
                <div
                  className="bg-rose-500 rounded flex-1 opacity-80"
                  style={{ height: "100%", width: `${data.texture}%`, maxWidth: "100%" }}
                  title={`Texture: ${data.texture}%`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Routine Completion Bar Chart - CSS Alternative */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Routine Completion Rate</h3>
        <div className="space-y-4">
          {completionData.map((data, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-900 dark:text-white">{data.week}</span>
                <span className="text-slate-600 dark:text-slate-400">{data.completed}%</span>
              </div>
              <div className="w-full h-8 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg transition-all"
                  style={{ width: `${data.completed}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 border-rose-200 dark:border-slate-600">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">💡 Skincare Insights</h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          <li className="flex gap-2">
            <span>✓</span>
            <span>Consistency is key! You've improved routine completion by 27% this month.</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Your skin's hydration level shows the most improvement - keep using that hydrating serum!</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Continue your evening routine for best results - your texture improved 40% since week 1.</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
