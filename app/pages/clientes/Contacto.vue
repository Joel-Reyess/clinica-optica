<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

useHead({
  title: 'Contacto | Clínica Óptica',
  meta: [
    {
      name: 'description',
      content: 'Encuentra Clínica Óptica en Coatzacoalcos o contáctanos por teléfono y WhatsApp.'
    }
  ]
})

const whatsappNumber = '529211371704'
const address = 'Benito Juárez 608, Centro, Coatzacoalcos, Veracruz'
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Benito+Ju%C3%A1rez+608%2C+Centro%2C+Coatzacoalcos%2C+Veracruz'
const mapEmbedUrl = 'https://maps.google.com/maps?q=Benito%20Ju%C3%A1rez%20608%2C%20Centro%2C%20Coatzacoalcos%2C%20Veracruz&output=embed'
const patientDeliveryReason = 'Paciente actual: consulta de entrega o estado de pedido'
const patientReasons = [
  patientDeliveryReason,
  'Paciente actual: solicitar un ajuste',
  'Paciente actual: orientación sobre adaptación',
  'Paciente actual: seguimiento'
]
const reasonOptions = [
  'Examen de la vista',
  'Lentes graduados',
  'Armazones',
  'Lentes de contacto',
  'Precios y cotizaciones',
  'Convenios empresariales',
  'Campañas para empresas',
  'Formas de pago',
  'Ubicación y atención',
  'Agendar o cambiar una cita',
  ...patientReasons,
  'Otra consulta'
]

const route = useRoute()
const form = reactive({
  name: '',
  phone: '',
  reason: '',
  message: '',
  aboutOrder: false,
  orderFolio: ''
})

const reasonSelect = ref<HTMLElement | null>(null)
const reasonMenuOpen = ref(false)
const activeReasonIndex = ref(0)
const isCurrentPatientRequest = computed(
  () => patientReasons.includes(form.reason)
)
const asksForOrderFolio = computed(
  () => isCurrentPatientRequest.value
    && (form.reason === patientDeliveryReason || form.aboutOrder)
)

onMounted(() => {
  if (route.query.tipo === 'paciente') {
    form.reason = patientDeliveryReason
  }
  document.addEventListener('pointerdown', closeReasonMenuOnOutsideClick)
})

function closeReasonMenuOnOutsideClick(event: PointerEvent) {
  if (!reasonSelect.value?.contains(event.target as Node)) {
    reasonMenuOpen.value = false
  }
}

function openReasonMenu() {
  activeReasonIndex.value = Math.max(reasonOptions.indexOf(form.reason), 0)
  reasonMenuOpen.value = true
}

function chooseReason(reason: string) {
  form.reason = reason
  if (!patientReasons.includes(reason)) {
    form.aboutOrder = false
    form.orderFolio = ''
  }
  reasonMenuOpen.value = false
}

function handleReasonKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!reasonMenuOpen.value) {
      openReasonMenu()
      return
    }

    const direction = event.key === 'ArrowDown' ? 1 : -1
    activeReasonIndex.value = (
      activeReasonIndex.value + direction + reasonOptions.length
    ) % reasonOptions.length
    return
  }

  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    openReasonMenu()
    activeReasonIndex.value = event.key === 'Home' ? 0 : reasonOptions.length - 1
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (reasonMenuOpen.value) {
      chooseReason(reasonOptions[activeReasonIndex.value]!)
    } else {
      openReasonMenu()
    }
    return
  }

  if (event.key === 'Escape' && reasonMenuOpen.value) {
    event.preventDefault()
    reasonMenuOpen.value = false
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', closeReasonMenuOnOutsideClick)
})

function sendMessage() {
  const message = [
    `Hola, soy ${form.name}.`,
    form.phone ? `Mi teléfono es ${form.phone}.` : '',
    form.reason ? `Quiero consultar sobre: ${form.reason}.` : '',
    asksForOrderFolio.value && form.orderFolio.trim()
      ? `Folio del pedido: ${form.orderFolio.trim()}.`
      : '',
    isCurrentPatientRequest.value
      ? 'Entiendo que el equipo verificará mi identidad antes de compartir información de mi expediente o pedido.'
      : '',
    form.message
  ].filter(Boolean).join('\n')

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  )
}
</script>

