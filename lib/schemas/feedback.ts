import { z } from 'zod'

export const feedbackSchema = z.object({
  content: z
    .string()
    .min(10, 'Feedback muito curto.')
    .max(2000, 'Limite de 2000 caracteres.')
    .trim(),
  isAnonymous: z.boolean().default(true),
  name: z.string().max(100).trim().nullish(),
  email: z.string().email('Email inválido.').nullish(),
  honeypot: z.literal('').optional(),
}).refine(
  (d) => d.isAnonymous || d.name || d.email,
  { message: 'Informe nome ou email para feedback identificado.', path: ['name'] }
)

export type FeedbackInput = z.infer<typeof feedbackSchema>
