<script setup lang="ts">
import teamPhoto from '~/assets/RecOpt.webp'

useHead({
  title: 'Nosotros | Clínica Óptica',
  meta: [
    {
      name: 'description',
      content: 'Conoce la historia, el equipo y los valores de Clínica Óptica en Coatzacoalcos.'
    }
  ]
})

const values = [
  {
    icon: 'i-lucide-heart-handshake',
    title: 'Cercanía',
    description: 'Escuchamos tus necesidades y te orientamos con atención amable y personal.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Confianza',
    description: 'Te explicamos tus opciones con claridad para que decidas con tranquilidad.'
  },
  {
    icon: 'i-lucide-eye',
    title: 'Compromiso visual',
    description: 'Cuidar de tu visión guía cada recomendación y servicio que ofrecemos.'
  },
  {
    icon: 'i-lucide-book-open-check',
    title: 'Profesionalismo',
    description: 'Valoramos la preparación y el aprendizaje continuo en el cuidado visual.'
  }
]

const teamMembers = [
  { number: '01', avatar: 'avatar-one' },
  { number: '02', avatar: 'avatar-two' },
  { number: '03', avatar: 'avatar-three' }
]
</script>

<template>
  <main class="about-page">
    <section
      class="about-hero"
      aria-labelledby="about-title"
    >
      <div class="about-hero-copy">
        <p class="about-eyebrow">
          Clínica Óptica · Coatzacoalcos
        </p>
        <h1 id="about-title">
          Cuidar tu visión es nuestra historia.
        </h1>
        <p class="about-intro">
          Desde 2016 acompañamos a nuestra comunidad con atención visual
          profesional, orientación cercana y lentes a la medida de cada persona.
        </p>
        <a
          class="about-button"
          href="#equipo"
        >
          Conocer al equipo
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div class="about-hero-photo">
        <img
          :src="teamPhoto"
          alt="Armazón óptico y carta de letras para revisión visual"
          width="1000"
          height="667"
          fetchpriority="high"
        >
        <p>
          Atención pensada para ti
        </p>
      </div>
    </section>

    <section
      id="historia"
      class="about-section story-section"
      aria-labelledby="story-title"
    >
      <aside class="story-origin">
        <div class="origin-heading">
          <span class="story-icon-badge">
            <UIcon
              name="i-lucide-map-pin"
              aria-hidden="true"
            />
          </span>
          <span>Donde todo comenzó</span>
        </div>
        <strong class="origin-city">Coatzacoalcos</strong>
        <div class="origin-year">
          <UIcon
            name="i-lucide-calendar-days"
            aria-hidden="true"
          />
          <span>Desde</span>
          <strong>2016</strong>
        </div>
      </aside>
      <div class="story-copy">
        <p class="section-kicker story-kicker">
          <UIcon
            name="i-lucide-book-open"
            aria-hidden="true"
          />
          Nuestra historia
        </p>
        <h2 id="story-title">
          Una mirada cercana a la salud visual.
        </h2>
        <p>
          Clínica Óptica nació en Coatzacoalcos con una idea sencilla: hacer
          que cuidar la vista se sienta claro, accesible y personal. Desde 2016
          atendemos a nuestra comunidad y ayudamos a cada paciente a encontrar
          una solución visual que se adapte a su vida.
        </p>
        <p>
          Seguimos aquí, con la misma vocación de escuchar, orientar y ofrecer
          un trato de confianza en cada visita.
        </p>
      </div>
      <div class="story-stat">
        <span class="story-stat-icon">
          <UIcon
            name="i-lucide-eye"
            aria-hidden="true"
          />
        </span>
        <div>
          <strong>Tu visión</strong>
          <span>es nuestra prioridad</span>
        </div>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="story-stat-arrow"
          aria-hidden="true"
        />
      </div>
    </section>

    <section
      id="equipo"
      class="about-section team-section"
      aria-labelledby="team-title"
    >
      <div class="team-photo">
        <img
          :src="teamPhoto"
          alt="Lentes preparados para una evaluación de la vista"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="team-copy">
        <p class="section-kicker">
          Personas que te acompañan
        </p>
        <h2 id="team-title">
          Un equipo que te escucha y te orienta.
        </h2>
        <p>
          En cada visita, nuestro equipo te ayuda a resolver tus dudas y a
          conocer las opciones para cuidar tu salud visual. Queremos que te
          sientas en confianza: explicamos cada paso y tomamos en cuenta tus
          necesidades antes de recomendarte tus lentes.
        </p>
        <div class="team-promise">
          <span
            class="i-lucide-message-circle-heart"
            aria-hidden="true"
          />
          <p>
            Atención humana, recomendaciones claras y acompañamiento
            personalizado.
          </p>
        </div>
      </div>
      <div
        class="team-roster"
        aria-labelledby="team-roster-title"
      >
        <div class="team-roster-heading">
          <div>
            <p class="section-kicker">
              Las personas detrás de tu atención
            </p>
            <h3 id="team-roster-title">
              Conoce a nuestro equipo
            </h3>
          </div>
          <span class="team-sample-note">
            Perfiles de muestra
          </span>
        </div>
        <div class="team-roster-grid">
          <article
            v-for="member in teamMembers"
            :key="member.number"
            class="team-member-card"
          >
            <div
              class="team-member-portrait"
              :class="member.avatar"
              aria-hidden="true"
            >
              <div class="portrait-orbit portrait-orbit-outer" />
              <div class="portrait-orbit portrait-orbit-inner" />
              <span class="portrait-label">Equipo Coatza</span>
              <span class="team-member-avatar">
                <UIcon name="i-lucide-user-round" />
              </span>
              <span class="avatar-number">{{ member.number }}</span>
            </div>
            <div class="team-member-info">
              <span class="team-member-role">
                <UIcon
                  name="i-lucide-briefcase-business"
                  aria-hidden="true"
                />
                Perfil de muestra
              </span>
              <h4>Integrante {{ member.number }}</h4>
              <p>Cargo por confirmar</p>
            </div>
            <span class="team-member-number">N.º {{ member.number }}</span>
          </article>
        </div>
        <p class="team-roster-caption">
          <UIcon
            name="i-lucide-info"
            aria-hidden="true"
          />
          Avatares ilustrativos; se reemplazarán por las fotos y los datos
          reales del equipo.
        </p>
      </div>
    </section>

    <section
      id="formacion"
      class="training-section"
      aria-labelledby="training-title"
    >
      <div
        class="training-art"
        aria-hidden="true"
      >
        <span class="training-orbit training-orbit-outer" />
        <span class="training-orbit training-orbit-inner" />
        <span class="training-icon">
          <UIcon name="i-lucide-graduation-cap" />
        </span>
        <span class="training-art-tag">
          <UIcon name="i-lucide-book-check" />
          Aprendizaje continuo
        </span>
      </div>
      <div class="training-content">
        <p class="section-kicker training-kicker">
          <UIcon
            name="i-lucide-award"
            aria-hidden="true"
          />
          Formación profesional
        </p>
        <h2 id="training-title">
          Aprender para orientarte mejor.
        </h2>
        <p>
          La salud visual merece conocimiento y responsabilidad. Por eso
          damos importancia a mantenernos al día y a compartir contigo
          información clara para que elijas tus lentes con confianza.
        </p>
        <ul class="training-points">
          <li>
            <UIcon
              name="i-lucide-check"
              aria-hidden="true"
            />
            Orientación comprensible y cercana
          </li>
          <li>
            <UIcon
              name="i-lucide-check"
              aria-hidden="true"
            />
            Recomendaciones según tus necesidades
          </li>
          <li>
            <UIcon
              name="i-lucide-check"
              aria-hidden="true"
            />
            Compromiso con el aprendizaje continuo
          </li>
        </ul>
      </div>
    </section>

    <section
      class="about-section purpose-section"
      aria-label="Nuestra misión y visión"
    >
      <article class="purpose-card">
        <div class="purpose-card-heading">
          <span class="purpose-icon">
            <UIcon
              name="i-lucide-compass"
              aria-hidden="true"
            />
          </span>
          <p class="section-kicker">
            Nuestra misión
          </p>
        </div>
        <h2>
          Cuidar la visión con atención cercana.
        </h2>
        <p>
          Brindar orientación y soluciones ópticas de calidad, atendiendo a
          cada persona con profesionalismo, calidez y respeto por sus
          necesidades.
        </p>
      </article>

      <article class="purpose-card vision-card">
        <div class="purpose-card-heading">
          <span class="purpose-icon">
            <UIcon
              name="i-lucide-telescope"
              aria-hidden="true"
            />
          </span>
          <p class="section-kicker">
            Nuestra visión
          </p>
        </div>
        <h2>
          Ser tu óptica de confianza.
        </h2>
        <p>
          Ser un referente en Coatzacoalcos por el trato humano, la confianza
          y el compromiso con la salud visual de nuestra comunidad.
        </p>
      </article>
    </section>

    <section
      id="valores"
      class="about-section values-section"
      aria-labelledby="values-title"
    >
      <p class="section-kicker">
        Lo que nos guía
      </p>
      <h2
        id="values-title"
        class="about-section-title"
      >
        Nuestros valores
      </h2>
      <div class="values-grid">
        <article
          v-for="value in values"
          :key="value.title"
          class="value-card"
        >
          <span
            class="value-icon"
            aria-hidden="true"
          >
            <UIcon
              :name="value.icon"
              aria-hidden="true"
            />
          </span>
          <h3>{{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </article>
      </div>
    </section>

    <section class="about-cta">
      <div>
        <p class="section-kicker">
          Estamos para ayudarte
        </p>
        <h2>
          Tu salud visual comienza con una conversación.
        </h2>
      </div>
      <NuxtLink
        class="about-button cta-button"
        to="/contacto"
      >
        Visítanos o contáctanos
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  --about-navy: #102b4a;
  --about-blue: #244c73;
  --about-gray: #526176;
  --about-pale: #f3f5f6;
  color: var(--about-navy);
}

.about-hero {
  display: grid;
  min-height: 360px;
  grid-template-columns: minmax(0, 0.93fr) minmax(0, 1.07fr);
  overflow: hidden;
  background: var(--about-pale);
}

.about-hero-copy {
  display: flex;
  width: min(100%, 600px);
  flex-direction: column;
  align-items: flex-start;
  justify-self: end;
  padding: 39px clamp(28px, 5vw, 70px) 42px 32px;
}

.about-eyebrow,
.section-kicker {
  margin: 0 0 10px;
  color: #64758a;
  font-size: 0.7rem;
  font-weight: 750;
  letter-spacing: 0.13em;
  line-height: 1.5;
  text-transform: uppercase;
}

.about-hero h1 {
  max-width: 520px;
  margin: 0;
  color: var(--about-navy);
  font-size: clamp(2.25rem, 4.5vw, 3.35rem);
  font-weight: 800;
  letter-spacing: -0.052em;
  line-height: 1.06;
}

.about-intro {
  max-width: 430px;
  margin: 14px 0 20px;
  color: var(--about-gray);
  font-size: 0.98rem;
  line-height: 1.7;
}

.about-button {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid var(--about-navy);
  border-radius: 6px;
  padding: 10px 17px;
  background: var(--about-navy);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
}

.about-button:hover {
  transform: translateY(-1px);
  background: #244c73;
}

.about-hero-photo,
.team-photo {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  background: #dfe5e8;
}

.about-hero-photo::before {
  position: absolute;
  z-index: 1;
  inset: 0 auto 0 0;
  width: 18%;
  background: linear-gradient(90deg, var(--about-pale), transparent);
  content: '';
  pointer-events: none;
}

.about-hero-photo img,
.team-photo img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  object-position: center;
}