<template>
  <main class="contact-page">
    <section
      class="contact-hero"
      aria-labelledby="contact-title"
    >
      <div class="contact-hero-copy">
        <p class="hero-brandline">
          <span class="hero-brand-dot" />
          Clínica Óptica <span aria-hidden="true">·</span> Coatzacoalcos
        </p>
        <p class="contact-eyebrow">
          Aquí comienza una atención cercana
        </p>
        <h1 id="contact-title">
          Hablemos de tu salud visual.
        </h1>
        <p class="contact-intro">
          Escríbenos para resolver tus dudas o visítanos en Coatzacoalcos.
          Nos encantará orientarte.
        </p>
        <div class="hero-actions">
          <a
            class="contact-button hero-map-button"
            href="#ubicacion"
          >
            <UIcon
              name="i-lucide-map"
              aria-hidden="true"
            />
            Cómo llegar
            <UIcon
              name="i-lucide-arrow-down"
              aria-hidden="true"
            />
          </a>
          <a
            class="contact-button hero-whatsapp-button"
            :href="`https://wa.me/${whatsappNumber}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UIcon
              name="i-simple-icons-whatsapp"
              aria-hidden="true"
            />
            Escríbenos
            <UIcon
              name="i-lucide-arrow-up-right"
              aria-hidden="true"
            />
          </a>
        </div>
        <div class="hero-trust-note">
          <UIcon
            name="i-lucide-heart-handshake"
            aria-hidden="true"
          />
          Atención profesional y humana desde 2016
        </div>
      </div>

      <div
        class="contact-visual"
        aria-hidden="true"
      >
        <span class="visual-orbit visual-orbit-outer" />
        <span class="visual-orbit visual-orbit-inner" />
        <span class="visual-orbit visual-orbit-core" />
        <div class="visual-eye">
          <UIcon name="i-lucide-eye" />
        </div>
        <div class="visual-location-card">
          <span class="visual-pin">
            <UIcon name="i-lucide-map-pin" />
          </span>
          <span>
            <strong>Ven a visitarnos</strong>
            <span>Centro · Coatzacoalcos</span>
          </span>
        </div>
        <div class="visual-years-card">
          <UIcon name="i-lucide-sparkles" />
          <span>
            <strong>Desde 2016</strong>
            <span>Cuidando tu mirada</span>
          </span>
        </div>
      </div>
    </section>

    <section
      class="contact-content"
      aria-label="Información y formulario de contacto"
    >
      <div class="contact-info-column">
        <div class="contact-section-heading">
          <span class="contact-heading-icon">
            <UIcon
              name="i-lucide-headset"
              aria-hidden="true"
            />
          </span>
          <div class="contact-heading-copy">
            <p class="contact-eyebrow">
              Contacto directo
            </p>
            <h2>Estamos aquí para escucharte.</h2>
            <p>Elige el canal que te resulte más cómodo.</p>
          </div>
          <span
            class="contact-heading-index"
            aria-hidden="true"
          >
            01
          </span>
        </div>

        <div class="contact-details">
          <article class="contact-detail-card address-card">
            <span class="contact-icon">
              <UIcon
                name="i-lucide-map-pin"
                aria-hidden="true"
              />
            </span>
            <div>
              <h3>Dirección</h3>
              <p>{{ address }}</p>
              <a
                :href="mapUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver indicaciones
                <UIcon
                  name="i-lucide-arrow-up-right"
                  aria-hidden="true"
                />
              </a>
            </div>
          </article>

          <article class="contact-detail-card">
            <span class="contact-icon">
              <UIcon
                name="i-lucide-phone"
                aria-hidden="true"
              />
            </span>
            <div>
              <h3>Teléfono y WhatsApp</h3>
              <a href="tel:+529211371704">
                921 137 1704
              </a>
              <a
                class="detail-secondary-link"
                :href="`https://wa.me/${whatsappNumber}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar un mensaje
              </a>
            </div>
          </article>

          <article class="contact-detail-card pending-card">
            <span class="contact-icon">
              <UIcon
                name="i-lucide-clock-3"
                aria-hidden="true"
              />
            </span>
            <div>
              <h3>Horarios</h3>
              <p>En actualización</p>
              <span class="pending-note">Confirma disponibilidad por WhatsApp.</span>
            </div>
          </article>

          <article class="contact-detail-card pending-card">
            <span class="contact-icon">
              <UIcon
                name="i-lucide-at-sign"
                aria-hidden="true"
              />
            </span>
            <div>
              <h3>Correo y redes</h3>
              <p>Próximamente</p>
              <span class="pending-note">Estamos preparando nuestros canales digitales.</span>
            </div>
          </article>

          <article class="doctoralia-note">
            <span class="doctoralia-icon">
              <UIcon
                name="i-lucide-calendar-check"
                aria-hidden="true"
              />
            </span>
            <p>
              <strong>Doctoralia</strong>
              <span>Perfil en preparación</span>
            </p>
            <span class="coming-soon">Próximamente</span>
          </article>
        </div>
      </div>

      <form
        id="contact-form"
        class="contact-form"
        @submit.prevent="sendMessage"
      >
        <div class="form-topline">
          <span class="form-topline-mark">
            <UIcon
              name="i-lucide-send"
              aria-hidden="true"
            />
            Mensaje directo
          </span>
          <span class="form-topline-number">02 / 03</span>
        </div>
        <div class="contact-form-heading">
          <span class="form-icon">
            <UIcon
              name="i-lucide-message-circle"
              aria-hidden="true"
            />
          </span>
          <div class="form-heading-copy">
            <p class="contact-eyebrow">
              Formulario breve
            </p>
            <h2>{{ isCurrentPatientRequest ? 'Cuéntanos sobre tu atención.' : 'Cuéntanos, ¿cómo podemos ayudarte?' }}</h2>
          </div>
        </div>
        <div class="form-response-note">
          <span class="response-note-icon">
            <UIcon
              name="i-simple-icons-whatsapp"
              aria-hidden="true"
            />
          </span>
          <span>
            <strong>Atención directa</strong>
            <span>{{ isCurrentPatientRequest ? 'Tu consulta se preparará para WhatsApp.' : 'Tu mensaje se preparará para WhatsApp.' }}</span>
          </span>
        </div>

        <label for="contact-name">Tu nombre</label>
        <div class="form-control-shell">
          <UIcon
            name="i-lucide-user-round"
            class="field-leading-icon"
            aria-hidden="true"
          />
          <input
            id="contact-name"
            v-model.trim="form.name"
            autocomplete="name"
            name="name"
            placeholder="¿Cómo te llamas?"
            required
          >
        </div>

        <label for="contact-phone">
          Teléfono
          <span>{{ isCurrentPatientRequest ? '*' : '(opcional)' }}</span>
        </label>
        <div class="form-control-shell">
          <UIcon
            name="i-lucide-phone"
            class="field-leading-icon"
            aria-hidden="true"
          />
          <input
            id="contact-phone"
            v-model.trim="form.phone"
            autocomplete="tel"
            name="phone"
            type="tel"
            placeholder="Tu número de contacto"
            :required="isCurrentPatientRequest"
          >
        </div>

        <label for="contact-reason">
          ¿Sobre qué te gustaría consultar?
          <span>{{ isCurrentPatientRequest ? '*' : '(opcional)' }}</span>
        </label>
        <div
          ref="reasonSelect"
          class="form-control-shell select-shell"
          :class="{ 'select-placeholder': !form.reason, 'select-open': reasonMenuOpen }"
        >
          <UIcon
            name="i-lucide-list-filter"
            class="field-leading-icon"
            aria-hidden="true"
          />
          <button
            id="contact-reason"
            class="select-trigger"
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="contact-reason-options"
            :aria-expanded="reasonMenuOpen"
            :aria-activedescendant="reasonMenuOpen ? `contact-reason-option-${activeReasonIndex}` : undefined"
            @click="reasonMenuOpen ? (reasonMenuOpen = false) : openReasonMenu()"
            @keydown="handleReasonKeydown"
          >
            {{ form.reason || 'Selecciona un tema' }}
          </button>
          <UIcon
            name="i-lucide-chevron-down"
            class="field-trailing-icon"
            aria-hidden="true"
          />
          <ul
            v-if="reasonMenuOpen"
            id="contact-reason-options"
            class="select-options"
            role="listbox"
            aria-label="Tema de consulta"
          >
            <li
              v-for="(reason, index) in reasonOptions"
              :id="`contact-reason-option-${index}`"
              :key="reason"
              class="select-option"
              :class="{
                'is-active': activeReasonIndex === index,
                'is-selected': form.reason === reason
              }"
              role="option"
              :aria-selected="form.reason === reason"
              @pointerenter="activeReasonIndex = index"
              @click="chooseReason(reason)"
            >
              <span>{{ reason }}</span>
              <UIcon
                v-if="form.reason === reason"
                name="i-lucide-check"
                aria-hidden="true"
              />
            </li>
          </ul>
        </div>
        <input
          type="hidden"
          name="reason"
          :value="form.reason"
        >

        <label
          v-if="isCurrentPatientRequest && form.reason !== patientDeliveryReason"
          class="patient-order-toggle"
        >
          <input
            v-model="form.aboutOrder"
            type="checkbox"
            name="about-order"
          >
          Mi consulta está relacionada con un pedido
        </label>
        <template v-if="asksForOrderFolio">
          <label for="contact-order-folio">
            Folio del pedido
            <span>(si lo tienes)</span>
          </label>
          <div class="form-control-shell">
            <UIcon
              name="i-lucide-receipt-text"
              class="field-leading-icon"
              aria-hidden="true"
            />
            <input
              id="contact-order-folio"
              v-model.trim="form.orderFolio"
              autocomplete="off"
              name="order-folio"
              placeholder="Escribe el folio de tu pedido"
            >
          </div>
        </template>

        <p
          v-if="isCurrentPatientRequest"
          class="patient-verification-note"
          role="note"
        >
          Para proteger tus datos, el equipo verificará tu identidad antes de compartir información del expediente o del pedido.
        </p>

        <label for="contact-message">Tu mensaje</label>
        <div class="form-control-shell textarea-shell">
          <UIcon
            name="i-lucide-message-square-text"
            class="field-leading-icon"
            aria-hidden="true"
          />
          <textarea
            id="contact-message"
            v-model.trim="form.message"
            name="message"
            rows="4"
            placeholder="Escribe aquí tu duda o comentario"
            required
          />
        </div>

        <button
          class="contact-button submit-button"
          type="submit"
        >
          <UIcon
            name="i-simple-icons-whatsapp"
            aria-hidden="true"
          />
          Continuar por WhatsApp
          <UIcon
            name="i-lucide-arrow-up-right"
            aria-hidden="true"
          />
        </button>
        <p class="form-note">
          Se abrirá WhatsApp con tu mensaje listo para enviar.
        </p>
      </form>
    </section>

    <section
      id="ubicacion"
      class="contact-location"
      aria-labelledby="location-title"
    >
      <div class="location-topline">
        <span class="location-kicker">
          <UIcon
            name="i-lucide-navigation"
            aria-hidden="true"
          />
          Encuéntranos
        </span>
        <span class="location-region">
          <span class="location-region-icon">
            <UIcon
              name="i-lucide-map-pin"
              aria-hidden="true"
            />
          </span>
          <span class="location-region-copy">
            <strong>Centro</strong>
            <span>Coatzacoalcos, Veracruz</span>
          </span>
        </span>
      </div>
      <div class="location-heading">
        <div class="location-heading-copy">
          <h2 id="location-title">
            Estamos cerca de ti.
          </h2>
          <p>{{ address }}</p>
        </div>
        <span class="location-step">
          <span>03</span>
          Llega con facilidad
        </span>
        <a
          class="directions-link"
          :href="mapUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir en Google Maps
          <UIcon
            name="i-lucide-arrow-up-right"
            aria-hidden="true"
          />
        </a>
      </div>
      <div class="map-frame">
        <iframe
          :src="mapEmbedUrl"
          title="Mapa de Clínica Óptica en Benito Juárez 608, Coatzacoalcos"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        />
        <div class="map-address-chip">
          <span class="map-chip-icon">
            <UIcon
              name="i-lucide-map-pin"
              aria-hidden="true"
            />
          </span>
          <span>
            <strong>Clínica Óptica</strong>
            <span>Benito Juárez 608 · Centro</span>
          </span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  --contact-navy: #102b4a;
  --contact-blue: #244c73;
  --contact-gray: #526176;
  --contact-pale: #f3f5f6;
  overflow: hidden;
  padding-bottom: 76px;
  color: var(--contact-navy);
}

