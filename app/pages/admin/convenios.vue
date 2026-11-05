<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useHead({ title: 'Convenios | Panel Clínica Óptica', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

interface Convenio { id: number, nombre: string, logo: string | null, vigente: boolean, orden: number }

const api = useAdminApi()
const lista = ref<Convenio[]>([])
const nuevoNombre = ref('')
const mensaje = ref('')

async function cargar() {
  lista.value = await api<Convenio[]>('/convenios')
}

async function agregar() {
  mensaje.value = ''
  try {
    await api('/convenios', { method: 'POST', body: { nombre: nuevoNombre.value } })
    nuevoNombre.value = ''
    await cargar()
  } catch (e) {
    const info = parseApiError(e)
    mensaje.value = Object.values(info.fields)[0] ?? info.message
  }
}

async function guardar(c: Convenio) {
  mensaje.value = ''
  try {
    await api(`/convenios/${c.id}`, { method: 'PATCH', body: { nombre: c.nombre, vigente: c.vigente, orden: c.orden } })
    mensaje.value = 'Guardado'
  } catch (e) {
    const info = parseApiError(e)
    mensaje.value = Object.values(info.fields)[0] ?? info.message
  }
}

async function subirLogo(c: Convenio, event: Event) {
  const input = event.target as HTMLInputElement
  const archivo = input.files?.[0]
  if (!archivo) return
  const datos = new FormData()
  datos.append('logo', archivo)
  try {
    await api(`/convenios/${c.id}/logo`, { method: 'POST', body: datos })
    await cargar()
    mensaje.value = 'Logo actualizado'
  } catch (e) {
    mensaje.value = parseApiError(e).message
  } finally {
    input.value = ''
  }
}

async function borrar(c: Convenio) {
  if (!confirm(`¿Quitar "${c.nombre}" de los convenios?`)) return
  await api(`/convenios/${c.id}`, { method: 'DELETE' })
  await cargar()
}

onMounted(cargar)
</script>

<template>
  <AdminShell>
    <h1>Convenios</h1>
    <p class="nota">
      Aquí solo se publican el nombre y el logotipo. Los descuentos y condiciones se explican en privado por WhatsApp o en la cita.
    </p>

    <form
      class="nuevo"
      @submit.prevent="agregar"
    >
      <input
        v-model="nuevoNombre"
        placeholder="Nombre de la empresa"
        maxlength="120"
        aria-label="Nombre de la empresa"
      >
      <button type="submit">
        Agregar empresa
      </button>
      <span
        v-if="mensaje"
        role="status"
      >{{ mensaje }}</span>
    </form>

    <ul class="lista">
      <li
        v-for="c in lista"
        :key="c.id"
        class="fila"
      >
        <div class="logo">
          <img
            v-if="c.logo"
            :src="c.logo"
            :alt="`Logo de ${c.nombre}`"
          >
          <span v-else>Sin logo</span>
        </div>
        <div class="campos">
          <input
            v-model="c.nombre"
            maxlength="120"
            :aria-label="`Nombre de ${c.nombre}`"
          >
          <label class="check"><input
            v-model="c.vigente"
            type="checkbox"
          > Convenio vigente (visible en el sitio)</label>
          <label>Orden
            <input
              v-model.number="c.orden"
              type="number"
              min="0"
              class="orden"
            >
          </label>
          <label>Logo (JPG, PNG o WEBP, máx. 5 MB)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              @change="subirLogo(c, $event)"
            >
          </label>
          <div class="acciones">
            <button
              type="button"
              @click="guardar(c)"
            >
              Guardar
            </button>
            <button
              type="button"
              class="peligro"
              @click="borrar(c)"
            >
              Quitar
            </button>
          </div>
        </div>
      </li>
      <li
        v-if="!lista.length"
        class="vacio"
      >
        Aún no hay empresas. Agrega la primera arriba.
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

.nuevo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.lista {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.fila {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: #fff;
}

@media (min-width: 700px) {
  .fila {
    grid-template-columns: 160px 1fr;
  }
}

.logo {
  display: grid;
  place-items: center;
  min-height: 100px;
  border: 1px dashed #c4cfdc;
  border-radius: 10px;
  color: #66758a;
}

.logo img {
  max-width: 140px;
  max-height: 90px;
  object-fit: contain;
}

.campos {
  display: grid;
  gap: 8px;
}

.check {
  display: flex;
  align-items: center;
  gap: 8px;
}

.orden {
  width: 90px;
}

input:not([type='checkbox'], [type='file']) {
  padding: 8px 10px;
  border: 1px solid #c4cfdc;
  border-radius: 8px;
  font: inherit;
}

label {
  display: grid;
  gap: 4px;
}

.check {
  display: flex;
}

.acciones {
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 14px;
  border: 0;
  border-radius: 8px;
  background: #244c73;
  color: #fff;
  cursor: pointer;
}

.peligro {
  background: #b42318;
}

.vacio {
  padding: 14px;
  color: #66758a;
}
</style>
