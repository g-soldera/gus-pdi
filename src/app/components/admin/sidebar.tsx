import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, Award, Flag, Briefcase, BookOpen, User, LogOut } from 'lucide-react'

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground">PDI Admin Panel</h2>
        <p className="text-xs text-muted-foreground">Manage all system entities</p>
      </div>

      <nav className="space-y-2 flex-1">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <LayoutDashboard className="w-4 h-4 text-primary" />
          Feedbacks
        </Link>
        <Link
          href="/admin/skills"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Award className="w-4 h-4 text-primary" />
          Skills
        </Link>
        <Link
          href="/admin/milestones"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Flag className="w-4 h-4 text-primary" />
          Milestones
        </Link>
        <Link
          href="/admin/projects"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Briefcase className="w-4 h-4 text-primary" />
          Projects
        </Link>
        <Link
          href="/admin/resources"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <BookOpen className="w-4 h-4 text-primary" />
          Resources
        </Link>
        <Link
          href="/admin/personal-info"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <User className="w-4 h-4 text-primary" />
          Personal Info
        </Link>
      </nav>

      <div className="pt-6 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Back to App
        </Link>
      </div>
    </aside>
  )
}
