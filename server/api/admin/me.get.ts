// GET /api/admin/me — quién tiene la sesión (401 si nadie)
export default defineEventHandler(event => exigirSesion(event))
