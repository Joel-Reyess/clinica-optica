import { cotizacionSchema } from '#shared/schemas/cotizacion'

// POST /api/solicitudes/cotizacion
// La foto o PDF de la receta se sube aparte (ver Fase 3) usando el `ref`.
export default defineEventHandler(event => recibirSolicitud(event, {
  tipo: 'cotizacion',
  esquema: cotizacionSchema,
  mapear: v => ({
    nombre: v.nombre,
    telefono: v.telefono,
    correo: v.correo,
    datos: {
      opcionArmazon: v.opcionArmazon,
      situacionVisual: v.situacionVisual,
      tipoLente: v.tipoLente,
      tratamientos: v.tratamientos?.length ? v.tratamientos : undefined,
      modelo: v.modelo || undefined,
      categoria: v.categoria || undefined,
      codigo: v.codigo || undefined,
      color: v.color || undefined,
      motivo: v.motivo || undefined,
      requisitosTrabajo: v.requisitosTrabajo || undefined
    }
  })
}))
