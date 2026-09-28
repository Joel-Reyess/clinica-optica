<script setup lang="ts">
import { ref } from 'vue'
import AppLogo from './AppLogo.vue'

const privacyDialog = ref<HTMLDialogElement | null>(null)
const faqDialog = ref<HTMLDialogElement | null>(null)

const faqItems = [
  {
    question: '¿Puedo cotizar con una receta de otro lugar?',
    answer: 'Sí. Puedes iniciar la solicitud con una receta externa o pedir asesoría si todavía no tienes una. El equipo revisará la información y te indicará si hace falta algún dato o medida.'
  },
  {
    question: '¿Pueden cambiar las micas de mi armazón?',
    answer: 'Puedes solicitar una cotización para tu propio armazón. Antes de confirmar, el equipo revisará su estado y compatibilidad para valorar si es posible realizar el cambio.'
  },
  {
    question: '¿Qué formas de pago aceptan?',
    answer: 'Las condiciones de pago se confirman al preparar tu cotización. Escríbenos por WhatsApp para consultar las opciones disponibles para tu solicitud.'
  },
  {
    question: '¿Cuánto tarda mi pedido y cómo me lo entregan?',
    answer: 'El tiempo estimado se incluye en la cotización. Cuando tus lentes estén listos, el equipo te contactará para coordinar la entrega y, si hace falta, el ajuste.'
  },
  {
    question: '¿Cómo solicito seguimiento o un ajuste?',
    answer: 'Contáctanos por WhatsApp con tu nombre y teléfono. Si consultas sobre un pedido, comparte también tu folio. El personal verificará tu identidad antes de compartir información del expediente o del pedido.'
  }
]

function openFaqDialog() {
  faqDialog.value?.showModal()
}

function closeFaqDialog() {
  faqDialog.value?.close()
}

function openPrivacyDialog() {
  privacyDialog.value?.showModal()
}

