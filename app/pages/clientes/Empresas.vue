<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import campaignImage from '~/assets/RecOpt.webp'
import graduatedFramesImage from '~/assets/FondoPrincipal.webp'
import safetyGlasses from '~/assets/Seguridad.webp'
import workplaceImage from '~/assets/PropEmp.webp'

useHead({
  title: 'Empresas | Clínica Óptica',
  meta: [
    {
      name: 'description',
      content: 'Conoce las campañas de salud visual, lentes de seguridad graduados y convenios para empresas de Clínica Óptica.'
    }
  ]
})

const route = useRoute()
const router = useRouter()
const whatsappNumber = '529211371704'
const campaignDialog = ref<HTMLDialogElement | null>(null)
const serviceSelect = ref<HTMLElement | null>(null)
const serviceMenuOpen = ref(false)
const activeServiceIndex = ref(0)
const serviceOptions = [
  'Campañas de salud visual',
  'Lentes graduados',
  'Lentes de seguridad graduados',
  'Convenio empresarial',
  'Otra necesidad'
]
const campaignRequest = reactive({
  company: '',
  contactName: '',
  area: '',
  city: '',
  phone: '',
  email: '',
  participants: '',
  service: 'Campañas de salud visual',
  date: '',
  comments: ''
})
const preparedRequestUrl = ref('')

function openCampaignDialog() {
  preparedRequestUrl.value = ''
  serviceMenuOpen.value = false
  campaignDialog.value?.showModal()
}

function closeCampaignDialog() {
  serviceMenuOpen.value = false
  campaignDialog.value?.close()
}

function openServiceMenu() {
  activeServiceIndex.value = serviceOptions.indexOf(campaignRequest.service)
  serviceMenuOpen.value = true
  nextTick(() => {
    const dialog = campaignDialog.value
    if (window.innerWidth <= 600 && dialog && dialog.scrollHeight > dialog.clientHeight) {
      serviceSelect.value?.scrollIntoView({ block: 'center' })
    }
  })
}

function chooseService(service: string) {
  campaignRequest.service = service
  preparedRequestUrl.value = ''
  serviceMenuOpen.value = false
}

function closeServiceMenuOnOutsideClick(event: PointerEvent) {
  if (!serviceSelect.value?.contains(event.target as Node)) {
    serviceMenuOpen.value = false
  }
}

function handleServiceKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!serviceMenuOpen.value) {
      openServiceMenu()
      return
    }

    const direction = event.key === 'ArrowDown' ? 1 : -1
    activeServiceIndex.value = (
      activeServiceIndex.value + direction + serviceOptions.length
    ) % serviceOptions.length
    return
  }

  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    openServiceMenu()
    activeServiceIndex.value = event.key === 'Home' ? 0 : serviceOptions.length - 1
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (serviceMenuOpen.value) {
      chooseService(serviceOptions[activeServiceIndex.value]!)
    } else {
      openServiceMenu()
    }
    return
  }

  if (event.key === 'Escape' && serviceMenuOpen.value) {
    event.preventDefault()
    event.stopPropagation()
    serviceMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', closeServiceMenuOnOutsideClick)

  if (route.query.solicitar !== 'campana') return

  openCampaignDialog()
  const query = { ...route.query }
  delete query.solicitar
  router.replace({ path: route.path, query, hash: route.hash })
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', closeServiceMenuOnOutsideClick)
})

function prepareCampaignRequest() {
  const lines = [
    'Tipo de solicitud: Empresa',
    'Motivo: Solicitud de campaña / propuesta',
    `Empresa: ${campaignRequest.company.trim()}`,
    `Persona de contacto: ${campaignRequest.contactName.trim()}`,
    `Área: ${campaignRequest.area.trim()}`,
    `Ciudad o sede: ${campaignRequest.city.trim()}`,
    campaignRequest.phone.trim() ? `Teléfono: ${campaignRequest.phone.trim()}` : '',
    campaignRequest.email.trim() ? `Correo: ${campaignRequest.email.trim()}` : '',
    `Número aproximado de interesados: ${campaignRequest.participants}`,
    `Servicio requerido: ${campaignRequest.service}`,
    campaignRequest.date ? `Fecha tentativa: ${campaignRequest.date}` : '',
    campaignRequest.comments.trim() ? `Comentarios: ${campaignRequest.comments.trim()}` : ''
  ].filter(Boolean)

  preparedRequestUrl.value = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
}

const solutions = [
  {
    number: '01',
    image: campaignImage,
    imageAlt: 'Lentes graduados sobre una cartilla de revisión visual',
    title: 'Campañas de salud visual',
    description: 'Acerca orientación y atención visual a tu equipo con una jornada organizada de acuerdo con las necesidades de tu empresa.',
    tag: 'Bienestar para tu equipo'
  },
  {
    number: '02',
    image: graduatedFramesImage,
    imageAlt: 'Armazón moderno para lentes graduados',
    title: 'Lentes graduados',
    description: 'Opciones de lentes graduados para colaboradores, con asesoría para elegir la alternativa que mejor se adapte a cada persona.',
    tag: 'Atención personalizada'
  },
  {
    number: '03',
    image: safetyGlasses,
    imageAlt: 'Lentes de seguridad para protección visual en el trabajo',
    title: 'Lentes de seguridad graduados',
    description: 'Soluciones visuales para colaboradores que requieren protección ocular y graduación, según las necesidades de su puesto.',
    tag: 'Protección y visión'
  }
]

const processSteps = [
  {
    number: '01',
    icon: 'i-lucide-messages-square',
    title: 'Comparte la necesidad',
    description: 'Indica servicio, ciudad, número aproximado de interesados y fecha tentativa.'
  },
  {
    number: '02',
    icon: 'i-lucide-map-pin',
    title: 'Revisamos la logística',
    description: 'Confirmamos participantes, ubicación, espacio, horarios y necesidades de la empresa.'
  },
  {
    number: '03',
    icon: 'i-lucide-clipboard-list',
    title: 'Presentamos la propuesta',
    description: 'Compartimos servicios, condiciones, logística y fechas posibles; si una fecha no está disponible, revisamos alternativas.'
  },
  {
    number: '04',
    icon: 'i-lucide-calendar-check',
    title: 'Confirmamos y damos seguimiento',
    description: 'Tras la aceptación coordinamos preparativos y damos seguimiento a pedidos, entregas y futuras jornadas.'
  }
]

const benefits = [
  {
    icon: 'i-lucide-badge-check',
    title: 'Condiciones claras',
    description: 'Los beneficios, precios y alcances se confirman en la propuesta de cada empresa.'
  },
  {
    icon: 'i-lucide-user-round-check',
    title: 'Atención para colaboradores',
    description: 'Opciones de atención pensadas para acercar el cuidado visual a las personas de tu equipo.'
  },
  {
    icon: 'i-lucide-settings-2',
    title: 'Una propuesta a la medida',
    description: 'Revisamos las necesidades de tu organización antes de definir el alcance del servicio.'
  }
]
</script>