.contact-hero,
.contact-content,
.contact-location {
  width: min(1080px, calc(100% - 56px));
  margin-inline: auto;
}

.contact-hero {
  position: relative;
  display: grid;
  min-height: 405px;
  grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.95fr);
  align-items: center;
  gap: 20px;
  overflow: hidden;
  margin-top: 22px;
  border: 1px solid #193c5f;
  border-radius: 16px;
  padding: 42px clamp(26px, 5vw, 60px);
  background:
    radial-gradient(ellipse at 84% 14%, rgb(255 255 255 / 10%), transparent 36%),
    linear-gradient(125deg, #173b60 0%, #102b4a 58%, #0b2038 100%);
  box-shadow: 0 18px 45px rgb(16 43 74 / 16%);
}

.contact-hero::before,
.contact-hero::after {
  position: absolute;
  border: 1px solid rgb(255 255 255 / 7%);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}

.contact-hero::before {
  top: -235px;
  right: -170px;
  width: 580px;
  height: 580px;
}

.contact-hero::after {
  right: -115px;
  bottom: -325px;
  width: 500px;
  height: 500px;
  box-shadow: 0 0 0 24px rgb(255 255 255 / 2%), 0 0 0 50px rgb(255 255 255 / 2%);
}

.contact-hero-copy {
  position: relative;
  z-index: 2;
  max-width: 590px;
}