function closePrivacyDialog() {
  privacyDialog.value?.close()
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <NuxtLink
        class="footer-brand"
        to="/"
        aria-label="Clínica Óptica, inicio"
      >
        <AppLogo />
      </NuxtLink>

      <a
        class="footer-detail"
        href="https://maps.google.com/?q=Benito+Ju%C3%A1rez+608+Coatzacoalcos+Veracruz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <UIcon
          name="i-lucide-map-pin"
          class="footer-icon"
          aria-hidden="true"
        />
        <span>
          <strong>Visítanos en Coatzacoalcos</strong>
          <span>Benito Juárez 608, Centro</span>
        </span>
      </a>

      <a
        class="footer-detail"
        href="https://wa.me/529211371704"
        target="_blank"
        rel="noopener noreferrer"
      >
        <UIcon
          name="i-simple-icons-whatsapp"
          class="footer-icon footer-icon-whatsapp"
          aria-hidden="true"
        />
        <span>
          <strong>WhatsApp</strong>
          <span>921 137 1704</span>
        </span>
      </a>

      <a
        class="footer-detail"
        href="tel:+529211371704"
      >
        <UIcon
          name="i-lucide-phone"
          class="footer-icon"
          aria-hidden="true"
        />
        <span>
          <strong>Clínica Óptica Coatza</strong>
          <span>Tu visión, nuestra prioridad</span>
        </span>
      </a>
    </div>

    <div class="footer-bottom">
      <button
        class="faq-link"
        type="button"
        aria-haspopup="dialog"
        aria-controls="faq-dialog"
        @click="openFaqDialog"
      >
        Preguntas frecuentes
      </button>
      <span aria-hidden="true">|</span>
      <button
        class="privacy-link"
        type="button"
        aria-haspopup="dialog"
        aria-controls="privacy-dialog"
        @click="openPrivacyDialog"
      >
        Aviso de privacidad
      </button>
      <span class="footer-copyright">
        Clínica Óptica © {{ new Date().getFullYear() }}
      </span>
    </div>

    <dialog
      id="privacy-dialog"
      ref="privacyDialog"
      class="privacy-dialog"
      aria-labelledby="privacy-dialog-title"
      @click.self="closePrivacyDialog"
      @cancel="closePrivacyDialog"
      @keydown.esc.prevent="closePrivacyDialog"
    >
      <div class="privacy-dialog-content">
        <header class="privacy-dialog-header">
          <button
            class="privacy-dialog-close"
            type="button"
            aria-label="Cerrar aviso de privacidad"
            @click="closePrivacyDialog"
          >
            <UIcon
              name="i-lucide-x"
              aria-hidden="true"
            />
          </button>
          <span class="privacy-dialog-brand">
            <UIcon
              name="i-lucide-eye"
              aria-hidden="true"
            />
            Clínica Óptica
          </span>
          <span class="privacy-dialog-icon">
            <UIcon
              name="i-lucide-shield-check"
              aria-hidden="true"
            />
          </span>
          <p class="privacy-dialog-eyebrow">
            Tu información, en contexto
          </p>
          <h2 id="privacy-dialog-title">
            Aviso de privacidad
          </h2>
          <p class="privacy-dialog-subtitle">
            Te contamos cómo se prepara y comparte tu solicitud.
          </p>
        </header>

        <div class="privacy-dialog-body">
          <div class="privacy-dialog-cards">
            <article class="privacy-info-card">
              <span class="privacy-info-icon">
                <UIcon
                  name="i-lucide-clipboard-list"
                  aria-hidden="true"
                />
              </span>
              <div>
                <h3>Datos de tu solicitud</h3>
                <p>
                  El nombre, contacto y motivo que escribas se utilizan para preparar un mensaje dirigido a Clínica Óptica por WhatsApp.
                </p>
              </div>
            </article>
            <article class="privacy-info-card">
              <span class="privacy-info-icon">
                <UIcon
                  name="i-lucide-send"
                  aria-hidden="true"
                />
              </span>
              <div>
                <h3>Tú confirmas el envío</h3>
                <p>
                  Al continuar desde el sitio se abre WhatsApp; el mensaje solo se comparte cuando confirmas el envío dentro de esa aplicación.
                </p>
              </div>
            </article>
            <article class="privacy-info-card">
              <span class="privacy-info-icon">
                <UIcon
                  name="i-lucide-file-heart"
                  aria-hidden="true"
                />
              </span>
              <div>
                <h3>Recetas y archivos</h3>
                <p>
                  Los archivos no se adjuntan automáticamente. Si se requiere una receta, tendrás que agregarla en el chat; comparte solo lo necesario.
                </p>
              </div>
            </article>
          </div>
          <div class="privacy-dialog-reminder">
            <UIcon
              name="i-lucide-info"
              aria-hidden="true"
            />
            <span>Revisa el mensaje y sus datos antes de enviarlo.</span>
          </div>
          <div class="privacy-dialog-action">
            <button
              class="privacy-dialog-accept"
              type="button"
              @click="closePrivacyDialog"
            >
              Entendido
              <UIcon
                name="i-lucide-arrow-right"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </dialog>

    <dialog
      id="faq-dialog"
      ref="faqDialog"
      class="faq-dialog"
      aria-labelledby="faq-dialog-title"
      @click.self="closeFaqDialog"
      @cancel="closeFaqDialog"
      @keydown.esc.prevent="closeFaqDialog"
    >
      <div class="faq-dialog-content">
        <header class="faq-dialog-header">
          <button
            class="faq-dialog-close"
            type="button"
            aria-label="Cerrar preguntas frecuentes"
            @click="closeFaqDialog"
          >
            <UIcon
              name="i-lucide-x"
              aria-hidden="true"
            />
          </button>
          <span class="faq-dialog-brand">
            <UIcon
              name="i-lucide-eye"
              aria-hidden="true"
            />
            Clínica Óptica
          </span>
          <span class="faq-dialog-icon">
            <UIcon
              name="i-lucide-message-circle-question"
              aria-hidden="true"
            />
          </span>
          <p class="faq-dialog-eyebrow">
            Estamos para orientarte
          </p>
          <h2 id="faq-dialog-title">
            Preguntas frecuentes
          </h2>
          <p class="faq-dialog-subtitle">
            Respuestas claras para cuidar tu salud visual.
          </p>
        </header>
        <div class="faq-dialog-body">
          <div class="faq-list">
            <details
              v-for="(item, index) in faqItems"
              :key="item.question"
              class="faq-item"
            >
              <summary>
                <span class="faq-number">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="faq-question">{{ item.question }}</span>
                <UIcon
                  class="faq-chevron"
                  name="i-lucide-chevron-down"
                  aria-hidden="true"
                />
              </summary>
              <p>{{ item.answer }}</p>
            </details>
          </div>
          <p class="faq-dialog-note">
            ¿No encontraste tu respuesta? Escríbenos y con gusto te orientamos.
          </p>
          <a
            class="faq-dialog-contact"
            href="https://wa.me/529211371704?text=Hola%2C%20tengo%20una%20pregunta."
            target="_blank"
            rel="noopener noreferrer"
          >
            <UIcon
              name="i-simple-icons-whatsapp"
              aria-hidden="true"
            />
            Consultar por WhatsApp
            <UIcon
              name="i-lucide-arrow-up-right"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </dialog>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid #c99638;
  background: #fff;
  color: #243a52;
}

