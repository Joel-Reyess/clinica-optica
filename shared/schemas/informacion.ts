import { z } from 'zod'

// Este esquema lo usan DOS lados: el formulario (para avisar mientras escribes)
// y el servidor (que es quien realmente decide si los datos valen). Se escribe una vez.

export const TEMAS_INFORMACION = ['precios', 'servicios', 'convenios', 'pagos', 'otra'] as const

export const informacionSchema = z.object({
  nombre: z.string('Escribe tu nombre').trim().min(2, 'Escribe tu nombre').max(120, 'El nombre es muy largo'),
  // Solo dígitos; acepta 10 (local) hasta 13 (con lada de país)
  telefono: z.string('Escribe tu teléfono')
    .transform(v => v.replace(/\D/g, ''))
    .refine(v => v.length >= 10 && v.length <= 13, 'Escribe un teléfono de 10 dígitos'),
  // Opcional: el campo vacío ('') cuenta como "no lo puso"
  correo: z.union([z.literal(''), z.email('El correo no es válido').max(160)]).optional(),
  tema: z.enum(TEMAS_INFORMACION, 'Elige un tema'),
  pregunta: z.string('Cuéntanos tu pregunta').trim().min(5, 'Cuéntanos tu pregunta').max(1000, 'La pregunta es muy larga'),
  aceptaPrivacidad: z.literal(true, 'Debes aceptar el aviso de privacidad')
})

// Lo que escribe la persona en el formulario (antes de limpiar el teléfono)
export type InformacionInput = z.input<typeof informacionSchema>
