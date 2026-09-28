<script setup lang="ts">
import { reactive, ref } from 'vue'

useHead({
  title: 'Pedir información | Clínica Óptica',
  meta: [
    {
      name: 'description',
      content: 'Envía tus preguntas sobre precios, lentes de contacto, convenios y formas de pago a Clínica Óptica.'
    }
  ]
})

const topics = [
  'Precios',
  'Lentes de contacto',
  'Convenios',
  'Formas de pago',
  'Otra consulta'
]

const form = reactive({
  topic: '',
  question: '',
  name: '',
  contact: ''
})
const preparedUrl = ref('')

function prepareInformationRequest() {
  const message = [
    'Tipo de solicitud: Información',
    `Tema: ${form.topic}`,
    `Pregunta: ${form.question.trim()}`,
    `Nombre: ${form.name.trim()}`,
    `Contacto: ${form.contact.trim()}`
  ].join('\n')

  preparedUrl.value = `https://wa.me/529211371704?text=${encodeURIComponent(message)}`
}
</script>

<template>
  <main class="request-page">
    <section class="request-hero">
      <div class="request-hero-icon">
        <UIcon
          name="i-lucide-messages-square"
          aria-hidden="true"
        />
      </div>
      <p class="request-eyebrow">
        Estamos para ayudarte
      </p>
      <h1>Pide información</h1>
      <p>Cuéntanos qué necesitas saber. El equipo podrá orientarte sobre precios, convenios, lentes o una próxima cita.</p>
    </section>

    <section
      class="request-layout"
      aria-labelledby="information-form-title"
    >
      <form
        class="request-form"
        @input="preparedUrl = ''"
        @submit.prevent="prepareInformationRequest"
      >
        <div class="request-form-heading">
          <span class="request-form-icon">
            <UIcon
              name="i-lucide-file-question"
              aria-hidden="true"
            />
          </span>
          <div>
            <p class="request-eyebrow">
              Formulario de información
            </p>
            <h2 id="information-form-title">
              ¿Cuál es tu pregunta?
            </h2>
          </div>
        </div>

        <label for="information-topic">Tema</label>
        <select
          id="information-topic"
          v-model="form.topic"
          name="topic"
          required
        >
          <option
            disabled
            value=""
          >
            Selecciona un tema
          </option>
          <option
            v-for="topic in topics"
            :key="topic"
            :value="topic"
          >
            {{ topic }}
          </option>
        </select>

        <label for="information-question">Tu pregunta</label>
        <textarea
          id="information-question"
          v-model.trim="form.question"
          name="question"
          rows="4"
          maxlength="1000"
          placeholder="Escribe aquí tu duda"
          required
        />

        <div class="request-field-pair">
          <div>
            <label for="information-name">Nombre</label>
            <input
              id="information-name"
              v-model.trim="form.name"
              autocomplete="name"
              name="name"
              placeholder="Tu nombre"
              required
            >
          </div>
          <div>
            <label for="information-contact">Teléfono o WhatsApp</label>
            <input
              id="information-contact"
              v-model.trim="form.contact"
              autocomplete="tel"
              name="contact"
              type="tel"
              placeholder="Tu número de contacto"
              required
            >
          </div>
        </div>

        <button
          class="request-primary-button"
          type="submit"
        >
          Preparar solicitud
          <UIcon
            name="i-lucide-arrow-right"
            aria-hidden="true"
          />
        </button>

        <div
          v-if="preparedUrl"
          class="request-prepared"
          role="status"
        >
          <UIcon
            name="i-lucide-circle-check"
            aria-hidden="true"
          />
          <div>
            <strong>Tu solicitud está preparada.</strong>
            <p>Ábrela en WhatsApp y pulsa Enviar para que el equipo la reciba.</p>
            <a
              :href="preparedUrl"
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
        <p
          v-else
          class="request-form-note"
        >
          La solicitud solo se enviará cuando confirmes el mensaje dentro de WhatsApp.
        </p>
      </form>

      <aside class="request-aside">
        <div class="aside-card">
          <span class="aside-icon">
            <UIcon
              name="i-lucide-list-checks"
              aria-hidden="true"
            />
          </span>
          <p class="request-eyebrow">
            Temas de consulta
          </p>
          <h2>¿Qué información necesitas?</h2>
          <ul>
            <li
              v-for="topic in topics"
              :key="topic"
            >
              <UIcon
                name="i-lucide-check"
                aria-hidden="true"
              />
              {{ topic }}
            </li>
          </ul>
        </div>
        <div class="aside-response">
          <UIcon
            name="i-lucide-heart-handshake"
            aria-hidden="true"
          />
          <p>Cuando corresponda, también podemos orientarte para cotizar tus lentes o agendar una evaluación.</p>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.request-page {
  --request-navy: #102b4a;
  --request-blue: #244c73;
  --request-gray: #526176;
  min-height: 70vh;
  padding: 48px 0 78px;
  background:
    radial-gradient(ellipse at 14% 4%, rgb(36 76 115 / 7%), transparent 30%),
    linear-gradient(180deg, #f7f9fa, #fff 46%, #f4f6f8);
  color: var(--request-navy);
}

.request-hero,
.request-layout {
  width: min(1000px, calc(100% - 44px));
  margin-inline: auto;
}

.request-hero {
  max-width: 720px;
  margin-bottom: 32px;
  text-align: center;
}

.request-hero-icon,
.request-form-icon,
.aside-icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border: 1px solid #d7e2ea;
  border-radius: 16px;
  background: linear-gradient(145deg, #fff, #e8eef3);
  color: var(--request-blue);
  box-shadow: 0 7px 18px rgb(16 43 74 / 7%);
}

.request-hero-icon {
  margin: 0 auto 15px;
}

.request-hero-icon :deep(svg),
.request-form-icon :deep(svg),
.aside-icon :deep(svg) {
  width: 23px;
  height: 23px;
}

.request-eyebrow {
  margin: 0 0 8px;
  color: var(--request-blue);
  font-size: 0.65rem;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.request-hero h1 {
  margin: 0;
  color: var(--request-navy);
  font-size: clamp(2.25rem, 5vw, 3.35rem);
  font-weight: 850;
  letter-spacing: -0.06em;
  line-height: 1.02;
}

.request-hero > p:last-child {
  max-width: 590px;
  margin: 13px auto 0;
  color: var(--request-gray);
  font-size: 0.9rem;
  line-height: 1.7;
}

.request-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(245px, 0.75fr);
  align-items: start;
  gap: 22px;
}

.request-form,
.aside-card {
  border: 1px solid #dbe3e9;
  border-radius: 16px;
  padding: clamp(22px, 4vw, 36px);
  background: #fff;
  box-shadow: 0 15px 38px rgb(16 43 74 / 7%);
}

.request-form-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 25px;
}

