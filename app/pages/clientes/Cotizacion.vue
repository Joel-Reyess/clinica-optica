<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  getPrescriptionDraft,
  getQuoteRequestDraft,
  setPrescriptionDraft,
  setQuoteRequestDraft
} from '~/utils/prescriptionDraft'

useHead({
  title: 'Cotizar lentes graduados | Clínica Óptica',
  meta: [
    {
      name: 'description',
      content: 'Prepara una solicitud de cotización de lentes graduados con o sin receta y compártela con Clínica Óptica por WhatsApp.'
    }
  ]
})

const route = useRoute()
const sharedPrescription = getPrescriptionDraft()
const whatsappNumber = '529211371704'
const contactOptions = [
  { value: 'with-frame', label: 'Armazón con micas graduadas' },
  { value: 'own-frame', label: 'Cambio de micas en un armazón propio' }
]
const visionOptions = [
  { value: 'has-prescription', label: 'Tengo receta' },
  { value: 'needs-exam', label: 'Necesito una evaluación' },
  { value: 'previous-patient', label: 'Ya me atendieron en Clínica Óptica' }
]
const lensTypes = [
  'Monofocal',
  'Bifocal',
  'Progresivo',
  'Necesito asesoría'
]
const lensTreatments = [
  'Antirreflejante',
  'Filtro azul',
  'Fotocromático',
  'Polarizado',
  'Necesito asesoría'
]

function queryText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

const selectedCategory = computed(() => queryText(route.query.categoria))
const modelName = computed(() => queryText(route.query.modelo))
const modelCode = computed(() => queryText(route.query.codigo))
const modelColor = computed(() => queryText(route.query.color))
const categoryLabels: Record<string, string> = {
  'clasicos': 'Clásicos',
  'modernos': 'Modernos',
  'seguridad-graduada': 'Seguridad graduada'
}
const selectedCategoryLabel = computed(
  () => categoryLabels[selectedCategory.value] ?? selectedCategory.value
)
const startWithPrescription = computed(
  () => Boolean(sharedPrescription) || route.query.receta === '1'
)

const form = reactive({
  frameOption: '',
  visionStatus: startWithPrescription.value ? 'has-prescription' : '',
  lensType: '',
  treatments: [] as string[],
  name: '',
  contact: '',
  requestReason: '',
  workRequirements: '',
  privacyAccepted: false
})
const prescription = ref<File | null>(sharedPrescription)
const prescriptionError = ref('')
const preparedUrl = ref('')

const needsPrescription = computed(() => form.visionStatus === 'has-prescription')

onMounted(() => {
  const requestDraft = getQuoteRequestDraft()
  if (!requestDraft) return

  form.name = requestDraft.name
  form.contact = requestDraft.contact
  form.requestReason = requestDraft.reason
  setQuoteRequestDraft(null)
})

function selectPrescription(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  prescriptionError.value = ''

  if (!file) {
    prescription.value = null
    setPrescriptionDraft(null)
    return
  }

  const isSupportedType = file.type === 'application/pdf'
    || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
  if (!isSupportedType) {
    prescription.value = null
    setPrescriptionDraft(null)
    input.value = ''
    prescriptionError.value = 'Elige una foto JPG, PNG, WEBP o un archivo PDF.'
    return
  }

  if (file.size > 10 * 1024 * 1024) {
    prescription.value = null
    setPrescriptionDraft(null)
    input.value = ''
    prescriptionError.value = 'El archivo no debe superar los 10 MB.'
    return
  }

  prescription.value = file
  setPrescriptionDraft(file)
}

