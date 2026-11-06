import { z } from 'zod'
import { aceptaPrivacidad, correoOpcional, lineaOpcional, nombre, nombrePersona, telefono, trampa } from './comun'

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
  convenio: lineaOpcional(120),
  esMenor: z.boolean().optional(),
  responsableNombre: z.union([z.literal(''), nombrePersona('Escribe el nombre del responsable')]).optional(),
  responsableTelefono: z.string().max(40).optional(),
  aceptaPrivacidad,
  sitioWeb: trampa
}).superRefine((v, ctx) => {
  if (v.fecha) {
    if (v.fecha < hoyMexico()) {
      ctx.addIssue({ code: 'custom', path: ['fecha'], message: 'Elige un día que no haya pasado' })
    }
    // Qué días se atienden lo decide la clínica en el panel (horarios de citas)
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
