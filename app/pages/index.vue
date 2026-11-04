<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  getPrescriptionDraft,
  setPrescriptionDraft,
  setQuoteRequestDraft
} from '~/utils/prescriptionDraft'

const heroVideoSource = '/hero-eyewear-ping-pong.mp4'

useHead({
  title: 'Clínica Óptica | Salud visual y lentes en Coatzacoalcos',
  meta: [
    {
      name: 'description',
      content: 'Atención visual profesional, evaluaciones optométricas y lentes a tu medida en Coatzacoalcos. Agenda tu cita en Clínica Óptica.'
    }
  ]
})

const helpCards = [
  {
    icon: 'i-lucide-building-2',
    title: 'Campañas para empresas',
    description: 'Llevamos la atención visual a tu equipo.',
    label: 'Solicitar campaña',
    to: { path: '/empresas', query: { solicitar: 'campana' } }
  },
  {
    icon: 'i-lucide-calendar-days',
    title: 'Agenda tu cita',
    description: 'Elige el día y horario que prefieres.',
    label: 'Solicitar cita',
    to: '/citas'
  },
  {
    icon: 'i-lucide-messages-square',
    title: 'Resolvemos tus dudas',
    description: 'Servicios, convenios y formas de pago.',
    label: 'Pedir información',
    to: '/informacion'
  },
  {
    icon: 'i-lucide-glasses',
    title: 'Lentes con tu graduación',
    description: 'Elige tu armazón y comparte tu receta.',
    label: 'Cotizar mis lentes',
    to: '/cotizar'
  }
]

const prescriptionError = ref('')
const isHeroVideoEnabled = ref(false)
const prescriptionName = ref(getPrescriptionDraft()?.name ?? '')
const prescriptionInput = ref<HTMLInputElement | null>(null)
const recipeDialog = ref<HTMLDialogElement | null>(null)
const patientDialog = ref<HTMLDialogElement | null>(null)
const patientRequestForm = ref<HTMLFormElement | null>(null)
const patientRequestUrl = ref('')
const quoteRequest = ref({
  name: '',
  contact: '',
  reason: ''
})
const patientRequest = ref({
  name: '',
  contact: '',
  reason: '',
  aboutOrder: false,
  orderFolio: ''
})
let heroVideoTimer: number | undefined
let heroVideoMediaQuery: MediaQueryList | undefined
const router = useRouter()
const recipeReasons = [
  'Cotizar lentes graduados',
  'Solicitar revisión de mi receta',
  'Cambiar micas a mi armazón',
  'Necesito asesoría'
]
const patientRequestReasons = [
  'Consulta de entrega o estado de mi pedido',
  'Solicitud de ajuste',
  'Orientación sobre adaptación',
  'Seguimiento'
]
const patientRequestIsAboutOrder = computed(() =>
  patientRequest.value.reason === patientRequestReasons[0]
)
const patientRequestHasOrderFolio = computed(() =>
  patientRequestIsAboutOrder.value || patientRequest.value.aboutOrder
)

function selectPrescription(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  prescriptionError.value = ''

  if (!file) {
    setPrescriptionDraft(null)
    prescriptionName.value = ''
    return
  }

  const isSupportedType = file.type === 'application/pdf'
    || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
  if (!isSupportedType) {
    input.value = ''
    setPrescriptionDraft(null)
    prescriptionName.value = ''
    prescriptionError.value = 'Elige una foto JPG, PNG, WEBP o un archivo PDF.'
    return
  }

  if (file.size > 10 * 1024 * 1024) {
    input.value = ''
    setPrescriptionDraft(null)
    prescriptionName.value = ''
    prescriptionError.value = 'El archivo no debe superar los 10 MB.'
    return
  }

  setPrescriptionDraft(file)
  prescriptionName.value = file.name
}

function openQuoteRequestDialog() {
  if (!getPrescriptionDraft()) {
    prescriptionError.value = 'Primero sube una foto legible o un PDF de tu receta.'
    prescriptionInput.value?.focus()
    return
  }

  prescriptionError.value = ''
  recipeDialog.value?.showModal()
}

