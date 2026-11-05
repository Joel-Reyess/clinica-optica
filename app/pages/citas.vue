<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

useHead({
  title: 'Solicitar cita | Clínica Óptica',
  meta: [
    {
      name: 'description',
      content: 'Elige tu día y horario preferidos para una cita de salud visual en Clínica Óptica.'
    }
  ]
})

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
const monthFormatter = new Intl.DateTimeFormat('es-MX', {
  month: 'long',
  year: 'numeric'
})
const today = new Date()
today.setHours(0, 0, 0, 0)
const visibleMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const selectedDate = ref('')
const dateError = ref('')
const serviceError = ref('')
const showPreview = ref(false)
const appointmentPrivacy = ref(false)
const serviceSelect = ref<HTMLElement | null>(null)
const serviceMenuOpen = ref(false)
const activeServiceIndex = ref(0)
const patientStatuses = [
  { value: 'new', label: 'Paciente nuevo', icon: 'i-lucide-user-round-plus' },
  { value: 'returning', label: 'Ya me he atendido', icon: 'i-lucide-user-round-check' }
]
const services = [
  'Examen de la vista',
  'Valoración visual',
  'Asesoría para elegir lentes',
  'Ajuste de armazón',
  'Otro servicio'
]
const appointment = reactive({
  name: '',
  phone: '',
  service: '',
  patientStatus: '',
  isMinor: false,
  responsibleName: '',
  responsiblePhone: '',
  time: ''
})

const monthTitle = computed(() => monthFormatter.format(visibleMonth.value))
const calendarCells = computed(() => {
  const year = visibleMonth.value.getFullYear()
  const month = visibleMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingDays = (firstDay.getDay() + 6) % 7

  return [
    ...Array.from({ length: leadingDays }, (_, index) => ({
      key: `empty-${index}`,
      date: null as Date | null,
      value: '',
      disabled: true
    })),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1)
      const value = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0')
      ].join('-')

      return {
        key: value,
        date,
        value,
        disabled: date < today || date.getDay() === 0
      }
    })
  ]
})

const selectedDateLabel = computed(() => {
  if (!selectedDate.value) return ''
  const [year, month, day] = selectedDate.value.split('-').map(Number)
  return dateFormatter.format(new Date(year!, month! - 1, day!))
})

function changeMonth(offset: number) {
  const nextMonth = new Date(
    visibleMonth.value.getFullYear(),
    visibleMonth.value.getMonth() + offset,
    1
  )
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  if (nextMonth < currentMonth) return
  visibleMonth.value = nextMonth
}

const isPreviousMonthDisabled = computed(() => {
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const previousMonth = new Date(
    visibleMonth.value.getFullYear(),
    visibleMonth.value.getMonth() - 1,
    1
  )
  return previousMonth < currentMonth
})

function openServiceMenu() {
  activeServiceIndex.value = Math.max(services.indexOf(appointment.service), 0)
  serviceMenuOpen.value = true
}

function chooseService(service: string) {
  appointment.service = service
  serviceError.value = ''
  serviceMenuOpen.value = false
}

function chooseDate(date: string) {
  selectedDate.value = date
  dateError.value = ''
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
      activeServiceIndex.value + direction + services.length
    ) % services.length
    return
  }

  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    openServiceMenu()
    activeServiceIndex.value = event.key === 'Home' ? 0 : services.length - 1
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (serviceMenuOpen.value) {
      chooseService(services[activeServiceIndex.value]!)
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
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', closeServiceMenuOnOutsideClick)
})

function previewAppointment() {
  if (!selectedDate.value) {
    dateError.value = 'Elige un día disponible para continuar.'
    return
  }

  if (!appointment.service) {
    serviceError.value = 'Selecciona el servicio que necesitas.'
    return
  }

  showPreview.value = true
}

function editAppointment() {
  showPreview.value = false
}
</script>

