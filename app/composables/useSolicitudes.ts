import type { InformacionInput } from '#shared/schemas/informacion'

// Envíos de los formularios. Cada función regresa la referencia (ref) de la
// solicitud creada. Los nombres de los campos son los mismos del formulario y
// del servidor, así que no hace falta traducirlos.
// Aquí se irán agregando crearCita, crearCotizacion y crearEmpresa.
export function useSolicitudes() {
  const api = useApi()

  async function enviar(ruta: string, body: object) {
    const res = await api<{ ref: string }>(ruta, { method: 'POST', body })
    return res.ref
  }

  return {
    crearInformacion: (i: InformacionInput) => enviar('/solicitudes/informacion', i)
  }
}
