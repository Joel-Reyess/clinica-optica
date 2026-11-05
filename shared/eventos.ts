// Lista cerrada de eventos que se miden. Lo que no esté aquí, el servidor lo ignora.
export const EVENTOS = [
  'cta_cita',
  'cta_cotizacion',
  'cta_empresas',
  'cta_informacion',
  'whatsapp',
  'telefono'
] as const

export type Evento = typeof EVENTOS[number]
