import type { InformacionInput } from '#shared/schemas/informacion'
import type { EmpresaInput } from '#shared/schemas/empresa'
import type { CitaInput } from '#shared/schemas/cita'
import type { CotizacionInput } from '#shared/schemas/cotizacion'

// Envíos de los formularios. Cada función regresa la referencia (ref) de la
// solicitud creada. Los nombres de los campos son los mismos del formulario y
// del servidor, así que no hace falta traducirlos.
export function useSolicitudes() {
  const api = useApi()

  async function enviar(ruta: string, body: object) {
    const res = await api<{ ref: string }>(ruta, { method: 'POST', body })
    return res.ref
  }

  // Sube la receta (foto o PDF) de una cotización ya creada.
  async function subirReceta(ref: string, archivo: File) {
    const datos = new FormData()
    datos.append('receta', archivo)
    await api(`/solicitudes/${encodeURIComponent(ref)}/receta`, { method: 'POST', body: datos })
  }

  return {
    subirReceta,
    crearInformacion: (i: InformacionInput) => enviar('/solicitudes/informacion', i),
    crearEmpresa: (i: EmpresaInput) => enviar('/solicitudes/empresa', i),
    crearCita: (i: CitaInput) => enviar('/solicitudes/cita', i),
    crearCotizacion: (i: CotizacionInput) => enviar('/solicitudes/cotizacion', i)
  }
}
