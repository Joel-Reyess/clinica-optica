interface FilaProducto {
  id: number
  categoria: string
  nombre: string
  codigo: string | null
  descripcion: string | null
  colores: string
  precio_desde: string | null
  promocion: string | null
  visible: number
  orden: number
}

interface FilaImagen {
  id: number
  producto_id: number
  nombre_guardado: string
  texto_alternativo: string | null
}

// Productos con sus imágenes. `soloVisibles` = lo que ve el público.
export function listarProductos(soloVisibles: boolean, categoria?: string) {
  const db = useDb()
  const donde: string[] = []
  const params: unknown[] = []
  if (soloVisibles) donde.push('visible = 1')
  if (categoria) {
    donde.push('categoria = ?')
    params.push(categoria)
  }
  const filtro = donde.length ? `WHERE ${donde.join(' AND ')}` : ''

  const productos = db.prepare(`SELECT * FROM productos ${filtro} ORDER BY orden, id`).all(...params) as FilaProducto[]
  const imagenes = db.prepare('SELECT id, producto_id, nombre_guardado, texto_alternativo FROM producto_imagenes ORDER BY orden, id').all() as FilaImagen[]

  return productos.map(p => ({
    id: p.id,
    categoria: p.categoria,
    nombre: p.nombre,
    codigo: p.codigo,
    descripcion: p.descripcion,
    colores: JSON.parse(p.colores) as string[],
    precioDesde: p.precio_desde,
    promocion: p.promocion,
    visible: Boolean(p.visible),
    orden: p.orden,
    imagenes: imagenes
      .filter(i => i.producto_id === p.id)
      .map(i => ({
        id: i.id,
        src: `/api/catalogo/imagen/${i.nombre_guardado}`,
        alt: i.texto_alternativo || p.nombre
      }))
  }))
}
