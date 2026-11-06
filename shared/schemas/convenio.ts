import { z } from 'zod'
import { linea } from './comun'

export const convenioSchema = z.object({
  nombre: linea('Escribe el nombre de la empresa', 2, 120),
  vigente: z.boolean().optional(),
  orden: z.number().int().min(0).max(100000).optional()
})