<template>
  <main class="appointment-page">
    <section
      class="appointment-hero"
      aria-labelledby="appointment-title"
    >
      <div class="appointment-hero-copy">
        <p class="appointment-eyebrow">
          <span class="appointment-eyebrow-dot" />
          Clínica Óptica · Coatzacoalcos
        </p>
        <h1 id="appointment-title">
          Tu salud visual empieza con una cita.
        </h1>
        <p>
          Elige el día y la hora que prefieres. Nuestro equipo revisará la agenda para confirmar tu espacio.
        </p>
        <div class="appointment-hero-points">
          <span>
            <UIcon
              name="i-lucide-calendar-check"
              aria-hidden="true"
            />
            Atención con cita
          </span>
          <span>
            <UIcon
              name="i-lucide-clock-3"
              aria-hidden="true"
            />
            Horario sujeto a confirmación
          </span>
        </div>
      </div>
      <div
        class="appointment-hero-art"
        aria-hidden="true"
      >
        <span class="appointment-art-orbit orbit-one" />
        <span class="appointment-art-orbit orbit-two" />
        <span class="appointment-art-card">
          <UIcon name="i-lucide-eye" />
          <span>
            <strong>Atención visual</strong>
            <small>cercana y profesional</small>
          </span>
        </span>
        <span class="appointment-art-calendar">
          <UIcon name="i-lucide-calendar-days" />
        </span>
        <span class="appointment-art-sparkle sparkle-one">✦</span>
        <span class="appointment-art-sparkle sparkle-two">✦</span>
      </div>
    </section>

    <section
      class="appointment-workspace"
      aria-label="Solicitud de cita"
    >
      <Transition
        name="appointment-view"
        mode="out-in"
      >
        <form
          v-if="!showPreview"
          key="form"
          class="appointment-form"
          @submit.prevent="previewAppointment"
        >
          <div class="appointment-form-heading">
            <span class="appointment-heading-icon">
              <UIcon
                name="i-lucide-notebook-pen"
                aria-hidden="true"
              />
            </span>
            <div>
              <p class="appointment-step-label">
                Solicitud de cita
              </p>
              <h2>Cuéntanos cómo podemos atenderte.</h2>
            </div>
            <span class="appointment-form-step">01 <i>/ 01</i></span>
          </div>

          <div class="appointment-fields">
            <label class="appointment-field">
              <span>Nombre del paciente <b>*</b></span>
              <span class="appointment-input-wrap">
                <UIcon
                  name="i-lucide-user-round"
                  aria-hidden="true"
                />
                <input
                  v-model.trim="appointment.name"
                  autocomplete="name"
                  name="name"
                  placeholder="Nombre completo"
                  required
                >
              </span>
            </label>

            <label class="appointment-field">
              <span>Teléfono o WhatsApp <b>*</b></span>
              <span class="appointment-input-wrap">
                <UIcon
                  name="i-lucide-phone"
                  aria-hidden="true"
                />
                <input
                  v-model.trim="appointment.phone"
                  autocomplete="tel"
                  name="phone"
                  type="tel"
                  placeholder="Tu número de contacto"
                  required
                >
              </span>
            </label>

            <div class="appointment-field">
              <span id="appointment-service-label">Servicio que necesitas <b>*</b></span>
              <span class="appointment-input-wrap">
                <UIcon
                  name="i-lucide-eye"
                  aria-hidden="true"
                />
                <span
                  ref="serviceSelect"
                  class="appointment-service-select"
                  :class="{ 'is-open': serviceMenuOpen, 'has-error': serviceError }"
                >
                  <button
                    id="appointment-service"
                    class="appointment-service-trigger"
                    type="button"
                    role="combobox"
                    aria-labelledby="appointment-service-label"
                    aria-haspopup="listbox"
                    aria-controls="appointment-service-options"
                    aria-required="true"
                    :aria-expanded="serviceMenuOpen"
                    :aria-activedescendant="serviceMenuOpen ? `appointment-service-option-${activeServiceIndex}` : undefined"
                    :aria-invalid="Boolean(serviceError)"
                    @click="serviceMenuOpen ? (serviceMenuOpen = false) : openServiceMenu()"
                    @keydown="handleServiceKeydown"
                  >
                    <span>{{ appointment.service || 'Selecciona un servicio' }}</span>
                    <UIcon
                      class="appointment-select-chevron"
                      name="i-lucide-chevron-down"
                      aria-hidden="true"
                    />
                  </button>
                  <Transition name="appointment-service-menu">
                    <ul
                      v-if="serviceMenuOpen"
                      id="appointment-service-options"
                      class="appointment-service-options"
                      role="listbox"
                      aria-label="Servicio de la cita"
                    >
                      <li
                        v-for="(service, index) in services"
                        :id="`appointment-service-option-${index}`"
                        :key="service"
                        class="appointment-service-option"
                        :class="{
                          'is-active': activeServiceIndex === index,
                          'is-selected': appointment.service === service
                        }"
                        role="option"
                        :aria-selected="appointment.service === service"
                        @pointerenter="activeServiceIndex = index"
                        @click="chooseService(service)"
                      >
                        <span>{{ service }}</span>
                        <UIcon
                          v-if="appointment.service === service"
                          name="i-lucide-check"
                          aria-hidden="true"
                        />
                      </li>
                    </ul>
                  </Transition>
                  <input
                    type="hidden"
                    name="service"
                    :value="appointment.service"
                  >
                </span>
              </span>
              <small
                v-if="serviceError"
                class="appointment-field-error"
                role="alert"
              >
                {{ serviceError }}
              </small>
            </div>

            <fieldset class="appointment-field appointment-status-field">
              <legend>¿Ya te has atendido con nosotros? <b>*</b></legend>
              <div class="appointment-status-options">
                <label
                  v-for="status in patientStatuses"
                  :key="status.value"
                  class="appointment-status-option"
                  :class="{ 'is-selected': appointment.patientStatus === status.value }"
                >
                  <input
                    v-model="appointment.patientStatus"
                    type="radio"
                    name="patient-status"
                    :value="status.value"
                    required
                  >
                  <UIcon
                    :name="status.icon"
                    aria-hidden="true"
                  />
                  <span>{{ status.label }}</span>
                  <UIcon
                    class="status-check"
                    name="i-lucide-circle-check"
                    aria-hidden="true"
                  />
                </label>
              </div>
            </fieldset>

            <label class="appointment-minor-toggle">
              <input
                v-model="appointment.isMinor"
                type="checkbox"
                name="isMinor"
              >
              <span class="appointment-toggle-box">
                <UIcon
                  name="i-lucide-check"
                  aria-hidden="true"
                />
              </span>
              <span>
                <strong>La cita es para un menor de edad</strong>
                <small>Agregaremos los datos de su madre, padre o responsable.</small>
              </span>
            </label>

            <div
              v-if="appointment.isMinor"
              class="appointment-responsible-fields"
            >
              <label class="appointment-field">
                <span>Nombre del responsable <b>*</b></span>
                <span class="appointment-input-wrap">
                  <UIcon
                    name="i-lucide-user-round"
                    aria-hidden="true"
                  />
                  <input
                    v-model.trim="appointment.responsibleName"
                    autocomplete="name"
                    name="responsibleName"
                    placeholder="Nombre de madre, padre o responsable"
                    required
                  >
                </span>
              </label>
              <label class="appointment-field">
                <span>Teléfono del responsable <b>*</b></span>
                <span class="appointment-input-wrap">
                  <UIcon
                    name="i-lucide-phone"
                    aria-hidden="true"
                  />
                  <input
                    v-model.trim="appointment.responsiblePhone"
                    autocomplete="tel"
                    name="responsiblePhone"
                    type="tel"
                    placeholder="Teléfono de contacto"
                    required
                  >
                </span>
              </label>
            </div>
          </div>

          <div class="appointment-date-layout">
            <div class="appointment-calendar-card">
              <div class="appointment-section-heading">
                <span class="appointment-section-icon">
                  <UIcon
                    name="i-lucide-calendar-days"
                    aria-hidden="true"
                  />
                </span>
                <span>
                  <strong>Elige el día que prefieres</strong>
                  <small>Los domingos no laboramos</small>
                </span>
              </div>
              <div class="appointment-calendar">
                <div class="calendar-month">
                  <button
                    type="button"
                    aria-label="Mes anterior"
                    :disabled="isPreviousMonthDisabled"
                    @click="changeMonth(-1)"
                  >
                    <UIcon
                      name="i-lucide-chevron-left"
                      aria-hidden="true"
                    />
                  </button>
                  <h3>{{ monthTitle }}</h3>
                  <button
                    type="button"
                    aria-label="Mes siguiente"
                    @click="changeMonth(1)"
                  >
                    <UIcon
                      name="i-lucide-chevron-right"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div
                  class="calendar-grid calendar-weekdays"
                  aria-hidden="true"
                >
                  <span
                    v-for="(weekday, index) in ['L', 'M', 'M', 'J', 'V', 'S', 'D']"
                    :key="index"
                  >
                    {{ weekday }}
                  </span>
                </div>
                <div class="calendar-grid calendar-days">
                  <span
                    v-for="cell in calendarCells"
                    :key="cell.key"
                    class="calendar-cell"
                    :class="{
                      'is-empty': !cell.date,
                      'is-disabled': cell.disabled,
                      'is-selected': selectedDate === cell.value
                    }"
                  >
                    <button
                      v-if="cell.date"
                      type="button"
                      :disabled="cell.disabled"
                      :aria-label="dateFormatter.format(cell.date)"
                      :aria-pressed="selectedDate === cell.value"
                      @click="chooseDate(cell.value)"
                    >
                      {{ cell.date.getDate() }}
                    </button>
                  </span>
                </div>
              </div>
              <p
                class="calendar-legend"
                :class="{ 'has-error': dateError }"
                aria-live="polite"
              >
                <span class="legend-dot" />
                {{ dateError || 'Domingo no disponible' }}
              </p>
            </div>

            <div class="appointment-time-card">
              <div class="appointment-section-heading">
                <span class="appointment-section-icon">
                  <UIcon
                    name="i-lucide-clock-3"
                    aria-hidden="true"
                  />
                </span>
                <span>
                  <strong>Elige una hora preferida</strong>
                  <small>El equipo confirmará disponibilidad</small>
                </span>
              </div>
              <label class="appointment-field appointment-time-field">
                <span>Horario preferido <b>*</b></span>
                <span class="appointment-input-wrap">
                  <UIcon
                    name="i-lucide-clock-3"
                    aria-hidden="true"
                  />
                  <input
                    v-model="appointment.time"
                    name="time"
                    type="time"
                    required
                  >
                </span>
              </label>
              <div
                class="appointment-date-summary"
                :class="{ 'has-date': selectedDate }"
              >
                <UIcon
                  :name="selectedDate ? 'i-lucide-calendar-check' : 'i-lucide-calendar-clock'"
                  aria-hidden="true"
                />
                <span>
                  <small>{{ selectedDate ? 'Día seleccionado' : 'Tu día preferido' }}</small>
                  <strong>{{ selectedDateLabel || 'Selecciona una fecha en el calendario' }}</strong>
                </span>
              </div>
              <p class="appointment-time-note">
                La hora que elijas es una preferencia, no una reserva automática.
              </p>
            </div>
          </div>

          <label class="appointment-privacy-note">
            <input
              v-model="appointmentPrivacy"
              type="checkbox"
              required
            >
            <span class="appointment-privacy-check">
              <UIcon
                name="i-lucide-check"
                aria-hidden="true"
              />
            </span>
            <span>
              He leído el aviso de privacidad para esta demostración.
              <NuxtLink to="/contacto">Aviso de privacidad</NuxtLink>
            </span>
          </label>

          <div class="appointment-submit-row">
            <button
              class="appointment-submit-button"
              type="submit"
            >
              Ver confirmación de ejemplo
              <UIcon
                name="i-lucide-arrow-right"
                aria-hidden="true"
              />
            </button>
            <p>
              <UIcon
                name="i-lucide-info"
                aria-hidden="true"
              />
              Vista de demostración: esta solicitud no se guarda ni se envía.
            </p>
          </div>
        </form>

        <section
          v-else
          key="preview"
          class="appointment-confirmation"
          aria-labelledby="appointment-confirmation-title"
          aria-live="polite"
        >
          <span class="confirmation-icon">
            <UIcon
              name="i-lucide-calendar-clock"
              aria-hidden="true"
            />
          </span>
          <p class="appointment-step-label">
            Vista previa de confirmación
          </p>
          <h2 id="appointment-confirmation-title">
            Tu cita está pendiente de confirmación.
          </h2>
          <p class="confirmation-copy">
            El equipo revisará el horario solicitado y confirmará el espacio o te propondrá otra opción. La reserva solo quedaría registrada después de acordar la disponibilidad.
          </p>
          <div class="confirmation-summary">
            <div>
              <span>Paciente</span>
              <strong>{{ appointment.name }}</strong>
            </div>
            <div>
              <span>Servicio</span>
              <strong>{{ appointment.service }}</strong>
            </div>
            <div>
              <span>Día preferido</span>
              <strong>{{ selectedDateLabel }}</strong>
            </div>
            <div>
              <span>Horario preferido</span>
              <strong>{{ appointment.time }}</strong>
            </div>
          </div>
          <p class="confirmation-demo-note">
            <UIcon
              name="i-lucide-info"
              aria-hidden="true"
            />
            Esta es solo una demostración visual. No hemos guardado ni enviado tu solicitud.
          </p>
          <button
            class="appointment-submit-button"
            type="button"
            @click="editAppointment"
          >
            <UIcon
              name="i-lucide-arrow-left"
              aria-hidden="true"
            />
            Volver al formulario
          </button>
        </section>
      </Transition>

      <aside class="appointment-process">
        <div class="appointment-process-heading">
          <span class="appointment-process-icon">
            <UIcon
              name="i-lucide-clipboard-check"
              aria-hidden="true"
            />
          </span>
          <div>
            <p>¿Qué sigue?</p>
            <h2>Coordinamos contigo.</h2>
          </div>
        </div>
        <ol>
          <li>
            <span>01</span>
            <p>Revisamos la agenda y tu horario preferido.</p>
          </li>
          <li>
            <span>02</span>
            <p>Confirmamos el espacio o proponemos otra hora.</p>
          </li>
          <li>
            <span>03</span>
            <p>Al acordarlo, te compartimos ubicación e indicaciones.</p>
          </li>
        </ol>
        <p class="appointment-reminder-note">
          <UIcon
            name="i-lucide-bell-ring"
            aria-hidden="true"
          />
          Los recordatorios se definirán más adelante.
        </p>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.appointment-page {
  --appointment-navy: #102b4a;
  --appointment-blue: #315e85;
  --appointment-muted: #687b8e;
  min-height: 100vh;
  padding: 40px 24px 80px;
  background:
    radial-gradient(ellipse at 85% 5%, rgb(49 94 133 / 8%), transparent 31%),
    #f3f6f8;
  color: var(--appointment-navy);
}

