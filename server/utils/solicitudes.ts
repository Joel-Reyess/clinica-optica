import { randomBytes } from 'node:crypto'

export type TipoSolicitud = 'cita' | 'cotizacion' | 'empresa' | 'informacion'

interface NuevaSolicitud {
  tipo: TipoSolicitud
  nombre: string
  telefono: string
  correo?: string
  datos: Record<string, unknown> // lo específico de cada tipo; se guarda como JSON
}

// Capa de acceso a datos: es la ÚNICA que escribe SQL sobre `solicitudes`.
// Las rutas no tocan SQL; llaman a funciones como esta.
export function crearSolicitud(s: NuevaSolicitud): string {
  // Identificador público: no se puede adivinar contando 1, 2, 3...
  const ref = randomBytes(6).toString('base64url')

  useDb()
    .prepare(`
      INSERT INTO solicitudes (ref, tipo, nombre, telefono, correo, datos, acepta_privacidad_en)
      VALUES (@ref, @tipo, @nombre, @telefono, @correo, @datos, datetime('now'))
    `)
    .run({
      ref,
      tipo: s.tipo,
      nombre: s.nombre,
      telefono: s.telefono,
      correo: s.correo || null,
      datos: JSON.stringify(s.datos)
    })

  return ref
}
