import { z } from 'zod'

export const CATEGORIAS = ['clasicos', 'modernos', 'seguridad-graduada'] as const

export const productoSchema = z.object({
  categoria: z.enum(CATEGORIAS, 'Elige una categoría'),
  marca: z.string().trim().max(60).optional(),
  nombre: z.string('Escribe el nombre').trim().min(2, 'Escribe el nombre').max(120),
  codigo: z.string().trim().max(60).optional(),
  descripcion: z.string().trim().max(1000).optional(),
  colores: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
  precioDesde: z.string().trim().max(40).optional(),
  promocion: z.string().trim().max(200).optional(),
  visible: z.boolean().optional(),
  orden: z.number().int().min(0).max(100000).optional()
})

export type ProductoInput = z.input<typeof productoSchema>
