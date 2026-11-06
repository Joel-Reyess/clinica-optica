// Cliente único para hablar con la API. La API vive en este mismo proyecto
// (carpeta server/api), así que la URL es SIEMPRE relativa: '/api'.
// No es configurable a propósito: un .env viejo apuntando a otro servidor
// (por ejemplo el antiguo localhost:8000) ya no puede romper los formularios.
export function useApi() {
  return $fetch.create({
    baseURL: '/api',
    headers: { Accept: 'application/json' }
  })
}
