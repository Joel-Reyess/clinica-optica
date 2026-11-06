import { z } from 'zod'
import { lineaOpcional } from './comun'

const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Usa el formato HH:MM')
const min = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5))

const dia = z.object({
  dia: z.number().int().min(0).max(6),
  activo: z.boolean(),
  apertura: hhmm,
  cierre: hhmm,
  pausaInicio: z.union([hhmm, z.literal(''), z.null()]).optional(),
  pausaFin: z.union([hhmm, z.literal(''), z.null()]).optional()
}).superRefine((d, ctx) => {
  if (!d.activo) return
  if (min(d.apertura) >= min(d.cierre)) {
    ctx.addIssue({ code: 'custom', path: ['cierre'], message: 'El cierre debe ser después de la apertura' })
  }
  const hayIni = Boolean(d.pausaInicio)
  const hayFin = Boolean(d.pausaFin)
  if (hayIni !== hayFin) {
    ctx.addIssue({ code: 'custom', path: ['pausaFin'], message: 'Indica inicio y fin de la pausa, o deja ambos vacíos' })
  } else if (hayIni && hayFin && (min(d.pausaInicio!) >= min(d.pausaFin!) || min(d.pausaInicio!) < min(d.apertura) || min(d.pausaFin!) > min(d.cierre))) {
    ctx.addIssue({ code: 'custom', path: ['pausaFin'], message: 'La pausa debe estar dentro del horario y terminar después de empezar' })
  }
})

export const agendaSchema = z.object({
  semana: z.array(dia).length(7, 'Faltan días de la semana'),
  duracionMin: z.number().int().min(10, 'Mínimo 10 minutos').max(240, 'Máximo 240 minutos'),
  cupo: z.number().int().min(1, 'Mínimo 1').max(20, 'Máximo 20'),
  anticipacionHoras: z.number().int().min(0).max(168, 'Máximo 168 horas (7 días)'),
  diasAdelante: z.number().int().min(1, 'Mínimo 1 día').max(180, 'Máximo 180 días')
})

export const diaCerradoSchema = z.object({
  fecha: z.iso.date('Elige una fecha'),
  motivo: lineaOpcional(120)
})
