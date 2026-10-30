// Un solo lugar para el número y para armar los enlaces de WhatsApp.
// Reemplaza los 12 lugares donde hoy está escrito el número a mano.
export function useWhatsapp() {
  const config = useRuntimeConfig()
  const numero = config.public.whatsappNumber

  // Une las líneas que tengan contenido (ignora false, null, undefined y '').
  function mensaje(lineas: Array<string | false | null | undefined>) {
    return lineas.filter(Boolean).join('\n')
  }

  function url(texto?: string) {
    const base = `https://wa.me/${numero}`
    return texto ? `${base}?text=${encodeURIComponent(texto)}` : base
  }

  return { numero, mensaje, url }
}
