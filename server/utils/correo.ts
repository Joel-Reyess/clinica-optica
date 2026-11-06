import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

// Aviso por correo al equipo cuando entra una solicitud.
// Si el SMTP no está configurado, no hace nada (la solicitud ya quedó guardada).
// Un fallo del correo NUNCA debe tirar la solicitud: se registra y se sigue.

let transporte: Transporter | null = null

function obtenerTransporte() {
  const c = useRuntimeConfig()
  if (!c.smtpHost || !c.correoAvisos) return null
  transporte ??= nodemailer.createTransport({
    host: c.smtpHost,
    port: Number(c.smtpPort) || 587,
    secure: Number(c.smtpPort) === 465,
    auth: c.smtpUser ? { user: c.smtpUser, pass: c.smtpPass } : undefined
  })
  return transporte
}

const ETIQUETAS: Record<string, string> = {
  cita: 'Cita',
  cotizacion: 'Cotización',
  empresa: 'Empresa',
  informacion: 'Información'
}

export function avisarNuevaSolicitud(s: {
  ref: string
  tipo: string
  nombre: string
  telefono: string
  datos: Record<string, unknown>
}) {
  const t = obtenerTransporte()
  if (!t) return

  const c = useRuntimeConfig()
  const lineas = [
    `Tipo: ${ETIQUETAS[s.tipo] ?? s.tipo}`,
    `Nombre: ${s.nombre}`,
    `Teléfono / WhatsApp: ${s.telefono}`,
    ...Object.entries(s.datos).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`),
    '',
    'Revísala en el panel: /admin'
  ]

  // Sin await a propósito: no hacemos esperar a la persona por el correo.
  t.sendMail({
    from: c.correoDe || c.smtpUser,
    to: c.correoAvisos,
    subject: `Nueva solicitud de ${ETIQUETAS[s.tipo] ?? s.tipo}: ${s.nombre}`.replace(/[\r\n]+/g, ' '),
    text: lineas.join('\n')
  }).catch((e) => {
    console.error('[correo] no se pudo enviar el aviso:', e instanceof Error ? e.message : e)
  })
}