function prepareQuoteRequest() {
  if (prescriptionError.value) return

  const requestLines = [
    'Tipo de solicitud: Cotización',
    form.requestReason ? `Motivo: ${form.requestReason}` : '',
    selectedCategoryLabel.value ? `Categoría: ${selectedCategoryLabel.value}` : '',
    modelName.value ? `Modelo: ${modelName.value}` : '',
    modelCode.value ? `Código: ${modelCode.value}` : '',
    modelColor.value ? `Color elegido: ${modelColor.value}` : '',
    `Necesito: ${contactOptions.find(option => option.value === form.frameOption)?.label ?? ''}`,
    `Situación visual: ${visionOptions.find(option => option.value === form.visionStatus)?.label ?? ''}`,
    needsPrescription.value
      ? `Receta: ${prescription.value?.name ?? 'La adjuntaré en este chat de WhatsApp'}`
      : 'Receta: No adjunta; solicito orientación según mi situación visual.',
    `Tipo de lentes: ${form.lensType}`,
    `Tratamientos de interés: ${form.treatments.join(', ') || 'Ninguno seleccionado'}`,
    form.workRequirements.trim()
      ? `Requisitos de seguridad del trabajo: ${form.workRequirements.trim()}`
      : '',
    `Nombre: ${form.name.trim()}`,
    `Contacto: ${form.contact.trim()}`
  ].filter(Boolean)

  preparedUrl.value = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(requestLines.join('\n'))}`
}
</script>

<template>
  <main class="quote-page">
    <section class="quote-hero">
      <span class="quote-hero-mark">
        <UIcon
          name="i-lucide-glasses"
          aria-hidden="true"
        />
      </span>
      <p class="quote-eyebrow">
        Cotización de lentes graduados
      </p>
      <h1>Cuéntanos qué necesitas.</h1>
      <p>Prepara tu solicitud con o sin receta. El equipo revisará la información antes de enviarte una cotización.</p>
      <span
        v-if="selectedCategory"
        class="quote-category-chip"
      >
        Categoría: {{ selectedCategoryLabel }}
      </span>
      <span
        v-if="modelName"
        class="quote-category-chip"
      >
        Modelo: {{ modelName }}<template v-if="modelCode"> · {{ modelCode }}</template>
      </span>
      <span
        v-if="modelColor"
        class="quote-category-chip"
      >
        Color elegido: {{ modelColor }}
      </span>
      <span
        v-if="form.requestReason"
        class="quote-category-chip"
      >
        Motivo: {{ form.requestReason }}
      </span>
    </section>

    <div class="quote-layout">
      <form
        class="quote-form"
        @input="preparedUrl = ''"
        @submit.prevent="prepareQuoteRequest"
      >
        <section
          class="quote-form-section"
          aria-labelledby="quote-frame-title"
        >
          <div class="quote-section-heading">
            <span class="quote-step-index">01</span>
            <div>
              <p class="quote-eyebrow">
                Tipo de solicitud
              </p>
              <h2 id="quote-frame-title">
                ¿Qué necesitas cotizar?
              </h2>
            </div>
          </div>
          <div class="quote-choice-grid">
            <label
              v-for="option in contactOptions"
              :key="option.value"
              class="quote-choice"
              :class="{ 'is-selected': form.frameOption === option.value }"
            >
              <input
                v-model="form.frameOption"
                type="radio"
                name="frame-option"
                :value="option.value"
                required
              >
              <span class="quote-choice-icon">
                <UIcon
                  :name="option.value === 'with-frame' ? 'i-lucide-glasses' : 'i-lucide-refresh-cw'"
                  aria-hidden="true"
                />
              </span>
              <span>{{ option.label }}</span>
              <UIcon
                class="quote-choice-check"
                name="i-lucide-circle-check"
                aria-hidden="true"
              />
            </label>
          </div>
          <p
            v-if="form.frameOption === 'own-frame'"
            class="quote-inline-note"
          >
            Si eliges cambio de micas, el equipo revisará en persona el estado y la compatibilidad de tu armazón antes de cotizar.
          </p>
        </section>

        <section
          class="quote-form-section"
          aria-labelledby="quote-vision-title"
        >
          <div class="quote-section-heading">
            <span class="quote-step-index">02</span>
            <div>
              <p class="quote-eyebrow">
                Tu situación visual
              </p>
              <h2 id="quote-vision-title">
                ¿En qué punto estás?
              </h2>
            </div>
          </div>
          <div class="vision-options">
            <label
              v-for="option in visionOptions"
              :key="option.value"
              class="vision-option"
            >
              <input
                v-model="form.visionStatus"
                type="radio"
                name="vision-status"
                :value="option.value"
                required
              >
              <span class="custom-radio" />
              <span>{{ option.label }}</span>
            </label>
          </div>

          <div
            v-if="needsPrescription"
            class="prescription-field"
          >
            <label for="quote-prescription">Adjunta una foto legible o PDF de tu receta <span>(opcional)</span></label>
            <input
              id="quote-prescription"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
              @change="selectPrescription"
            >
            <p
              v-if="prescription"
              class="file-selected"
            >
              <UIcon
                name="i-lucide-paperclip"
                aria-hidden="true"
              />
              {{ prescription.name }} · Se adjuntará manualmente en WhatsApp.
            </p>
            <p
              v-else
              class="field-help"
            >
              Puedes solicitar orientación aunque todavía no tengas receta. Máximo 10 MB.
            </p>
            <p
              v-if="prescriptionError"
              class="field-error"
              role="alert"
            >
              {{ prescriptionError }}
            </p>
          </div>
          <p
            v-else
            class="quote-inline-note"
          >
            No necesitas tener receta para solicitar asesoría.
          </p>
          <label
            v-if="selectedCategory === 'seguridad-graduada'"
            class="work-requirements-field"
            for="quote-work-requirements"
          >
            ¿Qué protección o requisitos solicita tu lugar de trabajo?
            <span>(opcional)</span>
            <textarea
              id="quote-work-requirements"
              v-model.trim="form.workRequirements"
              rows="3"
              placeholder="Por ejemplo: tipo de protección requerida o actividad que realizas"
            />
            <small>El equipo revisará estos requisitos y la compatibilidad antes de preparar la propuesta.</small>
          </label>
        </section>

        <section
          class="quote-form-section"
          aria-labelledby="quote-lens-title"
        >
          <div class="quote-section-heading">
            <span class="quote-step-index">03</span>
            <div>
              <p class="quote-eyebrow">
                Opciones de lente
              </p>
              <h2 id="quote-lens-title">
                ¿Qué tipo de lentes te interesa?
              </h2>
            </div>
          </div>
          <label
            class="quote-field-label"
            for="quote-lens-type"
          >Tipo de lentes</label>
          <select
            id="quote-lens-type"
            v-model="form.lensType"
            required
          >
            <option
              disabled
              value=""
            >
              Selecciona una opción
            </option>
            <option
              v-for="type in lensTypes"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
          <fieldset class="treatments-fieldset">
            <legend>Tratamientos de interés <span>(puedes elegir varios)</span></legend>
            <div class="treatment-options">
              <label
                v-for="treatment in lensTreatments"
                :key="treatment"
                class="treatment-option"
              >
                <input
                  v-model="form.treatments"
                  type="checkbox"
                  :value="treatment"
                >
                <span class="custom-checkbox">
                  <UIcon
                    name="i-lucide-check"
                    aria-hidden="true"
                  />
                </span>
                {{ treatment }}
              </label>
            </div>
            <p class="field-help">
              La disponibilidad y compatibilidad se revisarán con tu receta.
            </p>
          </fieldset>
        </section>

        <section
          class="quote-form-section"
          aria-labelledby="quote-contact-title"
        >
          <div class="quote-section-heading">
            <span class="quote-step-index">04</span>
            <div>
              <p class="quote-eyebrow">
                Datos de contacto
              </p>
              <h2 id="quote-contact-title">
                ¿A quién enviamos la cotización?
              </h2>
            </div>
          </div>
          <div class="quote-contact-grid">
            <div>
              <label
                class="quote-field-label"
                for="quote-name"
              >Nombre</label>
              <input
                id="quote-name"
                v-model.trim="form.name"
                autocomplete="name"
                required
                placeholder="Tu nombre"
              >
            </div>
            <div>
              <label
                class="quote-field-label"
                for="quote-contact"
              >Teléfono o WhatsApp</label>
              <input
                id="quote-contact"
                v-model.trim="form.contact"
                type="tel"
                autocomplete="tel"
                required
                placeholder="Tu número de contacto"
              >
            </div>
          </div>

          <details class="privacy-details">
            <summary>Aviso de privacidad</summary>
            <p>Los datos que proporciones y el nombre de cualquier archivo se incluirán en un mensaje dirigido a Clínica Óptica por WhatsApp. El archivo de receta no se adjunta automáticamente: deberás agregarlo en el chat. La solicitud solo se comparte cuando tú pulsas Enviar en WhatsApp.</p>
          </details>
          <label class="privacy-consent">
            <input
              v-model="form.privacyAccepted"
              type="checkbox"
              required
            >
            <span class="custom-checkbox">
              <UIcon
                name="i-lucide-check"
                aria-hidden="true"
              />
            </span>
            Acepto compartir estos datos con Clínica Óptica por WhatsApp para atender mi solicitud.
          </label>

          <button
            class="quote-submit"
            type="submit"
          >
            Preparar solicitud de cotización
            <UIcon
              name="i-lucide-arrow-up-right"
              aria-hidden="true"
            />
          </button>

          <div
            v-if="preparedUrl"
            class="quote-prepared"
            role="status"
          >
            <span class="prepared-icon">
              <UIcon
                name="i-lucide-circle-check"
                aria-hidden="true"
              />
            </span>
            <div>
              <strong>Tu solicitud está lista para compartir; todavía no se ha enviado.</strong>
              <p>Revisa el mensaje en WhatsApp, adjunta allí tu receta si corresponde y pulsa Enviar. Solo después de que el equipo reciba la solicitud podrá confirmar su recepción y revisar compatibilidad, disponibilidad y condiciones.</p>
              <a
                :href="preparedUrl"
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
          </div>
        </section>
      </form>

      <aside class="quote-aside">
        <div class="quote-aside-card">
          <span class="aside-icon">
            <UIcon
              name="i-lucide-clipboard-check"
              aria-hidden="true"
            />
          </span>
          <p class="quote-eyebrow">
            ¿Qué sigue?
          </p>
          <h2>Revisamos tu solicitud contigo.</h2>
          <ol>
            <li>Revisar la receta y las medidas necesarias; si traes tu propio armazón, valorar su estado y compatibilidad.</li>
            <li>Confirmar disponibilidad. Para seguridad graduada, considerar los requisitos de tu lugar de trabajo.</li>
            <li>Enviarte una cotización con armazón (si aplica), micas, tratamientos, total, condiciones de pago y tiempo estimado de entrega.</li>
            <li>Tras tu aceptación y cumplir las condiciones acordadas, iniciar el pedido; elaborar y revisar los lentes.</li>
            <li>Avisarte cuando estén listos para coordinar entrega, ajuste y seguimiento.</li>
          </ol>
        </div>
        <p class="quote-aside-note">
          Preparar el mensaje no envía la solicitud. El pedido solo inicia después de aceptar la cotización y cumplir las condiciones acordadas.
        </p>
      </aside>
    </div>
  </main>
</template>

<style scoped>
.quote-page {
  --quote-navy: #102b4a;
  --quote-blue: #244c73;
  --quote-gray: #526176;
  min-height: 70vh;
  padding: 42px 0 76px;
  background:
    radial-gradient(ellipse at 12% 4%, rgb(36 76 115 / 7%), transparent 31%),
    linear-gradient(180deg, #f7f9fa, #fff 47%, #f4f6f8);
  color: var(--quote-navy);
}

.quote-hero,
.quote-layout {
  width: min(1080px, calc(100% - 44px));
  margin-inline: auto;
}

.quote-hero {
  max-width: 720px;
  margin-bottom: 31px;
  text-align: center;
}

.quote-hero-mark,
.quote-section-heading > span,
.quote-choice-icon,
.aside-icon,
.prepared-icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d7e2ea;
  border-radius: 15px;
  background: linear-gradient(145deg, #fff, #e8eef3);
  color: var(--quote-blue);
  box-shadow: 0 6px 16px rgb(16 43 74 / 7%);
}

.quote-hero-mark {
  margin: 0 auto 14px;
}

.quote-hero-mark :deep(.iconify),
.quote-section-heading > span :deep(.iconify),
.quote-choice-icon :deep(.iconify),
.aside-icon :deep(.iconify),
.prepared-icon :deep(.iconify) {
  width: 22px;
  height: 22px;
}

.quote-eyebrow {
  margin: 0 0 7px;
  color: var(--quote-blue);
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.quote-hero h1 {
  margin: 0;
  color: var(--quote-navy);
  font-size: clamp(2.2rem, 4.8vw, 3.35rem);
  font-weight: 850;
  letter-spacing: -0.06em;
  line-height: 1.02;
}

.quote-hero > p:not(.quote-eyebrow) {
  max-width: 580px;
  margin: 12px auto 0;
  color: var(--quote-gray);
  font-size: 0.86rem;
  line-height: 1.65;
}

.quote-category-chip {
  display: inline-flex;
  margin: 12px 5px 0;
  border: 1px solid #d7e2ea;
  border-radius: 99px;
  padding: 7px 11px;
  background: #fff;
  color: var(--quote-blue);
  font-size: 0.68rem;
  font-weight: 750;
}

.quote-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(260px, 0.75fr);
  align-items: start;
  gap: 21px;
}

.quote-form,
.quote-aside-card {
  border: 1px solid #dbe3e9;
  border-radius: 17px;
  background: #fff;
  box-shadow: 0 14px 35px rgb(16 43 74 / 7%);
}

.quote-form {
  overflow: hidden;
}

.quote-form-section {
  padding: clamp(21px, 3.7vw, 34px);
}

.quote-form-section + .quote-form-section {
  border-top: 1px solid #e6ebef;
}

.quote-section-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 21px;
}

.quote-section-heading > span {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  font-size: 0.65rem;
  font-weight: 850;
}

.quote-section-heading > span :deep(.iconify) {
  display: none;
}

.quote-section-heading h2,
.quote-aside-card h2 {
  margin: 0;
  color: var(--quote-navy);
  font-size: clamp(1.08rem, 2.7vw, 1.48rem);
  font-weight: 820;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

.quote-choice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
}

.quote-choice {
  position: relative;
  display: flex;
  min-height: 93px;
  align-items: center;
  gap: 12px;
  border: 1px solid #dbe3e9;
  border-radius: 11px;
  padding: 13px;
  color: var(--quote-navy);
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
}

.quote-choice:hover,
.quote-choice.is-selected {
  border-color: #879fb3;
  background: #f5f8fa;
  box-shadow: 0 5px 14px rgb(16 43 74 / 6%);
}

.quote-choice input,
.vision-option input,
.treatment-option input,
.privacy-consent input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.quote-choice-icon {
  width: 43px;
  height: 43px;
  border-radius: 12px;
}

.quote-choice > span:nth-child(2) {
  max-width: 180px;
  font-size: 0.73rem;
  font-weight: 750;
  line-height: 1.4;
}

.quote-choice-check {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  margin-left: auto;
  color: #a3b0bb;
}

.quote-choice.is-selected .quote-choice-check {
  color: var(--quote-blue);
}

.vision-options {
  display: grid;
  gap: 9px;
}

.vision-option,
.treatment-option,
.privacy-consent {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--quote-gray);
  cursor: pointer;
}

.vision-option {
  min-height: 43px;
  border: 1px solid #e1e7ec;
  border-radius: 9px;
  padding: 9px 12px;
  font-size: 0.75rem;
}

.vision-option:has(input:checked) {
  border-color: #9eb1c1;
  background: #f4f7f9;
  color: var(--quote-navy);
}

.custom-radio,
.custom-checkbox {
  display: grid;
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #b7c4ce;
  background: #fff;
}

.custom-radio {
  border-radius: 50%;
}

.custom-checkbox {
  border-radius: 5px;
}

.custom-checkbox :deep(.iconify) {
  width: 13px;
  height: 13px;
  opacity: 0;
}

.vision-option input:checked + .custom-radio {
  border: 5px solid var(--quote-blue);
}

.treatment-option input:checked + .custom-checkbox,
.privacy-consent input:checked + .custom-checkbox {
  border-color: var(--quote-blue);
  background: var(--quote-blue);
  color: #fff;
}

.treatment-option input:checked + .custom-checkbox :deep(.iconify),
.privacy-consent input:checked + .custom-checkbox :deep(.iconify) {
  opacity: 1;
}

.vision-option input:focus-visible + .custom-radio,
.treatment-option input:focus-visible + .custom-checkbox,
.privacy-consent input:focus-visible + .custom-checkbox,
.quote-choice input:focus-visible ~ span {
  outline: 3px solid rgb(36 76 115 / 28%);
  outline-offset: 3px;
}

.prescription-field {
  margin-top: 15px;
  border: 1px solid #dce4ea;
  border-radius: 10px;
  padding: 14px;
  background: #f8fafb;
}

.prescription-field > label,
.quote-field-label {
  display: block;
  margin-bottom: 7px;
  color: var(--quote-navy);
  font-size: 0.73rem;
  font-weight: 750;
}

.prescription-field > label span,
.treatments-fieldset legend span {
  color: #718295;
  font-size: 0.65rem;
  font-weight: 500;
}

.prescription-field input[type='file'] {
  width: 100%;
  font-size: 0.7rem;
}

.field-help,
.file-selected,
.field-error,
.quote-inline-note {
  margin: 8px 0 0;
  color: #68798a;
  font-size: 0.66rem;
  line-height: 1.55;
}

.file-selected {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--quote-blue);
}

.file-selected :deep(.iconify) {
  width: 15px;
  height: 15px;
}

.field-error {
  color: #a33232;
}

.quote-inline-note {
  border-left: 2px solid #aebfce;
  padding-left: 10px;
}

.quote-form select,
.quote-contact-grid input,
.work-requirements-field textarea {
  display: block;
  width: 100%;
  min-height: 44px;
  border: 1px solid #d6e0e7;
  border-radius: 8px;
  padding: 10px 12px;
  background: #f9fbfc;
  color: var(--quote-navy);
  font: inherit;
  font-size: 0.74rem;
}

.quote-form select:focus,
.quote-contact-grid input:focus,
.work-requirements-field textarea:focus {
  border-color: #7a97af;
  outline: 3px solid rgb(36 76 115 / 12%);
}

.work-requirements-field {
  display: grid;
  gap: 7px;
  margin-top: 18px;
  color: var(--quote-navy);
  font-size: 0.73rem;
  font-weight: 750;
}

.work-requirements-field > span,
.work-requirements-field small {
  color: #718295;
  font-size: 0.65rem;
  font-weight: 500;
  line-height: 1.5;
}

.work-requirements-field textarea {
  min-height: 84px;
  resize: vertical;
}

.treatments-fieldset {
  margin: 19px 0 0;
  border: 0;
  padding: 0;
}

.treatments-fieldset legend {
  margin-bottom: 11px;
  color: var(--quote-navy);
  font-size: 0.73rem;
  font-weight: 750;
}

.treatment-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.treatment-option {
  min-height: 35px;
  border: 1px solid #dce4ea;
  border-radius: 99px;
  padding: 7px 10px;
  background: #fff;
  font-size: 0.66rem;
}

.treatment-option:has(input:checked) {
  border-color: #a5b7c6;
  background: #f3f6f8;
  color: var(--quote-navy);
}

.treatment-option .custom-checkbox {
  width: 15px;
  height: 15px;
}

.treatment-option .custom-checkbox :deep(.iconify) {
  width: 11px;
  height: 11px;
}

.quote-contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.privacy-details {
  margin-top: 20px;
  border: 1px solid #dce4ea;
  border-radius: 9px;
  padding: 11px 13px;
  background: #f8fafb;
}

.privacy-details summary {
  color: var(--quote-blue);
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
}

.privacy-details p {
  margin: 9px 0 0;
  color: var(--quote-gray);
  font-size: 0.65rem;
  line-height: 1.6;
}

.privacy-consent {
  align-items: flex-start;
  margin-top: 14px;
  font-size: 0.67rem;
  line-height: 1.5;
}

.quote-submit,
.quote-prepared a {
  display: inline-flex;
  min-height: 45px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px solid var(--quote-navy);
  border-radius: 8px;
  padding: 10px 15px;
  background: var(--quote-navy);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: transform 160ms ease, background-color 160ms ease;
}

.quote-submit {
  margin-top: 19px;
}

.quote-submit:hover,
.quote-prepared a:hover {
  transform: translateY(-1px);
  background: #183a5e;
}

.quote-submit :deep(.iconify),
.quote-prepared a :deep(.iconify) {
  width: 16px;
  height: 16px;
}

.quote-prepared {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 19px;
  border: 1px solid #cbded5;
  border-radius: 11px;
  padding: 14px;
  background: #f4faf6;
}

.prepared-icon {
  width: 38px;
  height: 38px;
  border-color: #d6e8dd;
  background: #fff;
  color: #3e775b;
}

.prepared-icon :deep(.iconify) {
  width: 19px;
  height: 19px;
}

.quote-prepared strong {
  color: #244c3b;
  font-size: 0.74rem;
  line-height: 1.45;
}

.quote-prepared p {
  margin: 6px 0 11px;
  color: #526b5e;
  font-size: 0.67rem;
  line-height: 1.55;
}

.quote-prepared a {
  min-height: 38px;
  padding: 8px 12px;
  font-size: 0.67rem;
}

.quote-aside {
  display: grid;
  gap: 13px;
}

.quote-aside-card {
  padding: 22px;
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 8%), transparent 42%),
    #fff;
}

.aside-icon {
  width: 44px;
  height: 44px;
  margin-bottom: 18px;
  border-radius: 13px;
}

.quote-aside-card h2 {
  font-size: 1.22rem;
}

.quote-aside-card ol {
  display: grid;
  gap: 14px;
  margin: 20px 0 0;
  padding-left: 21px;
  color: var(--quote-gray);
  font-size: 0.7rem;
  line-height: 1.55;
}

.quote-aside-card li::marker {
  color: var(--quote-blue);
  font-weight: 850;
}

.quote-aside-note {
  margin: 0;
  border-left: 2px solid #aebfce;
  padding: 4px 0 4px 12px;
  color: #68798a;
  font-size: 0.65rem;
  line-height: 1.6;
}

@media (max-width: 760px) {
  .quote-page {
    padding: 30px 0 54px;
  }

  .quote-hero,
  .quote-layout {
    width: calc(100% - 34px);
  }

  .quote-hero {
    margin-bottom: 22px;
  }

  .quote-hero > p:not(.quote-eyebrow) {
    font-size: 0.78rem;
  }

  .quote-layout {
    grid-template-columns: 1fr;
  }

  .quote-form-section {
    padding: 20px 16px;
  }

  .quote-choice-grid,
  .quote-contact-grid {
    grid-template-columns: 1fr;
  }

  .quote-choice {
    min-height: 78px;
  }

  .quote-submit {
    width: 100%;
  }
}
</style>
