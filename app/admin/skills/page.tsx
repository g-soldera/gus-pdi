'use client'

import React, { useState, useEffect } from 'react'
import { AdminSidebar } from '@/app/components/admin/sidebar'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Plus, Search, Trash2, Edit2, Loader } from 'lucide-react'
import { toast } from 'sonner'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  type: string
  status: string
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  
  // Form state
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState(1)
  const [type, setType] = useState('hard')
  const [status, setStatus] = useState('not-started')

  const fetchSkills = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/pdi?table=skills')
      const json = await res.json()
      if (res.ok) {
        setSkills(json.data || [])
      } else {
        toast.error(json.error || 'Failed to fetch skills')
      }
    } catch (err) {
      toast.error('Network error while fetching skills')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      table: 'skills',
      data: { name, category, level: Number(level), type, status }
    }

    try {
      const url = editingSkill ? `/api/pdi/${editingSkill.id}` : '/api/pdi'
      const method = editingSkill ? 'PATCH' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSkill ? { table: 'skills', data: payload.data } : payload)
      })

      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Operation failed')
        return
      }

      toast.success(editingSkill ? 'Skill updated successfully' : 'Skill created successfully')
      setIsModalOpen(false)
      setEditingSkill(null)
      setName('')
      setCategory('')
      setLevel(1)
      fetchSkills()
    } catch (err) {
      toast.error('An error occurred during save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      const res = await fetch(`/api/pdi/${id}?table=skills`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Failed to delete skill')
        return
      }
      toast.success('Skill deleted successfully')
      fetchSkills()
    } catch (err) {
      toast.error('Network error during deletion')
    }
  }

  const filteredSkills = skills.filter(s => 
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Skills Management</h1>
              <p className="text-muted-foreground">Manage technical and soft skills inventory</p>
            </div>
            <Button onClick={() => { setEditingSkill(null); setName(''); setCategory(''); setIsModalOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" /> Add Skill
            </Button>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search skills by name or category..."
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
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Level</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map(skill => (
                      <tr key={skill.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium text-foreground">{skill.name}</td>
                        <td className="p-4 text-muted-foreground">{skill.category}</td>
                        <td className="p-4 text-muted-foreground">L{skill.level}</td>
                        <td className="p-4 capitalize text-muted-foreground">{skill.type}</td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                            {skill.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingSkill(skill)
                              setName(skill.name)
                              setCategory(skill.category)
                              setLevel(skill.level)
                              setType(skill.type)
                              setStatus(skill.status)
                              setIsModalOpen(true)
                            }}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(skill.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        No skills found
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
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Category</label>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Level (1-7)</label>
                    <Input type="number" min={1} max={7} value={level} onChange={(e) => setLevel(Number(e.target.value))} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-background border border-input rounded-md p-2 text-sm text-foreground"
                    >
                      <option value="hard">Hard</option>
                      <option value="soft">Soft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-background border border-input rounded-md p-2 text-sm text-foreground"
                    >
                      <option value="not-started">Not Started</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSkill ? 'Update' : 'Create'}
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