<template>
  <main class="business-page">
    <section
      class="business-hero"
      aria-labelledby="business-title"
    >
      <div class="hero-copy">
        <p class="business-overline">
          <span class="overline-mark" />
          Salud visual para organizaciones
        </p>
        <h1 id="business-title">
          Un equipo que ve bien,
          <span>trabaja mejor.</span>
        </h1>
        <p class="hero-description">
          Creamos propuestas de salud visual para empresas: campañas, lentes graduados y opciones de seguridad visual para tus colaboradores.
        </p>
        <div class="hero-actions">
          <button
            class="business-button primary-button"
            type="button"
            @click="openCampaignDialog()"
          >
            <UIcon
              name="i-lucide-send"
              aria-hidden="true"
            />
            Solicitar campaña
          </button>
          <a
            class="text-action"
            href="#soluciones"
          >
            Explorar soluciones
            <UIcon
              name="i-lucide-arrow-down"
              aria-hidden="true"
            />
          </a>
        </div>
        <div class="hero-assurance">
          <span class="assurance-icon">
            <UIcon
              name="i-lucide-heart-handshake"
              aria-hidden="true"
            />
          </span>
          <span>
            <strong>Atención profesional y cercana</strong>
            <span>Propuestas conversadas directamente con tu empresa.</span>
          </span>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-photo-frame">
          <img
            :src="workplaceImage"
            alt="Edificio corporativo que representa la atención a organizaciones"
            width="1000"
            height="667"
            fetchpriority="high"
          >
          <div class="photo-shade" />
          <span class="photo-label">
            <UIcon
              name="i-lucide-building-2"
              aria-hidden="true"
            />
            Salud visual para organizaciones
          </span>
        </div>
        <div class="hero-stat-card">
          <span class="stat-icon">
            <UIcon
              name="i-lucide-building-2"
              aria-hidden="true"
            />
          </span>
          <span>
            <strong>Soluciones para empresas</strong>
            <span>Campañas · convenios · seguridad</span>
          </span>
        </div>
        <div class="hero-photo-caption">
          <span class="caption-line" />
          <span>Bienestar visual que acompaña a tu equipo.</span>
        </div>
      </div>
    </section>

    <section
      id="soluciones"
      class="business-section solutions-section"
      aria-labelledby="solutions-title"
    >
      <div class="section-heading">
        <div>
          <span class="heading-icon">
            <UIcon
              name="i-lucide-crosshair"
              aria-hidden="true"
            />
          </span>
          <div>
            <p class="section-eyebrow">
              Soluciones visuales
            </p>
            <h2 id="solutions-title">
              Una propuesta para cada necesidad.
            </h2>
          </div>
        </div>
        <div class="section-intro">
          <span class="intro-rule" />
          <p>Conversemos sobre las prioridades de tu organización y encontremos por dónde empezar.</p>
        </div>
      </div>

      <div class="solution-grid">
        <article
          v-for="solution in solutions"
          :key="solution.number"
          class="solution-card"
        >
          <div class="solution-image">
            <img
              :src="solution.image"
              :alt="solution.imageAlt"
              loading="lazy"
              decoding="async"
            >
            <span class="solution-number">{{ solution.number }}</span>
            <span class="image-wash" />
            <span class="solution-tag">{{ solution.tag }}</span>
          </div>
          <div class="solution-copy">
            <h3>{{ solution.title }}</h3>
            <p>{{ solution.description }}</p>
          </div>
          <a
            class="solution-link"
            href="#proceso"
          >
            Conocer el proceso
          </a>
        </article>
      </div>
    </section>

    <section
      id="proceso"
      class="business-process"
      aria-labelledby="process-title"
    >
      <div class="process-heading">
        <div class="process-heading-main">
          <p class="section-eyebrow">
            Así trabajamos
          </p>
          <h2 id="process-title">
            De la primera conversación a un plan claro.
          </h2>
        </div>
        <div class="process-heading-note">
          <span class="process-note-icon">
            <UIcon
              name="i-lucide-route"
              aria-hidden="true"
            />
          </span>
          <p>
            Te acompañamos para definir una propuesta adecuada a tu organización.
          </p>
        </div>
      </div>
      <div class="process-grid">
        <article
          v-for="(step, index) in processSteps"
          :key="step.number"
          class="process-step"
        >
          <div class="process-step-top">
            <span class="process-icon">
              <UIcon
                :name="step.icon"
                aria-hidden="true"
              />
            </span>
            <span class="process-number">PASO {{ step.number }}</span>
          </div>
          <span
            v-if="index < processSteps.length - 1"
            class="process-connector"
            aria-hidden="true"
          />
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </article>
      </div>
      <div class="journey-panel">
        <span class="journey-icon">
          <UIcon
            name="i-lucide-eye"
            aria-hidden="true"
          />
        </span>
        <div>
          <p class="section-eyebrow">
            Durante la jornada
          </p>
          <h3>Atención conforme al plan acordado.</h3>
          <p>El equipo realiza los servicios incluidos en la propuesta en la sede y los horarios confirmados con tu empresa.</p>
        </div>
      </div>
      <div class="campaign-detail-grid">
        <article class="campaign-detail-card">
          <span class="campaign-detail-icon">
            <UIcon
              name="i-lucide-map-pin"
              aria-hidden="true"
            />
          </span>
          <div>
            <p class="section-eyebrow">
              Cobertura
            </p>
            <h3>Se confirma según cada campaña.</h3>
            <p>Revisamos la ciudad, sede y logística de tu empresa para validar disponibilidad y proponer fechas posibles.</p>
          </div>
        </article>
        <article class="campaign-detail-card">
          <span class="campaign-detail-icon">
            <UIcon
              name="i-lucide-clipboard-check"
              aria-hidden="true"
            />
          </span>
          <div>
            <p class="section-eyebrow">
              Seguimiento
            </p>
            <h3>La jornada continúa después.</h3>
            <p>Coordinamos el seguimiento de pedidos, entregas y futuras jornadas conforme a lo acordado en la propuesta.</p>
          </div>
        </article>
        <article class="campaign-detail-card presentation-card">
          <span class="campaign-detail-icon">
            <UIcon
              name="i-lucide-file-down"
              aria-hidden="true"
            />
          </span>
          <div>
            <p class="section-eyebrow">
              Presentación institucional
            </p>
            <h3>Conoce nuestras soluciones para empresas.</h3>
            <a
              class="presentation-link"
              href="/presentacion-empresas.pdf"
              download="Clinica-Optica-Presentacion-Empresas.pdf"
            >
              Descargar presentación (PDF)
              <UIcon
                name="i-lucide-download"
                aria-hidden="true"
              />
            </a>
          </div>
        </article>
      </div>
    </section>

    <section
      class="business-section benefits-section"
      aria-labelledby="benefits-title"
    >
      <div class="benefits-panel">
        <div class="benefits-heading">
          <p class="section-eyebrow">
            Convenios empresariales
          </p>
          <h2 id="benefits-title">
            Beneficios claros, acordados contigo.
          </h2>
          <p>
            Si tu empresa ya tiene un convenio vigente, podemos orientarte sobre sus condiciones. Para nuevas colaboraciones, preparamos una propuesta y confirmamos cada beneficio antes de iniciar.
          </p>
          <NuxtLink
            class="business-button light-button"
            to="/contacto"
          >
            Consultar mi convenio
          </NuxtLink>
        </div>
        <div class="benefit-list">
          <article
            v-for="benefit in benefits"
            :key="benefit.title"
            class="benefit-item"
          >
            <span class="benefit-icon">
              <UIcon
                :name="benefit.icon"
                aria-hidden="true"
              />
            </span>
            <span>
              <strong>{{ benefit.title }}</strong>
              <span>{{ benefit.description }}</span>
            </span>
          </article>
          <p class="benefits-note">
            Los beneficios dependen de las condiciones acordadas y vigentes para cada empresa.
          </p>
        </div>
      </div>
    </section>

    <dialog
      ref="campaignDialog"
      class="campaign-dialog"
      aria-labelledby="campaign-form-title"
      @click.self="closeCampaignDialog"
      @cancel.prevent="closeCampaignDialog"
      @keydown.esc.prevent="closeCampaignDialog"
    >
      <button
        class="campaign-dialog-close"
        type="button"
        aria-label="Cerrar formulario de campaña"
        @click="closeCampaignDialog"
      >
        <UIcon
          name="i-lucide-x"
          aria-hidden="true"
        />
      </button>
      <section
        id="solicitar-campana"
        class="business-request"
        aria-labelledby="campaign-form-title"
      >
        <div class="request-heading">
          <p class="section-eyebrow">
            Solicitar campaña o propuesta
          </p>
          <h2 id="campaign-form-title">
            Cuéntanos sobre tu empresa.
          </h2>
          <p>Comparte los datos básicos y prepara tu solicitud en WhatsApp. La fecha y los comentarios son opcionales.</p>
        </div>

        <form
          class="business-form"
          @input="preparedRequestUrl = ''"
          @submit.prevent="prepareCampaignRequest"
        >
          <div class="business-form-grid">
            <div class="business-field">
              <label for="business-company">Empresa <span aria-hidden="true">*</span></label>
              <input
                id="business-company"
                v-model.trim="campaignRequest.company"
                name="company"
                autocomplete="organization"
                required
                placeholder="Nombre de la empresa"
              >
            </div>
            <div class="business-field">
              <label for="business-contact-name">Persona de contacto <span aria-hidden="true">*</span></label>
              <input
                id="business-contact-name"
                v-model.trim="campaignRequest.contactName"
                name="contactName"
                autocomplete="name"
                required
                placeholder="Nombre de quien coordina"
              >
            </div>
            <div class="business-field">
              <label for="business-area">Área o departamento <span aria-hidden="true">*</span></label>
              <input
                id="business-area"
                v-model.trim="campaignRequest.area"
                name="area"
                required
                placeholder="Recursos Humanos, Compras..."
              >
            </div>
            <div class="business-field">
              <label for="business-city">Ciudad o sede <span aria-hidden="true">*</span></label>
              <input
                id="business-city"
                v-model.trim="campaignRequest.city"
                name="city"
                autocomplete="address-level2"
                required
                placeholder="Ciudad donde se realizaría"
              >
            </div>
            <div class="business-field">
              <label for="business-phone">Teléfono <span>(requerido si no agregas correo)</span></label>
              <input
                id="business-phone"
                v-model.trim="campaignRequest.phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                :required="!campaignRequest.email"
                placeholder="Número de contacto"
              >
            </div>
            <div class="business-field">
              <label for="business-email">Correo <span>(requerido si no agregas teléfono)</span></label>
              <input
                id="business-email"
                v-model.trim="campaignRequest.email"
                name="email"
                type="email"
                autocomplete="email"
                :required="!campaignRequest.phone"
                placeholder="nombre@empresa.com"
              >
            </div>
            <div class="business-field">
              <label for="business-participants">Número aproximado de interesados <span aria-hidden="true">*</span></label>
              <input
                id="business-participants"
                v-model="campaignRequest.participants"
                name="participants"
                type="number"
                min="1"
                step="1"
                required
                placeholder="Ej. 25"
              >
            </div>
            <div class="business-field">
              <label for="business-service">Servicio requerido <span aria-hidden="true">*</span></label>
              <div
                ref="serviceSelect"
                class="service-select"
                :class="{ 'is-open': serviceMenuOpen }"
              >
                <button
                  id="business-service"
                  class="service-select-trigger"
                  type="button"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-controls="business-service-options"
                  aria-required="true"
                  :aria-expanded="serviceMenuOpen"
                  :aria-activedescendant="serviceMenuOpen ? `business-service-option-${activeServiceIndex}` : undefined"
                  @click="serviceMenuOpen ? (serviceMenuOpen = false) : openServiceMenu()"
                  @keydown="handleServiceKeydown"
                >
                  <UIcon
                    class="service-select-icon"
                    name="i-lucide-briefcase-business"
                    aria-hidden="true"
                  />
                  <span>{{ campaignRequest.service }}</span>
                  <UIcon
                    class="service-select-chevron"
                    name="i-lucide-chevron-down"
                    aria-hidden="true"
                  />
                </button>
                <Transition name="service-menu">
                  <ul
                    v-if="serviceMenuOpen"
                    id="business-service-options"
                    class="service-select-options"
                    role="listbox"
                    aria-label="Servicio requerido"
                  >
                    <li
                      v-for="(service, index) in serviceOptions"
                      :id="`business-service-option-${index}`"
                      :key="service"
                      class="service-select-option"
                      :class="{
                        'is-active': activeServiceIndex === index,
                        'is-selected': campaignRequest.service === service
                      }"
                      role="option"
                      :aria-selected="campaignRequest.service === service"
                      @pointerenter="activeServiceIndex = index"
                      @click="chooseService(service)"
                    >
                      <span>{{ service }}</span>
                      <UIcon
                        v-if="campaignRequest.service === service"
                        name="i-lucide-check"
                        aria-hidden="true"
                      />
                    </li>
                  </ul>
                </Transition>
                <input
                  type="hidden"
                  name="service"
                  :value="campaignRequest.service"
                >
              </div>
            </div>
            <div class="business-field">
              <label for="business-date">Fecha tentativa <span>(opcional)</span></label>
              <input
                id="business-date"
                v-model="campaignRequest.date"
                name="date"
                type="date"
              >
            </div>
            <div class="business-field business-field-wide">
              <label for="business-comments">Comentarios <span>(opcional)</span></label>
              <textarea
                id="business-comments"
                v-model.trim="campaignRequest.comments"
                name="comments"
                rows="4"
                maxlength="1000"
                placeholder="Cuéntanos sobre horarios, espacio u otra necesidad."
              />
            </div>
          </div>
          <div class="business-form-actions">
            <button
              class="business-button primary-button"
              type="submit"
            >
              Preparar solicitud en WhatsApp
              <UIcon
                name="i-lucide-message-circle"
                aria-hidden="true"
              />
            </button>
            <p>Los datos no se guardan en este sitio ni se envían por correo. Revísalos en WhatsApp y pulsa <strong>Enviar</strong> para compartirlos; eso no confirma una campaña.</p>
          </div>
          <div
            v-if="preparedRequestUrl"
            class="prepared-request"
            role="status"
            aria-live="polite"
          >
            <span class="prepared-request-icon">
              <UIcon
                name="i-lucide-message-circle-check"
                aria-hidden="true"
              />
            </span>
            <div>
              <strong>Tu mensaje está preparado; todavía no se ha enviado.</strong>
              <p>Abre WhatsApp y pulsa Enviar para que el equipo reciba los datos. Esto no confirma la disponibilidad ni la realización de una campaña.</p>
              <a
                :href="preparedRequestUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir WhatsApp
                <UIcon
                  name="i-lucide-arrow-up-right"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </form>
      </section>
    </dialog>

    <section
      class="proposal-cta"
      aria-labelledby="proposal-title"
    >
      <div class="cta-icon">
        <UIcon
          name="i-lucide-messages-square"
          aria-hidden="true"
        />
      </div>
      <div class="cta-copy">
        <p class="section-eyebrow">
          Empecemos la conversación
        </p>
        <h2 id="proposal-title">
          Cuéntanos qué necesita tu equipo.
        </h2>
        <p>Comparte los datos de tu empresa y solicita una propuesta.</p>
      </div>
      <a
        class="business-button cta-button"
        :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, me interesa solicitar una propuesta para mi empresa. ¿Podrían orientarme sobre los servicios y la información que necesitan?')}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        Solicitar propuesta por WhatsApp
      </a>
    </section>
  </main>
