<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useHead({ title: 'Textos y horarios | Panel Clínica Óptica', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

interface Texto { clave: string, titulo: string, valor: string }

const api = useAdminApi()
const textos = ref<Texto[]>([])
const estado = reactive<Record<string, string>>({})

onMounted(async () => {
  textos.value = await api<Texto[]>('/textos')
})

async function guardar(t: Texto) {
  estado[t.clave] = 'Guardando…'
  try {
    await api('/textos', { method: 'PUT', body: { clave: t.clave, valor: t.valor } })
    estado[t.clave] = 'Guardado'
  } catch {
    estado[t.clave] = 'No se pudo guardar'
  }
}
</script>

<template>
  <AdminShell>
    <h1>Textos y horarios</h1>
    <p class="nota">
      Los cambios se ven en el sitio en cuanto guardas.
    </p>
    <form
      v-for="t in textos"
      :key="t.clave"
      class="caja"
      @submit.prevent="guardar(t)"
    >
      <label :for="t.clave">{{ t.titulo }}</label>
      <textarea
        :id="t.clave"
        v-model="t.valor"
        rows="3"
        maxlength="2000"
      />
      <div>
        <button type="submit">
          Guardar
        </button>
        <span
          v-if="estado[t.clave]"
          role="status"
        > {{ estado[t.clave] }}</span>
      </div>
    </form>
  </AdminShell>
</template>

<style scoped>
h1 {
  margin: 0 0 8px;
}

.nota {
  margin: 0 0 16px;
  color: #66758a;
}

.caja {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
}

textarea {
  padding: 8px 10px;
  border: 1px solid #c4cfdc;
  border-radius: 8px;
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
</style>
