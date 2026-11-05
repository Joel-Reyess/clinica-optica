import { z } from 'zod'

const consulta = z.object({
  tipo: z.enum(['cita', 'cotizacion', 'empresa', 'informacion']).optional(),
  estado: z.enum(['nueva', 'contactada', 'en_seguimiento', 'cerrada']).optional(),
  q: z.string().trim().max(100).optional(),
  pagina: z.coerce.number().int().min(1).max(10000).default(1)
})

const POR_PAGINA = 25

// GET /api/admin/solicitudes?tipo=&estado=&q=&pagina=
export default defineEventHandler((event) => {
  const { tipo, estado, q, pagina } = consulta.parse(getQuery(event))
  const donde: string[] = []
  const params: Record<string, string> = {}
  if (tipo) {
    donde.push('s.tipo = @tipo')
    params.tipo = tipo
  }
  if (estado) {
    donde.push('s.estado = @estado')
    params.estado = estado
  }
  if (q) {
    donde.push('(s.nombre LIKE @q OR s.telefono LIKE @q OR s.correo LIKE @q OR s.datos LIKE @q)')
    params.q = `%${q.replace(/[%_]/g, '')}%`
  }
  const filtro = donde.length ? `WHERE ${donde.join(' AND ')}` : ''
  const db = useDb()

  const { total } = db.prepare(`SELECT COUNT(*) AS total FROM solicitudes s ${filtro}`).get(params) as { total: number }
  const filas = db.prepare(`
    SELECT s.id, s.ref, s.tipo, s.nombre, s.telefono, s.estado, s.responsable, s.creada_en,
      EXISTS (SELECT 1 FROM archivos a WHERE a.solicitud_id = s.id) AS tiene_receta
    FROM solicitudes s ${filtro}
    ORDER BY s.creada_en DESC, s.id DESC
    LIMIT ${POR_PAGINA} OFFSET ${(pagina - 1) * POR_PAGINA}
  `).all(params)

  return { total, pagina, porPagina: POR_PAGINA, filas }
})
