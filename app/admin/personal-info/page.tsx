'use client'

import React, { useState, useEffect } from 'react'
import { AdminSidebar } from '@/app/components/admin/sidebar'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminPersonalInfoPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [recordId, setRecordId] = useState<string | null>(null)

  // Form state
  const [company, setCompany] = useState('')
  const [department, setDepartment] = useState('')
  const [currentRole, setCurrentRole] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [currentLevel, setCurrentLevel] = useState('')
  const [targetLevel, setTargetLevel] = useState('')

  const fetchPersonalInfo = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/pdi?table=personal_info')
      const json = await res.json()
      if (res.ok && json.data && json.data.length > 0) {
        const item = json.data[0]
        setRecordId(item.id)
        setCompany(item.company || '')
        setDepartment(item.department || '')
        setCurrentRole(item.current_role || '')
        setTargetRole(item.target_role || '')
        setCurrentLevel(item.current_level || '')
        setTargetLevel(item.target_level || '')
      }
    } catch (err) {
      toast.error('Failed to load personal info')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPersonalInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payloadData = {
      company,
      department,
      current_role: currentRole,
      target_role: targetRole,
      current_level: currentLevel,
      target_level: targetLevel,
    }

    try {
      let res: Response
      if (recordId) {
        res = await fetch(`/api/pdi/${recordId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ table: 'personal_info', data: payloadData })
        })
      } else {
        res = await fetch('/api/pdi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ table: 'personal_info', data: payloadData })
        })
      }

      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Failed to save personal info')
        return
      }

      toast.success('Personal info updated successfully')
      if (json.data?.id) setRecordId(json.data.id)
    } catch (err) {
      toast.error('Network error during save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-1">Personal Info Management</h1>
            <p className="text-muted-foreground">Manage profile, current role, and career targets</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Company</label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Itaú Unibanco" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Department</label>
                  <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Cyber Security" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Current Role</label>
                  <Input value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} placeholder="Engenheiro de Analytics" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Target Role</label>
                  <Input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="AI Security Specialist" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Current Level</label>
                  <Input value={currentLevel} onChange={(e) => setCurrentLevel(e.target.value)} placeholder="L2" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Target Level</label>
                  <Input value={targetLevel} onChange={(e) => setTargetLevel(e.target.value)} placeholder="L5" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