</template>

<style scoped>
.business-page {
  --business-navy: #102b4a;
  --business-blue: #244c73;
  --business-gray: #526176;
  --business-pale: #f3f5f6;
  overflow: hidden;
  padding: 22px 0 72px;
  color: var(--business-navy);
}

.business-hero,
.business-section,
.business-process,
.business-request,
.proposal-cta {
  width: min(1080px, calc(100% - 56px));
  margin-inline: auto;
}

.business-hero {
  position: relative;
  display: grid;
  min-height: 438px;
  grid-template-columns: minmax(0, 1.02fr) minmax(360px, 0.98fr);
  align-items: center;
  gap: clamp(28px, 5vw, 64px);
  overflow: hidden;
  border: 1px solid #dfe7ed;
  border-radius: 18px;
  padding: clamp(32px, 5.5vw, 62px);
  background:
    radial-gradient(ellipse at 4% 100%, rgb(36 76 115 / 9%), transparent 34%),
    radial-gradient(circle at 85% 15%, rgb(36 76 115 / 8%), transparent 33%),
    linear-gradient(130deg, #fff 0%, #f7f9fa 53%, #eaf0f4 100%);
  box-shadow: 0 22px 54px rgb(16 43 74 / 10%);
}

.business-hero::before {
  position: absolute;
  top: -185px;
  left: 37%;
  width: 380px;
  height: 380px;
  border: 1px solid rgb(36 76 115 / 6%);
  border-radius: 50%;
  box-shadow: 0 0 0 20px rgb(36 76 115 / 2%), 0 0 0 42px rgb(36 76 115 / 2%);
  content: '';
  pointer-events: none;
}

.hero-copy,
.hero-visual {
  position: relative;
  z-index: 1;
}

.business-overline,
.section-eyebrow {
  color: var(--business-blue);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.business-overline {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 20px;
  border: 1px solid #d8e3eb;
  border-radius: 99px;
  padding: 8px 13px;
  background: rgb(255 255 255 / 82%);
  box-shadow: 0 4px 12px rgb(16 43 74 / 4%);
}

.overline-mark {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--business-blue);
  box-shadow: 0 0 0 5px rgb(36 76 115 / 11%);
}

.hero-copy h1 {
  max-width: 540px;
  margin: 0;
  color: var(--business-navy);
  font-size: clamp(2.6rem, 5.3vw, 4.55rem);
  font-weight: 850;
  letter-spacing: -0.065em;
  line-height: 0.99;
}

.hero-copy h1 span {
  display: block;
  color: var(--business-blue);
  text-shadow: 0 8px 24px rgb(36 76 115 / 10%);
}

.hero-description {
  max-width: 475px;
  margin: 20px 0 0;
  color: var(--business-gray);
  font-size: 0.94rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 25px;
}

.business-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px solid transparent;
  border-radius: 7px;
  padding: 11px 16px;
  font-size: 0.79rem;
  font-weight: 750;
  text-align: center;
  text-decoration: none;
  transition: transform 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
  cursor: pointer;
  font-family: inherit;
}

