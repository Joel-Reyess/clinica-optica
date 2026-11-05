<script setup lang="ts">
interface Convenio { id: number, nombre: string, logo: string | null }

const { url: waUrl } = useWhatsapp()
const { data } = await useFetch<Convenio[]>('/api/convenios', { default: () => [] })

const busqueda = ref('')
const verTodas = ref(false)
const elegido = ref<Convenio | null>(null)
const dialogo = ref<HTMLDialogElement | null>(null)

const POR_DEFECTO = 8 // en el celular se ven como 4 filas de 2

const norm = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const filtradas = computed(() => {
  const q = norm(busqueda.value.trim())
  return q ? data.value.filter(c => norm(c.nombre).includes(q)) : data.value
})

// Con búsqueda se muestran todas las coincidencias; sin ella, solo las primeras
const visibles = computed(() => (verTodas.value || busqueda.value.trim())
  ? filtradas.value
  : filtradas.value.slice(0, POR_DEFECTO))

const hayMas = computed(() => !busqueda.value.trim() && filtradas.value.length > POR_DEFECTO)

const iniciales = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]!.toUpperCase()).join('')

const mensajeWhatsapp = computed(() => elegido.value
  ? waUrl(`Hola, pertenezco a ${elegido.value.nombre} y quisiera conocer los beneficios y requisitos de mi convenio con Clínica Óptica.`)
  : '#')

function abrir(c: Convenio) {
  elegido.value = c
  nextTick(() => dialogo.value?.showModal())
}

function cerrar() {
  dialogo.value?.close()
}

// Cerrar al tocar fuera de la ventana
function clicFondo(e: MouseEvent) {
  if (e.target === dialogo.value) cerrar()
}
</script>

<template>
  <section
    id="convenios"
    class="content-section convenios-section"
    aria-labelledby="convenios-title"
  >
    <h2
      id="convenios-title"
      class="section-title"
    >
      Convenios empresariales
    </h2>
    <p class="convenios-intro">
      Si trabajas en una empresa con convenio, consulta cómo aprovecharlo. Los descuentos y condiciones los explicamos de forma personal.
    </p>

    <template v-if="data.length">
      <label class="convenios-buscador">
        <UIcon
          name="i-lucide-search"
          aria-hidden="true"
        />
        <span class="sr-only">Buscar tu empresa</span>
        <input
          v-model="busqueda"
          type="search"
          placeholder="Busca tu empresa"
          autocomplete="off"
        >
      </label>

      <ul class="convenios-grid">
        <li
          v-for="c in visibles"
          :key="c.id"
          class="convenio-card"
        >
          <div class="convenio-logo">
            <img
              v-if="c.logo"
              :src="c.logo"
              :alt="`Logotipo de ${c.nombre}`"
              loading="lazy"
              decoding="async"
            >
            <span
              v-else
              aria-hidden="true"
            >{{ iniciales(c.nombre) }}</span>
          </div>
          <h3>{{ c.nombre }}</h3>
          <button
            type="button"
            class="button button-outline card-button"
            @click="abrir(c)"
          >
            Consultar mi convenio
          </button>
        </li>
      </ul>

      <p
        v-if="!visibles.length"
        class="convenios-vacio"
        role="status"
      >
        No encontramos esa empresa. Escríbenos y te decimos si tenemos convenio.
      </p>

      <div
        v-if="hayMas"
        class="convenios-mas"
      >
        <button
          type="button"
          class="button button-outline"
          @click="verTodas = !verTodas"
        >
          {{ verTodas ? 'Ver menos' : `Ver todas las empresas (${filtradas.length})` }}
        </button>
      </div>
    </template>
    <p
      v-else
      class="convenios-vacio"
    >
      Pronto publicaremos aquí las empresas con convenio.
    </p>

    <p class="convenios-nuevo">
      <NuxtLink to="/empresas">
        ¿Quieres un convenio para tu empresa?
      </NuxtLink>
    </p>

    <dialog
      ref="dialogo"
      class="convenio-dialog"
      aria-labelledby="convenio-dialog-title"
      @click="clicFondo"
    >
      <div
        v-if="elegido"
        class="convenio-dialog-body"
      >
        <button
          type="button"
          class="convenio-dialog-close"
          aria-label="Cerrar"
          @click="cerrar"
        >
          <UIcon
            name="i-lucide-x"
            aria-hidden="true"
          />
        </button>
        <h3 id="convenio-dialog-title">
          {{ elegido.nombre }}
        </h3>
        <p>
          Elige cómo quieres consultar tu convenio. Verificaremos que puedas utilizarlo y te explicaremos los beneficios y requisitos de forma privada. Elegir una empresa no aplica descuentos automáticamente.
        </p>
        <a
          class="button button-primary"
          :href="mensajeWhatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UIcon
            name="i-lucide-message-circle"
            aria-hidden="true"
          />
          Consultar por WhatsApp
        </a>
        <NuxtLink
          class="button button-outline"
          :to="{ path: '/citas', query: { convenio: elegido.nombre } }"
        >
          <UIcon
            name="i-lucide-calendar-days"
            aria-hidden="true"
          />
          Solicitar una cita
        </NuxtLink>
      </div>
    </dialog>
  </section>
