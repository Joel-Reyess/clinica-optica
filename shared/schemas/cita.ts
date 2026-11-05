import { z } from 'zod'
import { aceptaPrivacidad, correoOpcional, nombre, telefono, trampa } from './comun'

export const SERVICIOS_CITA = [
  'examen-vista',
  'valoracion-visual',
  'asesoria-lentes',
  'ajuste-armazon',
  'otro'
] as const

export const TIPOS_PACIENTE = ['nuevo', 'existente'] as const

// Hoy en la zona horaria de la clínica (el servidor puede estar en otra zona).
export function hoyMexico(ahora = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' }).format(ahora)
}

export const citaSchema = z.object({
  nombre,
  telefono,
  correo: correoOpcional,
  servicio: z.enum(SERVICIOS_CITA, 'Elige un servicio'),
  tipoPaciente: z.enum(TIPOS_PACIENTE, 'Indica si eres paciente nuevo'),
  fecha: z.iso.date('Elige un día'),
  hora: z.string('Elige una hora').regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Elige una hora válida'),
  esMenor: z.boolean().optional(),
  responsableNombre: z.string().trim().max(120).optional(),
  responsableTelefono: z.string().optional(),
  aceptaPrivacidad,
  sitioWeb: trampa
}).superRefine((v, ctx) => {
  if (v.fecha) {
    if (v.fecha < hoyMexico()) {
      ctx.addIssue({ code: 'custom', path: ['fecha'], message: 'Elige un día que no haya pasado' })
    } else if (new Date(`${v.fecha}T12:00:00Z`).getUTCDay() === 0) {
      ctx.addIssue({ code: 'custom', path: ['fecha'], message: 'No damos citas los domingos' })
    }
  }
  if (v.esMenor) {
    if (!v.responsableNombre || v.responsableNombre.length < 2) {
      ctx.addIssue({ code: 'custom', path: ['responsableNombre'], message: 'Escribe el nombre del responsable' })
    }
    if (!v.responsableTelefono || v.responsableTelefono.replace(/\D/g, '').length < 10) {
      ctx.addIssue({ code: 'custom', path: ['responsableTelefono'], message: 'Escribe el teléfono del responsable' })
    }
  }
})

export type CitaInput = z.input<typeof citaSchema>