function continueQuoteRequest() {
  if (!getPrescriptionDraft()) {
    prescriptionError.value = 'Sube una foto legible o un PDF de tu receta para continuar.'
    recipeDialog.value?.close()
    prescriptionInput.value?.focus()
    return
  }

  setQuoteRequestDraft({
    name: quoteRequest.value.name.trim(),
    contact: quoteRequest.value.contact.trim(),
    reason: quoteRequest.value.reason
  })
  recipeDialog.value?.close()
  void router.push({ path: '/cotizar', query: { receta: '1' } })
}

function openPatientDialog() {
  patientRequestUrl.value = ''
  patientDialog.value?.showModal()
}

function preparePatientRequest() {
  if (!patientRequestForm.value?.reportValidity()) return

  const message = [
    'Hola, soy paciente de Clínica Óptica.',
    `Nombre: ${patientRequest.value.name.trim()}`,
    `Teléfono o WhatsApp: ${patientRequest.value.contact.trim()}`,
    `Motivo: ${patientRequest.value.reason}`,
    patientRequestHasOrderFolio.value && patientRequest.value.orderFolio.trim()
      ? `Folio del pedido: ${patientRequest.value.orderFolio.trim()}`
      : '',
    'Entiendo que el equipo verificará mi identidad antes de compartir información de mi expediente o pedido.'
  ].filter(Boolean).join('\n')

  patientRequestUrl.value = `https://wa.me/529211371704?text=${encodeURIComponent(message)}`
}

function resetPatientRequestOrderState() {
  patientRequest.value.aboutOrder = false
  patientRequest.value.orderFolio = ''
  patientRequestUrl.value = ''
}

function reportHeroVideoError() {
  isHeroVideoEnabled.value = false
  console.error('No se pudo cargar el video del hero.')
}

function updateHeroVideo() {
  if (heroVideoTimer !== undefined) {
    window.clearTimeout(heroVideoTimer)
    heroVideoTimer = undefined
  }

  isHeroVideoEnabled.value = false
  if (!heroVideoMediaQuery?.matches) return

  heroVideoTimer = window.setTimeout(() => {
    isHeroVideoEnabled.value = true
    heroVideoTimer = undefined
  }, 1500)
}

onMounted(() => {
  heroVideoMediaQuery = window.matchMedia(
    '(min-width: 761px) and (prefers-reduced-motion: no-preference)'
  )
  heroVideoMediaQuery.addEventListener('change', updateHeroVideo)
  updateHeroVideo()
})

onBeforeUnmount(() => {
  if (heroVideoTimer !== undefined) window.clearTimeout(heroVideoTimer)
  heroVideoMediaQuery?.removeEventListener('change', updateHeroVideo)
})

const frameCards = [
  {
    title: 'Clásicos',
    category: 'clasicos',
    image: '/images/ClassicFrames-640.webp',
    imageMedium: '/images/ClassicFrames-480.webp',
    imageSmall: '/images/ClassicFrames-320.webp',
    sizes: '(max-width: 520px) 40vw, (max-width: 760px) 228px, 269px',
    width: 1600,
    height: 631,
    alt: 'Armazón clásico para lentes graduados'
  },
  {
    title: 'Modernos',
    category: 'modernos',
    image: '/images/Sunglasses-640.webp',
    imageMedium: '/images/Sunglasses-480.webp',
    imageSmall: '/images/Sunglasses-320.webp',
    sizes: '(max-width: 520px) 116px, (max-width: 760px) 121px, 143px',
    width: 1600,
    height: 1190,
    alt: 'Armazón moderno para lentes graduados'
  },
  {
    title: 'Seguridad graduada',
    category: 'seguridad-graduada',
    image: '/images/Seguridad-640.webp',
    imageMedium: '/images/Seguridad-480.webp',
    imageSmall: '/images/Seguridad-320.webp',
    sizes: '(max-width: 520px) 94px, (max-width: 760px) 98px, 115px',
    width: 1100,
    height: 1008,
    alt: 'Lentes de seguridad graduados'
  }
]
</script>