.business-button:hover {
  transform: translateY(-2px);
}

.business-button :deep(svg),
.text-action :deep(svg),
.solution-link :deep(svg) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.primary-button {
  background: var(--business-navy);
  color: #fff;
  box-shadow: 0 7px 16px rgb(16 43 74 / 18%);
}

.primary-button:hover {
  background: #1a4168;
  box-shadow: 0 10px 20px rgb(16 43 74 / 22%);
}

.text-action {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--business-blue);
  font-size: 0.77rem;
  font-weight: 750;
  text-decoration: none;
}

.text-action:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.hero-assurance {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-top: 29px;
  border-top: 1px solid #dce5ec;
  padding-top: 17px;
}

.assurance-icon,
.solution-icon,
.process-icon,
.benefit-icon,
.cta-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d8e2ea;
  background: #edf2f6;
  color: var(--business-blue);
}

.assurance-icon {
  width: 38px;
  height: 38px;
  border-radius: 11px;
}

.assurance-icon :deep(svg) {
  width: 19px;
  height: 19px;
}

.hero-assurance > span:last-child,
.hero-stat-card > span:last-child {
  display: grid;
  gap: 3px;
}

.hero-assurance strong {
  color: #314a63;
  font-size: 0.73rem;
}

.hero-assurance > span:last-child > span {
  color: #718093;
  font-size: 0.67rem;
}

.hero-visual {
  min-height: 350px;
  padding: 12px 17px 35px 26px;
}

.hero-photo-frame {
  position: absolute;
  inset: 7px 13px 31px 29px;
  overflow: hidden;
  border: 7px solid #fff;
  border-radius: 19px;
  background: #dce5eb;
  box-shadow: 0 22px 42px rgb(16 43 74 / 19%);
  transform: rotate(1.5deg);
}

.hero-photo-frame::before {
  position: absolute;
  z-index: 1;
  inset: 10px;
  border: 1px solid rgb(255 255 255 / 46%);
  border-radius: 11px;
  content: '';
  pointer-events: none;
}

.hero-photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.hero-photo-frame:hover img {
  transform: scale(1.045);
}

.photo-shade {
  position: absolute;
  inset: 35% 0 0;
  background: linear-gradient(180deg, transparent, rgb(8 25 44 / 67%));
}

.photo-label {
  position: absolute;
  z-index: 2;
  right: 13px;
  bottom: 13px;
  left: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 750;
}

.photo-label :deep(svg) {
  width: 17px;
  height: 17px;
}

.hero-stat-card {
  position: absolute;
  z-index: 1;
  right: -5px;
  bottom: 7px;
  display: flex;
  align-items: center;
  gap: 9px;
  border: 1px solid #dce5ec;
  border-radius: 11px;
  padding: 10px 13px;
  background: #fff;
  box-shadow: 0 9px 23px rgb(16 43 74 / 13%);
}

.stat-icon {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 9px;
  background: #edf2f6;
  color: var(--business-blue);
}

.stat-icon :deep(svg) {
  width: 17px;
  height: 17px;
}

.hero-stat-card strong {
  color: var(--business-navy);
  font-size: 0.68rem;
}

.hero-stat-card > span:last-child > span {
  color: #718093;
  font-size: 0.59rem;
}

.hero-photo-caption {
  position: absolute;
  top: 44px;
  left: 0;
  display: flex;
  max-width: 118px;
  align-items: flex-start;
  gap: 8px;
  color: #62758a;
  font-size: 0.62rem;
  font-weight: 700;
  line-height: 1.45;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.caption-line {
  width: 1px;
  height: 27px;
  flex: 0 0 auto;
  background: #9db0c0;
}

.business-section {
  margin-top: 82px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 27px;
}

.section-heading > div:first-child {
  display: flex;
  align-items: center;
  gap: 14px;
}

.heading-icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d5e0e8;
  border-radius: 14px;
  background: linear-gradient(145deg, #fff, #eaf0f4);
  color: var(--business-blue);
  box-shadow: 0 6px 16px rgb(16 43 74 / 7%);
}

.heading-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.section-eyebrow {
  margin: 0 0 9px;
}

.section-heading h2,
.process-heading h2,
.benefits-heading h2,
.proposal-cta h2 {
  margin: 0;
  color: var(--business-navy);
  font-size: clamp(1.6rem, 3.3vw, 2.35rem);
  font-weight: 820;
  letter-spacing: -0.05em;
  line-height: 1.12;
}

.section-intro {
  display: flex;
  max-width: 330px;
  align-items: flex-start;
  gap: 11px;
  margin: 0;
  color: var(--business-gray);
  font-size: 0.82rem;
  line-height: 1.65;
}

.section-intro p {
  margin: 0;
}

.intro-rule {
  width: 3px;
  min-height: 39px;
  flex: 0 0 auto;
  border-radius: 3px;
  background: #9fb2c2;
}

.solution-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.solution-card {
  position: relative;
  display: flex;
  min-height: 425px;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #dce5ec;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(16 43 74 / 6%);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

.solution-card:hover {
  transform: translateY(-5px);
  border-color: #bacbd9;
  box-shadow: 0 17px 34px rgb(16 43 74 / 12%);
}

.solution-image {
  position: relative;
  height: 204px;
  flex: 0 0 auto;
  overflow: hidden;
  background: #e8edf1;
}

.solution-image::after {
  position: absolute;
  inset: 0;
  border: 1px solid rgb(255 255 255 / 35%);
  content: '';
  pointer-events: none;
}

.solution-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 450ms ease;
}

.solution-card:hover .solution-image img {
  transform: scale(1.055);
}

.image-wash {
  position: absolute;
  inset: 36% 0 0;
  background: linear-gradient(180deg, transparent, rgb(11 32 56 / 55%));
  pointer-events: none;
}

.solution-number {
  position: absolute;
  z-index: 1;
  top: 13px;
  right: 13px;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 40%);
  border-radius: 10px;
  background: rgb(255 255 255 / 90%);
  color: var(--business-navy);
  font-size: 0.62rem;
  font-weight: 850;
  box-shadow: 0 4px 12px rgb(16 43 74 / 12%);
}

