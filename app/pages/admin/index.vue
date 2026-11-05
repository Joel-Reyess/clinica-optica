<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

useHead({
  title: 'Solicitudes | Panel Clínica Óptica',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

interface Fila {
  id: number
  ref: string
  tipo: string
  nombre: string
  telefono: string
  estado: string
  responsable: string | null
  creada_en: string
  tiene_receta: number
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
const filtros = reactive({ tipo: '', estado: '', q: '', pagina: 1 })
const cargando = ref(false)
const errorLista = ref('')
const lista = ref<{ total: number, porPagina: number, filas: Fila[] }>({ total: 0, porPagina: 25, filas: [] })
const detalle = ref<Detalle | null>(null)
const edicion = reactive({ estado: 'nueva', resultado: '', responsable: '', notas: '' })
const guardando = ref(false)
const mensaje = ref('')

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

async function abrir(id: number) {
  mensaje.value = ''
  detalle.value = await api<Detalle>(`/solicitudes/${id}`)
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
    await api(`/solicitudes/${detalle.value.id}`, { method: 'PATCH', body: { ...edicion } })
    mensaje.value = 'Guardado'
    await cargar()
  } catch {
    mensaje.value = 'No se pudo guardar. Intenta de nuevo.'
  } finally {
    guardando.value = false
  }
}

const fecha = (v: string) => new Date(`${v.replace(' ', 'T')}Z`).toLocaleString('es-MX', {
  timeZone: 'America/Mexico_City',
  dateStyle: 'short',
  timeStyle: 'short'
})

onMounted(cargar)
</script>

<template>
  <AdminShell>
    <h1>Solicitudes</h1>

    <form
      class="filtros"
      @submit.prevent="filtrar"
    >
      <select
        v-model="filtros.tipo"
        aria-label="Tipo"
        @change="filtrar"
      >
        <option value="">
          Todos los tipos
        </option>
        <option
          v-for="(l, k) in TIPOS"
          :key="k"
          :value="k"
        >
          {{ l }}
        </option>
      </select>
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
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="f in lista.filas"
              :key="f.id"
              :class="{ sel: detalle?.id === f.id }"
              tabindex="0"
              @click="abrir(f.id)"
              @keydown.enter="abrir(f.id)"
            >
              <td>{{ fecha(f.creada_en) }}</td>
              <td>{{ TIPOS[f.tipo] }}<span v-if="f.tiene_receta"> 📎</span></td>
              <td>{{ f.nombre }}</td>
              <td>{{ f.telefono }}</td>
              <td>
                <span :class="['estado', f.estado]">{{ ESTADOS[f.estado] }}</span>
              </td>
              <td>{{ f.responsable || '—' }}</td>
            </tr>
            <tr v-if="!lista.filas.length && !cargando">
              <td
                colspan="6"
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
            :href="`/api/admin/solicitudes/${detalle.id}/receta`"
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
