import { empresaSchema } from '#shared/schemas/empresa'

// POST /api/solicitudes/empresa
export default defineEventHandler(event => recibirSolicitud(event, {
  tipo: 'empresa',
  esquema: empresaSchema,
  mapear: v => ({
    nombre: v.nombre,
    telefono: v.telefono,
    correo: v.correo,
    datos: {
      empresa: v.empresa,
      area: v.area,
      ciudad: v.ciudad,
      interesados: v.interesados,
      servicio: v.servicio,
      fechaTentativa: v.fechaTentativa || undefined,
      comentarios: v.comentarios || undefined
    }
  })
}))
