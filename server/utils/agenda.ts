// Horarios de citas: qué días y horas se pueden pedir.
// Todo se calcula en la zona horaria de la clínica (America/Mexico_City), no la del servidor.

const ZONA = 'America/Mexico_City'

export interface DiaSemana {
  dia: number // 0 = domingo … 6 = sábado
  activo: boolean
  apertura: string
  cierre: string
  pausaInicio: string | null
  pausaFin: string | null
}

export interface AjustesAgenda {
  duracionMin: number
  cupo: number
  anticipacionHoras: number
  diasAdelante: number
}

export const aMinutos = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5))
const aHHMM = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

export function ahoraClinica(ahora = new Date()) {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: ZONA, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      .formatToParts(ahora).map(p => [p.type, p.value])
  )
  return { fecha: `${partes.year}-${partes.month}-${partes.day}`, minutos: Number(partes.hour) * 60 + Number(partes.minute) }
}

export function sumarDias(fecha: string, dias: number) {
  const d = new Date(`${fecha}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + dias)
  return d.toISOString().slice(0, 10)
}

const diaDeSemana = (fecha: string) => new Date(`${fecha}T12:00:00Z`).getUTCDay()

export function leerSemana(): DiaSemana[] {
  const filas = useDb().prepare('SELECT dia, activo, apertura, cierre, pausa_inicio, pausa_fin FROM horario_semanal ORDER BY dia').all() as unknown as Array<{
    dia: number
    activo: number
    apertura: string
    cierre: string
    pausa_inicio: string | null
    pausa_fin: string | null
  }>
  return filas.map(f => ({ dia: f.dia, activo: Boolean(f.activo), apertura: f.apertura, cierre: f.cierre, pausaInicio: f.pausa_inicio, pausaFin: f.pausa_fin }))
}

export function leerAjustes(): AjustesAgenda {
  const filas = useDb().prepare('SELECT clave, valor FROM ajustes').all() as unknown as Array<{ clave: string, valor: string }>
  const m = Object.fromEntries(filas.map(f => [f.clave, Number(f.valor)]))
  return {
    duracionMin: m.duracion_min || 30,
    cupo: m.cupo || 1,
    anticipacionHoras: m.anticipacion_horas ?? 4,
    diasAdelante: m.dias_adelante || 45
  }
}

// Horas que existen ese día según el horario (sin descontar citas ya pedidas)
function horasTeoricas(fecha: string, semana: DiaSemana[], ajustes: AjustesAgenda, cerrados: Set<string>): string[] {
  const cfg = semana.find(d => d.dia === diaDeSemana(fecha))
  if (!cfg || !cfg.activo || cerrados.has(fecha)) return []
  const ini = aMinutos(cfg.apertura)
  const fin = aMinutos(cfg.cierre)
  const pIni = cfg.pausaInicio ? aMinutos(cfg.pausaInicio) : null
  const pFin = cfg.pausaFin ? aMinutos(cfg.pausaFin) : null

  const horas: string[] = []
  for (let t = ini; t + ajustes.duracionMin <= fin; t += ajustes.duracionMin) {
    const terminaPausa = pIni !== null && pFin !== null && t < pFin && t + ajustes.duracionMin > pIni
    if (!terminaPausa) horas.push(aHHMM(t))
  }
  return horas
}

function cargarContexto(desde: string, hasta: string) {
  const db = useDb()
  const cerrados = new Set((db.prepare('SELECT fecha FROM dias_cerrados WHERE fecha BETWEEN ? AND ?').all(desde, hasta) as unknown as Array<{ fecha: string }>).map(f => f.fecha))
  // Una cita "ocupa" su horario mientras no esté cerrada (cerrarla lo libera)
  const ocupadas = db.prepare(`
    SELECT json_extract(datos, '$.fecha') AS f, json_extract(datos, '$.hora') AS h, COUNT(*) AS n
    FROM solicitudes
    WHERE tipo = 'cita' AND estado <> 'cerrada' AND json_extract(datos, '$.fecha') BETWEEN ? AND ?
    GROUP BY f, h
  `).all(desde, hasta) as unknown as Array<{ f: string, h: string, n: number }>
  return { cerrados, ocupadas: new Map(ocupadas.map(o => [`${o.f} ${o.h}`, o.n])) }
}

function horasLibres(fecha: string, semana: DiaSemana[], ajustes: AjustesAgenda, ctx: ReturnType<typeof cargarContexto>, ahora: ReturnType<typeof ahoraClinica>) {
  const limite = ahora.minutos + ajustes.anticipacionHoras * 60
  return horasTeoricas(fecha, semana, ajustes, ctx.cerrados).filter((h) => {
    if (fecha < ahora.fecha) return false
    if (fecha === ahora.fecha && aMinutos(h) < limite) return false
    // pasadas las 24 h de anticipación el día siguiente ya no depende de la hora actual
    if (fecha === sumarDias(ahora.fecha, 1) && limite > 24 * 60 && aMinutos(h) < limite - 24 * 60) return false
    return (ctx.ocupadas.get(`${fecha} ${h}`) ?? 0) < ajustes.cupo
  })
}

export function disponibilidad() {
  const ahora = ahoraClinica()
  const ajustes = leerAjustes()
  const semana = leerSemana()
  const hasta = sumarDias(ahora.fecha, ajustes.diasAdelante)
  const ctx = cargarContexto(ahora.fecha, hasta)

  const dias: Array<{ fecha: string, horas: string[] }> = []
  for (let f = ahora.fecha; f <= hasta; f = sumarDias(f, 1)) {
    const horas = horasLibres(f, semana, ajustes, ctx, ahora)
    if (horas.length) dias.push({ fecha: f, horas })
  }
  return { dias, hasta }
}

export function horarioLibre(fecha: string, hora: string) {
  const ahora = ahoraClinica()
  const ajustes = leerAjustes()
  if (fecha > sumarDias(ahora.fecha, ajustes.diasAdelante)) return false
  const ctx = cargarContexto(fecha, fecha)
  return horasLibres(fecha, leerSemana(), ajustes, ctx, ahora).includes(hora)
}
