import type { Evento } from '#shared/eventos'

// Cuenta clics en los botones importantes sin tocar cada página:
// mira el destino del enlace al que se hace clic.
function clasificar(href: string): Evento | null {
  if (href.includes('wa.me/')) return 'whatsapp'
  if (href.startsWith('tel:')) return 'telefono'
  const ruta = href.split('?')[0]!.split('#')[0]
  if (ruta === '/citas') return 'cta_cita'
  if (ruta === '/cotizar') return 'cta_cotizacion'
  if (ruta === '/empresas') return 'cta_empresas'
  if (ruta === '/informacion') return 'cta_informacion'
  return null
}

export default defineNuxtPlugin(() => {
  document.addEventListener('click', (e) => {
    const enlace = (e.target as Element | null)?.closest('a[href]')
    if (!enlace) return
    const evento = clasificar(enlace.getAttribute('href') ?? '')
    if (!evento) return

    const cuerpo = new Blob([JSON.stringify({ evento, ruta: location.pathname })], { type: 'application/json' })
    // sendBeacon sigue enviándose aunque la página cambie al instante
    navigator.sendBeacon('/api/evento', cuerpo)
  }, { capture: true })
})
