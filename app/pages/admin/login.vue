<script setup lang="ts">
import AppLogo from '../../components/AppLogo.vue'

useHead({
  title: 'Acceso administrativo | Clínica Óptica',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    },
    {
      name: 'description',
      content: 'Acceso administrativo de Clínica Óptica.'
    }
  ]
})

const passwordVisible = ref(false)
const loginMessage = ref('')

function submitLogin() {
  loginMessage.value = 'El acceso aún no está habilitado: esta pantalla es solo visual.'
}
</script>

<template>
  <main class="admin-login-page">
    <section
      class="login-story"
      aria-label="Clínica Óptica"
    >
      <div class="story-glow story-glow-one" />
      <div class="story-glow story-glow-two" />
      <div class="story-grid" />

      <NuxtLink
        class="login-brand"
        to="/"
        aria-label="Clínica Óptica, volver al inicio"
      >
        <AppLogo />
      </NuxtLink>

      <div class="story-content">
        <span class="story-kicker">
          <span />
          Portal de administración
        </span>
        <h1>
          Cuidamos cada detalle,
          <span>también detrás de escena.</span>
        </h1>
        <p>
          Un espacio de trabajo pensado para acompañar con excelencia cada experiencia de salud visual.
        </p>

        <div
          class="story-visual"
          aria-hidden="true"
        >
          <div class="visual-orbit orbit-outer" />
          <div class="visual-orbit orbit-inner" />
          <div class="visual-lens">
            <div class="lens-shine" />
            <div class="lens-pupil">
              <span />
            </div>
          </div>
          <div class="visual-sparkle sparkle-one">
            ✦
          </div>
          <div class="visual-sparkle sparkle-two">
            ✧
          </div>
          <div class="visual-caption">
            <span class="caption-dot" />
            Visión clara. Atención cercana.
          </div>
        </div>
      </div>

      <div class="story-footer">
        <span>Coatzacoalcos, Veracruz</span>
        <span class="story-footer-line" />
        <span>Expertos en salud visual</span>
      </div>
    </section>

    <section class="login-panel">
      <div class="login-card">
        <NuxtLink
          class="mobile-brand"
          to="/"
          aria-label="Clínica Óptica, volver al inicio"
        >
          <AppLogo />
        </NuxtLink>

        <div class="login-card-heading">
          <span class="login-emblem">
            <UIcon
              name="i-lucide-shield-check"
              aria-hidden="true"
            />
          </span>
          <p class="login-eyebrow">
            Portal privado
          </p>
          <h2>Bienvenido de nuevo</h2>
          <p class="login-intro">
            Acceso exclusivo para el equipo de Clínica Óptica.
          </p>
        </div>

        <form
          class="login-form"
          @submit.prevent="submitLogin"
        >
          <label for="admin-email">Correo electrónico</label>
          <div class="login-input-wrap">
            <UIcon
              name="i-lucide-mail"
              aria-hidden="true"
            />
            <input
              id="admin-email"
              type="email"
              name="email"
              autocomplete="username"
              placeholder="admin@clinicaoptica.com"
              required
            >
          </div>

          <div class="password-label-row">
            <label for="admin-password">Contraseña</label>
          </div>
          <div class="login-input-wrap">
            <UIcon
              name="i-lucide-lock-keyhole"
              aria-hidden="true"
            />
            <input
              id="admin-password"
              :type="passwordVisible ? 'text' : 'password'"
              name="password"
              autocomplete="current-password"
              placeholder="Ingresa tu contraseña"
              required
            >
            <button
              class="password-toggle"
              type="button"
              :aria-label="passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              :aria-pressed="passwordVisible"
              @click="passwordVisible = !passwordVisible"
            >
              <UIcon
                :name="passwordVisible ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                aria-hidden="true"
              />
            </button>
          </div>

          <p
            v-if="loginMessage"
            class="login-message"
            role="status"
          >
            <UIcon
              name="i-lucide-info"
              aria-hidden="true"
            />
            {{ loginMessage }}
          </p>

          <button
            class="login-submit"
            type="submit"
          >
            Iniciar sesión
            <UIcon
              name="i-lucide-arrow-right"
              aria-hidden="true"
            />
          </button>
        </form>

        <div class="login-security-note">
          <UIcon
            name="i-lucide-shield"
            aria-hidden="true"
          />
          <span>Solo personal autorizado</span>
        </div>

        <NuxtLink
          class="back-home"
          to="/"
        >
          <UIcon
            name="i-lucide-arrow-left"
            aria-hidden="true"
          />
          Volver al sitio
        </NuxtLink>
      </div>

      <p class="panel-copyright">
        Clínica Óptica © {{ new Date().getFullYear() }}
      </p>
    </section>
  </main>
</template>

<style scoped>
.admin-login-page {
  display: grid;
  width: 100%;
  height: 100svh;
  min-height: 0;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  overflow: hidden;
  background: #fff;
  color: #102b4a;
}

.login-story {
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  padding: clamp(22px, 3.8vh, 38px) clamp(30px, 6vw, 88px) 24px;
  background:
    radial-gradient(ellipse at 76% 57%, rgb(37 85 121 / 37%), transparent 38%),
    linear-gradient(145deg, #0c2742 0%, #102b4a 48%, #173f63 100%);
  color: #fff;
}

.story-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(135deg, transparent 10%, #000 100%);
  pointer-events: none;
}

.story-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
  pointer-events: none;
}