</template>

<style scoped>
.convenios-section {
  --navy: #102b4a;

  width: min(1140px, calc(100% - 32px));
  margin: 0 auto;
  padding: 34px 0 10px;
  color: var(--navy);
}

.section-title {
  margin: 0 0 10px;
  font-size: clamp(1.45rem, 3vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.2;
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.button-primary {
  background: var(--navy);
  color: #fff;
}

.button-primary:hover {
  background: #1c3e63;
}

.button-outline {
  border-color: #8997a7;
  background: #fff;
  color: var(--navy);
}

.button-outline:hover {
  border-color: var(--navy);
  background: #f4f7fa;
}

.convenios-intro {
  max-width: 640px;
  margin: 0 auto 20px;
  text-align: center;
}

.convenios-buscador {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 420px;
  margin: 0 auto 20px;
  padding: 0 14px;
  border: 1px solid #c9d4e0;
  border-radius: 999px;
  background: #fff;
}

.convenios-buscador input {
  flex: 1;
  min-height: 46px;
  border: 0;
  outline: 0;
  background: none;
  font: inherit;
}

.convenios-buscador:focus-within {
  border-color: #102b4a;
  box-shadow: 0 0 0 3px rgb(16 43 74 / 15%);
}

.convenios-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 700px) {
  .convenios-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
}

@media (min-width: 1000px) {
  .convenios-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.convenio-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 12px;
  border: 1px solid #dfe6ee;
  border-radius: 16px;
  background: #fff;
  text-align: center;
}

.convenio-logo {
  display: grid;
  place-items: center;
  width: 100%;
  height: 84px;
}

.convenio-logo img {
  max-width: 100%;
  max-height: 84px;
  object-fit: contain;
}

.convenio-logo span {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #eef3f9;
  color: #102b4a;
  font-size: 1.4rem;
  font-weight: 700;
}

.convenio-card h3 {
  margin: 0;
  font-size: 1rem;
  overflow-wrap: anywhere;
}

.convenio-card .card-button {
  margin-top: auto;
  width: 100%;
  min-height: 44px;
  font-size: 0.9rem;
}

.convenios-vacio {
  margin: 16px 0;
  text-align: center;
  color: #5b6b80;
}

.convenios-mas,
.convenios-nuevo {
  margin: 20px 0 0;
  text-align: center;
}

.convenios-nuevo a {
  color: #102b4a;
  font-weight: 600;
  text-decoration: underline;
}

.convenio-dialog {
  width: min(92vw, 440px);
  padding: 0;
  border: 0;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgb(16 43 74 / 35%);
}

.convenio-dialog::backdrop {
  background: rgb(16 43 74 / 55%);
}

.convenio-dialog-body {
  display: grid;
  gap: 12px;
  padding: 24px 20px 20px;
}

.convenio-dialog-body h3 {
  margin: 0;
  padding-right: 36px;
}

.convenio-dialog-body p {
  margin: 0;
  color: #44546a;
  font-size: 0.95rem;
}

.convenio-dialog-body .button {
  justify-content: center;
  min-height: 48px;
}

.convenio-dialog-close {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: #eef3f9;
  cursor: pointer;
}

@media (max-width: 520px) {
  /* En el celular la ventana sale desde abajo, más fácil de alcanzar con el pulgar */
  .convenio-dialog {
    width: 100%;
    max-width: 100%;
    margin: auto 0 0;
    border-radius: 20px 20px 0 0;
  }
}
</style>
