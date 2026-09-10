'use client'

import React, { useState, useEffect } from 'react'
import { AdminSidebar } from '@/app/components/admin/sidebar'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Plus, Search, Trash2, Edit2, Loader } from 'lucide-react'
import { toast } from 'sonner'

interface Resource {
  id: string
  name: string
  parent_category: string
  sub_category: string
  status: string
  url: string
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  
  // Form state
  const [name, setName] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [status, setStatus] = useState('not-started')
  const [url, setUrl] = useState('')

  const fetchResources = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/pdi?table=resources')
      const json = await res.json()
      if (res.ok) {
        setResources(json.data || [])
      } else {
        toast.error(json.error || 'Failed to fetch resources')
      }
    } catch (err) {
      toast.error('Network error while fetching resources')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      table: 'resources',
      data: { name, parent_category: parentCategory, sub_category: subCategory, status, url }
    }

    try {
      const urlPath = editingResource ? `/api/pdi/${editingResource.id}` : '/api/pdi'
      const method = editingResource ? 'PATCH' : 'POST'
      
      const res = await fetch(urlPath, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingResource ? { table: 'resources', data: payload.data } : payload)
      })

      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Operation failed')
        return
      }

      toast.success(editingResource ? 'Resource updated successfully' : 'Resource created successfully')
      setIsModalOpen(false)
      setEditingResource(null)
      setName('')
      setParentCategory('')
      setSubCategory('')
      setUrl('')
      fetchResources()
    } catch (err) {
      toast.error('An error occurred during save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return

    try {
      const res = await fetch(`/api/pdi/${id}?table=resources`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Failed to delete resource')
        return
      }
      toast.success('Resource deleted successfully')
      fetchResources()
    } catch (err) {
      toast.error('Network error during deletion')
    }
  }

  const filteredResources = resources.filter(r => 
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.parent_category?.toLowerCase().includes(search.toLowerCase()) ||
    r.sub_category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Resources Management</h1>
              <p className="text-muted-foreground">Manage study paths, certifications, and learning materials</p>
            </div>
            <Button onClick={() => { setEditingResource(null); setName(''); setParentCategory(''); setSubCategory(''); setUrl(''); setIsModalOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" /> Add Resource
            </Button>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources by name or category..."
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
                    <th className="p-4">Parent Category</th>
                    <th className="p-4">Sub Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">URL</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {filteredResources.length > 0 ? (
                    filteredResources.map(res => (
                      <tr key={res.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium text-foreground">{res.name}</td>
                        <td className="p-4 text-muted-foreground">{res.parent_category || '—'}</td>
                        <td className="p-4 text-muted-foreground">{res.sub_category || '—'}</td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                            {res.status}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground truncate max-w-xs">
                          {res.url ? <a href={res.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{res.url}</a> : '—'}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingResource(res)
                              setName(res.name)
                              setParentCategory(res.parent_category || '')
                              setSubCategory(res.sub_category || '')
                              setStatus(res.status)
                              setUrl(res.url || '')
                              setIsModalOpen(true)
                            }}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(res.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        No resources found
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
                  {editingResource ? 'Edit Resource' : 'Add New Resource'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Parent Category</label>
                    <Input value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Sub Category</label>
                    <Input value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
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
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Resource URL</label>
                    <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingResource ? 'Update' : 'Create'}
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
