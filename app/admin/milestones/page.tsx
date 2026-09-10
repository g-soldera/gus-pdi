'use client'

import React, { useState, useEffect } from 'react'
import { AdminSidebar } from '@/app/components/admin/sidebar'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Plus, Search, Trash2, Edit2, Loader } from 'lucide-react'
import { toast } from 'sonner'

interface Milestone {
  id: string
  title: string
  display_name: string
  phase: string | number
  progress: number
  deadline: string
  archived: boolean
}

export default function AdminMilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null)
  
  // Form state
  const [title, setTitle] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [phase, setPhase] = useState('L2')
  const [deadline, setDeadline] = useState('')
  const [archived, setArchived] = useState(false)

  const fetchMilestones = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/pdi?table=milestones')
      const json = await res.json()
      if (res.ok) {
        setMilestones(json.data || [])
      } else {
        toast.error(json.error || 'Failed to fetch milestones')
      }
    } catch (err) {
      toast.error('Network error while fetching milestones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMilestones()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      table: 'milestones',
      data: { title, display_name: displayName, phase, deadline, archived }
    }

    try {
      const url = editingMilestone ? `/api/pdi/${editingMilestone.id}` : '/api/pdi'
      const method = editingMilestone ? 'PATCH' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMilestone ? { table: 'milestones', data: payload.data } : payload)
      })

      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Operation failed')
        return
      }

      toast.success(editingMilestone ? 'Milestone updated successfully' : 'Milestone created successfully')
      setIsModalOpen(false)
      setEditingMilestone(null)
      setTitle('')
      setDisplayName('')
      setDeadline('')
      fetchMilestones()
    } catch (err) {
      toast.error('An error occurred during save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return

    try {
      const res = await fetch(`/api/pdi/${id}?table=milestones`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Failed to delete milestone')
        return
      }
      toast.success('Milestone deleted successfully')
      fetchMilestones()
    } catch (err) {
      toast.error('Network error during deletion')
    }
  }

  const filteredMilestones = milestones.filter(m => 
    m.title?.toLowerCase().includes(search.toLowerCase()) ||
    m.display_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Milestones Management</h1>
              <p className="text-muted-foreground">Manage project milestones and phase targets</p>
            </div>
            <Button onClick={() => { setEditingMilestone(null); setTitle(''); setDisplayName(''); setDeadline(''); setIsModalOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" /> Add Milestone
            </Button>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search milestones by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
                    <th className="p-4">Title</th>
                    <th className="p-4">Display Name</th>
                    <th className="p-4">Phase</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {filteredMilestones.length > 0 ? (
                    filteredMilestones.map(m => (
                      <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium text-foreground">{m.title}</td>
                        <td className="p-4 text-muted-foreground">{m.display_name || '—'}</td>
                        <td className="p-4 text-muted-foreground">{m.phase}</td>
                        <td className="p-4 text-muted-foreground">{m.deadline || '—'}</td>
                        <td className="p-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${m.archived ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                            {m.archived ? 'Archived' : 'Active'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingMilestone(m)
                              setTitle(m.title)
                              setDisplayName(m.display_name || '')
                              setPhase(String(m.phase))
                              setDeadline(m.deadline || '')
                              setArchived(m.archived)
                              setIsModalOpen(true)
                            }}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(m.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        No milestones found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-foreground">
                  {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Display Name</label>
                    <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Phase</label>
                    <Input value={phase} onChange={(e) => setPhase(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Deadline</label>
                    <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="archived"
                      checked={archived}
                      onChange={(e) => setArchived(e.target.checked)}
                      className="rounded border-input text-primary focus:ring-primary"
                    />
                    <label htmlFor="archived" className="text-sm font-medium text-foreground">Archived</label>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingMilestone ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
