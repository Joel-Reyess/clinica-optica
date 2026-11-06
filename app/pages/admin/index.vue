<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

useHead({
  title: 'Solicitudes | Panel Clínica Óptica',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

interface Fila {
  ref: string
  tipo: string
  nombre: string
  telefono: string
  estado: string
  responsable: string | null
  creada_en: string
  tiene_receta: number
  datos: Record<string, unknown>
}

interface Detalle extends Fila {
  correo: string | null
  datos: Record<string, unknown>
  resultado: string | null
  notas: string | null
  receta_nombre: string | null
}

const TIPOS: Record<string, string> = { cita: 'Cita', cotizacion: 'Cotización', empresa: 'Empresa', informacion: 'Información' }
const ESTADOS: Record<string, string> = { nueva: 'Nueva', contactada: 'Contactada', en_seguimiento: 'En seguimiento', cerrada: 'Cerrada' }

const api = useAdminApi()
const route = useRoute()
const filtros = reactive({ tipo: typeof route.query.tipo === 'string' ? route.query.tipo : '', estado: '', q: '', pagina: 1 })
const nuevas = ref<Record<string, number>>({})
const cargando = ref(false)
const errorLista = ref('')
const lista = ref<{ total: number, porPagina: number, filas: Fila[] }>({ total: 0, porPagina: 25, filas: [] })
const detalle = ref<Detalle | null>(null)
const edicion = reactive({ estado: 'nueva', resultado: '', responsable: '', notas: '' })
const guardando = ref(false)
const mensaje = ref('')

const metricas = ref<Array<{ evento: string, n: number }>>([])
const NOMBRES: Record<string, string> = {
  cta_cita: 'Clics en Citas',
  cta_cotizacion: 'Clics en Cotizar',
  cta_empresas: 'Clics en Empresas',
  cta_informacion: 'Clics en Información',
  whatsapp: 'Clics en WhatsApp',
  telefono: 'Clics en Teléfono'
}

const paginas = computed(() => Math.max(1, Math.ceil(lista.value.total / lista.value.porPagina)))

async function cargar() {
  cargando.value = true
  errorLista.value = ''
  try {
    lista.value = await api('/solicitudes', {
      query: {
        tipo: filtros.tipo || undefined,
        estado: filtros.estado || undefined,
        q: filtros.q || undefined,
        pagina: filtros.pagina
      }
    })
  } catch {
    errorLista.value = 'No se pudo cargar la lista. Intenta de nuevo.'
  } finally {
    cargando.value = false
  }
}

function filtrar() {
  filtros.pagina = 1
  cargar()
}

async function abrir(ref: string) {
  mensaje.value = ''
  detalle.value = await api<Detalle>(`/solicitudes/${encodeURIComponent(ref)}`)
  edicion.estado = detalle.value.estado
  edicion.resultado = detalle.value.resultado ?? ''
  edicion.responsable = detalle.value.responsable ?? ''
  edicion.notas = detalle.value.notas ?? ''
}

async function guardar() {
  if (!detalle.value) return
  guardando.value = true
  mensaje.value = ''
  try {
    await api(`/solicitudes/${encodeURIComponent(detalle.value.ref)}`, { method: 'PATCH', body: { ...edicion } })
    mensaje.value = 'Guardado'
    await cargar()
    cargarNuevas()
  } catch {
    mensaje.value = 'No se pudo guardar. Intenta de nuevo.'
  } finally {
    guardando.value = false
  }
}

// Día y hora que pidió la persona (solo citas)
const diaCita = (f: Fila) => {
  if (f.tipo !== 'cita') return ''
  const dia = String(f.datos.fecha ?? '')
  const hora = String(f.datos.hora ?? '')
  if (!dia) return ''
  const texto = new Date(`${dia}T12:00:00Z`).toLocaleDateString('es-MX', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' })
  return `${texto} · ${hora}`
}

async function cargarNuevas() {
  const r = await api<{ nuevasPorTipo: Array<{ tipo: string, n: number }> }>('/resumen').catch(() => null)
  nuevas.value = Object.fromEntries((r?.nuevasPorTipo ?? []).map(x => [x.tipo, x.n]))
}

function elegirTipo(t: string) {
  filtros.tipo = t
  navigateTo({ path: '/admin', query: t ? { tipo: t } : {} })
  filtrar()
}

watch(() => route.query.tipo, (t) => {
  const nuevo = typeof t === 'string' ? t : ''
  if (nuevo !== filtros.tipo) {
    filtros.tipo = nuevo
    filtrar()
  }
})

const fecha = (v: string) => new Date(`${v.replace(' ', 'T')}Z`).toLocaleString('es-MX', {
  timeZone: 'America/Mexico_City',
  dateStyle: 'short',
  timeStyle: 'short'
})

onMounted(async () => {
  cargar()
  cargarNuevas()
  metricas.value = await api<Array<{ evento: string, n: number }>>('/metricas').catch(() => [])
})
</script>

<template>
  <AdminShell>
    <h1>Solicitudes</h1>

    <ul
      v-if="metricas.length"
      class="metricas"
      aria-label="Clics de los últimos 30 días"
    >
      <li
        v-for="m in metricas"
        :key="m.evento"
      >
        <strong>{{ m.n }}</strong> {{ NOMBRES[m.evento] ?? m.evento }}
      </li>
      <li class="nota">
        últimos 30 días
      </li>
    </ul>

    <div
      class="pestanas"
      role="tablist"
      aria-label="Tipo de solicitud"
    >
      <button
        v-for="t in [['', 'Todas'], ['cita', 'Citas'], ['cotizacion', 'Cotizaciones'], ['empresa', 'Empresas'], ['informacion', 'Información']]"
        :key="t[0]"
        type="button"
        role="tab"
        :aria-selected="filtros.tipo === t[0]"
        :class="{ activa: filtros.tipo === t[0] }"
        @click="elegirTipo(t[0]!)"
      >
        {{ t[1] }}
        <span
          v-if="t[0] && nuevas[t[0]!]"
          class="badge"
        >{{ nuevas[t[0]!] }} nuevas</span>
      </button>
    </div>

    <form
      class="filtros"
      @submit.prevent="filtrar"
    >
      <select
        v-model="filtros.estado"
        aria-label="Estado"
        @change="filtrar"
      >
        <option value="">
          Todos los estados
        </option>
        <option
          v-for="(l, k) in ESTADOS"
          :key="k"
          :value="k"
        >
          {{ l }}
        </option>
      </select>
      <input
        v-model="filtros.q"
        type="search"
        placeholder="Buscar nombre, teléfono…"
        aria-label="Buscar"
      >
      <button type="submit">
        Buscar
      </button>
    </form>

    <p
      v-if="errorLista"
      class="aviso"
      role="alert"
    >
      {{ errorLista }}
    </p>

    <div class="cuerpo">
      <div class="tabla-caja">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th v-if="filtros.tipo === 'cita'">
                Día y hora pedidos
              </th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="f in lista.filas"
              :key="f.ref"
              :class="{ sel: detalle?.ref === f.ref }"
              tabindex="0"
              @click="abrir(f.ref)"
              @keydown.enter="abrir(f.ref)"
            >
              <td>{{ fecha(f.creada_en) }}</td>
              <td>{{ TIPOS[f.tipo] }}<span v-if="f.tiene_receta"> 📎</span></td>
              <td v-if="filtros.tipo === 'cita'">
                {{ diaCita(f) }}
              </td>
              <td>{{ f.nombre }}</td>
              <td>{{ f.telefono }}</td>
              <td>
                <span :class="['estado', f.estado]">{{ ESTADOS[f.estado] }}</span>
              </td>
              <td>{{ f.responsable || '—' }}</td>
            </tr>
            <tr v-if="!lista.filas.length && !cargando">
              <td
                colspan="7"
                class="vacio"
              >
                No hay solicitudes con estos filtros.
              </td>
            </tr>
          </tbody>
        </table>
        <div class="paginas">
          <button
            type="button"
            :disabled="filtros.pagina <= 1"
            @click="filtros.pagina--; cargar()"
          >
            Anterior
          </button>
          <span>Página {{ filtros.pagina }} de {{ paginas }} · {{ lista.total }} en total</span>
          <button
            type="button"
            :disabled="filtros.pagina >= paginas"
            @click="filtros.pagina++; cargar()"
          >
            Siguiente
          </button>
        </div>
      </div>

      <aside
        v-if="detalle"
        class="detalle"
      >
        <h2>{{ TIPOS[detalle.tipo] }} · {{ detalle.nombre }}</h2>
        <p class="meta">
          Ref. {{ detalle.ref }} · {{ fecha(detalle.creada_en) }}
        </p>
        <p>
          <a
            :href="`https://wa.me/${detalle.telefono.startsWith('52') ? detalle.telefono : '52' + detalle.telefono}`"
            target="_blank"
            rel="noopener noreferrer"
          >WhatsApp {{ detalle.telefono }}</a>
          <span v-if="detalle.correo"> · {{ detalle.correo }}</span>
        </p>
        <dl>
          <template
            v-for="(v, k) in detalle.datos"
            :key="k"
          >
            <dt>{{ k }}</dt>
            <dd>{{ Array.isArray(v) ? v.join(', ') : v }}</dd>
          </template>
        </dl>
        <p v-if="detalle.receta_nombre">
          <a
            :href="`/api/admin/solicitudes/${encodeURIComponent(detalle.ref)}/receta`"
            target="_blank"
            rel="noopener noreferrer"
          >Ver receta adjunta</a>
        </p>

        <form @submit.prevent="guardar">
          <label>Estado
            <select v-model="edicion.estado">
              <option
                v-for="(l, k) in ESTADOS"
                :key="k"
                :value="k"
              >{{ l }}</option>
            </select>
          </label>
          <label>Responsable
            <input
              v-model="edicion.responsable"
              maxlength="120"
            >
          </label>
          <label>Resultado
            <input
              v-model="edicion.resultado"
              maxlength="300"
              placeholder="Ej. Cita agendada, cotización enviada…"
            >
          </label>
          <label>Notas
            <textarea
              v-model="edicion.notas"
              rows="4"
              maxlength="2000"
            />
          </label>
          <button
            type="submit"
            :disabled="guardando"
          >
            {{ guardando ? 'Guardando…' : 'Guardar' }}
          </button>
          <span
            v-if="mensaje"
            role="status"
          > {{ mensaje }}</span>
        </form>
      </aside>
    </div>
  </AdminShell>
</template>

<style scoped>
.pestanas {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.pestanas button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #102b4a;
  border: 1px solid #c4cfdc;
}

.pestanas button.activa {
  background: #102b4a;
  color: #fff;
  border-color: #102b4a;
}

.badge {
  padding: 1px 8px;
  border-radius: 99px;
  background: #f59e0b;
  color: #102b4a;
  font-size: 0.75rem;
  font-weight: 700;
}

.metricas {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}

.metricas li {
  padding: 6px 12px;
  border-radius: 99px;
  background: #fff;
  font-size: 0.88rem;
}

.metricas .nota {
  background: none;
  color: #66758a;
}

h1 {
  margin: 0 0 16px;
  font-size: 1.6rem;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

input,
select,
textarea {
  padding: 8px 10px;
  border: 1px solid #c4cfdc;
  border-radius: 8px;
  background: #fff;
  font: inherit;
}

button {
  padding: 8px 14px;
  border: 0;
  border-radius: 8px;
  background: #244c73;
  color: #fff;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

.cuerpo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
}

@media (min-width: 1000px) {
  .cuerpo {
    grid-template-columns: 1fr 380px;
  }
}

.tabla-caja,
.detalle {
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #e6ebf1;
  text-align: left;
  white-space: nowrap;
}

tbody tr {
  cursor: pointer;
}

tbody tr:hover,
tr.sel {
  background: #eef3f9;
}

.vacio {
  text-align: center;
  color: #66758a;
}

.estado {
  padding: 2px 8px;
  border-radius: 99px;
  background: #e6ebf1;
  font-size: 0.8rem;
}

.estado.nueva {
  background: #fde7c7;
}

.estado.contactada {
  background: #d6e8fb;
}

.estado.en_seguimiento {
  background: #e4dcf8;
}

.estado.cerrada {
  background: #d7f0dd;
}

.paginas {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
}

.aviso {
  padding: 10px 14px;
  border-radius: 10px;
  background: #fef3f2;
  color: #b42318;
}

.detalle h2 {
  margin: 0 0 4px;
  font-size: 1.15rem;
}

.meta {
  margin: 0 0 8px;
  color: #66758a;
  font-size: 0.85rem;
}

dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 4px 12px;
  margin: 12px 0;
}

dt {
  color: #66758a;
}

dd {
  margin: 0;
  overflow-wrap: anywhere;
}

form label {
  display: grid;
  gap: 4px;
  margin-bottom: 10px;
}
</style>
