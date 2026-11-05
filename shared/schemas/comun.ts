import { z } from 'zod'

// Campos que comparten los cuatro formularios.

export const nombre = z.string('Escribe tu nombre')
  .trim()
  .min(2, 'Escribe tu nombre')
  .max(120, 'El nombre es muy largo')

// Solo dígitos; acepta 10 (local) hasta 13 (con lada de país)
export const telefono = z.string('Escribe tu teléfono')
  .transform(v => v.replace(/\D/g, ''))
  .refine(v => v.length >= 10 && v.length <= 13, 'Escribe un teléfono de 10 dígitos')

// Opcional: el campo vacío ('') cuenta como "no lo puso"
export const correoOpcional = z
  .union([z.literal(''), z.email('El correo no es válido').max(160)])
  .optional()

export const aceptaPrivacidad = z.literal(true, 'Debes aceptar el aviso de privacidad')

// Trampa para bots: un campo oculto que una persona nunca llena.
export const trampa = z.string().max(0).optional()

export const textoOpcional = (max: number) => z.string().trim().max(max, 'El texto es muy largo').optional()

export const texto = (msg: string, min: number, max: number) =>
  z.string(msg).trim().min(min, msg).max(max, 'El texto es muy largo')
