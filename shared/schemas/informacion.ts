import { z } from 'zod'
import { aceptaPrivacidad, correoOpcional, nombre, telefono, texto, trampa } from './comun'

// Este esquema lo usan DOS lados: el formulario y el servidor (que es quien decide).

export const TEMAS_INFORMACION = ['precios', 'servicios', 'convenios', 'pagos', 'otra'] as const

export const informacionSchema = z.object({
  nombre,
  telefono,
  correo: correoOpcional,
  tema: z.enum(TEMAS_INFORMACION, 'Elige un tema'),
  pregunta: texto('Cuéntanos tu pregunta', 5, 1000),
  aceptaPrivacidad,
  sitioWeb: trampa
})

export type InformacionInput = z.input<typeof informacionSchema>