<template>
  <main class="home-page">
    <section
      id="inicio"
      class="hero"
      aria-labelledby="hero-title"
    >
      <div class="hero-copy">
        <p class="eyebrow">
          Coatzacoalcos · Desde 2016
        </p>
        <h1 id="hero-title">
          Expertos en<br class="desktop-break"> salud visual
        </h1>
        <p class="hero-description">
          Atención profesional y lentes a tu medida.
        </p>
        <div class="hero-actions">
          <NuxtLink
            class="button button-primary"
            to="/citas"
          >
            Agendar evaluación
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink
            class="button button-outline"
            to="/lentes"
          >
            Ver armazones
          </NuxtLink>
        </div>
      </div>
      <div class="hero-visual">
        <video
          v-if="isHeroVideoEnabled"
          class="hero-media"
          :src="heroVideoSource"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          aria-hidden="true"
          @error="reportHeroVideoError"
        />
        <img
          v-else
          class="hero-media"
          src="/images/FondoPrincipal-1024.webp"
          srcset="/images/FondoPrincipal-480.webp 480w, /images/FondoPrincipal-768.webp 768w, /images/FondoPrincipal-1024.webp 1024w, /images/FondoPrincipal-1400.webp 1400w"
          sizes="100vw"
          alt="Armazones de lentes en exhibición"
          width="1400"
          height="934"
          fetchpriority="high"
          decoding="async"
        >
        <div class="hero-note">
          <span>Una mejor visión</span>
          <span>Una vida más clara</span>
          <span class="hero-note-rule" />
        </div>
        <p class="hero-caption">
          Tu visión, nuestra prioridad
        </p>
      </div>
    </section>

    <section
      id="ayuda"
      class="content-section help-section"
      aria-labelledby="help-title"
    >
      <h2
        id="help-title"
        class="section-title"
      >
        ¿Cómo podemos ayudarte?
      </h2>
      <div class="help-grid">
        <NuxtLink
          v-for="card in helpCards"
          :key="card.title"
          class="help-card"
          :to="card.to"
        >
          <UIcon
            :name="card.icon"
            class="help-icon"
            aria-hidden="true"
          />
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <span class="button button-outline card-button">
            {{ card.label }}
          </span>
        </NuxtLink>
      </div>
    </section>

    <section
      id="lentes"
      class="content-section frames-section"
      aria-labelledby="frames-title"
    >
      <h2
        id="frames-title"
        class="section-title"
      >
        Encuentra tus próximos lentes
      </h2>
      <div class="frames-grid">
        <NuxtLink
          v-for="(frame, index) in frameCards"
          :key="frame.title"
          class="frame-card"
          :to="{ path: '/lentes', query: { categoria: frame.category }, hash: '#catalogo' }"
        >
          <span class="frame-image">
            <img
              :src="frame.image"
              :srcset="`${frame.imageSmall} 320w, ${frame.imageMedium} 480w, ${frame.image} 640w`"
              :sizes="frame.sizes"
              :alt="frame.alt"
              :class="`frame-image-${index + 1}`"
              :width="frame.width"
              :height="frame.height"
              loading="lazy"
              decoding="async"
            >
          </span>
          <h3>{{ frame.title }}</h3>
          <span class="button button-outline frame-button">
            Explorar categoría
          </span>
        </NuxtLink>
      </div>
    </section>

    <section
      id="cotiza"
      class="content-section quote-grid"
      aria-label="Cotiza tus lentes o una campaña visual"
    >
      <article class="business-panel">
        <div class="panel-copy">
          <h2>Salud visual para tu empresa</h2>
          <p>Conoce nuestras campañas y convenios.</p>
          <NuxtLink
            class="button button-light"
            :to="{ path: '/empresas', query: { solicitar: 'campana' } }"
          >
            Solicitar propuesta
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
        <UIcon
          name="i-lucide-building-2"
          class="business-icon"
          aria-hidden="true"
        />
      </article>

      <article
        class="recipe-panel"
        aria-labelledby="recipe-title"
      >
        <div class="recipe-heading">
          <h2 id="recipe-title">
            ¿Ya tienes tu receta?
          </h2>
          <p>Compártela para recibir una cotización.</p>
        </div>
        <div class="recipe-actions">
          <label
            class="recipe-upload"
            :class="{ 'has-file': prescriptionName }"
          >
            <UIcon
              name="i-lucide-upload"
              aria-hidden="true"
            />
            <span class="recipe-file-name">{{ prescriptionName || 'Subir foto o PDF' }}</span>
            <input
              ref="prescriptionInput"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
              aria-label="Subir una foto o PDF de tu receta"
              @change="selectPrescription"
            >
          </label>
          <button
            class="button button-primary recipe-submit"
            type="button"
            @click="openQuoteRequestDialog"
          >
            Enviar para revisión
          </button>
          <span class="recipe-upload-helper">JPG, PNG, WEBP o PDF · Máximo 10 MB</span>
        </div>
        <p
          v-if="prescriptionError"
          class="recipe-hint recipe-error"
          role="alert"
        >
          {{ prescriptionError }}
        </p>
        <p
          v-else
          class="recipe-hint"
        >
          Adjuntar el archivo no envía la solicitud. Revisaremos tus datos antes de preparar el mensaje para WhatsApp.
        </p>
      </article>
    </section>

    <dialog
      ref="recipeDialog"
      class="recipe-dialog"
      aria-labelledby="recipe-dialog-title"
      @click.self="recipeDialog?.close()"
    >
      <form
        class="recipe-dialog-form"
        @submit.prevent="continueQuoteRequest"
      >
        <button
          class="recipe-dialog-close"
          type="button"
          aria-label="Cerrar formulario"
          @click="recipeDialog?.close()"
        >
          <UIcon
            name="i-lucide-x"
            aria-hidden="true"
          />
        </button>
        <p class="recipe-dialog-eyebrow">
          Un último paso
        </p>
        <h2 id="recipe-dialog-title">
          Completa tus datos para continuar
        </h2>
        <p class="recipe-dialog-description">
          Tu receta <strong>{{ prescriptionName }}</strong> está adjunta. Agrega tus datos y el motivo de consulta para preparar la solicitud.
        </p>
        <label class="recipe-dialog-field">
          <span>Nombre *</span>
          <input
            v-model.trim="quoteRequest.name"
            autocomplete="name"
            name="recipe-name"
            placeholder="Tu nombre"
            required
          >
        </label>
        <label class="recipe-dialog-field">
          <span>Teléfono o WhatsApp *</span>
          <input
            v-model.trim="quoteRequest.contact"
            type="tel"
            autocomplete="tel"
            name="recipe-contact"
            placeholder="Tu número de contacto"
            required
          >
        </label>
        <label class="recipe-dialog-field">
          <span>Motivo de consulta *</span>
          <select
            v-model="quoteRequest.reason"
            name="recipe-reason"
            required
          >
            <option
              disabled
              value=""
            >
              Selecciona un motivo
            </option>
            <option
              v-for="reason in recipeReasons"
              :key="reason"
              :value="reason"
            >
              {{ reason }}
            </option>
          </select>
        </label>
        <p class="recipe-dialog-note">
          Al continuar podrás revisar la solicitud y compartir el archivo manualmente por WhatsApp.
        </p>
        <button
          class="button button-primary recipe-dialog-submit"
          type="submit"
        >
          Continuar solicitud
          <UIcon
            name="i-lucide-arrow-right"
            aria-hidden="true"
          />
        </button>
      </form>
    </dialog>

    <p class="patient-link">
      <button
        class="patient-link-button"
        type="button"
        @click="openPatientDialog"
      >
        Ya soy paciente · Entregas, ajustes y seguimiento
      </button>
    </p>

    <dialog
      ref="patientDialog"
      class="recipe-dialog patient-dialog"
      aria-labelledby="patient-dialog-title"
      @click.self="patientDialog?.close()"
    >
      <form
        ref="patientRequestForm"
        class="recipe-dialog-form"
        @input="patientRequestUrl = ''"
        @submit.prevent="preparePatientRequest"
      >
        <button
          class="recipe-dialog-close"
          type="button"
          aria-label="Cerrar formulario"
          @click="patientDialog?.close()"
        >
          <UIcon
            name="i-lucide-x"
            aria-hidden="true"
          />
        </button>
        <p class="recipe-dialog-eyebrow">
          Atención a pacientes
        </p>
        <h2 id="patient-dialog-title">
          ¿Cómo podemos ayudarte?
        </h2>
        <p class="recipe-dialog-description">
          Cuéntanos si necesitas consultar una entrega, solicitar un ajuste o recibir orientación sobre tu adaptación y seguimiento.
        </p>
        <label class="recipe-dialog-field">
          <span>Nombre *</span>
          <input
            v-model.trim="patientRequest.name"
            autocomplete="name"
            name="patient-name"
            placeholder="Tu nombre"
            required
          >
        </label>
        <label class="recipe-dialog-field">
          <span>Teléfono o WhatsApp *</span>
          <input
            v-model.trim="patientRequest.contact"
            type="tel"
            autocomplete="tel"
            name="patient-contact"
            placeholder="Tu número de contacto"
            required
          >
        </label>
        <label class="recipe-dialog-field">
          <span>Motivo de consulta *</span>
          <select
            v-model="patientRequest.reason"
            name="patient-reason"
            required
            @change="resetPatientRequestOrderState"
          >
            <option
              disabled
              value=""
            >
              Selecciona un motivo
            </option>
            <option
              v-for="reason in patientRequestReasons"
              :key="reason"
              :value="reason"
            >
              {{ reason }}
            </option>
          </select>
        </label>
        <label
          v-if="patientRequest.reason && !patientRequestIsAboutOrder"
          class="patient-order-toggle"
        >
          <input
            v-model="patientRequest.aboutOrder"
            type="checkbox"
            name="patient-about-order"
            @change="patientRequestUrl = ''"
          >
          Mi consulta está relacionada con un pedido
        </label>
        <label
          v-if="patientRequestHasOrderFolio"
          class="recipe-dialog-field"
        >
          <span>Folio del pedido <small>(opcional)</small></span>
          <input
            v-model.trim="patientRequest.orderFolio"
            autocomplete="off"
            name="patient-order-folio"
            placeholder="Escribe el folio si lo tienes"
            @input="patientRequestUrl = ''"
          >
        </label>
        <p class="recipe-dialog-note patient-verification-note">
          Antes de compartir información de tu expediente o pedido, el personal verificará tu identidad.
        </p>
        <button
          v-if="!patientRequestUrl"
          class="button button-primary recipe-dialog-submit"
          type="submit"
        >
          Preparar consulta
          <UIcon
            name="i-lucide-arrow-right"
            aria-hidden="true"
          />
        </button>
        <div
          v-else
          class="patient-request-ready"
          role="status"
        >
          <p>La consulta está preparada; todavía no se ha enviado.</p>
          <a
            :href="patientRequestUrl"
            class="button button-primary recipe-dialog-submit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar a WhatsApp
            <UIcon
              name="i-lucide-arrow-up-right"
              aria-hidden="true"
            />
          </a>
        </div>
      </form>
    </dialog>

    <a
      class="whatsapp-float"
      href="https://wa.me/529211371704"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <UIcon
        name="i-simple-icons-whatsapp"
        aria-hidden="true"
      />
    </a>
  </main>