.appointment-hero,
.appointment-workspace {
  width: min(1120px, 100%);
  margin-inline: auto;
}

.appointment-hero {
  position: relative;
  display: grid;
  min-height: 280px;
  grid-template-columns: minmax(0, 1fr) 300px;
  align-items: center;
  gap: 30px;
  overflow: hidden;
  border: 1px solid #e1e8ee;
  border-radius: 24px;
  padding: 35px 48px;
  background:
    radial-gradient(ellipse at 92% 8%, rgb(255 255 255 / 14%), transparent 40%),
    linear-gradient(120deg, #102b4a, #1a4168 68%, #315e85);
  box-shadow: 0 20px 48px rgb(16 43 74 / 14%);
  color: #fff;
}

.appointment-hero-copy {
  position: relative;
  z-index: 1;
  max-width: 630px;
}

.appointment-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: #d5e2ed;
  font-size: 0.7rem;
  font-weight: 750;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.appointment-eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c5d9e8;
  box-shadow: 0 0 0 4px rgb(197 217 232 / 13%);
}

.appointment-hero h1 {
  max-width: 640px;
  margin: 18px 0 0;
  color: #fff;
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 830;
  letter-spacing: -0.06em;
  line-height: 1.02;
}

.appointment-hero-copy > p:last-of-type {
  max-width: 550px;
  margin: 16px 0 0;
  color: #d3deea;
  font-size: 0.88rem;
  line-height: 1.7;
}