.solution-tag {
  position: absolute;
  z-index: 1;
  bottom: 13px;
  left: 14px;
  margin: 0;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 99px;
  padding: 6px 9px;
  background: rgb(16 43 74 / 75%);
  color: #fff;
  font-size: 0.58rem;
  font-weight: 750;
  letter-spacing: 0.045em;
  text-transform: uppercase;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.solution-copy {
  padding: 19px 19px 0;
}

.solution-copy h3 {
  max-width: 260px;
  margin: 0;
  color: var(--business-navy);
  font-size: 1.04rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.25;
}

.solution-copy > p {
  margin: 9px 0 0;
  color: var(--business-gray);
  font-size: 0.75rem;
  line-height: 1.65;
}

.solution-link {
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: auto 19px 18px;
  border: 1px solid var(--business-navy);
  border-radius: 8px;
  padding: 10px 12px;
  background: var(--business-navy);
  color: #fff;
  font-size: 0.69rem;
  font-weight: 750;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
}

.solution-link:hover {
  transform: translateY(-1px);
  background: var(--business-blue);
}

.solution-link:focus-visible {
  outline: 3px solid rgb(36 76 115 / 30%);
  outline-offset: 3px;
}

.business-process {
  position: relative;
  display: grid;
  gap: 31px;
  margin-top: 88px;
  overflow: hidden;
  border: 1px solid #d7e1e9;
  border-radius: 18px;
  padding: clamp(29px, 5vw, 50px);
  background:
    radial-gradient(ellipse at 0 100%, rgb(36 76 115 / 10%), transparent 39%),
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 8%), transparent 27%),
    linear-gradient(135deg, #f8fafb, #eaf0f4);
  box-shadow: 0 22px 48px rgb(16 43 74 / 9%);
}

.business-process::before,
.business-process::after {
  position: absolute;
  right: -80px;
  width: 280px;
  height: 280px;
  border: 1px solid rgb(36 76 115 / 7%);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}

.business-process::before {
  top: -180px;
  box-shadow: 0 0 0 18px rgb(36 76 115 / 2%);
}

.business-process::after {
  right: auto;
  bottom: -205px;
  left: 30%;
  width: 230px;
  height: 230px;
  opacity: 0.55;
}

.process-heading {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.process-heading-main {
  max-width: 540px;
}

.process-heading .section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  border: 1px solid #d4e0e9;
  border-radius: 99px;
  padding: 8px 12px;
  background: #fff;
  font-size: 0.61rem;
}

.process-heading .section-eyebrow::before {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--business-blue);
  box-shadow: 0 0 0 4px rgb(36 76 115 / 10%);
  content: '';
}

.process-heading h2 {
  max-width: 590px;
  font-size: clamp(2rem, 3.8vw, 2.9rem);
  letter-spacing: -0.06em;
  line-height: 1.02;
}

.process-heading-note {
  display: flex;
  max-width: 330px;
  align-items: center;
  gap: 12px;
  border-left: 2px solid #a9bdce;
  padding: 8px 0 8px 16px;
}

.process-note-icon {
  display: grid;
  width: 39px;
  height: 39px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d4e0e9;
  border-radius: 11px;
  background: #fff;
  color: var(--business-blue);
  box-shadow: 0 4px 11px rgb(16 43 74 / 5%);
}

.process-note-icon :deep(svg) {
  width: 19px;
  height: 19px;
}

.process-heading-note p {
  margin: 0;
  color: var(--business-gray);
  font-size: 0.76rem;
  line-height: 1.55;
}

.process-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.process-step {
  position: relative;
  min-width: 0;
  min-height: 254px;
  border: 1px solid #d6e1e9;
  border-top: 4px solid var(--business-blue);
  border-radius: 14px;
  padding: 21px 20px;
  background:
    radial-gradient(circle at 100% 100%, rgb(36 76 115 / 5%), transparent 46%),
    linear-gradient(145deg, #fff, #fbfcfd);
  box-shadow: 0 10px 25px rgb(16 43 74 / 7%);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.process-step:hover {
  transform: translateY(-6px);
  border-color: #bdccd9;
  border-top-color: #315f88;
  box-shadow: 0 19px 34px rgb(16 43 74 / 12%);
}

.process-step-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.process-icon {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  border: 1px solid #d7e2ea;
  border-radius: 16px;
  background: linear-gradient(145deg, #fff, #e6edf3);
  color: var(--business-blue);
  box-shadow: 0 5px 12px rgb(16 43 74 / 6%);
}

.process-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.process-number {
  border: 1px solid #d5e0e8;
  border-radius: 99px;
  padding: 7px 10px;
  background: #f0f4f7;
  color: var(--business-blue);
  font-size: 0.61rem;
  font-weight: 850;
  letter-spacing: 0.09em;
}

.process-connector {
  position: absolute;
  z-index: 2;
  top: 47px;
  right: -26px;
  width: 30px;
  border-top: 1px solid #9eb2c3;
}

.process-connector::after {
  position: absolute;
  top: -4px;
  right: 0;
  width: 7px;
  height: 7px;
  border-top: 1px solid #829bb0;
  border-right: 1px solid #829bb0;
  content: '';
  transform: rotate(45deg);
}

.process-step h3 {
  margin: 22px 0 8px;
  color: var(--business-navy);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.process-step > p {
  margin: 0;
  color: var(--business-gray);
  font-size: 0.8rem;
  line-height: 1.7;
}

.journey-panel {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid #cfdae3;
  border-radius: 14px;
  padding: 20px 22px;
  background: rgb(255 255 255 / 78%);
}

.journey-icon,
.campaign-detail-icon {
  display: grid;
  width: 45px;
  height: 45px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d4e0e9;
  border-radius: 13px;
  background: #edf2f6;
  color: var(--business-blue);
}

.journey-icon :deep(svg),
.campaign-detail-icon :deep(svg) {
  width: 21px;
  height: 21px;
}

.journey-panel .section-eyebrow,
.campaign-detail-card .section-eyebrow {
  margin: 0 0 6px;
  font-size: 0.58rem;
}

.journey-panel h3,
.campaign-detail-card h3 {
  margin: 0;
  color: var(--business-navy);
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.35;
}

.journey-panel p:last-child,
.campaign-detail-card p:last-child {
  margin: 6px 0 0;
  color: var(--business-gray);
  font-size: 0.74rem;
  line-height: 1.6;
}

.campaign-detail-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
}

.campaign-detail-card {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid #d6e1e9;
  border-radius: 13px;
  padding: 17px;
  background: #fff;
  box-shadow: 0 7px 18px rgb(16 43 74 / 5%);
}

.campaign-detail-card h3 {
  font-size: 0.84rem;
}

.campaign-detail-card p:last-child {
  font-size: 0.68rem;
}

.presentation-card {
  background: linear-gradient(135deg, #fff, #edf3f7);
}

.presentation-link {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  gap: 8px;
  margin-top: 11px;
  border-radius: 8px;
  padding: 8px 11px;
  background: var(--business-navy);
  color: #fff;
  font-size: 0.67rem;
  font-weight: 750;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
}

.presentation-link:hover {
  transform: translateY(-1px);
  background: var(--business-blue);
}

.presentation-link :deep(svg) {
  width: 15px;
  height: 15px;
}

.benefits-section {
  margin-top: 82px;
}

.benefits-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
  gap: clamp(30px, 6vw, 75px);
  overflow: hidden;
  border: 1px solid #173b5e;
  border-radius: 16px;
  padding: clamp(26px, 5vw, 49px);
  background:
    radial-gradient(ellipse at 0 0, rgb(255 255 255 / 9%), transparent 45%),
    linear-gradient(125deg, #173b60, #102b4a 68%, #0b2038);
  box-shadow: 0 16px 36px rgb(16 43 74 / 14%);
}

.benefits-heading .section-eyebrow {
  color: #c1d1df;
}

.benefits-heading h2 {
  max-width: 470px;
  color: #fff;
}

.benefits-heading > p:not(.section-eyebrow) {
  max-width: 510px;
  margin: 14px 0 0;
  color: #d4e0e9;
  font-size: 0.81rem;
  line-height: 1.7;
}

.light-button {
  margin-top: 20px;
  border-color: rgb(255 255 255 / 22%);
  background: #fff;
  color: var(--business-navy);
}

.light-button:hover {
  background: #eaf0f5;
  box-shadow: 0 8px 19px rgb(0 0 0 / 14%);
}

.benefit-list {
  display: grid;
  align-content: center;
  gap: 11px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  border: 1px solid rgb(255 255 255 / 13%);
  border-radius: 10px;
  padding: 12px;
  background: rgb(255 255 255 / 7%);
}

.benefit-icon {
  width: 35px;
  height: 35px;
  border-color: rgb(255 255 255 / 17%);
  border-radius: 10px;
  background: rgb(255 255 255 / 10%);
  color: #e4edf4;
}

.benefit-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.benefit-item > span:last-child {
  display: grid;
  gap: 3px;
}

.benefit-item strong {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 750;
}

.benefit-item > span:last-child > span {
  color: #c8d5e0;
  font-size: 0.67rem;
  line-height: 1.5;
}

.benefits-note {
  margin: 1px 0 0;
  color: #b9c9d7;
  font-size: 0.62rem;
  line-height: 1.5;
}

.business-request {
  display: grid;
  grid-template-columns: minmax(210px, 0.72fr) minmax(0, 1.28fr);
  align-items: start;
  gap: clamp(24px, 4vw, 48px);
  margin-top: 82px;
  border: 1px solid #dbe4eb;
  border-radius: 16px;
  padding: clamp(24px, 4vw, 42px);
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 6%), transparent 29%),
    #f8fafb;
  box-shadow: 0 14px 34px rgb(16 43 74 / 7%);
  scroll-margin-top: 90px;
}

.campaign-dialog {
  position: fixed;
  inset: 0;
  box-sizing: border-box;
  margin: auto;
  width: min(980px, calc(100% - 40px));
  max-width: none;
  max-height: min(92dvh, 820px);
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-color: #c4d0dc transparent;
  scrollbar-width: thin;
  border: 1px solid #d2dde6;
  border-radius: 20px;
  padding: 26px clamp(22px, 3.5vw, 36px) 24px;
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 6%), transparent 29%),
    #f8fafb;
  color: var(--business-navy);
  box-shadow: 0 28px 90px rgb(7 24 41 / 34%);
}

