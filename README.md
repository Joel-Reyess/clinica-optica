# Clínica Óptica — sitio web (Coatzacoalcos)

Nuxt 4 + API propia (Nitro) + SQLite. Un solo proyecto, un solo contenedor: el sitio público, el API y el panel del personal.

## Arrancar en tu computadora

```bash
pnpm install
cp .env.example .env      # y llena NUXT_ADMIN_USER / NUXT_ADMIN_PASSWORD (12+ caracteres)
pnpm dev                  # http://localhost:3000
```

Comandos útiles: `pnpm lint`, `pnpm typecheck`, `pnpm build`.
Requiere Node 22+ y pnpm (`corepack enable`).

## Cómo está organizado

| Carpeta | Qué hay |
|---|---|
| `app/` | Sitio público y panel (`app/pages/admin`) |
| `server/api/solicitudes/` | Endpoints públicos de los 4 formularios (+ subida de receta) |
| `server/api/admin/` | Endpoints del panel. **Todos** exigen sesión (`server/middleware/10-admin.ts`) |
| `server/utils/` | Base de datos (`db.ts` con migraciones), auth, límites, correo, archivos |
| `shared/` | Esquemas de validación (zod) usados por el formulario **y** por el servidor |

Reglas que conviene mantener:
- Cambiar la base = **agregar** una migración al final de `MIGRACIONES` en `server/utils/db.ts`; nunca editar las anteriores.
- Un formulario nuevo = un esquema en `shared/schemas/`, un endpoint con `recibirSolicitud(...)` y una función en `useSolicitudes`.
- Errores de validación: `422` con `data.errors = { campo: ['mensaje'] }`.

## Variables de entorno

Ver `.env.example`. Las importantes en producción:

- `NUXT_ADMIN_USER`, `NUXT_ADMIN_PASSWORD`: crean el primer usuario **solo si la base no tiene usuarios**. Después se pueden quitar.
- `NUXT_DB_PATH`, `NUXT_UPLOADS_DIR`: dónde viven la base y los archivos (en Docker: `/data`).
- `NUXT_PUBLIC_SITE_URL`: dominio público (sitemap, canonical).
- `NUXT_SMTP_*`, `NUXT_CORREO_DE`, `NUXT_CORREO_AVISOS`: aviso por correo de cada solicitud nueva. Sin SMTP no se envía nada (las solicitudes igual se guardan).
- `NUXT_PUBLIC_WHATSAPP_NUMBER`: número único de WhatsApp del sitio.

## Despliegue (VPS con Docker / Dokploy)

1. Construir con el `Dockerfile` de la raíz (Dokploy: tipo "Dockerfile").
2. Montar un **volumen persistente en `/data`** (base, recetas, fotos y respaldos). Sin volumen se pierde todo al redeplegar.
3. Definir las variables de arriba. Poner el dominio con HTTPS (las cookies de sesión se marcan `secure` solas detrás de HTTPS).
4. Salud: `GET /api/health`.
5. Entrar a `/admin/login` con el usuario inicial.

Detrás de Traefik/Nginx se usa `X-Forwarded-For` para la IP real (límites y bloqueos de login).

## Respaldos

- Cada 24 h se guarda una copia de la base en `/data/respaldos` (últimas 14).
- Eso **no protege de perder el servidor**: copiar `/data` (base + `uploads/`) a otro lugar con regularidad (por ejemplo `rsync` o los respaldos del VPS). **Probar restaurar** al menos una vez.

## Seguridad (resumen)

- Formularios: límite por IP, tamaño máximo, campo trampa anti-bots, validación en servidor.
- Recetas: fuera de `public/`, tipo verificado por contenido, nombre aleatorio, solo se ven con sesión del personal.
- Panel: contraseñas con scrypt, sesión en cookie `httpOnly`/`sameSite=lax`, bloqueo tras 5 intentos fallidos, `/api/admin/**` protegido en el servidor.
- Medición de clics: solo nombre del botón y página; sin cookies ni datos personales.

## Pendientes del cliente — `TODO(cliente)`

- Confirmar número de WhatsApp/teléfono y correo de contacto.
- Correo que recibirá los avisos y credenciales SMTP.
- Horarios de atención (se editan en el panel → "Textos y horarios").
- Aviso de privacidad legal definitivo (`app/pages/privacidad.vue`).
- Dominio definitivo (`NUXT_PUBLIC_SITE_URL`) y cuentas/servidor a nombre de la clínica.
- Convenios reales y catálogo real con fotos (panel → "Catálogo"). Mientras no haya productos se muestran modelos de muestra.
- Si quieren analítica externa o Search Console: IDs de verificación.

## Fase 2 (no incluida)

Membresía/Club, seguimiento de pedidos, agenda real con disponibilidad y asistente.
