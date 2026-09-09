import { describe, it, expect } from 'vitest'
import { pdiCreateSchema, pdiUpdateSchema } from './crud'

describe('pdiCreateSchema', () => {
  it('validates correct PDI skill creation payload', () => {
    const validPayload = {
      name: 'TypeScript',
      level: 3,
      description: 'Advanced TypeScript knowledge',
      category: 'programming',
      type: 'hard' as const,
      requirements: [
        { id: 'req1', text: 'Understand generics' }
      ]
    }
    
    const result = pdiCreateSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('rejects payload with missing required fields', () => {
    const invalidPayload = {
      name: 'TypeScript',
      // missing level, description, category, type
    }
    
    const result = pdiCreateSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })

  it('validates milestone creation with objectives', () => {
    const validMilestone = {
      title: 'Complete OSCP',
      description: 'Offensive Security Certified Professional',
      status: 'in-progress' as const,
      progress: 50,
      objectives: [
        { text: 'Complete labs', completed: false }
      ],
      related_skills: ['skill1'],
      related_resources: ['res1']
    }
    
    const result = pdiCreateSchema.safeParse(validMilestone)
    expect(result.success).toBe(true)
  })
})

describe('pdiUpdateSchema', () => {
  it('allows partial updates with only changed fields', () => {
    const partialUpdate = {
      progress: 75,
      status: 'completed' as const
    }
    
    const result = pdiUpdateSchema.safeParse(partialUpdate)
    expect(result.success).toBe(true)
  })

  it('validates partial skill update', () => {
    const partialUpdate = {
      level: 4,
      description: 'Expert level TypeScript'
    }
    
    const result = pdiUpdateSchema.safeParse(partialUpdate)
    expect(result.success).toBe(true)
  })

  it('accepts empty object for no changes', () => {
    const result = pdiUpdateSchema.safeParse({})
    expect(result.success).toBe(true)
  })
})