.footer-main {
  display: grid;
  width: min(1200px, calc(100% - 56px));
  min-height: 88px;
  grid-template-columns: 1.1fr 1.35fr 0.85fr 1.3fr;
  align-items: center;
  gap: 20px;
  margin-inline: auto;
  padding-block: 13px;
}

.footer-brand {
  display: block;
  width: min(100%, 205px);
}

.footer-detail {
  display: flex;
  min-height: 38px;
  align-items: center;
  gap: 10px;
  border-left: 1px solid #dfc68e;
  padding-left: 16px;
  color: inherit;
  text-decoration: none;
}

.footer-detail > span:last-child {
  display: grid;
  gap: 3px;
}

.footer-detail strong {
  font-size: 0.68rem;
  font-weight: 750;
}

.footer-detail > span:last-child > span {
  color: #536377;
  font-size: 0.64rem;
  line-height: 1.35;
}

.footer-icon {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  color: #102b4a;
}

.footer-icon-whatsapp {
  width: 23px;
  height: 23px;
  color: #20a765;
}

.footer-bottom {
  display: flex;
  width: min(1200px, calc(100% - 56px));
  min-height: 31px;
  align-items: center;
  gap: 12px;
  margin-inline: auto;
  padding-bottom: 11px;
  color: #465a70;
  font-size: 0.63rem;
}

.footer-bottom a,
.faq-link,
.privacy-link {
  text-decoration: none;
}

.faq-link,
.privacy-link {
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}

.footer-bottom a:hover,
.faq-link:hover,
.privacy-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.faq-link:focus-visible,
.privacy-link:focus-visible,
.privacy-dialog-close:focus-visible,
.privacy-dialog-accept:focus-visible,
.faq-dialog-close:focus-visible,
.faq-dialog-contact:focus-visible {
  outline: 3px solid #c99638;
  outline-offset: 3px;
}

.faq-link {
  font: inherit;
}

.privacy-dialog {
  position: fixed;
  inset: 0;
  width: min(620px, calc(100% - 32px));
  max-width: none;
  max-height: min(88vh, 760px);
  overflow: hidden;
  margin: auto;
  border: 1px solid rgb(226 234 240 / 90%);
  border-radius: 26px;
  padding: 0;
  background: #f7f9fb;
  color: #243a52;
  box-shadow: 0 32px 90px rgb(7 27 47 / 38%);
}

.privacy-dialog[open] {
  display: flex;
  flex-direction: column;
}