.hero-brandline {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 26px;
  color: #d7e2ec;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-brand-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c9d8e6;
  box-shadow: 0 0 0 4px rgb(201 216 230 / 12%);
}

.contact-eyebrow {
  margin: 0 0 9px;
  color: #64758a;
  font-size: 0.7rem;
  font-weight: 750;
  letter-spacing: 0.13em;
  line-height: 1.5;
  text-transform: uppercase;
}

.contact-hero .contact-eyebrow {
  margin-bottom: 12px;
  color: #b9cbdc;
}

.contact-hero h1 {
  max-width: 670px;
  margin: 0;
  color: #fff;
  font-size: clamp(2.35rem, 5vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -0.052em;
  line-height: 1.02;
}

.contact-intro {
  max-width: 600px;
  margin: 17px 0 0;
  color: #d6e0e9;
  font-size: 0.96rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 23px;
}

.contact-button {
  display: inline-flex;
  min-height: 46px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid var(--contact-navy);
  border-radius: 6px;
  padding: 11px 16px;
  background: var(--contact-navy);
  color: #fff;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 160ms ease, transform 160ms ease;
}

.contact-button:hover {
  transform: translateY(-1px);
  background: var(--contact-blue);
}

.hero-map-button {
  border-color: #fff;
  background: #fff;
  color: var(--contact-navy);
}

.hero-map-button:hover {
  background: #eaf0f5;
  color: var(--contact-navy);
}

.hero-whatsapp-button {
  border-color: rgb(255 255 255 / 32%);
  background: rgb(255 255 255 / 8%);
}

.hero-whatsapp-button:hover {
  background: rgb(255 255 255 / 16%);
}

.contact-button :deep(svg) {
  width: 17px;
  height: 17px;
}

.hero-trust-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  color: #b9cbdc;
  font-size: 0.72rem;
  line-height: 1.5;
}

.hero-trust-note :deep(svg) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.contact-visual {
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 300px;
  place-items: center;
}

.visual-orbit {
  position: absolute;
  display: block;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 50%;
}

.visual-orbit-outer {
  width: min(290px, 80%);
  aspect-ratio: 1;
  box-shadow: 0 0 0 20px rgb(255 255 255 / 3%);
}

.visual-orbit-inner {
  width: min(218px, 62%);
  aspect-ratio: 1;
  border-color: rgb(255 255 255 / 17%);
  background: radial-gradient(circle, rgb(255 255 255 / 8%), transparent 72%);
}

.visual-orbit-core {
  width: 132px;
  height: 132px;
  border-color: rgb(255 255 255 / 22%);
  background: linear-gradient(145deg, rgb(255 255 255 / 14%), rgb(255 255 255 / 5%));
  box-shadow: 0 16px 45px rgb(0 0 0 / 14%);
}

.visual-eye {
  position: relative;
  z-index: 1;
  display: grid;
  width: 82px;
  height: 82px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 24%);
  border-radius: 25px;
  background: rgb(255 255 255 / 11%);
  color: #fff;
  transform: rotate(-8deg);
}

.visual-eye :deep(svg) {
  width: 39px;
  height: 39px;
  transform: rotate(8deg);
}

