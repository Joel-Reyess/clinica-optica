<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useHead({ title: 'Horarios de citas | Panel Clínica Óptica', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

interface Dia { dia: number, activo: boolean, apertura: string, cierre: string, pausaInicio: string | null, pausaFin: string | null }
interface Cerrado { fecha: string, motivo: string | null }

const NOMBRES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const ORDEN = [1, 2, 3, 4, 5, 6, 0]

const api = useAdminApi()
const semana = ref<Dia[]>([])
const ajustes = reactive({ duracionMin: 30, cupo: 1, anticipacionHoras: 4, diasAdelante: 45 })
const cerrados = ref<Cerrado[]>([])
const nuevoCierre = reactive({ fecha: '', motivo: '' })
const mensaje = ref('')
const errores = ref<string[]>([])

const diasOrdenados = computed(() => ORDEN.map(n => semana.value.find(d => d.dia === n)!).filter(Boolean))

async function cargar() {
  const r = await api<{ semana: Dia[], cerrados: Cerrado[] } & typeof ajustes>('/agenda')
  semana.value = r.semana
  Object.assign(ajustes, { duracionMin: r.duracionMin, cupo: r.cupo, anticipacionHoras: r.anticipacionHoras, diasAdelante: r.diasAdelante })
  cerrados.value = r.cerrados
}

function mostrarError(e: unknown) {
  const info = parseApiError(e)
  errores.value = Object.values(info.fields).length ? Object.values(info.fields) : [info.message]
}

async function guardar() {
  mensaje.value = ''
  errores.value = []
  try {
    await api('/agenda', {
      method: 'PUT',
      body: {
        semana: semana.value.map(d => ({ ...d, pausaInicio: d.pausaInicio || '', pausaFin: d.pausaFin || '' })),
        duracionMin: Number(ajustes.duracionMin),
        cupo: Number(ajustes.cupo),
        anticipacionHoras: Number(ajustes.anticipacionHoras),
        diasAdelante: Number(ajustes.diasAdelante)
      }
    })
    mensaje.value = 'Horarios guardados. Ya se ven en la página de citas.'
  } catch (e) {
    mostrarError(e)
  }
}

async function cerrarDia() {
  errores.value = []
  try {
    await api('/dias-cerrados', { method: 'POST', body: { ...nuevoCierre } })
    nuevoCierre.fecha = ''
    nuevoCierre.motivo = ''
    await cargar()
  } catch (e) {
    mostrarError(e)
  }
}

async function reabrir(c: Cerrado) {
  await api(`/dias-cerrados/${c.fecha}`, { method: 'DELETE' })
  await cargar()
}

onMounted(cargar)
</script>

<template>
  <AdminShell>
    <h1>Horarios de citas</h1>
    <p class="nota">
      Define qué días y a qué horas se puede pedir cita. En la página solo aparecen horarios libres;
      una hora deja de mostrarse cuando se llena el cupo (y vuelve si la solicitud se marca como cerrada).
    </p>

    <form @submit.prevent="guardar">
      <table class="semana">
        <thead>
          <tr>
            <th>Día</th>
            <th>Atiende</th>
            <th>Abre</th>
            <th>Cierra</th>
            <th>Pausa (opcional)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="d in diasOrdenados"
            :key="d.dia"
          >
            <td>{{ NOMBRES[d.dia] }}</td>
            <td>
              <input
                v-model="d.activo"
                type="checkbox"
                :aria-label="`Atiende el ${NOMBRES[d.dia]}`"
              >
            </td>
            <td>
              <input
                v-model="d.apertura"
                type="time"
                :disabled="!d.activo"
                :aria-label="`Apertura ${NOMBRES[d.dia]}`"
              >
            </td>
            <td>
              <input
                v-model="d.cierre"
                type="time"
                :disabled="!d.activo"
                :aria-label="`Cierre ${NOMBRES[d.dia]}`"
              >
            </td>
            <td>
              <input
                v-model="d.pausaInicio"
                type="time"
                :disabled="!d.activo"
                :aria-label="`Inicio de pausa ${NOMBRES[d.dia]}`"
              >
              a
              <input
                v-model="d.pausaFin"
                type="time"
                :disabled="!d.activo"
                :aria-label="`Fin de pausa ${NOMBRES[d.dia]}`"
              >
            </td>
          </tr>
        </tbody>
      </table>

      <div class="ajustes">
        <label>Duración de cada cita (min)
          <input
            v-model.number="ajustes.duracionMin"
            type="number"
            min="10"
            max="240"
          >
        </label>
        <label>Citas por horario
          <input
            v-model.number="ajustes.cupo"
            type="number"
            min="1"
            max="20"
          >
        </label>
        <label>Anticipación mínima (horas)
          <input
            v-model.number="ajustes.anticipacionHoras"
            type="number"
            min="0"
            max="168"
          >
        </label>
        <label>Días hacia adelante
          <input
            v-model.number="ajustes.diasAdelante"
            type="number"
            min="1"
            max="180"
          >
        </label>
      </div>

      <button type="submit">
        Guardar horarios
      </button>
      <span
        v-if="mensaje"
        role="status"
        class="ok"
      >{{ mensaje }}</span>
      <ul
        v-if="errores.length"
        class="errores"
        role="alert"
      >
        <li
          v-for="e in errores"
          :key="e"
        >
          {{ e }}
        </li>
      </ul>
    </form>

    <h2>Días sin citas</h2>
    <p class="nota">
      Vacaciones, días festivos o cualquier fecha en que no se atiende.
    </p>
    <form
      class="cierre"
      @submit.prevent="cerrarDia"
    >
      <input
        v-model="nuevoCierre.fecha"
        type="date"
        required
        aria-label="Fecha sin citas"
      >
      <input
        v-model="nuevoCierre.motivo"
        maxlength="120"
        placeholder="Motivo (opcional)"
        aria-label="Motivo"
      >
      <button type="submit">
        Cerrar este día
      </button>
    </form>
    <ul class="lista">
      <li
        v-for="c in cerrados"
        :key="c.fecha"
      >
        <strong>{{ c.fecha }}</strong>
        <span>{{ c.motivo }}</span>
        <button
          type="button"
          @click="reabrir(c)"
        >
          Volver a abrir
        </button>
      </li>
      <li
        v-if="!cerrados.length"
        class="vacio"
      >
        No hay días cerrados.
      </li>
    </ul>
  </AdminShell>
</template>

<style scoped>
h1 {
  margin: 0 0 8px;
}

.nota {
  color: #66758a;
}

.semana {
  width: 100%;
  margin-bottom: 16px;
  border-collapse: collapse;
}

.semana th,
.semana td {
  padding: 8px;
  border-bottom: 1px solid #e3e8ef;
  text-align: left;
}

.ajustes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.ajustes label {
  display: grid;
  gap: 4px;
}

.ok {
  margin-left: 12px;
  color: #1b7a43;
}

.errores {
  color: #b42318;
}

.cierre {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.lista {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.lista li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.vacio {
  color: #66758a;
}

@media (max-width: 720px) {
  .semana {
    display: block;
    overflow-x: auto;
  }
}
</style>