.campaign-dialog::-webkit-scrollbar {
  width: 7px;
}

.campaign-dialog::-webkit-scrollbar-track {
  background: transparent;
}

.campaign-dialog::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 999px;
  background: #c4d0dc;
  background-clip: padding-box;
}

.campaign-dialog::backdrop {
  background: rgb(8 25 44 / 62%);
  backdrop-filter: blur(3px);
}

.campaign-dialog .business-request {
  width: 100%;
  align-items: center;
  gap: clamp(28px, 4vw, 54px);
  margin: 0;
  border: 0;
  padding: 0;
  background: transparent;
  box-shadow: none;
  scroll-margin-top: 0;
}

.campaign-dialog .request-heading {
  padding-right: 12px;
}

.campaign-dialog .request-heading .section-eyebrow {
  margin-bottom: 8px;
}

.campaign-dialog .request-heading h2 {
  font-size: clamp(1.9rem, 3vw, 2.35rem);
}

.campaign-dialog .request-heading > p:last-child {
  margin-top: 10px;
  font-size: 0.74rem;
  line-height: 1.6;
}

.campaign-dialog .business-form-grid {
  gap: 10px 12px;
}

.campaign-dialog .business-field {
  gap: 5px;
}

.campaign-dialog .business-field label {
  font-size: 0.67rem;
  line-height: 1.35;
}

.campaign-dialog .business-field input,
.campaign-dialog .business-field textarea {
  min-height: 46px;
  border: 1px solid #c3d1de;
  border-radius: 12px;
  padding: 11px 13px 11px 42px;
  background-color: #f7f9fb;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");
  background-position: 14px center;
  background-repeat: no-repeat;
  background-size: 18px 18px;
  box-shadow: inset 0 1px 2px rgb(16 43 74 / 5%), 0 1px 0 rgb(255 255 255 / 90%);
  color: #142f4c;
  font-size: 0.79rem;
  transition: border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
}

.campaign-dialog #business-company {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 21h18M5 21V7l8-4v18M19 21V11l-6-4'/%3E%3Cpath d='M9 9v.01M9 12v.01M9 15v.01M9 18v.01M14 12v.01M14 15v.01M14 18v.01'/%3E%3C/svg%3E");
}

.campaign-dialog #business-area {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='7' width='18' height='13' rx='2'/%3E%3Cpath d='M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2'/%3E%3C/svg%3E");
}

.campaign-dialog #business-city {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='2.5'/%3E%3C/svg%3E");
}

.campaign-dialog #business-phone {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L9.06 10.9a16 16 0 0 0 4.04 4.04l1.28-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.58 2.79.7A2 2 0 0 1 22 16.92Z'/%3E%3C/svg%3E");
}

.campaign-dialog #business-email {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='m3 7 9 6 9-6'/%3E%3C/svg%3E");
}

.campaign-dialog #business-participants {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 3.13a4 4 0 0 1 0 7.75M20 21v-2a4 4 0 0 0-3-3.87'/%3E%3Ccircle cx='10' cy='7' r='4'/%3E%3C/svg%3E");
}

.campaign-dialog #business-date {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='5' width='18' height='16' rx='2'/%3E%3Cpath d='M16 3v4M8 3v4M3 11h18'/%3E%3C/svg%3E");
}

.campaign-dialog #business-comments {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235b7690' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z'/%3E%3C/svg%3E");
  background-position: 14px 13px;
  padding-top: 12px;
}

.campaign-dialog .business-field input:hover,
.campaign-dialog .business-field textarea:hover {
  border-color: #8ea7bc;
  background-color: #fff;
  box-shadow: inset 0 1px 2px rgb(16 43 74 / 3%), 0 4px 12px rgb(16 43 74 / 7%);
}

.campaign-dialog .business-field textarea {
  height: 78px;
  min-height: 78px;
  resize: vertical;
}

.campaign-dialog .business-field input:focus,
.campaign-dialog .business-field textarea:focus {
  border-color: #315e85;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgb(49 94 133 / 14%), 0 5px 16px rgb(16 43 74 / 8%);
}

.service-select {
  position: relative;
}

.service-select-trigger {
  display: flex;
  width: 100%;
  min-height: 46px;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  border: 1px solid #c3d1de;
  border-radius: 12px;
  padding: 10px 13px;
  background-color: #f7f9fb;
  box-shadow: inset 0 1px 2px rgb(16 43 74 / 5%), 0 1px 0 rgb(255 255 255 / 90%);
  color: #142f4c;
  cursor: pointer;
  font: inherit;
  font-size: 0.79rem;
  text-align: left;
  transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
}