.about-hero-photo > p {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 12px;
  background: rgb(255 255 255 / 85%);
  color: #344b63;
  font-size: 0.68rem;
  letter-spacing: 0.09em;
  text-align: center;
  text-transform: uppercase;
}

.about-section {
  width: min(1080px, calc(100% - 56px));
  margin-inline: auto;
}

.story-section {
  display: grid;
  grid-template-columns: minmax(190px, 0.72fr) minmax(0, 1.6fr) minmax(220px, 0.9fr);
  align-items: center;
  gap: clamp(20px, 3vw, 38px);
  margin-block: 42px;
  border: 1px solid #e5e9ec;
  border-radius: 10px;
  padding: clamp(20px, 3vw, 34px);
  background:
    radial-gradient(ellipse at 12% 6%, rgb(36 76 115 / 7%), transparent 40%),
    #f6f8f9;
}

.story-origin {
  display: grid;
  min-height: 174px;
  align-content: start;
  gap: 17px;
  border: 1px solid #e4e8eb;
  border-radius: 8px;
  padding: 19px 17px;
  background: #fff;
  box-shadow: 0 8px 22px rgb(16 43 74 / 5%);
}

.origin-heading {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #63758a;
  font-size: 0.66rem;
  font-weight: 750;
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

.story-icon-badge {
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #e8eef3;
  color: var(--about-blue);
}

.story-icon-badge :deep(svg) {
  width: 16px;
  height: 16px;
}

.origin-city {
  color: var(--about-navy);
  font-size: 1.16rem;
  font-weight: 800;
  letter-spacing: -0.035em;
}

.origin-year {
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid #edf0f2;
  padding-top: 12px;
  color: #697a8c;
  font-size: 0.77rem;
}

.origin-year :deep(svg) {
  width: 17px;
  height: 17px;
  color: var(--about-blue);
}

.origin-year strong {
  margin-left: auto;
  color: var(--about-blue);
  font-size: 0.95rem;
}

.story-kicker {
  display: flex;
  align-items: center;
  gap: 8px;
}

.story-kicker :deep(svg) {
  width: 17px;
  height: 17px;
  color: var(--about-blue);
}

.story-copy h2,
.team-copy h2,
.training-section h2,
.purpose-card h2,
.about-cta h2 {
  margin: 0 0 12px;
  color: var(--about-navy);
  font-size: clamp(1.55rem, 3vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.18;
}

.story-copy > p:not(.section-kicker),
.team-copy > p:not(.section-kicker),
.training-section > div:last-child > p:not(.section-kicker),
.purpose-card > p:last-child {
  margin: 0 0 11px;
  color: var(--about-gray);
  font-size: 0.9rem;
  line-height: 1.75;
}

.story-stat {
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 132px;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  border-radius: 8px;
  padding: 20px 18px;
  background: linear-gradient(145deg, #173b60, #0e2948);
  box-shadow: 0 9px 24px rgb(16 43 74 / 13%);
  color: #fff;
}

.story-stat::after {
  position: absolute;
  right: -27px;
  bottom: -45px;
  width: 125px;
  height: 125px;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 50%;
  box-shadow: 0 0 0 15px rgb(255 255 255 / 3%), 0 0 0 31px rgb(255 255 255 / 2%);
  content: '';
  pointer-events: none;
}

.story-stat-icon {
  z-index: 1;
  display: grid;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 26%);
  border-radius: 50%;
  background: rgb(255 255 255 / 10%);
  color: #dce7f0;
}

.story-stat-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.story-stat strong {
  display: block;
  margin-bottom: 4px;
  color: #fff;
  font-size: 0.98rem;
  font-weight: 800;
}

.story-stat > div {
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.story-stat div > span {
  color: #e3eaf1;
  font-size: 0.74rem;
  line-height: 1.4;
}

.story-stat-arrow {
  position: absolute;
  z-index: 1;
  top: 15px;
  right: 15px;
  width: 17px;
  height: 17px;
  color: #dce7f0;
}

.team-section {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  align-items: center;
  gap: clamp(32px, 6vw, 76px);
  padding-block: 30px 60px;
}

.team-photo {
  min-height: 280px;
  border-radius: 8px;
  box-shadow: 0 12px 32px rgb(16 43 74 / 12%);
}

.team-photo img {
  min-height: 280px;
}

.team-copy h2 {
  max-width: 500px;
}

.team-promise {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  border-left: 2px solid var(--about-blue);
  padding: 11px 14px;
  background: var(--about-pale);
}

.team-promise > span {
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  color: var(--about-blue);
}

.team-promise p {
  margin: 0;
  color: var(--about-navy);
  font-size: 0.81rem;
  font-weight: 650;
  line-height: 1.55;
}

.team-roster {
  grid-column: 1 / -1;
  border-top: 1px solid #e4e8eb;
  padding-top: 28px;
  scroll-margin-top: 84px;
}

.team-roster-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 15px;
}

.team-roster-heading .section-kicker {
  margin-bottom: 4px;
}

.team-roster-heading h3 {
  margin: 0;
  color: var(--about-navy);
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  font-weight: 800;
  letter-spacing: -0.035em;
}

.team-sample-note {
  display: inline-flex;
  min-height: 28px;
  flex: 0 0 auto;
  align-items: center;
  border: 1px solid #d9e1e7;
  border-radius: 999px;
  padding: 5px 11px;
  background: #f2f5f7;
  color: #52677c;
  font-size: 0.66rem;
  font-weight: 700;
}

.team-roster-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
}

.team-member-card {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #dfe6ec;
  border-radius: 10px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 8px 20px rgb(16 43 74 / 5%);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.team-member-card:hover {
  border-color: #bac8d4;
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgb(16 43 74 / 11%);
}

.team-member-portrait {
  position: relative;
  display: grid;
  height: 146px;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  border-radius: 7px;
  background: linear-gradient(145deg, #edf2f6 0%, #d3dee7 52%, #b7c8d6 100%);
}

.team-member-portrait::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: radial-gradient(ellipse at 52% 32%, rgb(255 255 255 / 72%), transparent 55%);
  content: '';
}

.portrait-orbit {
  position: absolute;
  left: 50%;
  aspect-ratio: 1;
  transform: translate(-50%, -38%);
  border: 1px solid rgb(36 76 115 / 17%);
  border-radius: 50%;
}

.portrait-orbit-outer {
  top: 61%;
  width: 137px;
}

.portrait-orbit-inner {
  top: 61%;
  width: 105px;
  border-style: dashed;
  border-color: rgb(36 76 115 / 22%);
}

.portrait-label {
  position: absolute;
  top: 11px;
  left: 11px;
  display: inline-flex;
  min-height: 22px;
  align-items: center;
  border: 1px solid rgb(255 255 255 / 75%);
  border-radius: 999px;
  padding: 3px 8px;
  background: rgb(255 255 255 / 68%);
  color: #52677c;
  font-size: 0.56rem;
  font-weight: 750;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.team-member-portrait .team-member-avatar {
  position: relative;
  z-index: 1;
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 94%);
  border-radius: 50%;
  background: linear-gradient(145deg, #fff, #e5ecf1);
  box-shadow: 0 6px 22px rgb(16 43 74 / 13%), 0 0 0 7px rgb(255 255 255 / 25%);
  color: #244c73;
}

.team-member-portrait .team-member-avatar :deep(svg) {
  width: 42px;
  height: 42px;
}

.avatar-one .portrait-orbit-outer {
  width: 125px;
}

.avatar-one .team-member-avatar {
  background: linear-gradient(145deg, #fff, #e3ebf1);
}

.avatar-two {
  background: linear-gradient(145deg, #f0f3f5 0%, #dbe3e9 52%, #c5d2dc 100%);
}

.avatar-two .portrait-orbit-outer {
  width: 148px;
  transform: translate(-50%, -36%) rotate(17deg) scaleX(0.82);
}

.avatar-two .portrait-orbit-inner {
  transform: translate(-50%, -36%) rotate(17deg) scaleX(0.82);
}

.avatar-two .team-member-avatar {
  background: linear-gradient(145deg, #fff, #e8edf1);
}

.avatar-three {
  background: linear-gradient(145deg, #e9eff3 0%, #cedae3 52%, #b7c7d4 100%);
}

.avatar-three .portrait-orbit-outer {
  width: 129px;
  transform: translate(-50%, -39%) rotate(-15deg) scaleX(0.86);
}

.avatar-three .portrait-orbit-inner {
  transform: translate(-50%, -39%) rotate(-15deg) scaleX(0.86);
}

.avatar-three .team-member-avatar {
  background: linear-gradient(145deg, #fff, #e1e9ef);
}

.avatar-number {
  position: absolute;
  z-index: 2;
  right: 11px;
  bottom: 11px;
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 2px solid rgb(255 255 255 / 92%);
  border-radius: 50%;
  background: var(--about-navy);
  color: #fff;
  font-size: 0.58rem;
  font-weight: 750;
}

.team-member-info {
  padding: 15px 7px 9px;
}

.team-member-role {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 9px;
  color: #5c7186;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

.team-member-role :deep(svg) {
  width: 14px;
  height: 14px;
  color: var(--about-blue);
}

.team-member-info h4 {
  overflow: hidden;
  margin: 0 0 5px;
  color: var(--about-navy);
  font-size: 1.06rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.team-member-info p {
  margin: 0;
  color: #68798a;
  font-size: 0.74rem;
}

.team-member-number {
  position: absolute;
  right: 17px;
  bottom: 16px;
  color: #8090a0;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.team-roster-caption {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 13px 0 0;
  color: #748293;
  font-size: 0.66rem;
  line-height: 1.5;
}

.team-roster-caption :deep(svg) {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  color: var(--about-blue);
}

.training-section {
  position: relative;
  display: grid;
  width: min(1080px, calc(100% - 56px));
  min-height: 245px;
  grid-template-columns: minmax(185px, 0.55fr) minmax(0, 1.45fr);
  align-items: center;
  gap: clamp(24px, 5vw, 62px);
  overflow: hidden;
  margin: 0 auto 58px;
  border: 1px solid #dce3e9;
  border-radius: 10px;
  padding: 28px clamp(24px, 5vw, 58px);
  background:
    radial-gradient(ellipse at 5% 15%, rgb(73 107 141 / 9%), transparent 34%),
    linear-gradient(112deg, #edf1f4, #fff 74%);
  box-shadow: 0 12px 30px rgb(16 43 74 / 5%);
}

.training-section::after {
  position: absolute;
  right: -68px;
  bottom: -112px;
  width: 245px;
  height: 245px;
  border: 1px solid rgb(36 76 115 / 9%);
  border-radius: 50%;
  box-shadow: 0 0 0 20px rgb(36 76 115 / 3%), 0 0 0 42px rgb(36 76 115 / 2%);
  content: '';
  pointer-events: none;
}

.training-art {
  position: relative;
  display: grid;
  min-height: 180px;
  place-items: center;
}

.training-orbit {
  position: absolute;
  display: block;
  border: 1px solid #cdd7e0;
  border-radius: 50%;
}

.training-orbit-outer {
  width: 166px;
  height: 166px;
}

.training-orbit-inner {
  width: 125px;
  height: 125px;
  border-style: dashed;
  border-color: #aebdca;
}

.training-icon {
  z-index: 1;
  display: grid;
  width: 82px;
  height: 82px;
  place-items: center;
  border: 1px solid #d1dce5;
  border-radius: 24px;
  background: linear-gradient(145deg, #fff, #e8eef3);
  box-shadow: 0 12px 25px rgb(16 43 74 / 12%);
  color: var(--about-blue);
  transform: rotate(-5deg);
}

.training-icon :deep(svg) {
  width: 41px;
  height: 41px;
}

.training-art-tag {
  position: absolute;
  z-index: 2;
  right: 1px;
  bottom: 10px;
  display: inline-flex;
  min-height: 33px;
  align-items: center;
  gap: 7px;
  border: 1px solid #dfe5ea;
  border-radius: 999px;
  padding: 6px 11px;
  background: #fff;
  box-shadow: 0 5px 14px rgb(16 43 74 / 8%);
  color: #435a70;
  font-size: 0.67rem;
  font-weight: 700;
}

.training-art-tag :deep(svg) {
  width: 15px;
  height: 15px;
  color: var(--about-blue);
}

.training-content {
  position: relative;
  z-index: 1;
  max-width: 690px;
}

.training-kicker {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: var(--about-blue);
}

.training-kicker :deep(svg) {
  width: 17px;
  height: 17px;
}

.training-section h2 {
  margin: 0 0 9px;
  color: var(--about-navy);
  font-size: clamp(1.4rem, 2.6vw, 1.86rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.18;
}

.training-content > p:not(.section-kicker) {
  margin: 0;
  color: var(--about-gray);
  font-size: 0.88rem;
  line-height: 1.7;
}

.training-points {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px 16px;
  margin: 17px 0 0;
  padding: 15px 0 0;
  border-top: 1px solid #dce3e9;
  list-style: none;
}

.training-points li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #3e556c;
  font-size: 0.73rem;
  font-weight: 650;
  line-height: 1.45;
}

.training-points li :deep(svg) {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  border-radius: 50%;
  padding: 2px;
  background: #e2eaf0;
  color: var(--about-blue);
}

.purpose-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 18px;
}

.purpose-card {
  display: flex;
  min-height: 240px;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  padding: 26px clamp(20px, 3vw, 36px);
  background: #fff;
  box-shadow: 0 8px 24px rgb(16 43 74 / 5%);
}

.purpose-card-heading {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 20px;
}

.purpose-icon {
  display: grid;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #dce4eb;
  border-radius: 12px;
  background: #edf2f6;
  color: var(--about-blue);
}

.purpose-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.purpose-card .section-kicker {
  margin: 0;
  color: var(--about-blue);
}

.purpose-card h2 {
  max-width: 400px;
  margin: 0 0 10px;
  font-size: 1.45rem;
  line-height: 1.2;
}

.purpose-card > p:last-child {
  max-width: 500px;
  margin-bottom: 0;
  color: var(--about-gray);
  font-size: 0.88rem;
  line-height: 1.7;
}

.vision-card {
  border-color: #dce4eb;
  background: linear-gradient(145deg, #f3f5f6 0%, #fff 100%);
  box-shadow: inset 3px 0 0 var(--about-blue), 0 8px 24px rgb(16 43 74 / 5%);
}

.values-section {
  padding-block: 58px;
  text-align: center;
}

.values-section > .section-kicker {
  margin-bottom: 4px;
}

.about-section-title {
  margin: 0 0 20px;
  color: var(--about-navy);
  font-size: clamp(1.7rem, 3vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 13px;
  text-align: center;
}

.value-card {
  display: flex;
  min-height: 166px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e5e8eb;
  border-radius: 7px;
  padding: 18px 16px;
  background: #fff;
}

.value-icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  margin: 0 auto 14px;
  border: 1px solid #dce4eb;
  border-radius: 11px;
  background: #edf2f6;
  color: var(--about-blue);
}

.value-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.value-card h3 {
  margin: 0 0 6px;
  color: var(--about-navy);
  font-size: 0.91rem;
  font-weight: 750;
}

.value-card p {
  max-width: 230px;
  margin: 0;
  color: var(--about-gray);
  font-size: 0.76rem;
  line-height: 1.6;
}

.about-cta {
  display: flex;
  width: min(1080px, calc(100% - 56px));
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: 0 auto 48px;
  border-radius: 8px;
  padding: 26px clamp(20px, 4vw, 42px);
  background: var(--about-navy);
  color: white;
}

.about-cta .section-kicker {
  margin-bottom: 7px;
  color: #d3dfe9;
}

.about-cta h2 {
  max-width: 620px;
  margin-bottom: 0;
  color: white;
  font-size: clamp(1.35rem, 2.7vw, 1.8rem);
}

.cta-button {
  flex: 0 0 auto;
  border-color: white;
  background: white;
  color: var(--about-navy);
}

.cta-button:hover {
  background: #eaf0f5;
}

@media (max-width: 760px) {
  .about-hero {
    min-height: 330px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
  }

  .about-hero-copy {
    padding: 30px 18px 32px 25px;
  }

  .about-hero h1 {
    font-size: clamp(2rem, 5vw, 2.6rem);
  }

  .about-hero-photo,
  .about-hero-photo img {
    min-height: 330px;
  }

  .about-section,
  .training-section,
  .about-cta {
    width: calc(100% - 36px);
  }

  .story-section {
    grid-template-columns: minmax(160px, 0.72fr) minmax(0, 1.5fr);
    gap: 17px;
    margin-block: 32px;
    padding: 20px;
  }

  .story-origin {
    min-height: 155px;
    gap: 14px;
    padding: 16px;
  }

  .story-stat {
    min-height: 86px;
    grid-column: 1 / -1;
    padding: 15px 18px;
  }

  .team-section {
    gap: 25px;
    padding-block: 20px 42px;
  }

  .team-roster {
    padding-top: 23px;
  }

  .team-roster-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .team-photo,
  .team-photo img {
    min-height: 245px;
  }

  .training-section {
    margin-bottom: 42px;
    padding: 22px;
  }

  .values-section {
    padding-block: 43px;
  }

  .values-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .about-hero {
    position: relative;
    display: block;
    min-height: 390px;
  }

  .about-hero-copy {
    position: relative;
    z-index: 2;
    width: 100%;
    min-height: 390px;
    justify-content: center;
    padding: 26px 22px;
    background: linear-gradient(90deg, rgb(243 245 246 / 97%) 0%, rgb(243 245 246 / 93%) 61%, rgb(243 245 246 / 25%) 100%);
  }

  .about-hero h1 {
    max-width: 350px;
    font-size: clamp(2.2rem, 10vw, 2.9rem);
  }

  .about-intro {
    max-width: 340px;
    font-size: 0.92rem;
  }

  .about-hero-photo {
    position: absolute;
    inset: 0 0 0 15%;
    min-height: 390px;
  }

  .about-hero-photo img {
    min-height: 390px;
    object-position: 54% center;
  }

  .about-hero-photo::before {
    width: 56%;
    background: linear-gradient(90deg, var(--about-pale), transparent);
  }

  .about-hero-photo > p {
    font-size: 0.59rem;
  }

  .about-section,
  .training-section,
  .about-cta {
    width: calc(100% - 32px);
  }

  .story-section {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-block: 24px;
    padding: 14px;
  }

  .story-origin {
    min-height: 0;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 11px;
    padding: 14px;
  }

  .origin-heading {
    grid-column: 1 / -1;
  }

  .origin-city {
    font-size: 1rem;
  }

  .origin-year {
    gap: 6px;
    border-top: 0;
    padding-top: 0;
  }

  .origin-year :deep(svg) {
    width: 15px;
    height: 15px;
  }

  .story-copy h2,
  .team-copy h2 {
    font-size: 1.7rem;
  }

  .story-stat {
    min-height: 78px;
    grid-column: auto;
    padding: 14px;
  }

  .story-stat-icon {
    width: 38px;
    height: 38px;
  }

  .team-section {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-block: 10px 34px;
  }

  .team-roster {
    padding-top: 20px;
  }

  .team-roster-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
  }

  .team-roster-grid {
    grid-template-columns: 1fr;
    gap: 9px;
  }

  .team-member-card {
    display: grid;
    grid-template-columns: 94px minmax(0, 1fr);
    align-items: center;
    gap: 0 13px;
    min-height: 112px;
    padding: 8px;
  }

  .team-member-portrait {
    height: 96px;
    grid-row: 1 / 3;
  }

  .team-member-portrait .team-member-avatar {
    width: 56px;
    height: 56px;
  }

  .team-member-portrait .team-member-avatar :deep(svg) {
    width: 32px;
    height: 32px;
  }

  .team-member-portrait .portrait-label {
    top: 6px;
    left: 6px;
    min-height: 18px;
    padding-inline: 6px;
    font-size: 0.47rem;
  }

  .team-member-portrait .avatar-number {
    right: 6px;
    bottom: 6px;
    width: 23px;
    height: 23px;
    font-size: 0.5rem;
  }

  .team-member-info {
    align-self: end;
    padding: 8px 5px 2px 0;
  }

  .team-member-role {
    margin-bottom: 5px;
    font-size: 0.55rem;
  }

  .team-member-info h4 {
    margin-bottom: 3px;
    font-size: 0.94rem;
  }

  .team-member-info p {
    font-size: 0.68rem;
  }

  .team-member-number {
    position: static;
    align-self: start;
    padding: 2px 0 7px;
  }

  .team-photo,
  .team-photo img {
    min-height: 205px;
    max-height: 250px;
  }

  .training-section {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
    margin-bottom: 32px;
    padding: 20px 17px;
  }

  .training-art {
    min-height: 128px;
  }

  .training-orbit-outer {
    width: 120px;
    height: 120px;
  }

  .training-orbit-inner {
    width: 92px;
    height: 92px;
  }

  .training-icon {
    width: 61px;
    height: 61px;
    border-radius: 17px;
  }

  .training-icon :deep(svg) {
    width: 31px;
    height: 31px;
  }

  .training-art-tag {
    right: max(0px, calc(50% - 100px));
    bottom: 0;
    font-size: 0.59rem;
  }

  .training-section h2 {
    font-size: 1.34rem;
  }

  .training-content > p:not(.section-kicker) {
    font-size: 0.82rem;
  }

  .training-points {
    grid-template-columns: 1fr;
    gap: 7px;
    margin-top: 13px;
    padding-top: 12px;
  }

  .purpose-section {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .purpose-card {
    min-height: auto;
    padding: 20px;
  }

  .purpose-card-heading {
    margin-bottom: 15px;
  }

  .values-section {
    padding-block: 36px;
  }

  .values-grid {
    gap: 9px;
  }

  .value-card {
    min-height: 160px;
    padding: 14px 12px;
  }

  .about-cta {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
    padding: 22px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-button {
    transition: none;
  }
}
</style>
