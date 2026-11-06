import { z } from 'zod'

// Campos que comparten los formularios.
//
// Sobre "inyecciones":
//  - SQL: no se arma SQL con texto de la persona; todo va con parámetros (?).
//  - HTML/scripts: aquí se QUITAN etiquetas y los signos < y > de todo texto libre,
//    y además Vue escapa todo lo que muestra (no se usa v-html en ningún lado).
//  - Correo: los saltos de línea se eliminan, para que nadie pueda inyectar cabeceras.

// Caracteres de control y "invisibles" (ancho cero, inversión de texto, etc.)
// Se arma con códigos numéricos para que no haya caracteres raros escritos en el archivo.
const RANGOS: Array<[number, number]> = [[0x00, 0x08], [0x0B, 0x0C], [0x0E, 0x1F], [0x7F, 0x7F], [0x200B, 0x200F], [0x202A, 0x202E], [0x2060, 0x2060], [0xFEFF, 0xFEFF]]
const CONTROL = new RegExp(`[${RANGOS.map(([a, b]) => `${String.fromCharCode(a)}-${String.fromCharCode(b)}`).join('')}]`, 'g')

/** Quita etiquetas HTML, < >, caracteres de control y espacios sobrantes. */
export function sinMarcado(valor: string): string {
  return valor
    .normalize('NFC')
    .replace(/<[^>]*>?/g, ' ') // <script>…, <img onerror=…>
    .replace(/[<>]/g, '')
    .replace(CONTROL, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

/** Igual que sinMarcado pero en una sola línea (nombres, correos, asuntos). */
export const unaLinea = (valor: string) => sinMarcado(valor).replace(/[\r\n]+/g, ' ')

const NOMBRE_VALIDO = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u

/** Texto de una línea, saneado, con largo mínimo y máximo. */
export const linea = (msg: string, min: number, max: number) =>
  z.string(msg).max(max * 4, 'El texto es muy largo')
    .transform(unaLinea)
    .pipe(z.string().min(min, msg).max(max, 'El texto es muy largo'))

/** Texto largo (puede tener saltos de línea), saneado. */
export const texto = (msg: string, min: number, max: number) =>
  z.string(msg).max(max * 4, 'El texto es muy largo')
    .transform(sinMarcado)
    .pipe(z.string().min(min, msg).max(max, 'El texto es muy largo'))

export const textoOpcional = (max: number) =>
  z.string().max(max * 4, 'El texto es muy largo').transform(sinMarcado)
    .pipe(z.string().max(max, 'El texto es muy largo')).optional()

export const lineaOpcional = (max: number) =>
  z.string().max(max * 4, 'El texto es muy largo').transform(unaLinea)
    .pipe(z.string().max(max, 'El texto es muy largo')).optional()

// Nombres de personas: solo letras, espacios, punto, apóstrofo y guion
export const nombrePersona = (msg: string) =>
  z.string(msg).max(480, 'El nombre es muy largo')
    .transform(unaLinea)
    .pipe(z.string().min(2, msg).max(120, 'El nombre es muy largo').regex(NOMBRE_VALIDO, 'Usa solo letras en el nombre'))

export const nombre = nombrePersona('Escribe tu nombre')

// Solo dígitos; acepta 10 (local) hasta 13 (con lada de país)
export const telefono = z.string('Escribe tu teléfono')
  .max(40, 'El teléfono es muy largo')
  .transform(v => v.replace(/\D/g, ''))
  .refine(v => v.length >= 10 && v.length <= 13, 'Escribe un teléfono de 10 dígitos')

// Opcional: el campo vacío ('') cuenta como "no lo puso"
export const correoOpcional = z
  .union([z.literal(''), z.email('El correo no es válido').max(160)])
  .optional()

export const aceptaPrivacidad = z.literal(true, 'Debes aceptar el aviso de privacidad')

// Trampa para bots: un campo oculto que una persona nunca llena.
export const trampa = z.string().max(0).optional()