.visual-location-card,
.visual-years-card {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 10px;
  padding: 11px 13px;
  background: rgb(255 255 255 / 11%);
  box-shadow: 0 12px 28px rgb(0 0 0 / 12%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.visual-location-card {
  top: 18px;
  right: 0;
}

.visual-years-card {
  bottom: 15px;
  left: 0;
}

.visual-location-card > span:last-child,
.visual-years-card > span {
  display: grid;
  gap: 3px;
}

.visual-location-card strong,
.visual-years-card strong {
  color: #fff;
  font-size: 0.73rem;
  font-weight: 750;
}

.visual-location-card > span:last-child > span,
.visual-years-card > span > span {
  color: #d1deea;
  font-size: 0.64rem;
}

.visual-pin,
.visual-years-card > :deep(svg) {
  display: grid;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 19%);
  border-radius: 9px;
  background: rgb(255 255 255 / 9%);
  color: #dbe6ef;
}

.visual-pin :deep(svg) {
  width: 16px;
  height: 16px;
}

.visual-years-card > :deep(svg) {
  width: 17px;
  height: 17px;
  padding: 7px;
}

.contact-content {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
  align-items: start;
  gap: clamp(20px, 3vw, 36px);
  position: relative;
  z-index: 2;
  margin-top: 32px;
}

.contact-section-heading {
  position: relative;
  display: flex;
  min-height: 124px;
  align-items: center;
  gap: 15px;
  overflow: hidden;
  margin-bottom: 15px;
  border: 1px solid #dce5ec;
  border-radius: 11px;
  padding: 19px 56px 19px 21px;
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 9%), transparent 40%),
    linear-gradient(120deg, #f4f7f9, #fff);
}

.contact-section-heading::after {
  position: absolute;
  right: -29px;
  bottom: -66px;
  width: 145px;
  height: 145px;
  border: 1px solid rgb(36 76 115 / 9%);
  border-radius: 50%;
  box-shadow: 0 0 0 13px rgb(36 76 115 / 3%), 0 0 0 27px rgb(36 76 115 / 2%);
  content: '';
  pointer-events: none;
}

.contact-heading-icon {
  position: relative;
  z-index: 1;
  display: grid;
  width: 50px;
  height: 50px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d8e2ea;
  border-radius: 15px;
  background: #fff;
  color: var(--contact-blue);
  box-shadow: 0 7px 17px rgb(16 43 74 / 7%);
}

.contact-heading-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.contact-heading-copy {
  position: relative;
  z-index: 1;
}

.contact-heading-copy .contact-eyebrow {
  margin-bottom: 4px;
  font-size: 0.62rem;
}

.contact-heading-copy h2 {
  max-width: 340px;
  margin: 0;
  color: var(--contact-navy);
  font-size: clamp(1.15rem, 2vw, 1.55rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.contact-section-heading .contact-heading-copy h2 {
  font-size: clamp(1.15rem, 2vw, 1.55rem);
}

.contact-heading-copy > p:last-child {
  margin: 6px 0 0;
  color: var(--contact-gray);
  font-size: 0.75rem;
  line-height: 1.5;
}

.contact-heading-index {
  position: absolute;
  z-index: 1;
  top: 15px;
  right: 17px;
  color: #9aa9b7;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.contact-section-heading h2,
.location-heading h2 {
  margin: 0;
  color: var(--contact-navy);
  font-size: clamp(1.45rem, 2.5vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.18;
}

.contact-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 11px;
}

.contact-detail-card {
  position: relative;
  display: flex;
  min-height: 150px;
  align-items: flex-start;
  gap: 12px;
  overflow: hidden;
  border: 1px solid #e3e8ec;
  border-left: 3px solid var(--contact-blue);
  border-radius: 11px;
  padding: 16px 14px;
  background: #fff;
  box-shadow: 0 7px 21px rgb(16 43 74 / 6%);
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.address-card {
  grid-column: 1 / -1;
  min-height: 132px;
  align-items: center;
  padding: 20px;
}

.address-card .contact-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
}

.address-card > div {
  flex: 1;
}

.address-card h3 {
  margin-bottom: 5px;
}

.address-card p {
  margin-bottom: 8px;
}

.address-card > div > a {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  border: 1px solid #d5e0e9;
  border-radius: 5px;
  padding: 5px 9px;
  background: #fff;
  font-size: 0.68rem;
}

.contact-detail-card:hover {
  transform: translateY(-2px);
  border-color: #cbd8e3;
  box-shadow: 0 12px 26px rgb(16 43 74 / 9%);
}

.address-card {
  border-color: #d5e0e9;
  border-left-color: var(--contact-blue);
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 8%), transparent 45%),
    #f7f9fa;
}

.contact-icon,
.form-icon,
.doctoralia-icon {
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #dce4eb;
  border-radius: 11px;
  background: #edf2f6;
  color: var(--contact-blue);
}

.contact-icon :deep(svg),
.form-icon :deep(svg),
.doctoralia-icon :deep(svg) {
  width: 19px;
  height: 19px;
}

.contact-detail-card h3 {
  margin: 2px 0 7px;
  color: var(--contact-navy);
  font-size: 0.84rem;
  font-weight: 750;
}

.contact-detail-card p,
.contact-detail-card a {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  color: #40566d;
  font-size: 0.76rem;
  line-height: 1.5;
  text-decoration: none;
}

.contact-detail-card a {
  color: var(--contact-blue);
  font-weight: 700;
}

.contact-detail-card a:hover,
.directions-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.contact-detail-card a :deep(svg) {
  width: 14px;
  height: 14px;
}

.contact-detail-card .detail-secondary-link {
  margin-top: 6px;
}

.pending-card {
  background: #f7f8f9;
}

.pending-card p {
  color: #64758a;
  font-weight: 700;
}

.pending-note {
  display: block;
  margin-top: 5px;
  color: #718093;
  font-size: 0.68rem;
  line-height: 1.45;
}

.doctoralia-note {
  position: relative;
  display: flex;
  min-height: 150px;
  align-items: center;
  justify-content: flex-start;
  gap: 11px;
  overflow: hidden;
  border: 1px solid #d6e1e9;
  border-left: 3px solid var(--contact-blue);
  border-radius: 11px;
  padding: 16px;
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 9%), transparent 56%),
    linear-gradient(145deg, #f1f5f8, #fff);
  box-shadow: 0 7px 21px rgb(16 43 74 / 6%);
}