.service-select-trigger:hover,
.service-select.is-open .service-select-trigger {
  border-color: #91a9bd;
  background: #fff;
  box-shadow: 0 3px 10px rgb(16 43 74 / 6%);
}

.service-select-trigger:focus-visible {
  border-color: #315e85;
  outline: none;
  box-shadow: 0 0 0 4px rgb(49 94 133 / 15%);
}

.service-select-trigger > span {
  min-width: 0;
  flex: 1 1 auto;
}

.service-select-icon,
.service-select-chevron {
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
  color: #52708c;
}

.service-select-chevron {
  transition: transform 160ms ease;
}

.service-select.is-open .service-select-chevron {
  transform: rotate(180deg);
}

.service-select-options {
  position: absolute;
  z-index: 5;
  top: calc(100% + 7px);
  right: 0;
  left: 0;
  display: grid;
  max-height: 230px;
  overflow: auto;
  gap: 4px;
  margin: 0;
  border: 1px solid #d5e0e9;
  border-radius: 13px;
  padding: 6px;
  background: #fff;
  box-shadow: 0 16px 36px rgb(10 32 54 / 18%), 0 3px 8px rgb(10 32 54 / 7%);
  list-style: none;
  overscroll-behavior: contain;
}

.service-select-option {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: 9px;
  padding: 9px 11px;
  color: #344c63;
  cursor: pointer;
  font-size: 0.76rem;
  line-height: 1.35;
  transition: background-color 120ms ease, color 120ms ease;
}

.service-select-option:hover,
.service-select-option.is-active {
  background: #edf3f8;
  color: #102b4a;
}

.service-select-option.is-selected {
  background: #e6eef5;
  color: #102b4a;
  font-weight: 750;
}

.service-select-option :deep(svg) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: #315e85;
}

.service-menu-enter-active,
.service-menu-leave-active {
  transform-origin: top center;
  transition: opacity 120ms ease, transform 120ms ease;
}

.service-menu-enter-from,
.service-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px) scaleY(0.98);
}

.campaign-dialog .business-form-actions {
  gap: 7px;
  margin-top: 12px;
}

.campaign-dialog .business-form-actions .business-button {
  min-height: 44px;
  border-radius: 10px;
  padding: 10px 16px;
}

.campaign-dialog .business-form-actions > p {
  max-width: 520px;
  font-size: 0.65rem;
  line-height: 1.5;
}

.campaign-dialog-close {
  position: sticky;
  z-index: 2;
  top: 0;
  display: grid;
  width: 38px;
  height: 38px;
  float: right;
  place-items: center;
  margin: -18px -19px 0 0;
  border: 1px solid #d5dfe7;
  border-radius: 50%;
  background: #fff;
  color: var(--business-navy);
  cursor: pointer;
  box-shadow: 0 3px 12px rgb(16 43 74 / 8%);
}

.campaign-dialog-close:hover {
  background: #edf2f6;
}

.campaign-dialog-close :deep(svg) {
  width: 18px;
  height: 18px;
}

.campaign-dialog :deep(:focus-visible) {
  outline: 3px solid rgb(36 76 115 / 35%);
  outline-offset: 3px;
}

.request-heading .section-eyebrow {
  margin: 0 0 11px;
}

.request-heading h2 {
  max-width: 320px;
  margin: 0;
  color: var(--business-navy);
  font-size: clamp(1.8rem, 3vw, 2.45rem);
  font-weight: 830;
  letter-spacing: -0.055em;
  line-height: 1.08;
}

.request-heading > p:last-child {
  margin: 13px 0 0;
  color: var(--business-gray);
  font-size: 0.77rem;
  line-height: 1.7;
}

.business-form {
  min-width: 0;
}

.business-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px 13px;
}

.business-field {
  display: grid;
  min-width: 0;
  align-content: start;
  gap: 7px;
}

.business-field-wide {
  grid-column: 1 / -1;
}

.business-field label {
  color: #304960;
  font-size: 0.69rem;
  font-weight: 750;
}

.business-field label span {
  color: #748496;
  font-weight: 500;
}

.business-field label span[aria-hidden="true"] {
  color: #a14f48;
}