.privacy-dialog,
.privacy-dialog-cards,
.faq-dialog,
.faq-list {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.privacy-dialog::-webkit-scrollbar,
.privacy-dialog-cards::-webkit-scrollbar,
.faq-dialog::-webkit-scrollbar,
.faq-list::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.privacy-dialog::backdrop {
  background: rgb(7 24 42 / 72%);
  backdrop-filter: blur(7px);
}

.privacy-dialog-content {
  display: contents;
}

.privacy-dialog-header {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  min-height: 252px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  border-radius: 25px 25px 0 0;
  padding: 30px 40px 28px;
  background:
    radial-gradient(circle at 15% 15%, rgb(255 255 255 / 13%) 0 1px, transparent 2px),
    radial-gradient(ellipse at 90% 5%, rgb(77 138 176 / 35%), transparent 42%),
    linear-gradient(145deg, #173f63 0%, #102b4a 58%, #0a2139 100%);
  background-size: 16px 16px, auto, auto;
  color: #fff;
  text-align: center;
}

.privacy-dialog-header::before,
.privacy-dialog-header::after {
  position: absolute;
  width: 210px;
  height: 210px;
  border: 1px solid rgb(255 255 255 / 9%);
  border-radius: 50%;
  content: "";
  pointer-events: none;
}

.privacy-dialog-header::before {
  top: -145px;
  left: -70px;
  box-shadow: 0 0 0 22px rgb(255 255 255 / 3%), 0 0 0 45px rgb(255 255 255 / 2%);
}

.privacy-dialog-header::after {
  right: -135px;
  bottom: -165px;
  width: 260px;
  height: 260px;
  border-color: rgb(201 150 56 / 30%);
  box-shadow: 0 0 0 22px rgb(201 150 56 / 7%);
}

.privacy-dialog-brand,
.privacy-dialog-icon,
.privacy-dialog-eyebrow,
.privacy-dialog-header h2,
.privacy-dialog-subtitle {
  position: relative;
  z-index: 1;
}

.privacy-dialog-brand {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 17px;
  border: 1px solid rgb(255 255 255 / 19%);
  border-radius: 999px;
  padding: 6px 12px;
  background: rgb(255 255 255 / 8%);
  color: #f4f8fb;
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.privacy-dialog-brand :deep(svg) {
  width: 15px;
  height: 15px;
  color: #e3bf70;
}

.privacy-dialog-icon {
  display: grid;
  width: 54px;
  height: 54px;
  margin-bottom: 12px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 18px;
  background: linear-gradient(145deg, rgb(255 255 255 / 19%), rgb(255 255 255 / 8%));
  color: #f1d28c;
  box-shadow: 0 8px 24px rgb(0 0 0 / 12%), inset 0 1px rgb(255 255 255 / 20%);
}

.privacy-dialog-icon :deep(svg) {
  width: 27px;
  height: 27px;
}

.privacy-dialog-eyebrow {
  margin: 0 0 5px;
  color: #dfc68e;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.privacy-dialog-header h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(1.55rem, 5vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.privacy-dialog-subtitle {
  margin: 8px 0 0;
  color: rgb(242 247 251 / 79%);
  font-size: 0.86rem;
  line-height: 1.45;
}

.privacy-dialog-close {
  position: absolute;
  z-index: 2;
  top: 17px;
  right: 17px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 22%);
  border-radius: 50%;
  background: rgb(255 255 255 / 10%);
  color: #fff;
  cursor: pointer;
  transition: background 160ms ease, transform 160ms ease;
}

.privacy-dialog-close:hover {
  transform: rotate(90deg);
  background: rgb(255 255 255 / 19%);
}

.privacy-dialog-close :deep(svg) {
  width: 18px;
  height: 18px;
}

.privacy-dialog-body {
  display: flex;
  min-height: 0;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  gap: 17px;
  overflow: hidden;
  overscroll-behavior: contain;
  padding: 24px 30px 28px;
}

.privacy-dialog-cards {
  display: grid;
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  gap: 10px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.privacy-info-card {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: start;
  gap: 13px;
  border: 1px solid #e6ebef;
  border-radius: 15px;
  padding: 14px 16px;
  background: #fff;
  box-shadow: 0 3px 11px rgb(16 43 74 / 3%);
  text-align: left;
  transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
}

.privacy-info-card:hover {
  transform: translateY(-2px);
  border-color: #d2dfe8;
  box-shadow: 0 8px 18px rgb(16 43 74 / 7%);
}

.privacy-info-icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 13px;
  background: #edf3f7;
  color: #1b5279;
}

.privacy-info-card:nth-child(2) .privacy-info-icon {
  background: #edf6f1;
  color: #27805a;
}

.privacy-info-card:nth-child(3) .privacy-info-icon {
  background: #f8f3e9;
  color: #9b7027;
}

.privacy-info-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.privacy-info-card h3 {
  margin: 1px 0 4px;
  color: #153651;
  font-size: 0.84rem;
  font-weight: 800;
}

.privacy-info-card p {
  margin: 0;
  color: #5d6d7e;
  font-size: 0.77rem;
  line-height: 1.55;
}

.privacy-dialog-reminder {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #eadbb7;
  border-radius: 12px;
  padding: 10px 13px;
  background: #fbf7ed;
  color: #755a28;
  font-size: 0.72rem;
  font-weight: 650;
  line-height: 1.4;
  text-align: center;
}

.privacy-dialog-reminder :deep(svg) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.privacy-dialog-accept {
  display: inline-flex;
  min-width: 174px;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  border-radius: 13px;
  padding: 0 22px;
  background: linear-gradient(115deg, #1b5279, #102b4a 75%);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 750;
  box-shadow: 0 8px 19px rgb(16 43 74 / 20%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.privacy-dialog-accept:hover {
  transform: translateY(-2px);
  box-shadow: 0 11px 24px rgb(16 43 74 / 27%);
}

.privacy-dialog-accept :deep(svg) {
  width: 17px;
  height: 17px;
  transition: transform 160ms ease;
}

.privacy-dialog-accept:hover :deep(svg) {
  transform: translateX(3px);
}

.footer-copyright {
  margin-left: auto;
  color: #778392;
}

@media (max-width: 760px) {
  .footer-main {
    width: calc(100% - 36px);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 10px;
  }

  .footer-brand {
    width: min(100%, 190px);
  }

  .footer-detail {
    padding-left: 10px;
  }

  .footer-bottom {
    width: calc(100% - 36px);
    flex-wrap: wrap;
  }

  .footer-copyright {
    width: 100%;
    margin: 2px 0 0;
  }
}

@media (max-width: 440px) {
  .footer-main {
    grid-template-columns: 1fr;
  }

  .footer-brand {
    margin: 0 auto;
  }

  .privacy-dialog-content {
    padding: 0;
  }

  .privacy-dialog {
    width: calc(100% - 24px);
    max-height: 90vh;
    border-radius: 22px;
  }

  .privacy-dialog-header {
    min-height: 228px;
    padding: 28px 23px 24px;
  }

  .privacy-dialog-brand {
    margin-bottom: 13px;
  }

  .privacy-dialog-body {
    gap: 12px;
    padding: 16px 14px 18px;
  }

  .privacy-dialog-cards {
    gap: 8px;
  }

  .privacy-info-card {
    grid-template-columns: 36px minmax(0, 1fr);
    gap: 10px;
    border-radius: 13px;
    padding: 11px;
  }

  .privacy-info-icon {
    width: 36px;
    height: 36px;
    border-radius: 11px;
  }

  .privacy-info-icon :deep(svg) {
    width: 18px;
    height: 18px;
  }

  .privacy-info-card h3 {
    font-size: 0.78rem;
  }

  .privacy-info-card p {
    font-size: 0.72rem;
    line-height: 1.45;
  }

  .privacy-dialog-reminder {
    font-size: 0.68rem;
  }

  .privacy-dialog-accept {
    width: 100%;
  }

  .privacy-dialog-action {
    width: 100%;
    flex: 0 0 auto;
    padding-top: 4px;
  }
}

.faq-dialog {
  position: fixed;
  inset: 0;
  display: none;
  width: min(620px, calc(100% - 32px));
  max-width: none;
  max-height: min(88vh, 760px);
  overflow: hidden;
  margin: auto;
  border: 1px solid rgb(226 234 240 / 90%);
  border-radius: 26px;
  padding: 0;
  background: #f7f9fb;
  color: #243a52;
  box-shadow: 0 32px 90px rgb(7 27 47 / 38%);
}

.faq-dialog[open] {
  display: flex;
  flex-direction: column;
}

.faq-dialog::backdrop {
  background: rgb(7 24 42 / 72%);
  backdrop-filter: blur(7px);
}

.faq-dialog-content {
  display: contents;
}

.faq-dialog-header {
    position: relative;
    display: flex;
    min-height: 226px;
    flex: 0 0 auto;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    border-radius: 25px 25px 0 0;
    padding: 27px 40px 24px;
    background:
      radial-gradient(circle at 15% 15%, rgb(255 255 255 / 13%) 0 1px, transparent 2px),
      radial-gradient(ellipse at 90% 5%, rgb(77 138 176 / 35%), transparent 42%),
      linear-gradient(145deg, #173f63 0%, #102b4a 58%, #0a2139 100%);
    background-size: 16px 16px, auto, auto;
    color: #fff;
    text-align: center;
  }

  .faq-dialog-header::before,
  .faq-dialog-header::after {
    position: absolute;
    width: 210px;
    height: 210px;
    border: 1px solid rgb(255 255 255 / 9%);
    border-radius: 50%;
    content: "";
    pointer-events: none;
  }

  .faq-dialog-header::before {
    top: -145px;
    left: -70px;
    box-shadow: 0 0 0 22px rgb(255 255 255 / 3%), 0 0 0 45px rgb(255 255 255 / 2%);
  }

  .faq-dialog-header::after {
    right: -135px;
    bottom: -165px;
    width: 260px;
    height: 260px;
    border-color: rgb(201 150 56 / 30%);
    box-shadow: 0 0 0 22px rgb(201 150 56 / 7%);
}

.faq-dialog-brand,
.faq-dialog-icon,
.faq-dialog-eyebrow,
.faq-dialog-header h2,
.faq-dialog-subtitle {
    position: relative;
    z-index: 1;
}

.faq-dialog-brand {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 13px;
    border: 1px solid rgb(255 255 255 / 19%);
    border-radius: 999px;
    padding: 6px 12px;
    background: rgb(255 255 255 / 8%);
    color: #f4f8fb;
    font-size: 0.68rem;
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.faq-dialog-brand :deep(svg) {
    width: 15px;
    height: 15px;
    color: #e3bf70;
}

.faq-dialog-icon {
    display: grid;
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 28%);
    border-radius: 16px;
    background: linear-gradient(145deg, rgb(255 255 255 / 19%), rgb(255 255 255 / 8%));
    color: #f1d28c;
    box-shadow: 0 8px 24px rgb(0 0 0 / 12%), inset 0 1px rgb(255 255 255 / 20%);
}

.faq-dialog-icon :deep(svg) {
    width: 24px;
    height: 24px;
}

.faq-dialog-eyebrow {
    margin: 0 0 5px;
    color: #dfc68e;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
}

.faq-dialog-header h2 {
    margin: 0;
    color: #fff;
    font-size: clamp(1.45rem, 5vw, 1.9rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.15;
}

.faq-dialog-subtitle {
    margin: 7px 0 0;
    color: rgb(242 247 251 / 79%);
    font-size: 0.84rem;
    line-height: 1.45;
}

.faq-dialog-close {
    position: absolute;
    z-index: 2;
    top: 17px;
    right: 17px;
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 22%);
    border-radius: 50%;
    background: rgb(255 255 255 / 10%);
    color: #fff;
    cursor: pointer;
    transition: background 160ms ease, transform 160ms ease;
}

.faq-dialog-close:hover {
    transform: rotate(90deg);
    background: rgb(255 255 255 / 19%);
}

.faq-dialog-close :deep(svg) {
    width: 18px;
    height: 18px;
}

.faq-dialog-body {
    display: flex;
    min-height: 0;
    flex: 1 1 auto;
    align-items: center;
    flex-direction: column;
    gap: 14px;
    overflow: hidden;
    padding: 20px 26px 24px;
}

.faq-list {
    display: grid;
    width: 100%;
    min-height: 0;
    flex: 1 1 auto;
    grid-auto-rows: max-content;
    align-content: start;
    gap: 9px;
    overflow-y: auto;
    overscroll-behavior: contain;
}

.faq-item {
    overflow: hidden;
    border: 1px solid #e3eaf0;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 3px 11px rgb(16 43 74 / 3%);
    transition: border-color 160ms ease, box-shadow 160ms ease;
}

.faq-item[open] {
    border-color: #cbdbe6;
    box-shadow: 0 7px 18px rgb(16 43 74 / 7%);
}

.faq-item summary {
    display: grid;
    min-height: 58px;
    grid-template-columns: 34px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 11px;
    padding: 10px 15px;
    color: #173b59;
    cursor: pointer;
    list-style: none;
    text-align: left;
}

.faq-item summary::-webkit-details-marker {
    display: none;
}

.faq-number {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 10px;
    background: #edf3f7;
    color: #1b5279;
    font-size: 0.67rem;
    font-weight: 800;
}

.faq-question {
    font-size: 0.83rem;
    font-weight: 750;
    line-height: 1.4;
}

.faq-chevron {
    width: 17px;
    height: 17px;
    color: #6b8092;
    transition: transform 160ms ease;
}

.faq-item[open] .faq-chevron {
    transform: rotate(180deg);
}

.faq-item > p {
    margin: 0;
    border-top: 1px solid #edf1f4;
    padding: 12px 16px 15px 60px;
    color: #5d6d7e;
    font-size: 0.8rem;
    line-height: 1.6;
    text-align: left;
}

.faq-dialog-note {
    margin: 0;
    color: #68798a;
    font-size: 0.74rem;
    line-height: 1.45;
    text-align: center;
}

.faq-dialog-contact {
    display: inline-flex;
    min-height: 46px;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 13px;
    padding: 0 20px;
    background: linear-gradient(115deg, #25875d, #176543 75%);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 750;
    text-decoration: none;
    box-shadow: 0 8px 19px rgb(23 101 67 / 20%);
    transition: transform 160ms ease, box-shadow 160ms ease;
}

.faq-dialog-contact:hover {
    transform: translateY(-2px);
    box-shadow: 0 11px 24px rgb(23 101 67 / 27%);
}

.faq-dialog-contact :deep(svg) {
    width: 18px;
    height: 18px;
}

.faq-dialog-contact :deep(svg:last-child) {
    width: 16px;
    height: 16px;
    margin-left: 2px;
}

@media (max-width: 440px) {
  .faq-dialog {
    width: calc(100% - 24px);
    max-height: 90vh;
    border-radius: 22px;
  }

  .faq-dialog-header {
    min-height: 205px;
    padding: 25px 22px 22px;
  }

  .faq-dialog-brand {
    margin-bottom: 10px;
  }

  .faq-dialog-body {
    gap: 10px;
    padding: 14px 13px 16px;
  }

  .faq-list {
    gap: 8px;
  }

  .faq-item {
    border-radius: 12px;
  }

  .faq-item summary {
    min-height: 54px;
    grid-template-columns: 30px minmax(0, 1fr) 18px;
    gap: 9px;
    padding: 9px 11px;
  }

  .faq-number {
    width: 29px;
    height: 29px;
  }

  .faq-question {
    font-size: 0.77rem;
  }

  .faq-item > p {
    padding: 10px 12px 13px 50px;
    font-size: 0.74rem;
  }

  .faq-dialog-note {
    font-size: 0.68rem;
  }

  .faq-dialog-contact {
    width: 100%;
  }
}

.privacy-dialog-header {
  min-height: 210px;
  padding-block: 22px;
}

.privacy-dialog-brand {
  margin-bottom: 9px;
}

.privacy-dialog-icon {
  width: 46px;
  height: 46px;
  margin-bottom: 8px;
  border-radius: 15px;
}

.privacy-dialog-icon :deep(svg) {
  width: 23px;
  height: 23px;
}

.privacy-dialog-subtitle {
  margin-top: 5px;
}

.faq-dialog-header {
  min-height: 190px;
  padding-block: 20px;
}

.faq-dialog-brand {
  margin-bottom: 8px;
}

.faq-dialog-icon {
  width: 42px;
  height: 42px;
  margin-bottom: 7px;
  border-radius: 14px;
}

.faq-dialog-icon :deep(svg) {
  width: 21px;
  height: 21px;
}

.faq-dialog-subtitle {
  margin-top: 5px;
}

@media (max-width: 600px) {
  .site-footer {
    border-top: 0;
  }
}

@media (max-width: 440px) {
  .privacy-dialog-header {
    min-height: 176px;
    padding: 20px 23px 17px;
  }

  .privacy-dialog-brand {
    margin-bottom: 7px;
  }

  .privacy-dialog-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 6px;
    border-radius: 13px;
  }

  .privacy-dialog-icon :deep(svg) {
    width: 20px;
    height: 20px;
  }

  .privacy-dialog-header h2 {
    font-size: clamp(1.35rem, 4.7vw, 1.6rem);
  }

  .privacy-dialog-subtitle {
    font-size: 0.77rem;
  }

  .faq-dialog-header {
    min-height: 156px;
    padding: 18px 22px 16px;
  }

  .faq-dialog-brand {
    margin-bottom: 6px;
  }

  .faq-dialog-icon {
    width: 36px;
    height: 36px;
    margin-bottom: 5px;
    border-radius: 12px;
  }

  .faq-dialog-icon :deep(svg) {
    width: 19px;
    height: 19px;
  }

  .faq-dialog-header h2 {
    font-size: clamp(1.3rem, 4.6vw, 1.55rem);
  }

  .faq-dialog-subtitle {
    margin-top: 4px;
    font-size: 0.74rem;
  }
}
</style>
