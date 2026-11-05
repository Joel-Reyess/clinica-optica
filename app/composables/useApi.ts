// Cliente único para hablar con la API. La API vive en este mismo proyecto
// (carpeta server/api), así que la URL base es relativa: '/api'.
export function useApi() {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.apiBase,
    headers: { Accept: 'application/json' }
  })
}