.business-field input,
.business-field select,
.business-field textarea {
  width: 100%;
  min-height: 44px;
  border: 1px solid #cfdae3;
  border-radius: 8px;
  padding: 10px 12px;
  background: #fff;
  color: var(--business-navy);
  font: inherit;
  font-size: 0.75rem;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.business-field textarea {
  min-height: 96px;
  resize: vertical;
}

.business-field input::placeholder,
.business-field textarea::placeholder {
  color: #8995a2;
}

.business-field input:focus,
.business-field select:focus,
.business-field textarea:focus {
  border-color: var(--business-blue);
  outline: none;
  box-shadow: 0 0 0 3px rgb(36 76 115 / 12%);
}

.business-field input:focus-visible,
.business-field select:focus-visible,
.business-field textarea:focus-visible,
.service-select-trigger:focus-visible,
.business-button:focus-visible,
.presentation-link:focus-visible,
.prepared-request a:focus-visible {
  outline: 3px solid rgb(36 76 115 / 30%);
  outline-offset: 3px;
}

.business-form-actions {
  display: grid;
  justify-items: start;
  gap: 10px;
  margin-top: 19px;
}

.business-form-actions .business-button {
  min-height: 47px;
  cursor: pointer;
  font: inherit;
  font-size: 0.76rem;
}

.business-form-actions > p {
  max-width: 460px;
  margin: 0;
  color: #657487;
  font-size: 0.68rem;
  line-height: 1.6;
}

.business-form-actions strong {
  color: var(--business-navy);
}

.prepared-request {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 17px;
  border: 1px solid #b9d4c7;
  border-radius: 10px;
  padding: 15px;
  background: #f1f8f4;
  color: #244b3a;
}

.prepared-request-icon {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 10px;
  background: #dcefe4;
  color: #276247;
}

.prepared-request-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.prepared-request strong {
  font-size: 0.73rem;
}

.prepared-request p {
  margin: 4px 0 9px;
  color: #526d5e;
  font-size: 0.68rem;
  line-height: 1.55;
}

.prepared-request a {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  gap: 7px;
  border-radius: 7px;
  padding: 7px 10px;
  background: #276247;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 750;
  text-decoration: none;
}

.prepared-request a :deep(svg) {
  width: 14px;
  height: 14px;
}

.proposal-cta {
  display: flex;
  align-items: center;
  gap: 17px;
  margin-top: 42px;
  border: 1px solid #dfe6eb;
  border-left: 4px solid var(--business-blue);
  border-radius: 12px;
  padding: 21px clamp(18px, 3.5vw, 32px);
  background: linear-gradient(105deg, #f4f7f9, #fff);
  box-shadow: 0 8px 22px rgb(16 43 74 / 5%);
}

.cta-icon {
  width: 47px;
  height: 47px;
  border-radius: 14px;
}

.cta-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.cta-copy {
  flex: 1;
}

.cta-copy .section-eyebrow {
  margin-bottom: 5px;
  font-size: 0.59rem;
}

.proposal-cta h2 {
  font-size: clamp(1.05rem, 2vw, 1.45rem);
}

.cta-copy > p:last-child {
  margin: 5px 0 0;
  color: var(--business-gray);
  font-size: 0.72rem;
}

.cta-button {
  flex: 0 0 auto;
  background: var(--business-navy);
  color: #fff;
}

.cta-button:hover {
  background: #1a4168;
}

@media (max-width: 820px) {
  .business-hero {
    grid-template-columns: minmax(0, 1fr) minmax(270px, 0.8fr);
    gap: 25px;
    padding: 35px;
  }

  .hero-copy h1 {
    font-size: clamp(2.5rem, 6vw, 3.45rem);
  }

  .hero-visual {
    min-height: 300px;
  }

  .hero-photo-caption {
    top: 20px;
    left: -4px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 11px;
  }

  .section-intro {
    max-width: 520px;
  }

  .business-process {
    gap: 23px;
  }

  .process-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .process-heading-note {
    max-width: 460px;
  }

  .process-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 11px;
  }

  .process-step {
    min-height: 225px;
    padding: 14px 12px;
  }

  .process-connector {
    display: none;
  }

  .process-step h3 {
    font-size: 0.8rem;
  }

  .process-step > p {
    font-size: 0.68rem;
  }

  .campaign-detail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .presentation-card {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .business-page {
    padding-top: 16px;
    padding-bottom: 46px;
  }

  .business-hero,
  .business-section,
  .business-process,
  .proposal-cta {
    width: calc(100% - 32px);
  }

  .business-hero {
    grid-template-columns: 1fr;
    gap: 21px;
    padding: 27px 22px 20px;
  }

  .hero-copy h1 {
    font-size: clamp(2.5rem, 12vw, 3.4rem);
  }

  .hero-description {
    margin-top: 15px;
    font-size: 0.85rem;
  }

  .hero-actions {
    gap: 13px;
    margin-top: 20px;
  }

  .primary-button {
    min-height: 45px;
    padding: 10px 12px;
    font-size: 0.72rem;
  }

  .text-action {
    font-size: 0.7rem;
  }

  .hero-assurance {
    margin-top: 20px;
  }

  .hero-visual {
    min-height: 260px;
    margin: 0 5px 0 10px;
  }

  .hero-photo-frame {
    inset: 0 15px 23px 15px;
  }

  .hero-stat-card {
    right: 0;
    bottom: 0;
  }

  .hero-photo-caption {
    top: 14px;
    left: -9px;
    max-width: 96px;
    font-size: 0.55rem;
  }

  .business-section,
  .business-process {
    margin-top: 58px;
  }

  .section-heading h2,
  .benefits-heading h2 {
    font-size: clamp(1.55rem, 8vw, 2rem);
  }

  .solution-grid {
    grid-template-columns: 1fr;
  }

  .solution-card {
    min-height: 0;
  }

  .solution-image {
    height: 190px;
  }

  .solution-link {
    min-height: 43px;
    margin-top: 16px;
  }

  .process-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .process-step {
    display: grid;
    min-height: 0;
    grid-template-columns: 51px minmax(0, 1fr);
    column-gap: 12px;
    padding: 14px 13px;
  }

  .process-step-top {
    grid-row: span 2;
    align-self: start;
  }

  .process-step-top .process-number {
    position: absolute;
    top: 13px;
    right: 13px;
  }

  .process-connector {
    top: 57px;
    left: 37px;
    width: 0;
    height: calc(100% - 43px);
    border-top: 0;
    border-left: 1px dashed #afbfcd;
  }

  .process-step h3 {
    margin: 2px 0 5px;
    padding-right: 52px;
    font-size: 0.85rem;
  }

  .process-step > p {
    grid-column: 2;
    font-size: 0.72rem;
  }

  .journey-panel,
  .campaign-detail-card {
    padding: 16px 14px;
  }

  .campaign-detail-grid {
    grid-template-columns: 1fr;
  }

  .presentation-card {
    grid-column: auto;
  }

  .benefits-section {
    margin-top: 58px;
  }

  .benefits-panel {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 25px 20px;
  }

  .business-request {
    grid-template-columns: 1fr;
    gap: 22px;
    margin-top: 58px;
    padding: 23px 17px;
  }

  .campaign-dialog {
    inset: auto 0 0;
    width: min(100%, 620px);
    max-height: min(94dvh, 900px);
    margin: 0 auto;
    border-radius: 22px 22px 0 0;
    padding: 24px 20px calc(20px + env(safe-area-inset-bottom));
    box-shadow: 0 -14px 50px rgb(7 24 41 / 22%);
  }

  .campaign-dialog .business-request {
    align-items: stretch;
    gap: 18px;
    margin-top: 0;
    padding: 0;
  }

  .campaign-dialog .request-heading {
    padding-right: 46px;
    text-align: left;
  }

  .campaign-dialog .request-heading .section-eyebrow {
    margin-bottom: 6px;
  }

  .campaign-dialog .request-heading h2 {
    max-width: none;
    font-size: 1.65rem;
    line-height: 1.12;
  }

  .campaign-dialog .request-heading > p:last-child {
    max-width: 420px;
    margin-top: 7px;
    font-size: 0.72rem;
    line-height: 1.5;
  }

  .campaign-dialog-close {
    position: absolute;
    top: 15px;
    right: 15px;
    float: none;
    width: 40px;
    height: 40px;
    margin: 0;
    border-color: #dce5ec;
    box-shadow: 0 4px 14px rgb(16 43 74 / 10%);
  }

  .request-heading {
    text-align: center;
  }

  .request-heading h2 {
    max-width: none;
    font-size: 1.8rem;
  }

  .business-form-grid {
    grid-template-columns: 1fr;
    gap: 13px;
  }

  .campaign-dialog .business-form-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .campaign-dialog .business-field {
    gap: 6px;
  }

  .campaign-dialog .business-field label {
    font-size: 0.7rem;
  }

  .campaign-dialog .business-field input,
  .campaign-dialog .business-field textarea {
    min-height: 49px;
    padding: 11px 11px 11px 40px;
    font-size: 0.84rem;
  }

  .campaign-dialog .service-select-trigger {
    min-height: 49px;
    padding: 10px 12px;
    font-size: 0.84rem;
  }

  .campaign-dialog #business-comments {
    padding-top: 12px;
  }

  .campaign-dialog .service-select-options {
    position: static;
    max-height: none;
    overflow: visible;
    margin-top: 7px;
    box-shadow: 0 7px 18px rgb(10 32 54 / 9%);
  }

  .campaign-dialog .service-select-option {
    min-height: 44px;
    font-size: 0.82rem;
  }

  .campaign-dialog .business-field textarea {
    height: 88px;
    min-height: 88px;
  }

  .business-field-wide {
    grid-column: auto;
  }

  .campaign-dialog .business-field-wide {
    grid-column: auto;
  }

  .campaign-dialog .business-form-actions {
    gap: 9px;
    margin-top: 14px;
  }

  .business-form-actions .business-button {
    width: 100%;
    min-height: 48px;
    font-size: 0.71rem;
  }

  .prepared-request {
    padding: 13px 11px;
  }

  .journey-panel h3 {
    font-size: 0.86rem;
  }

  .proposal-cta {
    display: grid;
    grid-template-columns: 45px minmax(0, 1fr);
    column-gap: 12px;
    row-gap: 16px;
    margin-top: 30px;
    padding: 18px 15px;
  }

  .cta-icon {
    width: 43px;
    height: 43px;
  }

  .cta-copy .section-eyebrow {
    font-size: 0.52rem;
  }

  .proposal-cta h2 {
    font-size: 1.08rem;
  }

  .cta-copy > p:last-child {
    font-size: 0.67rem;
    line-height: 1.5;
  }

  .cta-button {
    grid-column: 1 / -1;
  }
}

@media (max-width: 420px) {
  .campaign-dialog {
    padding: 22px 16px calc(16px + env(safe-area-inset-bottom));
  }

  .campaign-dialog .business-form-grid {
    grid-template-columns: 1fr;
    gap: 11px;
  }

  .campaign-dialog .business-field-wide {
    grid-column: auto;
  }

  .campaign-dialog .business-field input,
  .campaign-dialog .service-select-trigger {
    min-height: 48px;
  }

  .campaign-dialog .business-field textarea {
    height: 80px;
    min-height: 80px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
