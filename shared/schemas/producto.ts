import { z } from 'zod'
import { lineaOpcional, linea, textoOpcional } from './comun'

export const CATEGORIAS = ['clasicos', 'modernos', 'seguridad-graduada'] as const

export const productoSchema = z.object({
  categoria: z.enum(CATEGORIAS, 'Elige una categoría'),
  marca: lineaOpcional(60),
  nombre: linea('Escribe el nombre', 2, 120),
  codigo: lineaOpcional(60),
  descripcion: textoOpcional(1000),
  colores: z.array(linea('Color no válido', 1, 40)).max(20).optional(),
  precioDesde: lineaOpcional(40),
  promocion: lineaOpcional(200),
  visible: z.boolean().optional(),
  orden: z.number().int().min(0).max(100000).optional()
})

export type ProductoInput = z.input<typeof productoSchema>
