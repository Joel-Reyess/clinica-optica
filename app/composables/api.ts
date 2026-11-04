export interface ApiResponse<T> {
    message: string;
    info: T;
}

export interface Armazon {
    nanoId: string
    medidas: string
    material: string
    color: string
    precio: string
    incluidos: string
    created_at: string
    uploaded_at: string
}

export interface ArmazonDetalle {
    armazon: Armazon & { media: unknown[]}
    image: unknown[]
}

interface ContactoPayload {
    clienteNombre: string
    clientephoneNumber: string
    clienteEmail?: string
}

export interface CitaPayload extends ContactoPayload {
    servicio: string
    necesitaTutor: boolean
    citaDatetime: string
}

export interface CotizacionPayload extends ContactoPayload {
    needsArmazon: boolean
    opcion: string
    color: string
    receta: 'Receta' | 'Evaluacion' | 'Cliente'
    tipoLentes: 'seguridad' | 'clasicos' | 'modernos'
    tratamiento: string
}

export interface EmpresaPayload extends ContactoPayload {
    empresa: string
    direccion?: string
    ciudad: string
    interesados: number
    servicio: string
}

export interface PreguntaPayload extends ContactoPayload {
    pregunta: string
}

interface ContactoInput {
    nombre: string
    telefono: string
    correo?: string
}

export interface CitaInput extends ContactoInput {
    servicio: string
    esMenos: boolean
    fecha: string
    hora: string
}

export interface CotizacionInput extends ContactoInput {
    frameOption: 'with-frame' | 'own-frame'
    visionStatus: 'has-prescription' | 'needs-exam' | 'previous-patient'
    categoria?: string
    color?: string
    treatments: string[]
}

export interface EmpresaInput extends ContactoInput {
    empresa: string
    ciudad: string
    participantes: number | string
    servicio: string
}

export interface PreguntaInput extends ContactoInput {
    pregunta: string
}