.doctoralia-note::after {
  position: absolute;
  right: -32px;
  bottom: -54px;
  width: 122px;
  height: 122px;
  border: 1px solid rgb(36 76 115 / 9%);
  border-radius: 50%;
  box-shadow: 0 0 0 12px rgb(36 76 115 / 3%);
  content: '';
  pointer-events: none;
}

.doctoralia-icon {
  position: relative;
  z-index: 1;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 4px 12px rgb(16 43 74 / 7%);
}

.doctoralia-note > p {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 4px;
  margin: 0;
}

.doctoralia-note strong {
  color: var(--contact-navy);
  font-size: 0.85rem;
}

.doctoralia-note > p span {
  color: #718093;
  font-size: 0.71rem;
}

.coming-soon {
  position: relative;
  z-index: 1;
  margin-left: auto;
  border: 1px solid #dce4eb;
  border-radius: 99px;
  padding: 5px 9px;
  color: #566a7e;
  font-size: 0.62rem;
  font-weight: 700;
  white-space: nowrap;
}

.contact-form {
  position: relative;
  display: grid;
  gap: 9px;
  overflow: hidden;
  border: 1px solid #e3e8ec;
  border-top: 4px solid var(--contact-navy);
  border-radius: 12px;
  padding: clamp(20px, 3vw, 28px);
  background:
    radial-gradient(ellipse at 100% 0, rgb(36 76 115 / 5%), transparent 35%),
    #fff;
  box-shadow: 0 14px 35px rgb(16 43 74 / 8%);
}

.contact-form::after {
  position: absolute;
  top: 73px;
  right: -34px;
  width: 102px;
  height: 102px;
  border: 1px solid rgb(36 76 115 / 8%);
  border-radius: 50%;
  box-shadow: 0 0 0 12px rgb(36 76 115 / 3%);
  content: '';
  pointer-events: none;
}

.form-topline {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -3px 0 2px;
  border-bottom: 1px solid #e6ebef;
  padding-bottom: 12px;
}

.form-topline-mark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #61758a;
  font-size: 0.62rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.form-topline-mark :deep(svg) {
  width: 14px;
  height: 14px;
  color: var(--contact-blue);
}

