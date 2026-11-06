import { citaSchema } from '#shared/schemas/cita'

// POST /api/solicitudes/cita
// Es una SOLICITUD de cita: el horario queda "pendiente de confirmación".
export default defineEventHandler(event => recibirSolicitud(event, {
  tipo: 'cita',
  esquema: citaSchema,
  verificar: (v) => {
    if (!horarioLibre(v.fecha, v.hora)) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Unprocessable Entity',
        message: 'Datos no válidos',
        data: { errors: { hora: ['Ese horario ya no está disponible. Elige otro, por favor.'] } }
      })
    }
  },
  mapear: v => ({
    nombre: v.nombre,
    telefono: v.telefono,
    correo: v.correo,
    datos: {
      servicio: v.servicio,
      tipoPaciente: v.tipoPaciente,
      fecha: v.fecha,
      hora: v.hora,
      convenio: v.convenio || undefined,
      esMenor: v.esMenor ? true : undefined,
      responsableNombre: v.esMenor ? v.responsableNombre : undefined,
      responsableTelefono: v.esMenor ? v.responsableTelefono?.replace(/\D/g, '') : undefined
    }
  })
}))
