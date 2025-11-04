"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Active {
  id: string
  name: string
  type: string
  concentration: string
  benefits: string[]
  appliedToday: boolean
}

export function ActivesManager() {
  const [actives, setActives] = useState<Active[]>([
    {
      id: "1",
      name: "Vitamin C Serum",
      type: "Antioxidant",
      concentration: "15%",
      benefits: ["Brightening", "Anti-aging", "Protection"],
      appliedToday: false,
    },
    {
      id: "2",
      name: "Retinol",
      type: "Vitamin A Derivative",
      concentration: "0.5%",
      benefits: ["Anti-aging", "Texture", "Firmness"],
      appliedToday: false,
    },
    {
      id: "3",
      name: "Niacinamide",
      type: "B Vitamin",
      concentration: "10%",
      benefits: ["Pore Minimizing", "Oil Control", "Barrier Support"],
      appliedToday: false,
    },
    {
      id: "4",
      name: "Hyaluronic Acid",
      type: "Hydrator",
      concentration: "1%",
      benefits: ["Hydration", "Plumping", "Dewy Finish"],
      appliedToday: false,
    },
  ])

  const [newActive, setNewActive] = useState({ name: "", type: "", concentration: "" })

  const toggleActive = (id: string) => {
    setActives(actives.map((active) => (active.id === id ? { ...active, appliedToday: !active.appliedToday } : active)))
  }

  const addActive = () => {
    if (newActive.name && newActive.type) {
      setActives([
        ...actives,
        {
          id: String(Date.now()),
          ...newActive,
          concentration: newActive.concentration || "N/A",
          benefits: [],
          appliedToday: false,
        },
      ])
      setNewActive({ name: "", type: "", concentration: "" })
    }
  }

  const appliedCount = actives.filter((a) => a.appliedToday).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Active Ingredients</h2>
        <span className="text-lg font-semibold text-rose-600 dark:text-rose-400">
          {appliedCount}/{actives.length} Applied
        </span>
      </div>

      {/* Add New Active */}
      <Card className="p-6 border-rose-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Add New Active</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Product Name"
            value={newActive.name}
            onChange={(e) => setNewActive({ ...newActive, name: e.target.value })}
            className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
          />
          <Input
            placeholder="Type (e.g., Antioxidant)"
            value={newActive.type}
            onChange={(e) => setNewActive({ ...newActive, type: e.target.value })}
            className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
          />
          <Input
            placeholder="Concentration %"
            value={newActive.concentration}
            onChange={(e) => setNewActive({ ...newActive, concentration: e.target.value })}
            className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
          />
          <Button
            onClick={addActive}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
          >
            Add
          </Button>
        </div>
      </Card>

      {/* Actives List */}
      <div className="grid gap-4">
        {actives.map((active) => (
          <Card
            key={active.id}
            className={`p-4 cursor-pointer transition-all border-2 ${
              active.appliedToday
                ? "bg-rose-50 dark:bg-slate-800 border-rose-300 dark:border-rose-600"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}
            onClick={() => toggleActive(active.id)}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={active.appliedToday}
                onChange={() => toggleActive(active.id)}
                className="w-5 h-5 mt-1 cursor-pointer accent-rose-500"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{active.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{active.type}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {active.concentration}
                  </span>
                  {active.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              {active.appliedToday && <span className="text-2xl">✓</span>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
