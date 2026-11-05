// Textos que el personal puede editar desde el panel. Si no hay valor guardado
// se usa el de aquí. Agregar un texto nuevo = agregar una línea aquí.
// TODO(cliente): confirmar horarios y redacción final.
export const TEXTOS_BASE: Record<string, { titulo: string, valor: string }> = {
  horarios: { titulo: 'Horarios de atención', valor: 'En actualización' },
  aviso_promocion: { titulo: 'Aviso o promoción (se muestra arriba en el sitio; déjalo vacío para ocultarlo)', valor: '' },
  convenios: { titulo: 'Texto de convenios', valor: '' }
}

export function leerTextos(): Record<string, string> {
  const guardados = useDb().prepare('SELECT clave, valor FROM bloques_texto').all() as Array<{ clave: string, valor: string }>
  const mapa = Object.fromEntries(guardados.map(g => [g.clave, g.valor]))
  return Object.fromEntries(Object.entries(TEXTOS_BASE).map(([k, b]) => [k, mapa[k] ?? b.valor]))
}
