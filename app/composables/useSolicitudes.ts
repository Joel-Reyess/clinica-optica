import type {
  ApiResponse,
  CitaInput,
  CitaPayload,
  CotizacionInput,
  CotizacionPayload,
  EmpresaInput,
  EmpresaPayload,
  PreguntaInput,
  PreguntaPayload
} from '~/types/api'

const CAMPOS_CONTACTO = {
  clienteNombre: 'nombre',
  clientephoneNumber: 'telefono',
  clienteEmail: 'correo'
}
export const CAMPOS_CITA = {
  ...CAMPOS_CONTACTO,
  servicio: 'servicio',
  necesitaTutor: 'esMenor',
  citaDatetime: 'fecha'
}
export const CAMPOS_COTIZACION = {
  ...CAMPOS_CONTACTO,
  needsArmazon: 'frameOption',
  receta: 'visionStatus',
  tipoLentes: 'categoria',
  color: 'color',
  tratamiento: 'treatments'
}
export const CAMPOS_EMPRESA = {
  ...CAMPOS_CONTACTO,
  empresa: 'empresa',
  ciudad: 'ciudad',
  interesados: 'participantes',
  servicio: 'servicio'
}
export const CAMPOS_PREGUNTA = {
  ...CAMPOS_CONTACTO,
  pregunta: 'pregunta'
}

const RECETA = {
  'has-prescription': 'Receta',
  'needs-exam': 'Evaluacion',
  'previous-patient': 'Cliente'
} as const

const TIPO_LENTES = {
  'clasicos': 'clasicos',
  'modernos': 'modernos',
  'seguridad-graduada': 'seguridad'
} as const

function contacto(i: { nombre: string, telefono: string, correo?: string }) {
  return {
    clienteNombre: i.nombre.trim(),
    clientephoneNumber: i.telefono.trim(),
    clienteEmail: i.correo?.trim() || undefined
  }
}

type RespuestaCreacion = ApiResponse<{ id?: string, nanoId?: string }>
function referencia(res: RespuestaCreacion) {
  return res.info.id ?? res.info.nanoId ?? ''
}

export function useSolicitudes() {
  const api = useApi()

  async function enviar(ruta: string, body: object) {
    const res = await api<RespuestaCreacion>(ruta, { method: 'POST', body })
    return referencia(res)
  }

  function crearCita(i: CitaInput) {
    const payload: CitaPayload = {
      ...contacto(i),
      servicio: i.servicio,
      necesitaTutor: i.esMenor,
      citaDatetime: `${i.fecha} ${i.hora}:00`
    }
    return enviar('/citas', payload)
  }

  function crearCotizacion(i: CotizacionInput) {
    const payload: CotizacionPayload = {
      ...contacto(i),
      needsArmazon: i.frameOption === 'with-frame',
      opcion: 'otra',
      color: i.color ?? '',
      receta: RECETA[i.visionStatus],
      tipoLentes: TIPO_LENTES[i.categoria as keyof typeof TIPO_LENTES],
      tratamiento: i.treatments.join(', ')
    }
    return enviar('/cotizaciones', payload)
  }

  function crearEmpresa(i: EmpresaInput) {
    const payload: EmpresaPayload = {
      ...contacto(i),
      empresa: i.empresa.trim(),
      ciudad: i.ciudad.trim(),
      interesados: Number(i.participantes),
      servicio: i.servicio
    }
    return enviar('/empresas', payload)
  }

  function crearPregunta(i: PreguntaInput) {
    const payload: PreguntaPayload = {
      ...contacto(i),
      pregunta: i.pregunta.trim()
    }
    return enviar('/preguntas', payload)
  }

  return { crearCita, crearCotizacion, crearEmpresa, crearPregunta }
}
