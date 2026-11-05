import { z } from 'zod'

export const convenioSchema = z.object({
  nombre: z.string('Escribe el nombre de la empresa').trim().min(2, 'Escribe el nombre de la empresa').max(120),
  vigente: z.boolean().optional(),
  orden: z.number().int().min(0).max(100000).optional()
})
