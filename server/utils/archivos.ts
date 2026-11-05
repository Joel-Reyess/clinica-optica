import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// Archivos privados (recetas). Viven FUERA de public/: nadie puede abrirlos
// por URL; solo se sirven por endpoints que revisan la sesión del personal.

export const MAX_RECETA = 10 * 1024 * 1024 // 10 MB

export function carpetaPrivada(sub: string) {
  const { uploadsDir } = useRuntimeConfig()
  const ruta = resolve(uploadsDir, sub)
  mkdirSync(ruta, { recursive: true })
  return ruta
}

// No nos fiamos del nombre ni del tipo que declara el navegador: se mira el
// contenido real del archivo (sus primeros bytes).
export function detectarTipo(b: Buffer): { mime: string, ext: string } | null {
  if (b.length < 12) return null
  if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return { mime: 'image/jpeg', ext: 'jpg' }
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]))) {
    return { mime: 'image/png', ext: 'png' }
  }
  if (b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP') {
    return { mime: 'image/webp', ext: 'webp' }
  }
  if (b.subarray(0, 5).toString('latin1') === '%PDF-') return { mime: 'application/pdf', ext: 'pdf' }
  return null
}
