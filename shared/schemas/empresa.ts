import { z } from 'zod'
import { aceptaPrivacidad, correoOpcional, linea, nombre, telefono, textoOpcional, trampa } from './comun'

export const SERVICIOS_EMPRESA = [
  'evaluacion-visual',
  'lentes-oftalmicos',
  'lentes-seguridad-graduados'
] as const

export const empresaSchema = z.object({
  empresa: linea('Escribe el nombre de la empresa', 2, 160),
  nombre,
  area: linea('Escribe tu área o puesto', 2, 120),
  ciudad: linea('Escribe la ciudad o sede', 2, 120),
  telefono,
  correo: correoOpcional,
  interesados: z.coerce.number('Escribe un número aproximado')
    .int('Escribe un número entero')
    .min(1, 'Debe ser al menos 1')
    .max(100000, 'El número es muy grande'),
  servicio: z.enum(SERVICIOS_EMPRESA, 'Elige un servicio'),
  fechaTentativa: z.union([z.literal(''), z.iso.date('La fecha no es válida')]).optional(),
  comentarios: textoOpcional(1000),
  aceptaPrivacidad,
  sitioWeb: trampa
})

export type EmpresaInput = z.input<typeof empresaSchema>