.story-glow-one {
  top: 12%;
  right: -130px;
  width: clamp(250px, 29vw, 430px);
  height: clamp(250px, 29vw, 430px);
  border: 1px solid rgb(201 150 56 / 20%);
  box-shadow: 0 0 0 24px rgb(201 150 56 / 3%), 0 0 0 52px rgb(201 150 56 / 2%);
}

.story-glow-two {
  bottom: -12%;
  left: -210px;
  width: 390px;
  height: 390px;
  background: rgb(52 112 151 / 15%);
}

.login-brand {
  position: relative;
  z-index: 1;
  display: block;
  width: min(100%, 260px);
  border: 1px solid rgb(16 43 74 / 6%);
  border-radius: 15px;
  padding: 12px 15px;
  background: linear-gradient(145deg, #fff, #f6f8fa);
  text-decoration: none;
  box-shadow: 0 10px 28px rgb(4 19 34 / 15%);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.login-brand:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgb(4 19 34 / 22%);
}

.story-content {
  position: relative;
  z-index: 1;
  width: min(100%, 670px);
  margin: auto 0;
  padding-block: clamp(18px, 4vh, 52px);
}

.story-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(230 201 130 / 26%);
  border-radius: 999px;
  padding: 9px 14px;
  background: rgb(255 255 255 / 5%);
  color: #e4c47f;
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.story-kicker > span,
.caption-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d6ad58;
  box-shadow: 0 0 0 5px rgb(214 173 88 / 13%);
}

.story-content h1 {
  max-width: 670px;
  margin: 22px 0 16px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 500;
  letter-spacing: -0.055em;
  line-height: 1.06;
}

.story-content h1 span {
  display: block;
  color: #e6c982;
}

.story-content > p {
  max-width: 480px;
  margin: 0;
  color: rgb(238 244 249 / 75%);
  font-size: 0.98rem;
  line-height: 1.7;
}

.story-visual {
  position: relative;
  width: min(100%, 590px);
  height: clamp(150px, 21vh, 220px);
  margin-top: clamp(18px, 3vh, 34px);
}

.visual-orbit {
  position: absolute;
  top: 50%;
  left: 31%;
  aspect-ratio: 1;
  border: 1px solid rgb(255 255 255 / 13%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.orbit-outer {
  width: 178px;
}

.orbit-inner {
  width: 138px;
  border-color: rgb(201 150 56 / 26%);
}

.visual-lens {
  position: absolute;
  top: 50%;
  left: 31%;
  display: grid;
  width: 100px;
  height: 100px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 67%);
  border-radius: 50%;
  background:
    radial-gradient(circle at 29% 23%, rgb(255 255 255 / 84%), transparent 9%),
    radial-gradient(circle at 68% 75%, rgb(48 116 157 / 52%), transparent 49%),
    linear-gradient(145deg, rgb(217 236 247 / 25%), rgb(78 139 177 / 12%));
  box-shadow: 0 0 44px rgb(96 165 202 / 24%), inset 0 0 28px rgb(255 255 255 / 13%);
  transform: translate(-50%, -50%);
}

.lens-shine {
  position: absolute;
  top: 17px;
  left: 22px;
  width: 24px;
  height: 12px;
  border-radius: 50%;
  background: rgb(255 255 255 / 65%);
  filter: blur(5px);
  transform: rotate(-35deg);
}

.lens-pupil {
  display: grid;
  width: 33px;
  height: 33px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 76%);
  border-radius: 50%;
  background: radial-gradient(circle, #081e32 0 34%, #1a4b6c 38% 57%, rgb(237 213 151 / 85%) 61% 65%, transparent 68%);
  box-shadow: 0 0 20px rgb(8 30 50 / 30%);
}

.lens-pupil > span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  transform: translate(4px, -4px);
}

.visual-sparkle {
  position: absolute;
  color: #e4c47f;
  text-shadow: 0 0 18px rgb(228 196 127 / 50%);
}

.sparkle-one {
  top: 20px;
  left: 52%;
  font-size: 1.3rem;
}

.sparkle-two {
  top: 68px;
  left: 58%;
  font-size: 2.1rem;
}

.visual-caption {
  position: absolute;
  top: 50%;
  left: 58%;
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 999px;
  padding: 12px 18px;
  background: linear-gradient(120deg, rgb(255 255 255 / 10%), rgb(255 255 255 / 4%));
  color: rgb(246 249 252 / 86%);
  font-size: 0.75rem;
  letter-spacing: 0.035em;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 28px rgb(0 0 0 / 8%), inset 0 1px rgb(255 255 255 / 8%);
}

.caption-dot {
  width: 6px;
  height: 6px;
}

.story-footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 13px;
  color: rgb(226 235 243 / 58%);
  font-size: 0.69rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.story-footer-line {
  width: 28px;
  height: 1px;
  background: rgb(201 150 56 / 65%);
}

