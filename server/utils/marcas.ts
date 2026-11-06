// Las marcas son una lista cerrada. `clave` es el nombre "aplanado" (sin acentos,
// espacios, guiones ni puntos, en minúsculas) para detectar duplicados como
// "Ray-Ban", "ray ban" o "RayBan".
export function claveMarca(nombre: string) {
  return nombre.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[\s\-._'’]/g, '')
}

function errorCampo(campo: string, mensaje: string) {
  return createError({ statusCode: 422, statusMessage: 'Unprocessable Entity', message: 'Datos no válidos', data: { errors: { [campo]: [mensaje] } } })
}

// Para guardar un producto: la marca debe existir; se guarda con la escritura oficial.
export function resolverMarca(nombre: string | undefined | null): string | null {
  if (!nombre) return null
  const fila = useDb().prepare('SELECT nombre FROM marcas WHERE clave = ?').get(claveMarca(nombre)) as { nombre: string } | undefined
  if (!fila) throw errorCampo('marca', 'Elige una marca de la lista. Si no está, agrégala primero en Marcas.')
  return fila.nombre
}

export function validarMarcaNueva(nombre: string, exceptoId?: number) {
  const clave = claveMarca(nombre)
  if (!clave) throw errorCampo('nombre', 'Escribe el nombre de la marca')
  const existe = useDb().prepare('SELECT id, nombre FROM marcas WHERE clave = ?').get(clave) as { id: number, nombre: string } | undefined
  if (existe && existe.id !== exceptoId) throw errorCampo('nombre', `Ya existe la marca "${existe.nombre}"`)
  return clave
}
