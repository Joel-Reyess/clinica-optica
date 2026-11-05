<script setup lang="ts">
import { CATEGORIAS } from '#shared/schemas/producto'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useHead({ title: 'Catálogo | Panel Clínica Óptica', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

interface Imagen { id: number, src: string, alt: string }
interface Producto {
  id: number
  categoria: string
  nombre: string
  codigo: string | null
  descripcion: string | null
  colores: string[]
  precioDesde: string | null
  promocion: string | null
  visible: boolean
  orden: number
  imagenes: Imagen[]
}

const ETIQUETAS: Record<string, string> = { 'clasicos': 'Clásicos', 'modernos': 'Modernos', 'seguridad-graduada': 'Seguridad graduada' }

const api = useAdminApi()
const productos = ref<Producto[]>([])
const editando = ref<number | null>(null) // null = ninguno, 0 = nuevo
const mensaje = ref('')
const form = reactive({
  categoria: 'clasicos',
  nombre: '',
  codigo: '',
  descripcion: '',
  colores: '',
  precioDesde: '',
  promocion: '',
  visible: true,
  orden: 0
})

async function cargar() {
  productos.value = await api<Producto[]>('/productos')
}

function nuevo() {
  Object.assign(form, { categoria: 'clasicos', nombre: '', codigo: '', descripcion: '', colores: '', precioDesde: '', promocion: '', visible: true, orden: 0 })
  editando.value = 0
  mensaje.value = ''
}

function editar(p: Producto) {
  Object.assign(form, {
    categoria: p.categoria,
    nombre: p.nombre,
    codigo: p.codigo ?? '',
    descripcion: p.descripcion ?? '',
    colores: p.colores.join(', '),
    precioDesde: p.precioDesde ?? '',
    promocion: p.promocion ?? '',
    visible: p.visible,
    orden: p.orden
  })
  editando.value = p.id
  mensaje.value = ''
}

async function guardar() {
  mensaje.value = ''
  const body = {
    ...form,
    colores: form.colores.split(',').map(c => c.trim()).filter(Boolean)
  }
  try {
    if (editando.value === 0) {
      const { id } = await api<{ id: number }>('/productos', { method: 'POST', body })
      editando.value = id
    } else {
      await api(`/productos/${editando.value}`, { method: 'PATCH', body })
    }
    mensaje.value = 'Guardado'
    await cargar()
  } catch (e) {
    const info = parseApiError(e)
    mensaje.value = Object.values(info.fields)[0] ?? info.message
  }
}

async function borrar(p: Producto) {
  if (!confirm(`¿Borrar "${p.nombre}" y sus fotos?`)) return
  await api(`/productos/${p.id}`, { method: 'DELETE' })
  editando.value = null
  await cargar()
}

async function subirImagen(event: Event) {
  const input = event.target as HTMLInputElement
  const archivo = input.files?.[0]
  if (!archivo || !editando.value) return
  const datos = new FormData()
  datos.append('imagen', archivo)
  try {
    await api(`/productos/${editando.value}/imagenes`, { method: 'POST', body: datos })
    mensaje.value = 'Foto agregada'
    await cargar()
  } catch (e) {
    mensaje.value = parseApiError(e).message
  } finally {
    input.value = ''
  }
}

async function quitarImagen(id: number) {
  await api(`/imagenes/${id}`, { method: 'DELETE' })
  await cargar()
}

const actual = computed(() => productos.value.find(p => p.id === editando.value))

onMounted(cargar)
</script>

<template>
  <AdminShell>
    <div class="barra">
      <h1>Catálogo</h1>
      <button
        type="button"
        @click="nuevo"
      >
        Agregar producto
      </button>
    </div>
    <p class="nota">
      Si no hay productos aquí, el sitio muestra los modelos de muestra. En cuanto agregues productos visibles, se usan los tuyos.
    </p>

    <div class="cuerpo">
      <ul class="lista">
        <li
          v-for="p in productos"
          :key="p.id"
          :class="{ sel: editando === p.id }"
        >
          <button
            type="button"
            class="fila"
            @click="editar(p)"
          >
            <strong>{{ p.nombre }}</strong>
            <span>{{ ETIQUETAS[p.categoria] }}{{ p.visible ? '' : ' · oculto' }}</span>
          </button>
        </li>
        <li
          v-if="!productos.length"
          class="vacio"
        >
          Aún no hay productos.
        </li>
      </ul>

      <form
        v-if="editando !== null"
        class="form"
        @submit.prevent="guardar"
      >
        <h2>{{ editando === 0 ? 'Nuevo producto' : 'Editar producto' }}</h2>
        <label>Categoría
          <select v-model="form.categoria">
            <option
              v-for="c in CATEGORIAS"
              :key="c"
              :value="c"
            >{{ ETIQUETAS[c] }}</option>
          </select>
        </label>
        <label>Nombre
          <input
            v-model="form.nombre"
            maxlength="120"
          >
        </label>
        <label>Código
          <input
            v-model="form.codigo"
            maxlength="60"
          >
        </label>
        <label>Descripción
          <textarea
            v-model="form.descripcion"
            rows="3"
            maxlength="1000"
          />
        </label>
        <label>Colores (separados por coma)
          <input v-model="form.colores">
        </label>
        <label>Precio desde (opcional)
          <input
            v-model="form.precioDesde"
            maxlength="40"
            placeholder="Ej. $1,200"
          >
        </label>
        <label>Promoción (opcional)
          <input
            v-model="form.promocion"
            maxlength="200"
          >
        </label>
        <label>Orden (menor aparece primero)
          <input
            v-model.number="form.orden"
            type="number"
            min="0"
          >
        </label>
        <label class="check"><input
          v-model="form.visible"
          type="checkbox"
        > Visible en el sitio</label>

        <div class="acciones">
          <button type="submit">
            Guardar
          </button>
          <button
            v-if="actual"
            type="button"
            class="peligro"
            @click="borrar(actual)"
          >
            Borrar
          </button>
          <span
            v-if="mensaje"
            role="status"
          >{{ mensaje }}</span>
        </div>

        <div
          v-if="actual"
          class="fotos"
        >
          <h3>Fotos</h3>
          <div class="galeria">
            <figure
              v-for="i in actual.imagenes"
              :key="i.id"
            >
              <img
                :src="i.src"
                :alt="i.alt"
              >
              <button
                type="button"
                class="peligro"
                @click="quitarImagen(i.id)"
              >
                Quitar
              </button>
            </figure>
          </div>
          <label>Agregar foto (JPG, PNG o WEBP, máx. 5 MB)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              @change="subirImagen"
            >
          </label>
        </div>
        <p v-else>
          Guarda el producto para poder agregarle fotos.
        </p>
      </form>
    </div>
  </AdminShell>
</template>

<style scoped>
.barra {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  margin: 0;
}

.nota {
  color: #66758a;
}

.cuerpo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
}

@media (min-width: 900px) {
  .cuerpo {
    grid-template-columns: 320px 1fr;
  }
}

.lista {
  margin: 0;
  padding: 8px;
  border-radius: 12px;
  background: #fff;
  list-style: none;
}

.fila {
  display: grid;
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 8px;
  background: none;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.fila span {
  color: #66758a;
  font-size: 0.85rem;
}

li.sel .fila,
.fila:hover {
  background: #eef3f9;
}

.vacio {
  padding: 10px;
  color: #66758a;
}

.form {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
}

.form h2,
.form h3 {
  margin: 0;
}

label {
  display: grid;
  gap: 4px;
}

.check {
  display: flex;
  align-items: center;
  gap: 8px;
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

.check input {
  width: auto;
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

.acciones {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.galeria {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

figure {
  display: grid;
  gap: 6px;
  margin: 0;
  width: 140px;
}

img {
  width: 140px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
}
</style>