.form-topline-number {
  color: #98a5b1;
  font-size: 0.62rem;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.contact-form-heading {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.form-icon {
  width: 42px;
  height: 42px;
  background: #fff;
}

.contact-form-heading .contact-eyebrow {
  margin-bottom: 4px;
}

.contact-form-heading h2 {
  max-width: 340px;
  margin: 0;
  color: var(--contact-navy);
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

.form-response-note {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
  border: 1px solid #dfe7ed;
  border-radius: 7px;
  padding: 9px 11px;
  background: linear-gradient(100deg, #edf2f6, #f8fafb);
}

.response-note-icon {
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d8e3eb;
  border-radius: 9px;
  background: #fff;
  color: var(--contact-blue);
}

.response-note-icon :deep(svg) {
  width: 15px;
  height: 15px;
}

.form-response-note > span:last-child {
  display: grid;
  gap: 2px;
}

.form-response-note strong {
  color: #334b64;
  font-size: 0.69rem;
  font-weight: 750;
}

.form-response-note > span:last-child > span {
  color: #718093;
  font-size: 0.65rem;
  line-height: 1.4;
}

.contact-form label {
  position: relative;
  z-index: 1;
  margin-top: 4px;
  color: #334b64;
  font-size: 0.74rem;
  font-weight: 700;
}

.contact-form label span {
  color: #7a8795;
  font-weight: 400;
}

.form-control-shell {
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 54px;
  grid-template-columns: 22px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 10px;
  border: 1px solid #d5dfe7;
  border-radius: 8px;
  padding: 0 13px;
  background: linear-gradient(105deg, #f9fbfc, #fff);
  box-shadow: 0 2px 7px rgb(16 43 74 / 3%);
  transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
}

.form-control-shell:hover {
  border-color: #b9c9d7;
}

.form-control-shell:focus-within {
  border-color: var(--contact-blue);
  background: #fff;
  box-shadow: 0 0 0 4px rgb(36 76 115 / 11%), 0 4px 12px rgb(16 43 74 / 5%);
}

.field-leading-icon,
.field-trailing-icon {
  width: 18px;
  height: 18px;
  color: #667d92;
  pointer-events: none;
  transition: color 160ms ease;
}

.field-leading-icon {
  color: #71869a;
}

.contact-form .form-control-shell input,
.contact-form .form-control-shell select,
.contact-form .form-control-shell textarea {
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: 0;
  min-height: 48px;
  border: 0;
  border-radius: 0;
  padding: 10px 0;
  background: transparent;
  color: var(--contact-navy);
  font: inherit;
  font-size: 0.8rem;
  box-shadow: none;
}

.select-shell {
  position: relative;
}

.contact-form .select-trigger {
  grid-column: 2;
  display: flex;
  min-height: 48px;
  align-items: center;
  border: 0;
  padding: 10px 0;
  background: transparent;
  color: var(--contact-navy);
  font: inherit;
  font-size: 0.8rem;
  text-align: left;
  cursor: pointer;
}

.contact-form .select-placeholder .select-trigger {
  color: #8793a0;
}

.contact-form .select-trigger:focus {
  outline: none;
}

.select-shell.select-open {
  z-index: 3;
}

.select-shell.select-open .field-trailing-icon {
  color: var(--contact-blue);
  transform: rotate(180deg);
}

.select-options {
  position: absolute;
  z-index: 5;
  top: calc(100% + 7px);
  right: 0;
  left: 0;
  display: grid;
  gap: 3px;
  overflow: hidden;
  margin: 0;
  border: 1px solid #d7e1e9;
  border-radius: 10px;
  padding: 6px;
  background: #fff;
  box-shadow: 0 14px 30px rgb(16 43 74 / 16%), 0 3px 8px rgb(16 43 74 / 5%);
  list-style: none;
  animation: select-options-enter 140ms ease-out;
}

.select-option {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 7px;
  padding: 8px 11px;
  color: #40566d;
  font-size: 0.78rem;
  line-height: 1.35;
  cursor: pointer;
  transition: background-color 140ms ease, color 140ms ease;
}

.select-option:hover,
.select-option.is-active {
  background: #edf2f6;
  color: var(--contact-navy);
}

.select-option.is-selected {
  background: #e8eff5;
  color: var(--contact-blue);
  font-weight: 700;
}

.select-option > :deep(svg) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: var(--contact-blue);
}

@keyframes select-options-enter {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-form .form-control-shell textarea {
  min-height: 118px;
  resize: vertical;
  line-height: 1.6;
}

.contact-form .form-control-shell input::placeholder,
.contact-form .form-control-shell textarea::placeholder {
  color: #8793a0;
}

.contact-form .form-control-shell input:focus,
.contact-form .form-control-shell textarea:focus {
  outline: none;
}

.textarea-shell {
  grid-template-columns: 22px minmax(0, 1fr);
  align-items: start;
  padding-top: 4px;
}

.textarea-shell .field-leading-icon {
  margin-top: 12px;
}

.submit-button {
  position: relative;
  z-index: 1;
  width: 100%;
  margin-top: 6px;
}

.form-note {
  position: relative;
  z-index: 1;
  margin: 0;
  color: #6b7b8d;
  font-size: 0.67rem;
  line-height: 1.5;
  text-align: center;
}

.contact-location {
  position: relative;
  margin-top: 52px;
  border: 1px solid #dfe6eb;
  border-radius: 15px;
  padding: clamp(18px, 3vw, 30px);
  background:
    radial-gradient(ellipse at 100% 0, rgb(36 76 115 / 7%), transparent 36%),
    linear-gradient(145deg, #f7f9fa, #f1f4f6);
  box-shadow: 0 12px 30px rgb(16 43 74 / 5%);
}

.location-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 15px;
}

.location-kicker,
.location-region {
  display: inline-flex;
  align-items: center;
  border: 1px solid #dbe4eb;
  border-radius: 12px;
}

.location-kicker {
  min-height: 34px;
  gap: 7px;
  padding: 6px 11px;
  border-color: #cddae4;
  background: #fff;
  color: var(--contact-blue);
  font-size: 0.67rem;
  font-weight: 750;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.location-region {
  min-height: 54px;
  gap: 11px;
  border-color: #cad8e4;
  padding: 7px 15px 7px 8px;
  background: linear-gradient(115deg, #fff, #edf2f6);
  box-shadow: 0 5px 14px rgb(16 43 74 / 6%);
}

.location-kicker :deep(svg) {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
}

.location-region-icon {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #31587b;
  border-radius: 10px;
  background: linear-gradient(145deg, #31587b, var(--contact-navy));
  color: #fff;
  box-shadow: 0 3px 8px rgb(16 43 74 / 18%);
}

.location-region-icon :deep(svg) {
  width: 17px;
  height: 17px;
}

.location-region-copy {
  display: grid;
  gap: 2px;
}

.location-region-copy strong {
  color: var(--contact-navy);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.015em;
  line-height: 1.15;
}

.location-region-copy > span {
  color: #5a6e82;
  font-size: 0.68rem;
  font-weight: 550;
  line-height: 1.25;
}

.location-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
}

.location-heading-copy > p {
  margin: 7px 0 0;
  color: var(--contact-gray);
  font-size: 0.82rem;
  line-height: 1.5;
}

.location-heading-copy {
  position: relative;
  padding-left: 15px;
}

.location-heading-copy::before {
  position: absolute;
  top: 3px;
  bottom: 2px;
  left: 0;
  width: 3px;
  border-radius: 5px;
  background: var(--contact-blue);
  content: '';
}

.location-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  color: #6c7c8c;
  font-size: 0.68rem;
  font-weight: 650;
  white-space: nowrap;
}

.location-step > span {
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  border: 1px solid #d7e1e9;
  border-radius: 50%;
  background: #fff;
  color: var(--contact-blue);
  font-size: 0.62rem;
  font-weight: 800;
}
.directions-link {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
  color: var(--contact-blue);
  font-size: 0.78rem;
  font-weight: 750;
  text-decoration: none;
}

.directions-link :deep(svg) {
  width: 16px;
  height: 16px;
}

.map-frame {
  position: relative;
  height: 345px;
  overflow: hidden;
  border: 5px solid #fff;
  border-radius: 14px;
  background: #e8edf1;
  box-shadow: 0 12px 32px rgb(16 43 74 / 10%), 0 0 0 1px #dfe5e9;
}

.map-frame iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 9px;
}

.map-address-chip {
  position: absolute;
  bottom: 17px;
  left: 17px;
  display: flex;
  align-items: center;
  gap: 9px;
  border: 1px solid rgb(16 43 74 / 8%);
  border-radius: 9px;
  padding: 9px 12px;
  background: #fff;
  box-shadow: 0 7px 20px rgb(16 43 74 / 15%);
  pointer-events: none;
}

.map-chip-icon {
  display: grid;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 9px;
  background: #edf2f6;
  color: var(--contact-blue);
}

.map-chip-icon :deep(svg) {
  width: 17px;
  height: 17px;
}

.map-address-chip > span:last-child {
  display: grid;
  gap: 3px;
}

.map-address-chip strong {
  color: var(--contact-navy);
  font-size: 0.72rem;
}

.map-address-chip > span:last-child > span {
  color: var(--contact-gray);
  font-size: 0.64rem;
}

@media (max-width: 760px) {
  .contact-hero,
  .contact-content,
  .contact-location {
    width: calc(100% - 36px);
  }

  .contact-hero {
    min-height: 360px;
    grid-template-columns: minmax(0, 1.1fr) minmax(220px, 0.9fr);
    align-items: flex-start;
    gap: 10px;
    margin-top: 16px;
    padding: 34px 28px;
  }

  .contact-visual {
    min-height: 260px;
    align-self: center;
  }

  .visual-location-card {
    top: 0;
    right: -13px;
  }

  .visual-years-card {
    bottom: 0;
    left: -13px;
  }

  .contact-content {
    margin-top: 26px;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .contact-details {
    gap: 9px;
  }

  .contact-detail-card {
    min-height: 140px;
  }

  .address-card {
    min-height: 124px;
    padding: 17px;
  }

  .address-card {
    min-height: 124px;
    padding: 17px;
  }

  .contact-location {
    margin-top: 36px;
  }

  .map-frame {
    height: 280px;
  }
}

@media (max-width: 480px) {
  .contact-hero,
  .contact-content,
  .contact-location {
    width: calc(100% - 32px);
  }

  .contact-hero h1 {
    font-size: clamp(2rem, 9vw, 2.65rem);
  }

  .contact-hero {
    min-height: 0;
    grid-template-columns: 1fr;
    gap: 0;
    padding: 27px 21px 17px;
  }

  .hero-brandline {
    margin-bottom: 20px;
    font-size: 0.61rem;
  }

  .contact-hero .contact-eyebrow {
    font-size: 0.62rem;
  }

  .contact-intro {
    font-size: 0.86rem;
  }

  .hero-actions {
    gap: 8px;
    margin-top: 18px;
  }

  .hero-actions .contact-button {
    min-height: 42px;
    padding: 9px 11px;
    font-size: 0.71rem;
  }

  .hero-trust-note {
    margin-top: 15px;
    font-size: 0.66rem;
  }

  .contact-visual {
    min-height: 205px;
    margin-top: 3px;
  }

  .visual-orbit-outer {
    width: 174px;
  }

  .visual-orbit-inner {
    width: 132px;
  }

  .visual-orbit-core {
    width: 86px;
    height: 86px;
  }

  .visual-eye {
    width: 58px;
    height: 58px;
    border-radius: 18px;
  }

  .visual-eye :deep(svg) {
    width: 29px;
    height: 29px;
  }

  .visual-location-card,
  .visual-years-card {
    padding: 8px 10px;
  }

  .visual-location-card {
    top: 4px;
    right: 0;
  }

  .visual-years-card {
    bottom: 3px;
    left: 0;
  }

  .contact-details {
    grid-template-columns: 1fr;
  }

  .contact-detail-card {
    align-items: center;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
    padding: 14px;
    text-align: center;
  }

  .contact-detail-card > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .contact-detail-card h3 {
    margin: 0 0 6px;
  }

  .contact-detail-card p,
  .contact-detail-card a {
    justify-content: center;
    text-align: center;
  }

  .address-card {
    min-height: 0;
    padding: 15px 13px;
  }

  .address-card .contact-icon {
    width: 40px;
    height: 40px;
  }

  .address-card p {
    max-width: 230px;
  }

  .address-card {
    min-height: 0;
    padding: 15px 13px;
  }

  .address-card .contact-icon {
    width: 40px;
    height: 40px;
  }

  .address-card p {
    max-width: 230px;
  }

  .doctoralia-note {
    min-height: 0;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    padding: 17px 14px;
    text-align: center;
  }

  .doctoralia-note > p {
    justify-items: center;
  }

  .coming-soon {
    margin: 0;
  }

  .contact-form {
    padding: 19px 16px;
  }

  .location-heading {
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }

  .location-heading-copy {
    width: 100%;
    padding: 0;
    text-align: center;
  }

  .location-heading-copy::before {
    top: -8px;
    right: 50%;
    bottom: auto;
    left: auto;
    width: 34px;
    height: 3px;
    transform: translateX(50%);
  }

  .location-step {
    justify-content: center;
    margin: 0;
  }

  .location-topline {
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .directions-link {
    display: flex;
    width: fit-content;
    justify-content: center;
    margin: 0 auto 14px;
  }

  .map-address-chip {
    right: 50%;
    left: auto;
    width: max-content;
    max-width: calc(100% - 22px);
    transform: translateX(50%);
  }

  .map-frame {
    height: 245px;
  }

  .map-address-chip {
    bottom: 11px;
    right: 50%;
    left: auto;
    padding: 7px 9px;
    transform: translateX(50%);
  }

  .contact-page {
    padding-bottom: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .contact-detail-card,
  .contact-button {
    transition: none;
  }
}
</style>