.appointment-hero-points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 21px;
}

.appointment-hero-points span {
  display: inline-flex;
  min-height: 35px;
  align-items: center;
  gap: 7px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 999px;
  padding: 7px 11px;
  background: rgb(255 255 255 / 8%);
  color: #f0f5f8;
  font-size: 0.66rem;
  font-weight: 650;
}

.appointment-hero-points :deep(.iconify) {
  width: 15px;
  height: 15px;
  color: #d5e5f1;
}

.appointment-hero-art {
  position: relative;
  display: grid;
  min-height: 220px;
  place-items: center;
}

.appointment-art-orbit {
  position: absolute;
  aspect-ratio: 1;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 50%;
}

.orbit-one {
  width: 190px;
}

.orbit-two {
  width: 138px;
  border-color: rgb(255 255 255 / 22%);
  background: rgb(255 255 255 / 5%);
}

.appointment-art-card {
  position: absolute;
  right: 8px;
  bottom: 18px;
  display: flex;
  align-items: center;
  gap: 9px;
  border: 1px solid rgb(255 255 255 / 24%);
  border-radius: 13px;
  padding: 11px 14px;
  background: rgb(255 255 255 / 13%);
  box-shadow: 0 9px 24px rgb(0 0 0 / 13%);
  backdrop-filter: blur(9px);
}

