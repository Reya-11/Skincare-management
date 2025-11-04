"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface RoutineStep {
  id: string
  name: string
  duration: string
  completed: boolean
}

interface RoutineTrackerProps {
  isAM: boolean
}

export function RoutineTracker({ isAM }: RoutineTrackerProps) {
  const defaultAmRoutine: RoutineStep[] = [
    { id: "am1", name: "Cleanse Face", duration: "2 min", completed: false },
    { id: "am2", name: "Apply Toner", duration: "1 min", completed: false },
    { id: "am3", name: "Apply Serums & Actives", duration: "2 min", completed: false },
    { id: "am4", name: "Moisturizer", duration: "1 min", completed: false },
    { id: "am5", name: "Sunscreen SPF 50", duration: "2 min", completed: false },
  ]

  const defaultPmRoutine: RoutineStep[] = [
    { id: "pm1", name: "Remove Makeup", duration: "3 min", completed: false },
    { id: "pm2", name: "Cleanse Face", duration: "2 min", completed: false },
    { id: "pm3", name: "Apply Toner", duration: "1 min", completed: false },
    { id: "pm4", name: "Apply Serums & Actives", duration: "3 min", completed: false },
    { id: "pm5", name: "Night Moisturizer", duration: "2 min", completed: false },
    { id: "pm6", name: "Eye Cream", duration: "1 min", completed: false },
  ]

  const [routine, setRoutine] = useState<RoutineStep[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [newStepName, setNewStepName] = useState("")
  const [newStepDuration, setNewStepDuration] = useState("1 min")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedRoutine = localStorage.getItem(isAM ? "amRoutine" : "pmRoutine")
    if (savedRoutine) {
      try {
        setRoutine(JSON.parse(savedRoutine))
      } catch (e) {
        setRoutine(isAM ? defaultAmRoutine : defaultPmRoutine)
      }
    } else {
      setRoutine(isAM ? defaultAmRoutine : defaultPmRoutine)
    }
  }, [isAM])

  const updateRoutine = (newRoutine: RoutineStep[]) => {
    setRoutine(newRoutine)
    localStorage.setItem(isAM ? "amRoutine" : "pmRoutine", JSON.stringify(newRoutine))
  }

  const toggleStep = (id: string) => {
    const updated = routine.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step))
    updateRoutine(updated)
  }

  const addStep = () => {
    if (!newStepName.trim()) return

    const newStep: RoutineStep = {
      id: `${isAM ? "am" : "pm"}-${Date.now()}`,
      name: newStepName,
      duration: newStepDuration,
      completed: false,
    }

    updateRoutine([...routine, newStep])
    setNewStepName("")
    setNewStepDuration("1 min")
  }

  const deleteStep = (id: string) => {
    updateRoutine(routine.filter((step) => step.id !== id))
  }

  const resetRoutine = () => {
    const defaultRoutine = isAM ? defaultAmRoutine : defaultPmRoutine
    updateRoutine(defaultRoutine)
  }

  if (!mounted) return null

  const completedCount = routine.filter((s) => s.completed).length
  const progress = routine.length > 0 ? (completedCount / routine.length) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {isAM ? "🌅 Morning" : "🌙 Evening"} Routine
        </h2>
        <span className="text-lg font-semibold text-rose-600 dark:text-rose-400">
          {completedCount}/{routine.length} Steps
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-rose-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Routine Steps */}
      <div className="grid gap-3">
        {routine.map((step) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border-2 transition-all flex items-center justify-between group ${
              step.completed
                ? "bg-rose-50 dark:bg-slate-800 border-rose-200 dark:border-rose-600"
                : "bg-white dark:bg-slate-800 border-transparent hover:border-rose-200 dark:hover:border-slate-600"
            }`}
          >
            <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleStep(step.id)}>
              <Checkbox checked={step.completed} onChange={() => toggleStep(step.id)} className="w-6 h-6" />
              <div className="flex-1">
                <h3
                  className={`font-semibold ${step.completed ? "line-through text-slate-400" : "text-slate-900 dark:text-white"}`}
                >
                  {step.name}
                </h3>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">{step.duration}</span>
            </div>
            <button
              onClick={() => deleteStep(step.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-red-500 hover:text-red-700 text-lg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add New Step Section */}
      {isEditing && (
        <Card className="p-4 bg-white dark:bg-slate-800 border-rose-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Add New Step</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newStepName}
              onChange={(e) => setNewStepName(e.target.value)}
              placeholder="Step name (e.g., Apply Serum)"
              className="w-full px-3 py-2 rounded-lg border border-rose-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="text"
              value={newStepDuration}
              onChange={(e) => setNewStepDuration(e.target.value)}
              placeholder="Duration (e.g., 2 min)"
              className="w-full px-3 py-2 rounded-lg border border-rose-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <div className="flex gap-2">
              <Button
                onClick={addStep}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold"
              >
                Add Step
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false)
                  setNewStepName("")
                }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 flex-wrap">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="flex-1 min-w-40 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          {isEditing ? "Done Editing" : "✎ Customize Routine"}
        </Button>
        <Button
          className="flex-1 min-w-40 bg-slate-500 hover:bg-slate-600 text-white font-semibold"
          onClick={resetRoutine}
        >
          Reset to Default
        </Button>
        {completedCount === routine.length && routine.length > 0 && (
          <Button className="flex-1 min-w-40 bg-green-500 hover:bg-green-600 text-white font-semibold">
            ✓ Completed!
          </Button>
        )}
      </div>
    </div>
  )
}
