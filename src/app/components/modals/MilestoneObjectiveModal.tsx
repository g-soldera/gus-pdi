import React, { useState } from 'react';
import { Modal } from './Modal';
import { Loader, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface MilestoneObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestoneId: string;
  milestoneTitle: string;
  objectiveIndex: number;
  objectiveText: string;
  currentCompleted: boolean;
  onSuccess: () => void;
}

/**
 * Modal for completing milestone objectives with justification and password verification
 * Requirements: MCF-05, MCF-06, MCF-07, MCF-08
 * Threat mitigation: T-05-03 (password verification), T-05-04 (input sanitization)
 */
export function MilestoneObjectiveModal({
  isOpen,
  onClose,
  milestoneId,
  milestoneTitle,
  objectiveIndex,
  objectiveText,
  currentCompleted,
  onSuccess,
}: MilestoneObjectiveModalProps) {
  const [justification, setJustification] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Client-side validation
    if (justification.trim().length < 10) {
      setError('Justification must be at least 10 characters')
      return
    }

    if (!password.trim()) {
      setError('Password is required')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        `/api/milestones/${milestoneId}/objectives/${objectiveIndex}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !currentCompleted,
            justification: justification.trim(),
            password: password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to update objective')
        setIsSubmitting(false)
        toast.error(data.error || 'Failed to update objective')
        return
      }

      // Success - notify parent component
      toast.success('Objective completed successfully!')
      onSuccess()
      
      // Reset form
      setJustification('')
      setPassword('')
      setIsSubmitting(false)
      onClose()
    } catch (err) {
      console.error('Error updating objective:', err)
      setError('Network error. Please try again.')
      toast.error('Network error. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setJustification('')
      setPassword('')
      setError(null)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Complete Objective">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Milestone Context */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-xs font-bold text-muted-foreground mb-1">MILESTONE</p>
          <p className="text-sm font-bold text-foreground">{milestoneTitle}</p>
        </div>

        {/* Objective Text */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Objective
          </label>
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <p className="text-sm text-foreground">{objectiveText}</p>
          </div>
        </div>

        {/* Justification Input */}
        <div>
          <label htmlFor="justification" className="block text-sm font-medium text-foreground mb-2">
            Justification <span className="text-destructive">*</span>
          </label>
          <textarea
            id="justification"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Explain how you completed this objective (minimum 10 characters)..."
            className="w-full min-h-[120px] px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-y"
            disabled={isSubmitting}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            {justification.length} / 10 minimum characters
          </p>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Admin Password <span className="text-destructive">*</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || justification.trim().length < 10 || !password.trim()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Mark as Complete
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
