const RUTAS = ['/', '/nosotros', '/lentes', '/informacion', '/cotizar', '/empresas', '/contacto', '/citas']

export default defineEventHandler((event) => {
  const { public: { siteUrl } } = useRuntimeConfig()
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  const urls = RUTAS.map(r => `  <url><loc>${siteUrl}${r === '/' ? '' : r}</loc></url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
