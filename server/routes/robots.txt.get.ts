export default defineEventHandler((event) => {
  const { public: { siteUrl } } = useRuntimeConfig()
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Disallow: /admin',
    'Disallow: /api/',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    ''
  ].join('\n')
})