.appointment-art-card > :deep(.iconify) {
  width: 29px;
  height: 29px;
}

.appointment-art-card > span {
  display: grid;
  gap: 3px;
}

.appointment-art-card strong {
  font-size: 0.71rem;
}

.appointment-art-card small {
  color: #d4e1ec;
  font-size: 0.6rem;
}

.appointment-art-calendar {
  position: relative;
  display: grid;
  width: 90px;
  height: 90px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 30%);
  border-radius: 25px;
  background: linear-gradient(145deg, rgb(255 255 255 / 23%), rgb(255 255 255 / 8%));
  box-shadow: 0 17px 36px rgb(0 0 0 / 18%);
  color: #fff;
  transform: rotate(-8deg);
}

.appointment-art-calendar :deep(.iconify) {
  width: 43px;
  height: 43px;
}

.appointment-art-sparkle {
  position: absolute;
  color: #deebf4;
}

.sparkle-one {
  top: 24px;
  right: 44px;
  font-size: 1.3rem;
}

.sparkle-two {
  bottom: 60px;
  left: 31px;
  font-size: 0.85rem;
}

.appointment-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  align-items: start;
  gap: 20px;
  margin-top: 22px;
}

.appointment-form,
.appointment-confirmation,
.appointment-process {
  border: 1px solid #e0e7ed;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 10px 30px rgb(16 43 74 / 6%);
}

.appointment-form {
  display: grid;
  gap: 22px;
  padding: 26px;
}

.appointment-form-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 17px;
  border-bottom: 1px solid #e8edf1;
}

.appointment-heading-icon,
.appointment-section-icon,
.appointment-process-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #dce6ed;
  border-radius: 12px;
  background: #edf3f7;
  color: #315e85;
}

.appointment-heading-icon {
  width: 43px;
  height: 43px;
}

.appointment-heading-icon :deep(.iconify) {
  width: 21px;
  height: 21px;
}

.appointment-step-label {
  margin: 0 0 4px;
  color: #77899a;
  font-size: 0.59rem;
  font-weight: 780;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.appointment-form-heading h2 {
  margin: 0;
  color: var(--appointment-navy);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.appointment-form-step {
  margin-left: auto;
  color: #315e85;
  font-size: 0.74rem;
  font-weight: 800;
}

.appointment-form-step i {
  color: #9aabb9;
  font-size: 0.64rem;
  font-style: normal;
}

.appointment-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px 13px;
}

.appointment-field {
  display: grid;
  min-width: 0;
  align-content: start;
  gap: 7px;
  color: #344e66;
  font-size: 0.69rem;
  font-weight: 750;
}

.appointment-field b,
.appointment-status-field b {
  color: #a45148;
}

.appointment-input-wrap {
  position: relative;
  display: flex;
  min-width: 0;
  align-items: center;
}

.appointment-input-wrap > :deep(.iconify:first-child) {
  position: absolute;
  z-index: 1;
  left: 13px;
  width: 17px;
  height: 17px;
  color: #668097;
  pointer-events: none;
}

.appointment-input-wrap input,
.appointment-input-wrap select,
.appointment-service-trigger {
  width: 100%;
  min-width: 0;
  min-height: 47px;
  border: 1px solid #d0dce6;
  border-radius: 11px;
  padding: 10px 12px 10px 40px;
  background: #f8fafb;
  color: #183753;
  font: inherit;
  font-size: 0.77rem;
  transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
}

.appointment-input-wrap input::placeholder {
  color: #8292a0;
  opacity: 1;
}

.appointment-input-wrap input:hover,
.appointment-input-wrap select:hover,
.appointment-service-trigger:hover {
  border-color: #9bb0c2;
  background-color: #fff;
}

.appointment-input-wrap input:focus,
.appointment-input-wrap select:focus,
.appointment-service-trigger:focus-visible {
  border-color: #315e85;
  outline: none;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgb(49 94 133 / 12%);
}

.appointment-input-wrap select {
  appearance: none;
  cursor: pointer;
  padding-right: 38px;
}

.appointment-service-select {
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
}

.appointment-service-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px 10px 40px;
  background-color: #f8fafb;
  color: #183753;
  cursor: pointer;
  font: inherit;
  font-size: 0.77rem;
  text-align: left;
}

.appointment-service-trigger > span {
  min-width: 0;
}

.appointment-service-trigger > :deep(.iconify) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.appointment-input-wrap .appointment-select-chevron {
  position: absolute;
  right: 12px;
  width: 16px;
  height: 16px;
  color: #56728d;
  pointer-events: none;
}

