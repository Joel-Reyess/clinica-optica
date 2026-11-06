import { z } from 'zod'
import { sinMarcado } from '#shared/schemas/comun'

const esquema = z.object({
  clave: z.string().max(60),
  valor: z.string().max(8000, 'El texto es muy largo').transform(sinMarcado).pipe(z.string().max(2000, 'El texto es muy largo'))
})

// PUT /api/admin/textos — guarda un texto (solo claves conocidas)
export default defineEventHandler(async (event) => {
  const { clave, valor } = await leerValidado(event, esquema)
  const base = TEXTOS_BASE[clave]
  if (!base) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Texto desconocido.' })

  useDb().prepare(`
    INSERT INTO bloques_texto (clave, titulo, valor) VALUES (?, ?, ?)
    ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor, actualizado_en = datetime('now')
  `).run(clave, base.titulo, valor)
  return { ok: true }
})
