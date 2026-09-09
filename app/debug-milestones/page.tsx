'use client'

import { useEffect, useState } from 'react'
import { getMilestones } from '@/data/pdiData'
import type { Milestone } from '@/types/pdi'

export default function DebugMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getMilestones()
        console.log('Milestones loaded:', data.length)
        console.log('Sample:', data[0])
        setMilestones(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error loading milestones:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  const l2Milestones = milestones.filter(m => !m.archived && m.phase === 'L2')

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debug: Milestones Data</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p><strong>Total milestones:</strong> {milestones.length}</p>
          <p><strong>L2 milestones (not archived):</strong> {l2Milestones.length}</p>
          <p><strong>Archived:</strong> {milestones.filter(m => m.archived).length}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">L2 Milestones:</h2>
          {l2Milestones.length === 0 ? (
            <p className="text-gray-500">No L2 milestones found</p>
          ) : (
            <ul className="space-y-2">
              {l2Milestones.map(m => (
                <li key={m.id} className="p-3 bg-white dark:bg-gray-900 border rounded">
                  <p><strong>{m.title}</strong></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Phase: {m.phase} | Status: {m.status} | Progress: {m.progress}%
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">All phases distribution:</h2>
          {['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'].map(phase => {
            const count = milestones.filter(m => m.phase === phase && !m.archived).length
            return (
              <p key={phase} className="text-sm">
                {phase}: {count} milestones
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