.appointment-service-options {
  position: absolute;
  z-index: 6;
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

.appointment-service-option {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: 9px;
  padding: 9px 11px;
  color: #344c63;
  cursor: pointer;
  font-size: 0.73rem;
  line-height: 1.35;
  transition: background-color 120ms ease, color 120ms ease;
}

.appointment-service-option:hover,
.appointment-service-option.is-active {
  background: #edf3f8;
  color: #102b4a;
}

.appointment-service-option.is-selected {
  background: #e6eef5;
  color: #102b4a;
  font-weight: 750;
}

.appointment-service-option :deep(.iconify) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: #315e85;
}

.appointment-service-menu-enter-active,
.appointment-service-menu-leave-active {
  transform-origin: top center;
  transition: opacity 120ms ease, transform 120ms ease;
}

.appointment-service-menu-enter-from,
.appointment-service-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px) scaleY(0.98);
}

.appointment-service-select.has-error .appointment-service-trigger {
  border-color: #b05e54;
  box-shadow: 0 0 0 3px rgb(176 94 84 / 11%);
}

.appointment-field-error {
  color: #a14f48;
  font-size: 0.61rem;
}

.appointment-status-field {
  min-width: 0;
  margin: 0;
  border: 0;
  padding: 0;
}

.appointment-status-field legend {
  margin-bottom: 7px;
  color: #344e66;
  font-size: 0.69rem;
  font-weight: 750;
}

.appointment-status-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.appointment-status-option {
  position: relative;
  display: flex;
  min-height: 47px;
  align-items: center;
  gap: 8px;
  border: 1px solid #d6e0e8;
  border-radius: 11px;
  padding: 9px 10px;
  background: #f8fafb;
  color: #50657a;
  cursor: pointer;
  font-size: 0.67rem;
  transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
}

.appointment-status-option:hover {
  border-color: #a9bac9;
  background: #fff;
}

.appointment-status-option.is-selected {
  border-color: #6483a0;
  background: #eef4f8;
  box-shadow: inset 0 0 0 1px rgb(49 94 133 / 10%);
  color: #193c5e;
}

.appointment-status-option input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.appointment-status-option > :deep(.iconify:first-of-type) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: #547591;
}

.appointment-status-option .status-check {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  margin-left: auto;
  color: #315e85;
  opacity: 0;
}

.appointment-status-option.is-selected .status-check {
  opacity: 1;
}

.appointment-status-option:focus-within {
  outline: 3px solid rgb(49 94 133 / 19%);
  outline-offset: 2px;
}

.appointment-minor-toggle,
.appointment-privacy-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #dce5ec;
  border-radius: 12px;
  padding: 12px;
  background: #f7f9fb;
  cursor: pointer;
}

.appointment-minor-toggle {
  grid-column: 1 / -1;
}

.appointment-minor-toggle input,
.appointment-privacy-note input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.appointment-toggle-box,
.appointment-privacy-check {
  display: grid;
  width: 19px;
  height: 19px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #afbfcd;
  border-radius: 5px;
  background: #fff;
  color: #fff;
  transition: background-color 140ms ease, border-color 140ms ease;
}

.appointment-toggle-box :deep(.iconify),
.appointment-privacy-check :deep(.iconify) {
  width: 13px;
  height: 13px;
  opacity: 0;
}

.appointment-minor-toggle input:checked + .appointment-toggle-box,
.appointment-privacy-note input:checked + .appointment-privacy-check {
  border-color: #315e85;
  background: #315e85;
}

.appointment-minor-toggle input:checked + .appointment-toggle-box :deep(.iconify),
.appointment-privacy-note input:checked + .appointment-privacy-check :deep(.iconify) {
  opacity: 1;
}

.appointment-minor-toggle input:focus-visible + .appointment-toggle-box,
.appointment-privacy-note input:focus-visible + .appointment-privacy-check {
  outline: 3px solid rgb(49 94 133 / 20%);
  outline-offset: 2px;
}

.appointment-minor-toggle > span:last-child {
  display: grid;
  gap: 4px;
}

.appointment-minor-toggle strong {
  color: #27435d;
  font-size: 0.69rem;
}

.appointment-minor-toggle small {
  color: #748697;
  font-size: 0.63rem;
  line-height: 1.45;
}

.appointment-responsible-fields {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px;
  border-left: 3px solid #9eb5c8;
  padding-left: 13px;
}

.appointment-date-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(230px, 0.9fr);
  align-items: stretch;
  gap: 13px;
}

.appointment-calendar-card,
.appointment-time-card {
  min-width: 0;
  border: 1px solid #dfe7ed;
  border-radius: 14px;
  padding: 15px;
  background:
    radial-gradient(circle at 100% 0, rgb(49 94 133 / 5%), transparent 35%),
    #fbfcfd;
}

.appointment-section-heading {
  display: flex;
  align-items: center;
  gap: 9px;
}

.appointment-section-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
}

.appointment-section-icon :deep(.iconify) {
  width: 17px;
  height: 17px;
}

.appointment-section-heading > span:last-child {
  display: grid;
  gap: 3px;
}

.appointment-section-heading strong {
  color: #213f5b;
  font-size: 0.7rem;
  font-weight: 780;
}

.appointment-section-heading small {
  color: #748697;
  font-size: 0.6rem;
}

.appointment-calendar {
  margin-top: 12px;
  border: 1px solid #e4ebf0;
  border-radius: 11px;
  padding: 9px;
  background: #fff;
}

