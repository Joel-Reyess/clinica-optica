import { z } from 'zod'
import { aceptaPrivacidad, correoOpcional, lineaOpcional, nombre, telefono, textoOpcional, trampa } from './comun'

export const OPCIONES_ARMAZON = ['armazon-con-micas', 'solo-micas'] as const
export const SITUACIONES_VISUALES = ['tengo-receta', 'necesito-evaluacion', 'ya-me-atendieron'] as const
export const TIPOS_LENTE = ['monofocal', 'bifocal', 'progresivo', 'asesoria'] as const
export const TRATAMIENTOS = ['antirreflejante', 'filtro-azul', 'fotocromatico', 'polarizado', 'asesoria'] as const

export const cotizacionSchema = z.object({
  nombre,
  telefono,
  correo: correoOpcional,
  opcionArmazon: z.enum(OPCIONES_ARMAZON, 'Elige una opción'),
  situacionVisual: z.enum(SITUACIONES_VISUALES, 'Elige tu situación visual'),
  tipoLente: z.enum(TIPOS_LENTE, 'Elige un tipo de lente'),
  tratamientos: z.array(z.enum(TRATAMIENTOS)).max(5).optional(),
  modelo: lineaOpcional(160),
  categoria: lineaOpcional(80),
  codigo: lineaOpcional(80),
  color: lineaOpcional(80),
  motivo: lineaOpcional(200),
  requisitosTrabajo: textoOpcional(500),
  aceptaPrivacidad,
  sitioWeb: trampa
})

export type CotizacionInput = z.input<typeof cotizacionSchema>
