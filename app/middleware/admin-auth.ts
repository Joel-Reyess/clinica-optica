// Protege las páginas del panel. La seguridad real está en /api/admin/** (servidor);
// esto solo evita mostrar pantallas vacías a quien no ha iniciado sesión.
export default defineNuxtRouteMiddleware(async () => {
  const headers = useRequestHeaders(['cookie'])
  try {
    await $fetch('/api/admin/me', { headers })
  } catch {
    return navigateTo('/admin/login')
  }
})