.calendar-month {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.calendar-month h3 {
  margin: 0;
  color: #213f5b;
  font-size: 0.71rem;
  font-weight: 800;
  text-transform: capitalize;
}

.calendar-month button {
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: #426380;
  cursor: pointer;
}

.calendar-month button:hover:not(:disabled) {
  border-color: #dbe5ec;
  background: #f0f4f7;
}

.calendar-month button:disabled {
  color: #c5cfd7;
  cursor: not-allowed;
}

.calendar-month button :deep(.iconify) {
  width: 16px;
  height: 16px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  justify-items: center;
}

.calendar-weekdays {
  margin-bottom: 3px;
  color: #8a9aa8;
  font-size: 0.58rem;
  font-weight: 800;
}

.calendar-weekdays span {
  display: grid;
  width: 29px;
  height: 25px;
  place-items: center;
}

.calendar-weekdays span:last-child {
  color: #bd8b83;
}

.calendar-days {
  row-gap: 2px;
}

.calendar-cell {
  display: grid;
  width: 29px;
  height: 29px;
  place-items: center;
}

.calendar-cell button {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: #36516a;
  cursor: pointer;
  font: inherit;
  font-size: 0.65rem;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
}

.calendar-cell button:hover:not(:disabled) {
  border-color: #c6d5e1;
  background: #eef4f8;
}

.calendar-cell.is-selected button,
.calendar-cell button[aria-pressed="true"] {
  border-color: #173c60;
  background: #173c60;
  box-shadow: 0 3px 8px rgb(16 43 74 / 18%);
  color: #fff;
  font-weight: 800;
}

.calendar-cell.is-disabled button {
  color: #c3cbd2;
  cursor: not-allowed;
}

.calendar-cell.is-disabled button:not([aria-pressed="true"]) {
  text-decoration: line-through;
  text-decoration-color: #d6dce1;
}

.calendar-legend {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 1px 0;
  color: #8595a3;
  font-size: 0.58rem;
}

.calendar-legend.has-error {
  color: #a14f48;
}

.calendar-legend.has-error .legend-dot {
  background: #b05e54;
}

.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c3cbd2;
}

.appointment-time-card {
  display: flex;
  flex-direction: column;
}

.appointment-time-field {
  margin-top: 17px;
}

.appointment-time-field .appointment-input-wrap input {
  min-height: 49px;
}

.appointment-date-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  border: 1px dashed #d3dee7;
  border-radius: 11px;
  padding: 10px;
  background: #fff;
  color: #8092a1;
}

.appointment-date-summary.has-date {
  border-style: solid;
  border-color: #bfd0de;
  background: #eef4f8;
  color: #315e85;
}

.appointment-date-summary > :deep(.iconify) {
  width: 19px;
  height: 19px;
  flex: 0 0 auto;
}

.appointment-date-summary > span {
  display: grid;
  gap: 3px;
}

.appointment-date-summary small {
  color: #8494a1;
  font-size: 0.57rem;
}

.appointment-date-summary strong {
  color: #284864;
  font-size: 0.65rem;
  font-weight: 750;
  line-height: 1.4;
}

.appointment-time-note {
  margin: auto 0 0;
  padding-top: 13px;
  color: #7b8b99;
  font-size: 0.6rem;
  line-height: 1.5;
}

.appointment-privacy-note {
  align-items: center;
  background: #fbfcfd;
  color: #66798b;
  font-size: 0.65rem;
  line-height: 1.5;
}

.appointment-privacy-note a {
  color: #315e85;
  font-weight: 750;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.appointment-submit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.appointment-submit-button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px solid #102b4a;
  border-radius: 10px;
  padding: 11px 16px;
  background: #102b4a;
  box-shadow: 0 6px 16px rgb(16 43 74 / 16%);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.7rem;
  font-weight: 750;
  transition: background-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;
}

.appointment-submit-button:hover {
  transform: translateY(-1px);
  background: #1a4168;
  box-shadow: 0 9px 20px rgb(16 43 74 / 21%);
}

.appointment-submit-button :deep(.iconify) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.appointment-submit-row > p {
  display: flex;
  max-width: 270px;
  align-items: flex-start;
  gap: 6px;
  margin: 0;
  color: #758695;
  font-size: 0.59rem;
  line-height: 1.5;
}

.appointment-submit-row > p :deep(.iconify) {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  color: #607b94;
}

.appointment-process {
  padding: 19px 17px;
}

.appointment-process-heading {
  display: flex;
  align-items: center;
  gap: 10px;
}

.appointment-process-icon {
  width: 39px;
  height: 39px;
}

.appointment-process-icon :deep(.iconify) {
  width: 20px;
  height: 20px;
}