.request-form-icon {
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  border-radius: 14px;
}

.request-form-heading .request-eyebrow {
  margin-bottom: 5px;
}

.request-form h2,
.aside-card h2 {
  margin: 0;
  color: var(--request-navy);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 820;
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.request-form label {
  display: block;
  margin: 15px 0 7px;
  color: var(--request-navy);
  font-size: 0.75rem;
  font-weight: 750;
}

.request-form input,
.request-form select,
.request-form textarea {
  display: block;
  width: 100%;
  min-height: 46px;
  border: 1px solid #d7e0e7;
  border-radius: 9px;
  padding: 11px 13px;
  background: #f9fbfc;
  color: var(--request-navy);
  font: inherit;
  font-size: 0.78rem;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.request-form textarea {
  min-height: 112px;
  resize: vertical;
}

.request-form input:focus,
.request-form select:focus,
.request-form textarea:focus {
  border-color: #6e8eaa;
  box-shadow: 0 0 0 3px rgb(36 76 115 / 11%);
}

.request-field-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.request-primary-button {
  display: inline-flex;
  min-height: 47px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 22px;
  border: 1px solid var(--request-navy);
  border-radius: 8px;
  padding: 11px 17px;
  background: var(--request-navy);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 160ms ease, background-color 160ms ease;
}

.request-primary-button:hover {
  transform: translateY(-2px);
  background: #183a5e;
}

.request-primary-button :deep(svg) {
  width: 17px;
  height: 17px;
}

.request-form-note {
  margin: 13px 0 0;
  color: #68798a;
  font-size: 0.67rem;
  line-height: 1.55;
}

.request-prepared {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 19px;
  border: 1px solid #cbded5;
  border-radius: 10px;
  padding: 14px;
  background: #f4faf6;
  color: #244c3b;
}

.request-prepared > :deep(svg) {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
}

.request-prepared strong {
  font-size: 0.78rem;
}

.request-prepared p {
  margin: 5px 0 10px;
  color: #526b5e;
  font-size: 0.7rem;
  line-height: 1.55;
}

.request-prepared a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--request-blue);
  font-size: 0.73rem;
  font-weight: 800;
  text-decoration: none;
}

.request-prepared a :deep(svg) {
  width: 15px;
  height: 15px;
}

.request-aside {
  display: grid;
  gap: 14px;
}

.aside-card {
  padding: 23px;
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 8%), transparent 42%),
    #fff;
}

.aside-icon {
  width: 44px;
  height: 44px;
  margin-bottom: 21px;
  border-radius: 13px;
}

.aside-card h2 {
  font-size: 1.22rem;
}

.aside-card ul {
  display: grid;
  gap: 12px;
  margin: 19px 0 0;
  padding: 0;
  color: var(--request-gray);
  font-size: 0.74rem;
  list-style: none;
}

.aside-card li {
  display: flex;
  align-items: center;
  gap: 9px;
}

.aside-card li :deep(svg) {
  width: 16px;
  height: 16px;
  color: var(--request-blue);
}

.aside-response {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  border: 1px solid #dbe3e9;
  border-radius: 12px;
  padding: 15px;
  background: #f2f5f7;
}

.aside-response > :deep(svg) {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  color: var(--request-blue);
}

.aside-response p {
  margin: 0;
  color: var(--request-gray);
  font-size: 0.69rem;
  line-height: 1.6;
}

@media (max-width: 720px) {
  .request-page {
    padding: 32px 0 55px;
  }

  .request-hero,
  .request-layout {
    width: calc(100% - 34px);
  }

  .request-hero {
    margin-bottom: 23px;
  }

  .request-hero > p:last-child {
    font-size: 0.8rem;
  }

  .request-layout {
    grid-template-columns: 1fr;
  }

  .request-form,
  .aside-card {
    padding: 22px 18px;
  }

  .request-primary-button {
    width: 100%;
  }

  .request-field-pair {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
