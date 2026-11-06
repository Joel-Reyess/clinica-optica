<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useHead({ title: 'Marcas | Panel Clínica Óptica', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

interface Marca { id: number, nombre: string, productos: number, nuevo?: string }

const api = useAdminApi()
const lista = ref<Marca[]>([])
const nueva = ref('')
const mensaje = ref('')

async function cargar() {
  lista.value = (await api<Marca[]>('/marcas')).map(m => ({ ...m, nuevo: m.nombre }))
}

function mostrarError(e: unknown) {
  const info = parseApiError(e)
  mensaje.value = Object.values(info.fields)[0] ?? info.message
}

async function agregar() {
  mensaje.value = ''
  try {
    await api('/marcas', { method: 'POST', body: { nombre: nueva.value } })
    nueva.value = ''
    await cargar()
    mensaje.value = 'Marca agregada'
  } catch (e) {
    mostrarError(e)
  }
}

async function renombrar(m: Marca) {
  mensaje.value = ''
  try {
    await api(`/marcas/${m.id}`, { method: 'PATCH', body: { nombre: m.nuevo } })
    await cargar()
    mensaje.value = 'Guardado'
  } catch (e) {
    mostrarError(e)
  }
}

async function borrar(m: Marca) {
  if (!confirm(`¿Quitar la marca "${m.nombre}"?`)) return
  mensaje.value = ''
  try {
    await api(`/marcas/${m.id}`, { method: 'DELETE' })
    await cargar()
  } catch (e) {
    mostrarError(e)
  }
}

onMounted(cargar)
</script>

<template>
  <AdminShell>
    <h1>Marcas</h1>
    <p class="nota">
      Las marcas se eligen de esta lista al crear un producto. Así no se repiten ni se escriben distinto.
      Si corriges el nombre de una marca, se actualiza en todos sus productos.
    </p>

    <form
      class="nueva"
      @submit.prevent="agregar"
    >
      <input
        v-model="nueva"
        maxlength="60"
        placeholder="Nueva marca (ej. Ray-Ban)"
        aria-label="Nueva marca"
      >
      <button type="submit">
        Agregar marca
      </button>
      <span
        v-if="mensaje"
        role="status"
      >{{ mensaje }}</span>
    </form>

    <ul class="lista">
      <li
        v-for="m in lista"
        :key="m.id"
      >
        <input
          v-model="m.nuevo"
          maxlength="60"
          :aria-label="`Nombre de ${m.nombre}`"
        >
        <span class="uso">{{ m.productos }} producto(s)</span>
        <button
          type="button"
          :disabled="m.nuevo === m.nombre"
          @click="renombrar(m)"
        >
          Guardar nombre
        </button>
        <button
          type="button"
          class="peligro"
          :disabled="m.productos > 0"
          :title="m.productos > 0 ? 'Tiene productos: cámbiales la marca primero' : ''"
          @click="borrar(m)"
        >
          Quitar
        </button>
      </li>
      <li
        v-if="!lista.length"
        class="vacio"
      >
        Aún no hay marcas.
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

.nueva {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
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
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff;
}

input {
  padding: 8px 10px;
  border: 1px solid #c4cfdc;
  border-radius: 8px;
  font: inherit;
}

.lista input {
  flex: 1 1 200px;
}

.uso {
  color: #66758a;
  font-size: 0.88rem;
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
  opacity: 0.45;
  cursor: default;
}

.peligro {
  background: #b42318;
}

.vacio {
  color: #66758a;
}
</style>