.appointment-process-heading p {
  margin: 0 0 3px;
  color: #7b8b99;
  font-size: 0.59rem;
  font-weight: 750;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.appointment-process-heading h2 {
  margin: 0;
  color: #173753;
  font-size: 0.92rem;
  font-weight: 800;
}

.appointment-process ol {
  display: grid;
  gap: 17px;
  margin: 22px 0;
  padding: 0;
  list-style: none;
}

.appointment-process li {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  align-items: start;
  gap: 9px;
}

.appointment-process li > span {
  display: grid;
  width: 29px;
  height: 29px;
  place-items: center;
  border: 1px solid #d9e3eb;
  border-radius: 9px;
  background: #f0f4f7;
  color: #42627f;
  font-size: 0.58rem;
  font-weight: 800;
}

.appointment-process li p {
  margin: 2px 0 0;
  color: #5c7082;
  font-size: 0.66rem;
  line-height: 1.5;
}

.appointment-reminder-note {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin: 0;
  border-top: 1px solid #e6edf1;
  padding-top: 13px;
  color: #7a8a98;
  font-size: 0.6rem;
  line-height: 1.5;
}

.appointment-reminder-note :deep(.iconify) {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  color: #607b94;
}

.appointment-confirmation {
  display: grid;
  justify-items: start;
  padding: clamp(24px, 5vw, 48px);
}

.confirmation-icon {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border: 1px solid #cbdce8;
  border-radius: 18px;
  background: #edf4f8;
  color: #315e85;
}

.confirmation-icon :deep(.iconify) {
  width: 28px;
  height: 28px;
}

.appointment-confirmation .appointment-step-label {
  margin-top: 22px;
}

.appointment-confirmation h2 {
  max-width: 550px;
  margin: 0;
  color: #102b4a;
  font-size: clamp(1.7rem, 4vw, 2.5rem);
  font-weight: 830;
  letter-spacing: -0.05em;
  line-height: 1.08;
}

.confirmation-copy {
  max-width: 570px;
  margin: 13px 0 0;
  color: #687b8e;
  font-size: 0.8rem;
  line-height: 1.7;
}

.confirmation-summary {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 23px;
}

.confirmation-summary > div {
  display: grid;
  gap: 5px;
  border: 1px solid #e1e8ed;
  border-radius: 11px;
  padding: 12px;
  background: #f8fafb;
}

.confirmation-summary span {
  color: #82919e;
  font-size: 0.59rem;
  font-weight: 700;
}

.confirmation-summary strong {
  color: #284864;
  font-size: 0.7rem;
}

.confirmation-demo-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 16px 0 20px;
  border: 1px solid #e7dcc4;
  border-radius: 10px;
  padding: 11px;
  background: #fcf8ef;
  color: #786548;
  font-size: 0.65rem;
  line-height: 1.5;
}

.confirmation-demo-note :deep(.iconify) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.appointment-view-enter-active,
.appointment-view-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.appointment-view-enter-from,
.appointment-view-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

@media (max-width: 900px) {
  .appointment-hero {
    grid-template-columns: minmax(0, 1fr) 220px;
    padding: 30px;
  }

  .appointment-workspace {
    grid-template-columns: minmax(0, 1fr) 225px;
    gap: 14px;
  }

  .appointment-form {
    padding: 20px;
  }

  .appointment-date-layout {
    grid-template-columns: 1fr;
  }

  .appointment-service-options {
    position: static;
    max-height: none;
    margin-top: 7px;
    box-shadow: 0 7px 18px rgb(10 32 54 / 9%);
  }

  .appointment-time-card {
    min-height: 200px;
  }
}

@media (max-width: 680px) {
  .appointment-page {
    padding: 18px 14px 48px;
  }

  .appointment-hero {
    min-height: 0;
    grid-template-columns: 1fr;
    gap: 8px;
    border-radius: 18px;
    padding: 25px 21px 14px;
  }

  .appointment-hero h1 {
    margin-top: 14px;
    font-size: clamp(2rem, 9vw, 2.8rem);
  }

  .appointment-hero-copy > p:last-of-type {
    margin-top: 11px;
    font-size: 0.78rem;
  }

  .appointment-hero-points {
    gap: 7px;
    margin-top: 14px;
  }

  .appointment-hero-points span {
    font-size: 0.58rem;
  }

  .appointment-hero-art {
    display: none;
  }

  .appointment-workspace {
    grid-template-columns: 1fr;
    gap: 13px;
    margin-top: 14px;
  }

  .appointment-form {
    gap: 18px;
    border-radius: 15px;
    padding: 17px 14px;
  }

  .appointment-form-heading {
    gap: 10px;
    padding-bottom: 13px;
  }

  .appointment-heading-icon {
    width: 38px;
    height: 38px;
  }

  .appointment-form-heading h2 {
    font-size: 0.94rem;
  }

  .appointment-fields,
  .appointment-responsible-fields {
    grid-template-columns: 1fr;
    gap: 13px;
  }

  .appointment-status-options {
    grid-template-columns: 1fr;
  }

  .appointment-input-wrap input,
  .appointment-input-wrap select,
  .appointment-service-trigger {
    min-height: 48px;
    font-size: 0.8rem;
  }

  .appointment-date-layout {
    grid-template-columns: 1fr;
  }

  .appointment-calendar-card,
  .appointment-time-card {
    padding: 13px;
  }

  .appointment-time-card {
    min-height: 0;
  }

  .appointment-time-note {
    margin-top: 12px;
  }

  .appointment-submit-row {
    align-items: stretch;
    flex-direction: column;
    gap: 9px;
  }

  .appointment-submit-button {
    width: 100%;
    min-height: 49px;
  }

  .appointment-submit-row > p {
    max-width: none;
  }

  .appointment-process {
    position: static;
    border-radius: 15px;
  }

  .appointment-process ol {
    gap: 13px;
    margin: 17px 0;
  }

  .appointment-confirmation {
    padding: 24px 18px;
  }

  .confirmation-summary {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
