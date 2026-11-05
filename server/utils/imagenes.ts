import { randomBytes } from 'node:crypto'
import { unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export const MAX_IMAGEN = 5 * 1024 * 1024 // 5 MB

// Guarda una imagen del catálogo (solo JPG, PNG o WEBP, verificado por contenido).
export function guardarImagenCatalogo(datos: Buffer): string {
  const tipo = detectarTipo(datos)
  if (!tipo || tipo.mime === 'application/pdf') {
    throw createError({ statusCode: 422, statusMessage: 'Unprocessable Entity', message: 'La imagen debe ser JPG, PNG o WEBP.' })
  }
  if (datos.length > MAX_IMAGEN) {
    throw createError({ statusCode: 422, statusMessage: 'Unprocessable Entity', message: 'La imagen no debe superar los 5 MB.' })
  }
  const nombre = `${randomBytes(16).toString('hex')}.${tipo.ext}`
  writeFileSync(join(carpetaPrivada('catalogo'), nombre), datos, { mode: 0o640 })
  return nombre
}

export function borrarImagenCatalogo(nombre: string) {
  try {
    unlinkSync(join(carpetaPrivada('catalogo'), nombre))
  } catch {
    // si ya no estaba, no pasa nada
  }
}

export const NOMBRE_IMAGEN = /^[a-f0-9]{32}\.(jpg|png|webp)$/