.login-panel {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 0;
  align-content: center;
  justify-items: center;
  padding: 34px clamp(24px, 4vw, 60px) 60px;
  background:
    radial-gradient(ellipse at 100% 0%, rgb(224 234 241 / 78%), transparent 39%),
    radial-gradient(ellipse at 0% 100%, rgb(201 150 56 / 8%), transparent 42%),
    linear-gradient(145deg, #f5f8fa, #fff 58%);
}

.login-panel::before,
.login-panel::after {
  position: absolute;
  border: 1px solid rgb(16 43 74 / 5%);
  border-radius: 50%;
  content: "";
  pointer-events: none;
}

.login-panel::before {
  top: -100px;
  right: -110px;
  width: 300px;
  height: 300px;
  box-shadow: 0 0 0 24px rgb(16 43 74 / 2%), 0 0 0 48px rgb(16 43 74 / 1%);
}

.login-panel::after {
  bottom: -135px;
  left: -125px;
  width: 270px;
  height: 270px;
  border-color: rgb(201 150 56 / 14%);
}

.login-card {
  position: relative;
  z-index: 1;
  width: min(100%, 490px);
  overflow: hidden;
  border: 1px solid rgb(219 229 236 / 90%);
  border-radius: 27px;
  padding: clamp(28px, 3.2vw, 44px);
  background: linear-gradient(155deg, rgb(255 255 255 / 98%), rgb(255 255 255 / 94%));
  box-shadow: 0 30px 75px rgb(16 43 74 / 12%), 0 5px 18px rgb(16 43 74 / 4%), inset 0 1px #fff;
  backdrop-filter: blur(14px);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.login-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 36px 85px rgb(16 43 74 / 15%), 0 7px 22px rgb(16 43 74 / 5%), inset 0 1px #fff;
}

.login-card::before {
  position: absolute;
  top: 0;
  right: 34px;
  left: 34px;
  height: 3px;
  border-radius: 0 0 999px 999px;
  background: linear-gradient(90deg, transparent, #c99638 28%, #e4c47f 50%, #c99638 72%, transparent);
  content: "";
}

.mobile-brand {
  display: none;
}

.login-card-heading {
  position: relative;
  margin-bottom: 27px;
  text-align: center;
}

.login-emblem {
  display: grid;
  width: 52px;
  height: 52px;
  margin: 0 auto 15px;
  place-items: center;
  border: 1px solid #dce7ee;
  border-radius: 18px;
  background:
    radial-gradient(circle at 25% 15%, #fff, transparent 42%),
    linear-gradient(145deg, #eff5f8, #e3edf3);
  color: #1a527b;
  box-shadow: 0 12px 25px rgb(16 43 74 / 10%), inset 0 1px #fff;
}

.login-emblem :deep(svg) {
  width: 24px;
  height: 24px;
}

.login-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 0 7px;
  color: #99712d;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.login-eyebrow::before {
  width: 17px;
  height: 1px;
  background: #c99638;
  content: "";
}

.login-card h2 {
  margin: 0;
  color: #102b4a;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.75rem, 2.6vw, 2.3rem);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1.15;
}

.login-intro {
  max-width: 360px;
  margin: 9px auto 0;
  color: #6c7b8b;
  font-size: 0.87rem;
  line-height: 1.55;
}

.login-form {
  display: grid;
  gap: 10px;
}

.login-form label {
  color: #253d53;
  font-size: 0.76rem;
  font-weight: 750;
}

.login-input-wrap {
  display: flex;
  min-height: 52px;
  align-items: center;
  gap: 11px;
  border: 1px solid #dce4ea;
  border-radius: 14px;
  padding: 0 15px;
  background: linear-gradient(180deg, #fff, #fcfdfe);
  color: #8493a1;
  transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.login-input-wrap:focus-within {
  border-color: #477797;
  background: #fff;
  box-shadow: 0 0 0 4px rgb(71 119 151 / 10%), 0 7px 18px rgb(16 43 74 / 5%);
}

.login-input-wrap > :deep(svg) {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
}

.login-input-wrap input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #102b4a;
  font: inherit;
  font-size: 0.88rem;
}

.login-input-wrap input::placeholder {
  color: #a0acb7;
}

.password-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.password-label-row a {
  color: #286084;
  font-size: 0.72rem;
  font-weight: 650;
  text-decoration: none;
}

.password-label-row a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.password-toggle {
  display: grid;
  width: 32px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #728394;
  cursor: pointer;
}

.password-toggle:hover {
  background: #f0f4f7;
  color: #1b5279;
}

.password-toggle :deep(svg) {
  width: 18px;
  height: 18px;
}

.login-submit {
  display: flex;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  gap: 11px;
  margin-top: 9px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(110deg, #1b5279, #102b4a 78%);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 750;
  box-shadow: 0 12px 24px rgb(16 43 74 / 19%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.login-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgb(16 43 74 / 25%);
}

.login-submit :deep(svg) {
  width: 18px;
  height: 18px;
}

.login-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 5px 0 0;
  border: 1px solid #eadbb7;
  border-radius: 10px;
  padding: 10px 12px;
  background: #fbf7ed;
  color: #755a28;
  font-size: 0.75rem;
  line-height: 1.45;
}

.login-message :deep(svg) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.login-security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  margin: 19px auto 0;
  border: 1px solid #edf1f4;
  border-radius: 999px;
  padding: 8px 13px;
  background: #f8fafb;
  color: #7b8996;
  font-size: 0.69rem;
  line-height: 1.45;
  text-align: center;
}

.login-security-note :deep(svg) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: #8a9aaa;
}

.back-home {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  margin: 18px auto 0;
  color: #526b80;
  font-size: 0.76rem;
  font-weight: 700;
  text-decoration: none;
}

.back-home:hover {
  color: #1b5279;
}

.back-home :deep(svg) {
  width: 16px;
  height: 16px;
}

.panel-copyright {
  z-index: 1;
  position: absolute;
  right: 24px;
  bottom: 17px;
  left: 24px;
  margin: 0;
  color: #9aa6b1;
  font-size: 0.65rem;
  text-align: center;
}

@media (max-width: 900px) {
  .admin-login-page {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  }

  .login-story {
    padding-inline: 28px;
  }

  .login-panel {
    padding-inline: 20px;
  }

  .story-content h1 {
    font-size: clamp(2.3rem, 5vw, 3.5rem);
  }

  .visual-caption {
    left: 53%;
    font-size: 0.67rem;
  }
}

@media (max-width: 760px) {
  .admin-login-page {
    grid-template-columns: 1fr;
  }

  .login-story {
    display: none;
  }

  .login-panel {
    min-height: 0;
    padding: 42px 24px 76px;
  }

  .login-card {
    max-width: 420px;
    border-radius: 22px;
    padding: 26px 22px;
  }

  .login-card h2 {
    font-size: clamp(2rem, 7vw, 2.5rem);
  }

  .login-card-heading {
    margin-bottom: 22px;
  }

  .login-emblem {
    width: 48px;
    height: 48px;
    margin-bottom: 14px;
    border-radius: 16px;
  }

  .login-intro {
    margin: 11px 0 24px;
    font-size: 0.9rem;
  }

  .login-form {
    gap: 10px;
  }

  .login-form label {
    font-size: 0.77rem;
  }

  .login-input-wrap {
    min-height: 52px;
    gap: 11px;
    border-radius: 12px;
    padding-inline: 14px;
  }

  .login-input-wrap input {
    font-size: 0.85rem;
  }

  .login-submit {
    min-height: 52px;
    margin-top: 14px;
    border-radius: 12px;
    font-size: 0.88rem;
  }

  .login-security-note {
    margin-top: 23px;
    font-size: 0.69rem;
  }

  .back-home {
    margin-top: 27px;
    font-size: 0.77rem;
  }

  .mobile-brand {
    display: block;
    width: min(100%, 245px);
    margin-bottom: 42px;
    border: 1px solid #edf0f2;
    border-radius: 12px;
    padding: 10px 12px;
    background: #fff;
    text-decoration: none;
    box-shadow: 0 8px 25px rgb(16 43 74 / 6%);
  }
}

@media (max-width: 380px) {
  .login-panel {
    padding-inline: 20px;
  }

  .mobile-brand {
    margin-bottom: 32px;
  }

  .login-intro {
    margin-bottom: 24px;
  }
}

@media (max-height: 720px) and (min-width: 761px) {
  .login-story {
    padding-block: 18px 16px;
  }

  .story-content {
    padding-block: 12px;
  }

  .story-content h1 {
    margin-block: 15px 10px;
    font-size: clamp(2.3rem, 4.3vw, 4rem);
  }

  .story-content > p {
    font-size: 0.88rem;
  }

  .story-visual {
    height: 132px;
    margin-top: 16px;
  }

  .login-panel {
    padding-block: 12px 34px;
  }

  .login-card {
    padding-block: 22px;
  }

  .login-card-heading {
    margin-bottom: 16px;
  }

  .login-emblem {
    width: 42px;
    height: 42px;
    margin-bottom: 12px;
  }

  .login-intro {
    margin-block: 4px 10px;
  }

  .login-input-wrap {
    min-height: 40px;
  }

  .login-submit {
    min-height: 42px;
  }

  .login-security-note {
    margin-top: 9px;
  }

  .back-home {
    margin-top: 9px;
  }
}

@media (max-height: 700px) and (max-width: 760px) {
  .login-panel {
    padding: 14px 22px 36px;
  }

  .login-card {
    max-width: 390px;
    border-radius: 19px;
    padding: 18px 20px;
  }

  .mobile-brand {
    width: min(100%, 215px);
    margin-bottom: 17px;
    padding: 7px 10px;
  }

  .login-card-heading {
    margin-bottom: 13px;
  }

  .login-emblem {
    width: 38px;
    height: 38px;
    margin-bottom: 8px;
    border-radius: 13px;
  }

  .login-emblem :deep(svg) {
    width: 18px;
    height: 18px;
  }

  .login-intro {
    margin-top: 6px;
    font-size: 0.8rem;
  }

  .login-form {
    gap: 7px;
  }

  .login-input-wrap {
    min-height: 43px;
    border-radius: 11px;
  }

  .login-submit {
    min-height: 43px;
    margin-top: 7px;
  }

  .login-security-note {
    margin-top: 10px;
    padding-block: 6px;
  }

  .back-home {
    margin-top: 10px;
  }

  .panel-copyright {
    bottom: 8px;
  }

  .login-emblem {
    width: 42px;
    height: 42px;
    margin-bottom: 12px;
  }
}
</style>

<style scoped>
.admin-login-page {
  background: #f4f3ef;
}

.login-story {
  isolation: isolate;
  padding-inline: clamp(30px, 6vw, 92px);
  background:
    radial-gradient(ellipse at 72% 45%, rgb(54 115 153 / 34%), transparent 31%),
    radial-gradient(ellipse at 6% 94%, rgb(201 150 56 / 13%), transparent 37%),
    linear-gradient(132deg, #091d32 0%, #102b4a 47%, #17486b 100%);
}

.login-story::before,
.login-story::after {
  position: absolute;
  z-index: -1;
  border: 1px solid rgb(230 201 130 / 13%);
  border-radius: 50%;
  content: "";
  pointer-events: none;
}

.login-story::before {
  top: 17%;
  right: -15%;
  width: min(53vw, 670px);
  aspect-ratio: 1;
  box-shadow:
    0 0 0 26px rgb(230 201 130 / 2%),
    0 0 0 72px rgb(230 201 130 / 2%),
    inset 0 0 85px rgb(54 115 153 / 11%);
}

.login-story::after {
  right: 8%;
  bottom: 14%;
  width: 14px;
  height: 14px;
  border-color: #e6c982;
  background: #e6c982;
  box-shadow: 0 0 28px 8px rgb(230 201 130 / 32%);
}

.story-grid {
  opacity: 0.42;
  background-size: 52px 52px;
}

.story-glow-one {
  top: 9%;
  right: -12%;
  width: min(38vw, 470px);
  height: auto;
  aspect-ratio: 1;
  border-color: rgb(230 201 130 / 25%);
  box-shadow:
    0 0 0 32px rgb(230 201 130 / 3%),
    0 0 0 78px rgb(230 201 130 / 2%),
    0 0 70px rgb(53 117 156 / 12%);
}

.story-glow-two {
  bottom: -29%;
  left: 28%;
  width: 480px;
  height: 480px;
  background: rgb(28 90 130 / 17%);
  filter: blur(48px);
}

.login-brand {
  width: min(100%, 278px);
  border-color: rgb(230 201 130 / 35%);
  border-radius: 17px;
  padding: 13px 17px;
  background: linear-gradient(145deg, #fff 0%, #f5f4ef 100%);
  box-shadow: 0 16px 42px rgb(3 16 29 / 25%), inset 0 1px #fff;
}

.login-brand:hover {
  box-shadow: 0 19px 48px rgb(3 16 29 / 31%), inset 0 1px #fff;
}

.story-content {
  width: min(100%, 700px);
  padding-block: clamp(15px, 3vh, 34px);
}

.story-kicker {
  gap: 12px;
  border-color: rgb(230 201 130 / 37%);
  padding: 10px 16px;
  background: linear-gradient(110deg, rgb(255 255 255 / 9%), rgb(255 255 255 / 3%));
  box-shadow: inset 0 1px rgb(255 255 255 / 6%);
  color: #f1d48d;
  font-size: 0.67rem;
  letter-spacing: 0.18em;
}

.story-kicker > span {
  background: #edc96c;
  box-shadow: 0 0 0 5px rgb(237 201 108 / 13%), 0 0 14px rgb(237 201 108 / 54%);
}

.story-content h1 {
  max-width: 700px;
  margin: 25px 0 19px;
  font-size: clamp(3.1rem, 5.1vw, 5rem);
  letter-spacing: -0.06em;
  line-height: 1.02;
  text-wrap: balance;
}

.story-content h1 span {
  color: #f0d58f;
  text-shadow: 0 8px 35px rgb(230 201 130 / 12%);
}

.story-content > p {
  max-width: 455px;
  color: rgb(238 244 249 / 76%);
  font-size: 0.96rem;
  line-height: 1.75;
}

.story-visual {
  width: min(100%, 620px);
  height: clamp(155px, 20vh, 205px);
  margin-top: clamp(15px, 2.3vh, 25px);
}

.visual-orbit {
  left: 29%;
  border-color: rgb(242 247 251 / 20%);
  box-shadow: 0 0 45px rgb(102 170 208 / 8%);
}

.orbit-outer {
  width: 190px;
}

.orbit-inner {
  width: 152px;
  border-color: rgb(230 201 130 / 45%);
  box-shadow: inset 0 0 22px rgb(230 201 130 / 6%);
}

.visual-lens {
  left: 29%;
  width: 112px;
  height: 112px;
  border-color: rgb(255 255 255 / 78%);
  background:
    radial-gradient(circle at 28% 20%, rgb(255 255 255 / 96%), transparent 8%),
    radial-gradient(circle at 68% 78%, rgb(68 145 185 / 59%), transparent 47%),
    linear-gradient(145deg, rgb(237 247 251 / 36%), rgb(65 126 163 / 15%));
  box-shadow:
    0 0 0 9px rgb(255 255 255 / 3%),
    0 0 0 22px rgb(230 201 130 / 5%),
    0 0 58px rgb(96 165 202 / 30%),
    inset 0 0 32px rgb(255 255 255 / 19%);
}

.lens-pupil {
  width: 38px;
  height: 38px;
  background: radial-gradient(circle, #07192a 0 35%, #1b5376 39% 57%, #f3d990 62% 66%, transparent 69%);
}

.sparkle-one {
  top: 14px;
  left: 50%;
  font-size: 1.5rem;
}

.sparkle-two {
  top: 72px;
  left: 54%;
  font-size: 2.3rem;
}

.visual-caption {
  left: 54%;
  gap: 13px;
  border-color: rgb(255 255 255 / 20%);
  padding: 13px 19px;
  background: linear-gradient(115deg, rgb(255 255 255 / 12%), rgb(255 255 255 / 5%));
  box-shadow: 0 16px 40px rgb(0 0 0 / 15%), inset 0 1px rgb(255 255 255 / 11%);
  backdrop-filter: blur(14px);
}

.caption-dot {
  background: #edc96c;
  box-shadow: 0 0 0 5px rgb(237 201 108 / 12%), 0 0 12px rgb(237 201 108 / 43%);
}

.story-footer {
  gap: 15px;
  color: rgb(226 235 243 / 66%);
  font-size: 0.66rem;
  letter-spacing: 0.11em;
}

.story-footer-line {
  width: 36px;
  height: 2px;
  background: linear-gradient(90deg, #c99638, #f0d58f);
  box-shadow: 0 0 12px rgb(230 201 130 / 35%);
}

.login-panel {
  padding: 34px clamp(25px, 4vw, 60px) 60px;
  background:
    radial-gradient(ellipse at 92% 15%, rgb(224 234 241 / 82%), transparent 43%),
    radial-gradient(ellipse at 0% 100%, rgb(201 150 56 / 13%), transparent 47%),
    linear-gradient(145deg, #f0f2f1 0%, #fbfaf7 48%, #fff 100%);
}

.login-panel::before {
  top: -135px;
  right: -125px;
  width: 360px;
  height: 360px;
  border-color: rgb(16 43 74 / 7%);
  box-shadow:
    0 0 0 25px rgb(16 43 74 / 2%),
    0 0 0 61px rgb(16 43 74 / 2%),
    0 0 0 105px rgb(201 150 56 / 2%);
}

.login-panel::after {
  bottom: -160px;
  left: -150px;
  width: 320px;
  height: 320px;
  border-color: rgb(201 150 56 / 24%);
  box-shadow: 0 0 0 27px rgb(201 150 56 / 4%), 0 0 0 61px rgb(201 150 56 / 2%);
}

.login-card {
  width: min(100%, 500px);
  border-color: rgb(193 172 129 / 45%);
  border-radius: 30px;
  padding: clamp(31px, 3.4vw, 47px);
  background:
    radial-gradient(ellipse at 50% -12%, rgb(230 201 130 / 11%), transparent 49%),
    linear-gradient(155deg, rgb(255 255 255 / 99%), rgb(255 255 255 / 96%));
  box-shadow:
    0 35px 85px rgb(16 43 74 / 16%),
    0 8px 24px rgb(16 43 74 / 5%),
    inset 0 1px #fff;
}

.login-card:hover {
  box-shadow:
    0 42px 95px rgb(16 43 74 / 19%),
    0 10px 28px rgb(16 43 74 / 6%),
    inset 0 1px #fff;
}

.login-card::before {
  right: 42px;
  left: 42px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #b77f21 18%, #e4c47f 50%, #b77f21 82%, transparent);
}

.login-emblem {
  width: 60px;
  height: 60px;
  margin-bottom: 17px;
  border-color: rgb(201 150 56 / 33%);
  border-radius: 20px;
  background:
    radial-gradient(circle at 24% 15%, rgb(255 255 255 / 28%), transparent 42%),
    linear-gradient(145deg, #1a5279, #102b4a 72%);
  color: #f2d58f;
  box-shadow: 0 15px 28px rgb(16 43 74 / 23%), inset 0 1px rgb(255 255 255 / 16%);
}

.login-emblem :deep(svg) {
  width: 26px;
  height: 26px;
}

.login-eyebrow {
  gap: 10px;
  color: #98702b;
  letter-spacing: 0.17em;
}

.login-eyebrow::before {
  width: 23px;
  height: 2px;
  background: linear-gradient(90deg, #c99638, #e7d19d);
}

.login-card h2 {
  font-size: clamp(1.9rem, 2.5vw, 2.45rem);
  letter-spacing: -0.052em;
}

.login-intro {
  margin-top: 10px;
  color: #687b8c;
  font-size: 0.88rem;
}

.login-card-heading {
  margin-bottom: 29px;
}

.login-form {
  gap: 11px;
}

.login-form label {
  color: #233c53;
  font-size: 0.75rem;
  letter-spacing: 0.015em;
}

.login-input-wrap {
  min-height: 55px;
  gap: 12px;
  border-color: #dce3e6;
  border-radius: 13px;
  padding-inline: 16px;
  background: linear-gradient(180deg, #fff, #f9faf9);
  color: #718596;
  box-shadow: inset 0 1px 2px rgb(16 43 74 / 2%);
}

.login-input-wrap:focus-within {
  border-color: #b78a3b;
  background: #fff;
  box-shadow: 0 0 0 4px rgb(201 150 56 / 13%), 0 8px 20px rgb(16 43 74 / 5%);
}

.login-input-wrap > :deep(svg) {
  color: #6e8ba0;
}

.login-input-wrap input {
  font-size: 0.9rem;
}

.login-input-wrap input::placeholder {
  color: #9ba8b1;
}

.password-toggle {
  width: 36px;
  height: 38px;
  color: #63798b;
}

.password-toggle:hover {
  background: #f6f1e7;
  color: #8b662a;
}

.login-submit {
  position: relative;
  min-height: 56px;
  gap: 12px;
  margin-top: 11px;
  border: 1px solid rgb(171 120 32 / 43%);
  border-radius: 13px;
  background: linear-gradient(110deg, #e8c875 0%, #d9ad51 53%, #c99638 100%);
  color: #102b4a;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.015em;
  box-shadow: 0 13px 25px rgb(172 126 45 / 23%), inset 0 1px rgb(255 255 255 / 48%);
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.login-submit:hover {
  transform: translateY(-2px);
  filter: saturate(1.08) brightness(1.03);
  box-shadow: 0 18px 31px rgb(172 126 45 / 31%), inset 0 1px rgb(255 255 255 / 55%);
}

.login-submit :deep(svg) {
  width: 19px;
  height: 19px;
  transition: transform 180ms ease;
}

.login-submit:hover :deep(svg) {
  transform: translateX(3px);
}

.login-message {
  border-color: #eadbb7;
  border-radius: 12px;
  background: linear-gradient(110deg, #fbf7ed, #fffaf0);
  box-shadow: inset 0 1px rgb(255 255 255 / 80%);
}

.login-security-note {
  gap: 9px;
  margin-top: 20px;
  border-color: #e8ecec;
  padding: 9px 14px;
  background: linear-gradient(110deg, #f5f7f6, #fbfaf6);
  color: #627689;
}

.login-security-note :deep(svg) {
  color: #af8436;
}

.back-home {
  gap: 9px;
  margin-top: 20px;
  color: #586f83;
  transition: color 160ms ease, gap 160ms ease;
}

.back-home:hover {
  gap: 12px;
  color: #173f63;
}

.panel-copyright {
  color: #87939b;
  letter-spacing: 0.035em;
}

@media (max-width: 900px) and (min-width: 761px) {
  .login-story {
    padding-inline: 28px;
  }

  .story-content h1 {
    font-size: clamp(2.3rem, 4.8vw, 3.5rem);
  }

  .story-visual {
    height: 155px;
  }

  .login-card {
    padding: 30px 24px;
  }

  .login-card-heading {
    margin-bottom: 22px;
  }
}

@media (max-width: 760px) {
  .admin-login-page {
    background: #f5f4ef;
  }

  .login-story {
    display: none;
  }

  .login-panel {
    padding: 30px 22px 50px;
    background:
      radial-gradient(ellipse at 85% 9%, rgb(230 201 130 / 25%), transparent 32%),
      radial-gradient(ellipse at 4% 87%, rgb(38 92 129 / 10%), transparent 37%),
      linear-gradient(145deg, #f1f4f3, #fcfaf5 56%, #fff);
  }

  .login-card {
    max-width: 440px;
    border-radius: 26px;
    padding: 27px 24px 25px;
  }

  .mobile-brand {
    width: min(100%, 245px);
    margin: 0 auto 25px;
    border-color: rgb(201 150 56 / 25%);
    border-radius: 15px;
    padding: 10px 13px;
    box-shadow: 0 12px 28px rgb(16 43 74 / 8%), inset 0 1px #fff;
  }

  .login-card-heading {
    margin-bottom: 21px;
  }

  .login-emblem {
    width: 50px;
    height: 50px;
    margin-bottom: 13px;
    border-radius: 17px;
  }

  .login-card h2 {
    font-size: clamp(1.9rem, 7vw, 2.4rem);
  }

  .login-intro {
    margin: 8px auto 0;
    font-size: 0.86rem;
  }

  .login-form {
    gap: 9px;
  }

  .login-input-wrap {
    min-height: 51px;
  }

  .login-submit {
    min-height: 52px;
    margin-top: 9px;
  }

  .login-security-note {
    margin-top: 17px;
  }

  .back-home {
    margin-top: 17px;
  }
}

@media (max-width: 380px) {
  .login-panel {
    padding-inline: 18px;
  }

  .login-card {
    padding-inline: 20px;
  }
}

@media (max-height: 720px) and (min-width: 761px) {
  .login-panel {
    padding-block: 12px 34px;
  }

  .login-card {
    padding-block: 22px;
  }

  .login-card-heading {
    margin-bottom: 16px;
  }

  .login-emblem {
    width: 44px;
    height: 44px;
    margin-bottom: 10px;
  }

  .login-emblem :deep(svg) {
    width: 20px;
    height: 20px;
  }

  .login-intro {
    margin-top: 6px;
  }

  .login-input-wrap {
    min-height: 43px;
  }

  .login-submit {
    min-height: 45px;
    margin-top: 7px;
  }

  .login-security-note {
    margin-top: 10px;
    padding-block: 6px;
  }

  .back-home {
    margin-top: 10px;
  }
}

@media (max-height: 700px) and (max-width: 760px) {
  .login-panel {
    padding: 14px 22px 36px;
  }

  .login-card {
    max-width: 390px;
    border-radius: 21px;
    padding: 17px 20px;
  }

  .mobile-brand {
    width: min(100%, 215px);
    margin-bottom: 15px;
    padding-block: 7px;
  }

  .login-card-heading {
    margin-bottom: 12px;
  }

  .login-emblem {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    border-radius: 14px;
  }

  .login-emblem :deep(svg) {
    width: 18px;
    height: 18px;
  }

  .login-intro {
    margin-top: 5px;
    font-size: 0.78rem;
  }

  .login-form {
    gap: 7px;
  }

  .login-input-wrap {
    min-height: 42px;
    border-radius: 11px;
  }

  .login-submit {
    min-height: 43px;
    margin-top: 6px;
  }

  .login-security-note {
    margin-top: 9px;
    padding-block: 5px;
  }

  .back-home {
    margin-top: 9px;
  }

  .panel-copyright {
    bottom: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-brand,
  .login-card,
  .login-submit,
  .login-submit :deep(svg),
  .back-home {
    transition: none;
  }
}
</style>

<style scoped>
.story-glow-one {
  border-color: rgb(111 190 226 / 25%);
  box-shadow:
    0 0 0 32px rgb(111 190 226 / 3%),
    0 0 0 78px rgb(111 190 226 / 2%),
    0 0 70px rgb(53 117 156 / 12%);
}

.login-story::before {
  border-color: rgb(143 201 232 / 18%);
  box-shadow:
    0 0 0 26px rgb(143 201 232 / 2%),
    0 0 0 72px rgb(143 201 232 / 2%),
    inset 0 0 85px rgb(54 139 190 / 11%);
}

.login-story::after {
  border-color: #8fc9e8;
  background: #8fc9e8;
  box-shadow: 0 0 28px 8px rgb(111 190 226 / 32%);
}

.story-kicker {
  border-color: rgb(143 201 232 / 37%);
  color: #b9e4f5;
}

.story-kicker > span,
.caption-dot {
  background: #8fd0f2;
  box-shadow: 0 0 0 5px rgb(111 190 226 / 13%), 0 0 14px rgb(111 190 226 / 43%);
}

.story-content h1 span {
  color: #b9e4f5;
  text-shadow: 0 8px 35px rgb(143 201 232 / 12%);
}

.orbit-inner {
  border-color: rgb(143 201 232 / 45%);
  box-shadow: inset 0 0 22px rgb(143 201 232 / 6%);
}

.lens-pupil {
  background: radial-gradient(circle, #07192a 0 35%, #1b5376 39% 57%, #b9e4f5 62% 66%, transparent 69%);
}

.visual-sparkle {
  color: #b9e4f5;
  text-shadow: 0 0 18px rgb(111 190 226 / 50%);
}

.caption-dot {
  box-shadow: 0 0 0 5px rgb(111 190 226 / 12%), 0 0 12px rgb(111 190 226 / 43%);
}

.story-footer-line {
  background: linear-gradient(90deg, #368fbe, #b9e4f5);
  box-shadow: 0 0 12px rgb(111 190 226 / 35%);
}

.login-panel {
  background:
    radial-gradient(ellipse at 92% 15%, rgb(224 234 241 / 82%), transparent 43%),
    radial-gradient(ellipse at 0% 100%, rgb(54 139 190 / 11%), transparent 47%),
    linear-gradient(145deg, #f0f2f1 0%, #fbfaf7 48%, #fff 100%);
}

.login-panel::before {
  box-shadow:
    0 0 0 25px rgb(16 43 74 / 2%),
    0 0 0 61px rgb(16 43 74 / 2%),
    0 0 0 105px rgb(54 139 190 / 2%);
}

.login-panel::after {
  border-color: rgb(54 139 190 / 22%);
  box-shadow: 0 0 0 27px rgb(54 139 190 / 4%), 0 0 0 61px rgb(54 139 190 / 2%);
}

.login-card {
  background:
    radial-gradient(ellipse at 50% -12%, rgb(54 139 190 / 9%), transparent 49%),
    linear-gradient(155deg, rgb(255 255 255 / 99%), rgb(255 255 255 / 96%));
}

.login-card::before {
  background: linear-gradient(90deg, transparent, #2c75a0 18%, #9bd4f0 50%, #2c75a0 82%, transparent);
}

.login-emblem {
  border-color: rgb(54 139 190 / 36%);
  color: #b9e4f5;
}

.login-eyebrow {
  color: #286084;
}

.login-eyebrow::before {
  background: linear-gradient(90deg, #368fbe, #b9e4f5);
}

.login-input-wrap:focus-within {
  border-color: #438bb3;
  box-shadow: 0 0 0 4px rgb(54 139 190 / 13%), 0 8px 20px rgb(16 43 74 / 5%);
}

.password-toggle:hover {
  background: #eaf3f8;
  color: #286084;
}

.login-submit {
  border-color: rgb(37 112 153 / 48%);
  background: linear-gradient(110deg, #b9e4f5 0%, #69b7df 53%, #368fbe 100%);
  color: #102b4a;
  box-shadow: 0 13px 25px rgb(38 112 153 / 24%), inset 0 1px rgb(255 255 255 / 52%);
}

.login-submit:hover {
  box-shadow: 0 18px 31px rgb(38 112 153 / 32%), inset 0 1px rgb(255 255 255 / 58%);
}

.login-message {
  border-color: #c9dfe9;
  background: linear-gradient(110deg, #eff7fa, #f8fcfd);
  color: #28516b;
}

.login-security-note :deep(svg) {
  color: #438bb3;
}

@media (max-width: 760px) {
  .login-panel {
    background:
      radial-gradient(ellipse at 85% 9%, rgb(111 190 226 / 19%), transparent 32%),
      radial-gradient(ellipse at 4% 87%, rgb(38 92 129 / 10%), transparent 37%),
      linear-gradient(145deg, #f1f4f3, #fcfaf5 56%, #fff);
  }

  .mobile-brand {
    border-color: rgb(54 139 190 / 25%);
  }
}
</style>