</template>

<style scoped>
.home-page {
  --navy: #102b4a;
  --navy-deep: #0c2745;
  --gold: #c99638;
  --green: #20a765;
  --muted: #526176;
  color: var(--navy);
}

.hero {
  display: grid;
  height: clamp(460px, 68vh, 680px);
  position: relative;
  overflow: hidden;
  background: #f1f3f4;
}

.hero-copy {
  position: relative;
  z-index: 2;
  align-self: center;
  max-width: 760px;
  justify-self: start;
  width: 100%;
  padding: 48px clamp(28px, 6vw, 88px);
  background: rgb(241 243 244 / 74%);
}

.eyebrow,
.hero-description {
  text-shadow: 0 1px 8px rgb(241 243 244 / 70%);
}

.eyebrow {
  margin: 0 0 13px;
  color: #43566c;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0;
  color: var(--navy-deep);
  font-size: clamp(3rem, 5.5vw, 4.25rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 1.02;
  text-shadow: 0 1px 12px rgb(255 255 255 / 60%);
}

.hero-description {
  margin: 16px 0 22px;
  color: #354b63;
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero .button {
  min-height: 48px;
  padding: 11px 20px;
  font-size: 0.92rem;
}

.button {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.77rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button-primary {
  background: var(--navy);
  color: white;
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

.hero-visual {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  background: #e6ebed;
}

.hero-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-note,
.hero-caption {
  z-index: 1;
}

.hero-note {
  position: absolute;
  top: 48px;
  right: clamp(16px, 3vw, 40px);
  display: grid;
  gap: 5px;
  padding: 10px 11px;
  background: rgb(255 255 255 / 76%);
  color: #627080;
  font-size: 0.67rem;
  letter-spacing: 0.04em;
  line-height: 1.2;
  text-transform: uppercase;
}

.hero-note-rule {
  width: 36px;
  height: 2px;
  margin-top: 5px;
  background: var(--gold);
}

.hero-caption {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  padding: 9px 12px;
  background: rgb(255 255 255 / 72%);
  color: #536174;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-align: center;
  text-transform: uppercase;
}

.content-section {
  width: min(1140px, calc(100% - 56px));
  margin-inline: auto;
}

.help-section {
  padding-top: 18px;
}

.section-title {
  margin: 0 0 10px;
  color: var(--navy);
  font-size: clamp(1.45rem, 3vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.2;
  text-align: center;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.help-card {
  display: flex;
  min-height: 195px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e7e9ec;
  border-radius: 7px;
  padding: 16px 14px 13px;
  background: #fff;
  color: inherit;
  box-shadow: 0 5px 14px rgb(16 43 74 / 5%);
  text-align: center;
  text-decoration: none;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.help-card:hover {
  transform: translateY(-3px);
  border-color: #cbd8e1;
  box-shadow: 0 11px 23px rgb(16 43 74 / 9%);
}

.help-card:focus-visible,
.frame-card:focus-visible {
  outline: 3px solid rgb(36 76 115 / 28%);
  outline-offset: 3px;
}

.help-icon {
  width: 38px;
  height: 38px;
  margin: 0 0 7px;
  color: var(--navy);
}

.help-card h3 {
  max-width: 175px;
  margin: 0 0 6px;
  font-size: 0.91rem;
  font-weight: 750;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.help-card p {
  max-width: 190px;
  min-height: 35px;
  margin: 0 auto 10px;
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1.45;
}

.card-button {
  width: 100%;
  min-height: 32px;
  margin-top: auto;
  padding: 6px 7px;
  font-size: 0.7rem;
}

.frames-section {
  padding-top: 22px;
}

.frames-section .section-title {
  margin-bottom: 9px;
}

.frames-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.frame-card {
  display: block;
  overflow: hidden;
  border: 1px solid #e7e9ec;
  border-radius: 7px;
  padding: 8px 12px 10px;
  background: #f8f8f7;
  color: inherit;
  text-align: center;
  text-decoration: none;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.frame-card:hover {
  transform: translateY(-3px);
  border-color: #cbd8e1;
  box-shadow: 0 10px 20px rgb(16 43 74 / 8%);
}

.frame-image {
  display: flex;
  height: 106px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.frame-image img {
  width: 100%;
  height: 100%;
  filter: brightness(1.12);
  object-fit: contain;
}

.frame-image .frame-image-1 {
  transform: scale(1.28);
}

.frame-image .frame-image-2 {
  transform: scale(1.35);
}

.frame-image .frame-image-3 {
  transform: scale(1.2);
}

.frame-card h3 {
  margin: 4px 0 7px;
  font-size: 0.87rem;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.frame-button {
  min-height: 29px;
  padding: 5px 12px;
  font-size: 0.68rem;
}

.quote-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding-top: 15px;
}

.business-panel,
.recipe-panel {
  position: relative;
  min-height: 116px;
  overflow: hidden;
  border-radius: 7px;
  padding: 16px 19px;
}

.business-panel {
  display: flex;
  align-items: center;
  background: linear-gradient(115deg, #123253, #0e2948);
  color: white;
}

.panel-copy {
  position: relative;
  z-index: 1;
  border-left: 2px solid var(--gold);
  padding-left: 13px;
}

.business-panel h2,
.recipe-panel h2 {
  margin: 0;
  font-size: 0.94rem;
  font-weight: 750;
  letter-spacing: -0.025em;
}

.business-panel p,
.recipe-panel p {
  margin: 3px 0 10px;
  font-size: 0.75rem;
}

.button-light {
  background: #fff;
  color: var(--navy);
}

.button-light:hover {
  background: #edf2f6;
}

.business-icon {
  position: absolute;
  right: 18px;
  bottom: 10px;
  width: 84px;
  height: 84px;
  color: rgb(255 255 255 / 10%);
}

.recipe-panel {
  background: #f1f2f3;
}

.recipe-panel > .recipe-hint {
  margin-top: 9px !important;
  line-height: 1.45;
}

.recipe-heading {
  border-left: 2px solid var(--gold);
  padding-left: 13px;
}

.recipe-heading p {
  margin-bottom: 8px;
  color: #42556c;
}

.recipe-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: 9px;
}

.recipe-upload {
  position: relative;
  display: flex;
  height: 38px;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;
  border: 1px dashed #b9c0c8;
  border-radius: 6px;
  padding: 0 8px;
  background: rgb(255 255 255 / 50%);
  color: #43566b;
  cursor: pointer;
  font-size: 0.68rem;
  transition: border-color 150ms ease, background-color 150ms ease;
}

.recipe-upload:hover,
.recipe-upload.has-file {
  border-color: #7892a8;
  background: #fff;
}

.recipe-upload > :deep(.iconify) {
  flex: 0 0 auto;
  width: 17px;
  height: 17px;
  color: #315e85;
}

.recipe-upload-helper {
  grid-column: 1 / -1;
  margin-top: -3px;
  color: #68778a;
  font-size: 0.61rem;
  line-height: 1.4;
}

.recipe-file-name {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recipe-upload input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

.recipe-upload:focus-within {
  outline: 2px solid #52749a;
  outline-offset: 2px;
}

.recipe-submit {
  width: 100%;
  min-height: 38px;
  justify-content: center;
  padding-inline: 8px;
  font-size: 0.64rem;
  text-align: center;
}

.recipe-dialog {
  position: fixed;
  inset: 0;
  width: min(440px, calc(100% - 32px));
  max-width: none;
  max-height: min(90vh, 700px);
  margin: auto;
  overflow: auto;
  border: 1px solid #d9e2e9;
  border-radius: 16px;
  padding: 0;
  background: #fff;
  color: var(--navy);
  box-shadow: 0 25px 75px rgb(12 39 69 / 25%);
}

.recipe-dialog::backdrop {
  background: rgb(10 27 45 / 58%);
  backdrop-filter: blur(3px);
}

.recipe-dialog-form {
  position: relative;
  display: grid;
  gap: 13px;
  padding: 27px;
}

.recipe-dialog-close {
  position: absolute;
  top: 15px;
  right: 15px;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid #dce4ea;
  border-radius: 9px;
  background: #f7f9fa;
  color: #526b81;
  cursor: pointer;
}

.recipe-dialog-close :deep(.iconify) {
  width: 17px;
  height: 17px;
}

.recipe-dialog-eyebrow {
  margin: 0;
  color: #52718c;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.recipe-dialog-form h2 {
  max-width: 340px;
  margin: 0;
  color: var(--navy);
  font-size: 1.35rem;
  line-height: 1.2;
}

.recipe-dialog-description,
.recipe-dialog-note {
  margin: 0;
  color: #5d7082;
  font-size: 0.74rem;
  line-height: 1.55;
}

.recipe-dialog-description strong {
  color: #294b69;
  overflow-wrap: anywhere;
}

.recipe-dialog-field {
  display: grid;
  gap: 6px;
  color: #405970;
  font-size: 0.7rem;
  font-weight: 750;
}

.recipe-dialog-field input,
.recipe-dialog-field select {
  width: 100%;
  min-width: 0;
  min-height: 43px;
  border: 1px solid #cbd8e2;
  border-radius: 8px;
  padding: 9px 11px;
  background: #f8fafb;
  color: #183753;
  font: inherit;
  font-size: 0.75rem;
}

.recipe-dialog-field input:focus,
.recipe-dialog-field select:focus {
  border-color: #52749a;
  outline: 3px solid rgb(82 116 154 / 16%);
}

.recipe-dialog-note {
  border-left: 2px solid var(--gold);
  padding-left: 10px;
}

.patient-order-toggle {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  color: #405970;
  font-size: 0.72rem;
  line-height: 1.45;
  cursor: pointer;
}

.patient-order-toggle input {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  margin: 1px 0 0;
  accent-color: #244c73;
}

.recipe-dialog-submit {
  display: inline-flex;
  width: 100%;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.72rem;
}

.recipe-dialog-submit :deep(.iconify) {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
}

.recipe-hint {
  margin: 6px 0 0 !important;
  color: #68778a;
  font-size: 0.62rem !important;
}

.recipe-error {
  color: #a33f36;
}

.patient-link {
  margin: 10px 12px 18px;
  color: #41556a;
  font-size: 0.68rem;
  text-align: center;
}

.patient-link a {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.patient-link-button {
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

.patient-link-button:hover {
  color: var(--navy);
}

.patient-link-button:focus-visible {
  border-radius: 3px;
  outline: 2px solid #52749a;
  outline-offset: 3px;
}

.patient-verification-note {
  border-left-color: #c99638;
}

.patient-request-ready {
  display: grid;
  gap: 10px;
}

.patient-request-ready p {
  margin: 0;
  color: #526b5e;
  font-size: 0.72rem;
  line-height: 1.5;
}

.patient-request-ready a {
  color: #fff;
  text-decoration: none;
}

.whatsapp-float {
  position: fixed;
  z-index: 5;
  right: 16px;
  bottom: 16px;
  display: grid;
  width: 43px;
  height: 43px;
  place-items: center;
  border: 3px solid #fff;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 3px 12px rgb(0 0 0 / 22%);
  color: #fff;
  text-decoration: none;
  transition: transform 160ms ease;
}

.whatsapp-float:hover {
  transform: scale(1.06);
}

.whatsapp-float :deep(svg) {
  width: 22px;
  height: 22px;
}

@media (min-width: 761px) {
  .hero-copy {
    align-self: stretch;
    max-width: 840px;
    height: 100%;
    padding: 56px clamp(40px, 6vw, 104px);
    transform: none;
    background: rgb(241 243 244 / 42%);
    backdrop-filter: blur(8px);
  }

  .hero {
    height: clamp(500px, 76vh, 760px);
  }

  .eyebrow {
    font-size: 0.92rem;
  }

  .hero h1 {
    font-size: clamp(3.75rem, 6vw, 5rem);
  }

  .hero-description {
    font-size: clamp(1.25rem, 1.8vw, 1.5rem);
  }

  .hero .button {
    min-height: 56px;
    padding: 14px 24px;
    font-size: 1.05rem;
  }
}

@media (max-width: 760px) {
  .hero {
    height: clamp(440px, 64svh, 600px);
  }

  .hero-copy {
    max-width: 620px;
    padding: 36px 28px;
  }

  .hero h1 {
    font-size: clamp(2.8rem, 7vw, 3.6rem);
  }

  .content-section {
    width: min(100% - 36px, 620px);
  }

  .help-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .help-card {
    min-height: 184px;
  }

  .frames-grid {
    gap: 8px;
  }

  .frame-card {
    padding-inline: 7px;
  }

  .frame-image {
    height: 90px;
  }

  .frame-button {
    width: 100%;
    padding-inline: 5px;
    font-size: 0.62rem;
  }

  .quote-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

@media (max-width: 520px) {
  .hero {
    height: clamp(440px, 70svh, 600px);
  }

  .hero-copy {
    max-width: 100%;
    padding: 34px 22px;
    background: rgb(241 243 244 / 60%);
    backdrop-filter: blur(5px);
  }

  .hero h1 {
    font-size: clamp(2.7rem, 11vw, 3.5rem);
  }

  .hero-note {
    top: 48px;
    right: 12px;
    font-size: 0.58rem;
  }

  .hero-caption {
    font-size: 0.55rem;
  }

  .content-section {
    width: calc(100% - 32px);
  }

  .help-section {
    padding-top: 19px;
  }

  .section-title {
    margin-bottom: 12px;
    font-size: 1.47rem;
  }

  .help-card {
    min-height: 181px;
    padding-inline: 10px;
  }

  .help-card h3 {
    font-size: 0.86rem;
  }

  .frames-section {
    padding-top: 20px;
  }

  .frames-grid {
    grid-template-columns: 1fr;
    gap: 9px;
  }

  .frame-card {
    display: grid;
    grid-template-columns: 40% 1fr;
    grid-template-rows: auto auto;
    align-content: center;
    align-items: center;
    justify-items: center;
    gap: 0 10px;
    min-height: 105px;
    padding: 8px 10px;
    text-align: center;
  }

  .frame-image {
    grid-row: 1 / 3;
    height: 86px;
  }

  .frame-card h3 {
    margin: 0 0 6px;
  }

  .frame-button {
    width: fit-content;
    font-size: 0.66rem;
  }

  .quote-grid {
    padding-top: 12px;
  }

  .business-panel,
  .recipe-panel {
    padding: 15px;
  }

  .recipe-upload {
    min-height: 42px;
  }

  .recipe-submit {
    min-height: 42px;
    padding-inline: 6px;
    font-size: 0.61rem;
  }

  .recipe-dialog-form {
    padding: 24px 19px;
  }

  .patient-link {
    font-size: 0.63rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .button,
  .whatsapp-float {
    transition: none;
  }
}
</style>
