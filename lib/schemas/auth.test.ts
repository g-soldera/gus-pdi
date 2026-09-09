import { describe, it, expect } from 'vitest'
import { loginSchema } from './auth'

describe('loginSchema', () => {
  it('should validate correct email and password format', () => {
    const validInput = {
      email: 'test@example.com',
      password: 'password123',
    }
    
    const result = loginSchema.safeParse(validInput)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.email).toBe('test@example.com')
      expect(result.data.password).toBe('password123')
    }
  })

  it('should reject missing email', () => {
    const invalidInput = {
      password: 'password123',
    }
    
    const result = loginSchema.safeParse(invalidInput)
    expect(result.success).toBe(false)
  })

  it('should reject malformed email', () => {
    const invalidInput = {
      email: 'not-an-email',
      password: 'password123',
    }
    
    const result = loginSchema.safeParse(invalidInput)
    expect(result.success).toBe(false)
  })

  it('should reject missing password', () => {
    const invalidInput = {
      email: 'test@example.com',
    }
    
    const result = loginSchema.safeParse(invalidInput)
    expect(result.success).toBe(false)
  })

  it('should reject empty password', () => {
    const invalidInput = {
      email: 'test@example.com',
      password: '',
    }
    
    const result = loginSchema.safeParse(invalidInput)
    expect(result.success).toBe(false)
  })
})
