// Cliente del panel: mismas reglas que useApi, y si la sesión caduca (401) manda al login.
export function useAdminApi() {
  return $fetch.create({
    baseURL: '/api/admin',
    headers: { Accept: 'application/json' },
    onResponseError({ response }) {
      if (response.status === 401 && import.meta.client) {
        navigateTo('/admin/login')
      }
    }
  })
}
