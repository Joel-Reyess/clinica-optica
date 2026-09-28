<script setup lang="ts">
import evaluationImage from '~/assets/RecOpt.jpg'
import classicFramesImage from '~/assets/ClassicFrames.png'
import modernFramesImage from '~/assets/Sunglasses.png'
import safetyGlassesImage from '~/assets/Seguridad.jpeg'

useHead({
  title: 'Lentes y servicios | Clínica Óptica',
  meta: [
    {
      name: 'description',
      content: 'Conoce los servicios de evaluación optométrica, lentes oftálmicos y de contacto, terapias visuales y opciones por categoría de Clínica Óptica.'
    }
  ]
})

const whatsappNumber = '529211371704'
const adviceMessage = encodeURIComponent(
  'Hola, quisiera recibir asesoría sobre lentes y servicios de Clínica Óptica.'
)
const adviceUrl = `https://wa.me/${whatsappNumber}?text=${adviceMessage}`
const route = useRoute()

const services = [
  {
    icon: 'i-lucide-eye',
    eyebrow: 'Atención visual',
    title: 'Evaluación optométrica',
    description: 'Conoce este servicio y recibe orientación para identificar la opción de atención visual adecuada para ti.'
  },
  {
    icon: 'i-lucide-glasses',
    eyebrow: 'Para tu día a día',
    title: 'Lentes oftálmicos',
    description: 'Explora alternativas de lentes y armazones con asesoría para encontrar una opción acorde con tus necesidades.'
  },
  {
    icon: 'i-lucide-circle-dot',
    eyebrow: 'Otra forma de ver',
    title: 'Lentes de contacto',
    description: 'Solicita información y orientación sobre las opciones de lentes de contacto disponibles para ti.'
  },
  {
    icon: 'i-lucide-focus',
    eyebrow: 'Acompañamiento visual',
    title: 'Terapias visuales',
    description: 'Consulta sobre terapias visuales y recibe información para saber si este servicio es adecuado para tu caso.'
  }
]

const categories = [
  {
    slug: 'clasicos',
    image: classicFramesImage,
    imageAlt: 'Armazones clásicos para lentes graduados',
    imageFit: 'contain',
    category: 'Clásicos',
    title: 'Lentes oftálmicos clásicos',
    description: 'Lentes oftálmicos graduados en armazones clásicos. El tipo de mica se define con base en tu receta y las necesidades de uso.'
  },
  {
    slug: 'modernos',
    image: modernFramesImage,
    imageAlt: 'Armazones modernos para lentes graduados',
    imageFit: 'contain',
    category: 'Modernos',
    title: 'Lentes oftálmicos modernos',
    description: 'Lentes oftálmicos graduados con diseños actuales. Consulta las opciones de mica compatibles con tu graduación.'
  },
  {
    slug: 'seguridad-graduada',
    image: safetyGlassesImage,
    imageAlt: 'Lentes de seguridad graduados',
    imageFit: 'cover',
    category: 'Seguridad graduada',
    title: 'Lentes de seguridad graduados',
    description: 'Lentes graduados con protección ocular para el trabajo. Se revisan la receta, el armazón y los requisitos de tu actividad.'
  }
]

const selectedCategory = computed(() => {
  const categorySlug = route.query.categoria
  return typeof categorySlug === 'string'
    ? categories.find(category => category.slug === categorySlug)
    : undefined
})

const steps = [
  {
    icon: 'i-lucide-message-circle',
    number: '01',
    title: 'Cuéntanos qué buscas',
    description: 'Compártenos si necesitas una evaluación, lentes o más información sobre algún servicio.'
  },
  {
    icon: 'i-lucide-list-checks',
    number: '02',
    title: 'Recibe asesoría',
    description: 'Te orientamos sobre las alternativas y los siguientes pasos para atender tu solicitud.'
  },
  {
    icon: 'i-lucide-calendar-days',
    number: '03',
    title: 'Define cómo continuar',
    description: 'Consulta disponibilidad, detalles del servicio y cómo coordinar tu visita.'
  }
]
</script>

<template>
  <main class="lenses-page">
    <section
      class="lenses-hero"
      aria-labelledby="lenses-title"
    >
      <div class="hero-copy">
        <p class="hero-eyebrow">
          <span class="eyebrow-dot" />
          Servicios y lentes
        </p>
        <h1 id="lenses-title">
          Lentes para
          <span>cuidar tu visión.</span>
        </h1>
        <p class="hero-description">
          Evaluación, lentes y asesoría visual en un mismo lugar.
        </p>
        <div class="hero-actions">
          <a
            class="lenses-button primary-button"
            :href="adviceUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UIcon
              name="i-lucide-message-circle"
              aria-hidden="true"
            />
            Solicitar asesoría
            <UIcon
              name="i-lucide-arrow-up-right"
              aria-hidden="true"
            />
          </a>
          <a
            class="explore-link"
            href="#servicios"
          >
            Conocer servicios
            <UIcon
              name="i-lucide-arrow-down"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-image-frame">
          <img
            :src="evaluationImage"
            alt="Atención y evaluación visual en Clínica Óptica"
            fetchpriority="high"
          >
          <div class="hero-image-overlay" />
          <span class="hero-image-label">
            <UIcon
              name="i-lucide-eye"
              aria-hidden="true"
            />
            Cuidado visual
          </span>
        </div>
        <div class="hero-floating-card">
          <span class="floating-icon">
            <UIcon
              name="i-lucide-glasses"
              aria-hidden="true"
            />
          </span>
          <span>
            <strong>Encuentra tu opción</strong>
            <span>Explora servicios y estilos</span>
          </span>
          <UIcon
            class="floating-arrow"
            name="i-lucide-arrow-up-right"
            aria-hidden="true"
          />
        </div>
        <span class="hero-orbit hero-orbit-one" />
        <span class="hero-orbit hero-orbit-two" />
      </div>
    </section>

    <section
      id="servicios"
      class="services-section"
      aria-labelledby="services-title"
    >
      <div class="section-heading">
        <div class="section-title-group">
          <span class="section-mark">
            <UIcon
              name="i-lucide-sparkles"
              aria-hidden="true"
            />
          </span>
          <div>
            <p class="section-eyebrow">
              Lo que necesitas, en un mismo lugar
            </p>
            <h2 id="services-title">
              Servicios para acompañar tu visión.
            </h2>
          </div>
        </div>
        <p class="section-intro">
          Conoce nuestras opciones y contáctanos para recibir información según lo que estés buscando.
        </p>
      </div>

      <div class="services-grid">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          class="service-card"
        >
          <div class="service-card-top">
            <span class="service-icon">
              <UIcon
                :name="service.icon"
                aria-hidden="true"
              />
            </span>
            <span class="service-index">0{{ index + 1 }}</span>
          </div>
          <p class="service-eyebrow">
            {{ service.eyebrow }}
          </p>
          <h3>{{ service.title }}</h3>
          <p class="service-description">
            {{ service.description }}
          </p>
          <a
            class="service-link"
            :href="adviceUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Solicitar asesoría sobre ${service.title}`"
          >
            Solicitar información
            <UIcon
              name="i-lucide-arrow-up-right"
              aria-hidden="true"
            />
          </a>
        </article>
      </div>
    </section>

    <section
      id="catalogo"
      class="catalog-section"
      aria-labelledby="catalog-title"
    >
      <div class="catalog-heading">
        <div>
          <p class="section-eyebrow">
            Encuentra un estilo para ti
          </p>
          <h2 id="catalog-title">
            Explora el catálogo por categoría.
          </h2>
        </div>
        <p>
          Descubre algunas opciones y pide asesoría para conocer modelos, disponibilidad y detalles.
        </p>
      </div>

      <div
        v-if="selectedCategory"
        id="categoria"
        class="category-detail"
      >
        <div
          class="category-detail-image"
          :class="{ 'category-product': selectedCategory.imageFit === 'contain' }"
        >
          <img
            :src="selectedCategory.image"
            :alt="selectedCategory.imageAlt"
          >
          <span class="category-image-shade" />
          <span class="category-photo-label">
            <UIcon
              name="i-lucide-glasses"
              aria-hidden="true"
            />
            {{ selectedCategory.category }}
          </span>
        </div>
        <div class="category-detail-copy">
          <p class="section-eyebrow">
            Categoría seleccionada
          </p>
          <h3>{{ selectedCategory.title }}</h3>
          <p>{{ selectedCategory.description }}</p>
          <p class="category-detail-note">
            Los modelos, colores, graduaciones y tratamientos disponibles se confirman con el equipo.
          </p>
          <div class="category-detail-actions">
            <NuxtLink
              class="lenses-button primary-button"
              :to="{ path: '/cotizar', query: { categoria: selectedCategory.slug } }"
            >
              Cotizar mis lentes
              <UIcon
                name="i-lucide-arrow-up-right"
                aria-hidden="true"
              />
            </NuxtLink>
            <NuxtLink
              class="explore-link"
              to="/lentes#catalogo"
            >
              Ver todas las categorías
            </NuxtLink>
          </div>
        </div>
      </div>

      <div
        v-else
        class="category-grid"
      >
        <article
          v-for="category in categories"
          :key="category.title"
          class="category-card-link"
        >
          <NuxtLink
            class="category-card"
            :to="{ path: '/lentes', query: { categoria: category.slug }, hash: '#categoria' }"
            :aria-label="`Ver categoría ${category.category}`"
          >
            <div
              class="category-image"
              :class="{ 'category-product': category.imageFit === 'contain' }"
            >
              <img
                :src="category.image"
                :alt="category.imageAlt"
                loading="lazy"
              >
              <span class="category-image-shade" />
              <span class="category-photo-label">
                <UIcon
                  name="i-lucide-glasses"
                  aria-hidden="true"
                />
                {{ category.category }}
              </span>
            </div>
            <div class="category-copy">
              <div>
                <h3>{{ category.title }}</h3>
                <p>{{ category.description }}</p>
              </div>
              <span
                class="category-action"
                aria-hidden="true"
              >
                Ver categoría
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>
      <p class="catalog-note">
        <UIcon
          name="i-lucide-info"
          aria-hidden="true"
        />
        Imágenes de referencia. Al publicar el catálogo de modelos, usaremos fotografías y datos de los productos que realmente maneja la clínica.
      </p>
    </section>

    <section
      class="advice-section"
      aria-labelledby="advice-title"
    >
      <div class="advice-heading">
        <span class="advice-heading-icon">
          <UIcon
            name="i-lucide-route"
            aria-hidden="true"
          />
        </span>
        <div>
          <p class="section-eyebrow">
            Estamos para orientarte
          </p>
          <h2 id="advice-title">
            Empezar es muy sencillo.
          </h2>
        </div>
      </div>
      <div class="steps-grid">
        <article
          v-for="(step, index) in steps"
          :key="step.number"
          class="advice-step"
        >
          <span class="step-number">{{ step.number }}</span>
          <span class="step-icon">
            <UIcon
              :name="step.icon"
              aria-hidden="true"
            />
          </span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
          <span
            v-if="index < steps.length - 1"
            class="step-connector"
            aria-hidden="true"
          />
        </article>
      </div>
    </section>

    <section class="advice-cta">
      <div class="cta-icon">
        <UIcon
          name="i-lucide-messages-square"
          aria-hidden="true"
        />
      </div>
      <div class="cta-copy">
        <p class="section-eyebrow">
          ¿Tienes dudas?
        </p>
        <h2>Con gusto te ayudamos a encontrar la información que necesitas.</h2>
        <p>Escríbenos y recibe asesoría sobre evaluación, lentes y servicios.</p>
      </div>
      <a
        class="lenses-button cta-button"
        :href="adviceUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <UIcon
          name="i-simple-icons-whatsapp"
          aria-hidden="true"
        />
        Solicitar asesoría
        <UIcon
          name="i-lucide-arrow-up-right"
          aria-hidden="true"
        />
      </a>
    </section>
  </main>
</template>

<style scoped>
.lenses-page {
  --lenses-navy: #102b4a;
  --lenses-blue: #244c73;
  --lenses-gray: #526176;
  --lenses-light: #f3f5f6;
  --lenses-line: #dce4ea;
  overflow: hidden;
  padding: 35px 0 82px;
  background:
    radial-gradient(ellipse at 12% 4%, rgb(36 76 115 / 6%), transparent 31%),
    linear-gradient(180deg, #f9fbfc 0%, #fff 37%, #f5f7f9 100%);
  color: var(--lenses-navy);
}

.lenses-hero,
.services-section,
.catalog-section,
.advice-section,
.advice-cta {
  width: min(1100px, calc(100% - 56px));
  margin-inline: auto;
}

.lenses-hero {
  position: relative;
  display: grid;
  min-height: 405px;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  align-items: center;
  gap: clamp(35px, 6vw, 78px);
  border: 1px solid #e0e7ec;
  border-radius: 21px;
  padding: clamp(32px, 4.6vw, 52px);
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 8%), transparent 33%),
    linear-gradient(135deg, #fff 0%, #f6f8fa 65%, #edf2f6 100%);
  box-shadow: 0 18px 48px rgb(16 43 74 / 8%);
}

.hero-copy {
  position: relative;
  z-index: 2;
}

.hero-eyebrow,
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 16px;
  color: var(--lenses-blue);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-eyebrow {
  border: 1px solid #d7e2ea;
  border-radius: 99px;
  padding: 9px 13px;
  background: rgb(255 255 255 / 82%);
}

.eyebrow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lenses-blue);
  box-shadow: 0 0 0 4px rgb(36 76 115 / 10%);
}

.hero-copy h1 {
  max-width: 520px;
  margin: 0;
  color: var(--lenses-navy);
  font-size: clamp(2.55rem, 4.7vw, 3.95rem);
  font-weight: 850;
  letter-spacing: -0.065em;
  line-height: 0.99;
}

.hero-copy h1 span {
  display: block;
  margin-top: 8px;
  color: var(--lenses-blue);
}

.hero-description {
  max-width: 390px;
  margin: 15px 0 0;
  color: var(--lenses-gray);
  font-size: 0.88rem;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top: 21px;
}

.lenses-button {
  display: inline-flex;
  min-height: 49px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 12px 17px;
  font-size: 0.8rem;
  font-weight: 800;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.primary-button {
  background: var(--lenses-navy);
  color: #fff;
  box-shadow: 0 8px 18px rgb(16 43 74 / 17%);
}

.primary-button:hover {
  transform: translateY(-2px);
  background: #183a5e;
  box-shadow: 0 12px 22px rgb(16 43 74 / 20%);
}

.lenses-button :deep(svg),
.explore-link :deep(svg) {
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
}

.explore-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--lenses-blue);
  font-size: 0.78rem;
  font-weight: 750;
  text-decoration: none;
}

.explore-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.hero-note {
  display: flex;
  max-width: 410px;
  align-items: center;
  gap: 12px;
  margin-top: 31px;
  border-top: 1px solid #dce4ea;
  padding-top: 18px;
}

.hero-note-icon,
.section-mark,
.service-icon,
.advice-heading-icon,
.step-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d7e2ea;
  background: linear-gradient(145deg, #fff, #eaf0f4);
  color: var(--lenses-blue);
  box-shadow: 0 5px 13px rgb(16 43 74 / 6%);
}

.hero-note-icon {
  width: 43px;
  height: 43px;
  border-radius: 13px;
}

.hero-note-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.hero-note > span:last-child,
.hero-floating-card > span:nth-child(2) {
  display: grid;
  gap: 4px;
}

.hero-note strong,
.hero-floating-card strong {
  color: var(--lenses-navy);
  font-size: 0.76rem;
  font-weight: 800;
}

.hero-note > span:last-child > span,
.hero-floating-card > span:nth-child(2) > span {
  color: var(--lenses-gray);
  font-size: 0.69rem;
  line-height: 1.45;
}

.hero-visual {
  position: relative;
  min-width: 0;
  min-height: 320px;
  margin: 0 8px 0 0;
}

.hero-image-frame {
  position: absolute;
  inset: 6px 15px 31px 21px;
  overflow: hidden;
  border: 8px solid #fff;
  border-radius: 24px 24px 24px 68px;
  background: #dfe6eb;
  box-shadow: 0 22px 43px rgb(16 43 74 / 19%);
  transform: rotate(1.5deg);
}

.hero-image-frame img,
.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image-frame img {
  object-position: center;
}

.hero-image-overlay {
  position: absolute;
  inset: 35% 0 0;
  background: linear-gradient(180deg, transparent, rgb(9 29 49 / 58%));
}

.hero-image-label {
  position: absolute;
  bottom: 22px;
  left: 22px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 750;
}

.hero-image-label :deep(svg) {
  width: 17px;
  height: 17px;
}

.hero-floating-card {
  position: absolute;
  z-index: 2;
  right: -7px;
  bottom: 3px;
  display: flex;
  min-width: 260px;
  align-items: center;
  gap: 12px;
  border: 1px solid #dce5eb;
  border-radius: 13px;
  padding: 13px 15px;
  background: rgb(255 255 255 / 96%);
  box-shadow: 0 13px 28px rgb(16 43 74 / 12%);
}

.floating-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 12px;
  background: #edf2f6;
  color: var(--lenses-blue);
}

.floating-icon :deep(svg) {
  width: 21px;
  height: 21px;
}

.floating-arrow {
  width: 17px;
  height: 17px;
  margin-left: auto;
  color: #8193a4;
}

.hero-orbit {
  position: absolute;
  z-index: -1;
  border: 1px solid rgb(36 76 115 / 12%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-orbit-one {
  top: -27px;
  right: -33px;
  width: 132px;
  height: 132px;
}

.hero-orbit-two {
  top: -10px;
  right: -16px;
  width: 98px;
  height: 98px;
}

.services-section,
.catalog-section,
.advice-section {
  margin-top: 76px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 29px;
}

.section-title-group {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.section-mark {
  width: 49px;
  height: 49px;
  border-radius: 15px;
}

.section-mark :deep(svg) {
  width: 22px;
  height: 22px;
}

.section-eyebrow {
  margin-bottom: 10px;
  font-size: 0.62rem;
}

.section-heading h2,
.catalog-heading h2,
.advice-heading h2 {
  max-width: 590px;
  margin: 0;
  color: var(--lenses-navy);
  font-size: clamp(1.9rem, 3.5vw, 2.75rem);
  font-weight: 850;
  letter-spacing: -0.055em;
  line-height: 1.06;
}

.section-intro {
  max-width: 315px;
  margin: 0 0 3px;
  border-left: 2px solid #afc0ce;
  padding: 3px 0 3px 16px;
  color: var(--lenses-gray);
  font-size: 0.78rem;
  line-height: 1.65;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 15px;
}

.service-card {
  position: relative;
  display: flex;
  min-height: 270px;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--lenses-line);
  border-radius: 14px;
  padding: 20px 19px 17px;
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 6%), transparent 36%),
    linear-gradient(145deg, #fff, #fbfcfd);
  box-shadow: 0 8px 22px rgb(16 43 74 / 5%);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.service-card::before {
  position: absolute;
  top: 0;
  right: 18px;
  left: 18px;
  height: 3px;
  border-radius: 0 0 4px 4px;
  background: var(--lenses-blue);
  content: '';
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: #bacbd8;
  box-shadow: 0 16px 30px rgb(16 43 74 / 10%);
}

.service-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 19px;
}

.service-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
}

.service-icon :deep(svg) {
  width: 23px;
  height: 23px;
}

.service-index {
  color: #8799a9;
  font-size: 0.64rem;
  font-weight: 850;
  letter-spacing: 0.1em;
}

.service-eyebrow {
  margin: 0 0 7px;
  color: #718396;
  font-size: 0.59rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.service-card h3,
.category-copy h3 {
  margin: 0;
  color: var(--lenses-navy);
  font-size: 1.03rem;
  font-weight: 820;
  letter-spacing: -0.025em;
  line-height: 1.28;
}

.service-description {
  margin: 9px 0 17px;
  color: var(--lenses-gray);
  font-size: 0.72rem;
  line-height: 1.65;
}

.service-link {
  display: flex;
  min-height: 37px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  border-top: 1px solid #e6ebef;
  padding-top: 10px;
  color: var(--lenses-blue);
  font-size: 0.69rem;
  font-weight: 800;
  text-decoration: none;
}

.service-link:hover {
  color: var(--lenses-navy);
}

.service-link :deep(svg) {
  width: 16px;
  height: 16px;
}

.catalog-section {
  position: relative;
  border: 1px solid #d9e2e9;
  border-radius: 19px;
  padding: clamp(25px, 4vw, 43px);
  background:
    radial-gradient(circle at 100% 0, rgb(36 76 115 / 7%), transparent 26%),
    linear-gradient(135deg, #f7f9fa, #edf2f5);
  box-shadow: 0 17px 39px rgb(16 43 74 / 7%);
}

.catalog-section::before,
.advice-section::before {
  position: absolute;
  top: -13px;
  left: 42px;
  width: 65px;
  height: 4px;
  border-radius: 99px;
  background: var(--lenses-blue);
  content: '';
}

.catalog-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 24px;
}

.catalog-heading h2 {
  max-width: 600px;
  font-size: clamp(1.85rem, 3.4vw, 2.6rem);
}

.catalog-heading > p {
  max-width: 315px;
  margin: 0 0 2px;
  color: var(--lenses-gray);
  font-size: 0.76rem;
  line-height: 1.65;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.category-card {
  display: block;
  overflow: hidden;
  border: 1px solid #dbe3e9;
  border-radius: 13px;
  background: #fff;
  color: inherit;
  box-shadow: 0 7px 17px rgb(16 43 74 / 6%);
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.category-card-link {
  min-width: 0;
}

.category-card:focus-visible {
  outline: 3px solid rgb(36 76 115 / 28%);
  outline-offset: 4px;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 25px rgb(16 43 74 / 11%);
}

.category-image {
  position: relative;
  height: 206px;
  overflow: hidden;
  background: #dfe6eb;
}

.category-product {
  background:
    radial-gradient(circle at 50% 45%, #fff 0%, #f6f8fa 48%, transparent 76%),
    linear-gradient(145deg, #e5edf2, #cdd9e2);
}

.category-image img {
  transition: transform 350ms ease;
}

.category-product img {
  object-fit: contain;
  padding: 17px;
}

.category-card:hover .category-image img {
  transform: scale(1.04);
}

.category-image-shade {
  position: absolute;
  inset: 45% 0 0;
  background: linear-gradient(180deg, transparent, rgb(9 29 49 / 57%));
}

.category-photo-label {
  position: absolute;
  right: 15px;
  bottom: 14px;
  left: 15px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #fff;
  font-size: 0.63rem;
  font-weight: 750;
}

.category-photo-label :deep(svg) {
  width: 15px;
  height: 15px;
}

.category-copy {
  display: flex;
  min-height: 144px;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  padding: 15px 16px;
}

.category-copy h3 {
  font-size: 0.92rem;
}

.category-copy p {
  margin: 6px 0 0;
  color: var(--lenses-gray);
  font-size: 0.69rem;
  line-height: 1.55;
}

.category-action {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--lenses-navy);
  border-radius: 9px;
  background: var(--lenses-navy);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 750;
  transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;
}

.category-card:hover .category-action {
  border-color: var(--lenses-blue);
  background: var(--lenses-blue);
}

.category-card:focus-visible .category-action {
  border-color: var(--lenses-blue);
  background: var(--lenses-blue);
}

.category-detail {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: center;
  gap: clamp(25px, 4vw, 45px);
  overflow: hidden;
  border: 1px solid #dbe3e9;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 10px 26px rgb(16 43 74 / 7%);
}

.category-detail-image {
  position: relative;
  min-height: 300px;
  overflow: hidden;
  background: #dfe6eb;
}

.category-detail-image img {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
}

.category-detail-image.category-product img {
  padding: 20px;
  object-fit: contain;
}

.category-detail-copy {
  padding: 28px clamp(20px, 4vw, 42px) 28px 0;
}

.category-detail-copy .section-eyebrow {
  margin-bottom: 9px;
}

.category-detail-copy h3 {
  margin: 0;
  color: var(--lenses-navy);
  font-size: clamp(1.6rem, 3vw, 2.35rem);
  font-weight: 850;
  letter-spacing: -0.045em;
  line-height: 1.08;
}

.category-detail-copy > p:not(.section-eyebrow) {
  margin: 12px 0 0;
  color: var(--lenses-gray);
  font-size: 0.83rem;
  line-height: 1.7;
}

.category-detail-copy .category-detail-note {
  border-left: 2px solid #afc0ce;
  padding-left: 12px;
  font-size: 0.72rem;
}

.category-detail-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 17px;
  margin-top: 21px;
}

.catalog-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 17px 0 0;
  color: #65778a;
  font-size: 0.65rem;
  line-height: 1.5;
}

.catalog-note :deep(svg) {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  color: var(--lenses-blue);
}

.advice-section {
  position: relative;
  border: 1px solid #d9e2e9;
  border-radius: 19px;
  padding: clamp(27px, 4.6vw, 48px);
  background:
    radial-gradient(ellipse at 0 100%, rgb(36 76 115 / 7%), transparent 40%),
    linear-gradient(140deg, #fff, #f2f5f7);
  box-shadow: 0 18px 39px rgb(16 43 74 / 7%);
}

.advice-heading {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.advice-heading-icon {
  display: grid;
  width: 50px;
  height: 50px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d7e2ea;
  border-radius: 15px;
  background: linear-gradient(145deg, #fff, #eaf0f4);
  color: var(--lenses-blue);
  box-shadow: 0 5px 13px rgb(16 43 74 / 6%);
}

.advice-heading-icon :deep(svg) {
  width: 23px;
  height: 23px;
}

.advice-heading .section-eyebrow {
  margin-bottom: 8px;
}

.advice-heading h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.45rem);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 17px;
}

.advice-step {
  position: relative;
  min-height: 180px;
  border: 1px solid #dce5eb;
  border-top: 3px solid var(--lenses-blue);
  border-radius: 13px;
  padding: 19px;
  background: rgb(255 255 255 / 90%);
  box-shadow: 0 8px 20px rgb(16 43 74 / 5%);
}

.step-number {
  position: absolute;
  top: 18px;
  right: 17px;
  border: 1px solid #d8e2e9;
  border-radius: 99px;
  padding: 6px 9px;
  background: #f3f6f8;
  color: var(--lenses-blue);
  font-size: 0.58rem;
  font-weight: 850;
  letter-spacing: 0.09em;
}

.step-icon {
  width: 44px;
  height: 44px;
  border-radius: 13px;
}

.step-icon :deep(svg) {
  width: 21px;
  height: 21px;
}

.advice-step h3 {
  margin: 15px 0 6px;
  color: var(--lenses-navy);
  font-size: 0.88rem;
  font-weight: 820;
  line-height: 1.35;
}

.advice-step p {
  max-width: 280px;
  margin: 0;
  color: var(--lenses-gray);
  font-size: 0.7rem;
  line-height: 1.65;
}

.step-connector {
  position: absolute;
  z-index: 1;
  top: 39px;
  right: -20px;
  width: 23px;
  border-top: 1px dashed #92a8ba;
}

.step-connector::after {
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

.advice-cta {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) auto;
  align-items: center;
  gap: 19px;
  margin-top: 29px;
  border: 1px solid #183d60;
  border-radius: 16px;
  padding: 24px clamp(20px, 4vw, 38px);
  background:
    radial-gradient(ellipse at 0 0, rgb(255 255 255 / 10%), transparent 44%),
    linear-gradient(120deg, #183d60, #102b4a 73%, #0d233b);
  box-shadow: 0 15px 34px rgb(16 43 74 / 16%);
}

.cta-icon {
  display: grid;
  width: 53px;
  height: 53px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 16px;
  background: rgb(255 255 255 / 10%);
  color: #fff;
}

.cta-icon :deep(svg) {
  width: 25px;
  height: 25px;
}

.cta-copy .section-eyebrow {
  margin-bottom: 7px;
  color: #c4d4e1;
}

.advice-cta h2 {
  max-width: 640px;
  margin: 0;
  color: #fff;
  font-size: clamp(1.1rem, 2.3vw, 1.55rem);
  font-weight: 820;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

.cta-copy > p:last-child {
  margin: 6px 0 0;
  color: #d3dee8;
  font-size: 0.72rem;
  line-height: 1.5;
}

.cta-button {
  min-height: 45px;
  border-color: #fff;
  background: #fff;
  color: var(--lenses-navy);
  white-space: nowrap;
}

.cta-button:hover {
  transform: translateY(-2px);
  background: #edf2f6;
  box-shadow: 0 8px 16px rgb(0 0 0 / 12%);
}

@media (max-width: 980px) {
  .lenses-hero {
    gap: 30px;
    padding: 38px;
  }

  .hero-visual {
    min-height: 320px;
  }

  .hero-floating-card {
    right: -9px;
    min-width: 235px;
  }

  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service-card {
    min-height: 250px;
  }

  .service-description {
    font-size: 0.75rem;
  }

  .category-image {
    height: 175px;
  }

  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .lenses-page {
    padding: 20px 0 55px;
  }

  .lenses-hero,
  .services-section,
  .catalog-section,
  .advice-section,
  .advice-cta {
    width: calc(100% - 34px);
  }

  .lenses-hero {
    grid-template-columns: 1fr;
    gap: 13px;
    border-radius: 17px;
    padding: 25px 20px 19px;
    text-align: center;
  }

  .hero-copy {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .hero-copy h1 {
    max-width: 420px;
    font-size: clamp(2.15rem, 9vw, 2.8rem);
    line-height: 1.04;
  }

  .hero-copy h1 span {
    margin-top: 3px;
  }

  .hero-description {
    max-width: 360px;
    margin-top: 10px;
    font-size: 0.78rem;
    line-height: 1.55;
  }

  .hero-actions {
    justify-content: center;
    gap: 14px;
    margin-top: 15px;
  }

  .lenses-button {
    min-height: 45px;
    padding: 10px 13px;
    font-size: 0.73rem;
  }

  .explore-link {
    font-size: 0.71rem;
  }

  .hero-visual {
    width: min(100%, 360px);
    min-height: 224px;
    margin: 0 auto;
  }

  .hero-image-frame {
    inset: 0 12px 19px;
    border-width: 6px;
    border-radius: 19px 19px 19px 49px;
  }

  .hero-image-label {
    top: 14px;
    bottom: auto;
    left: 14px;
    border-radius: 999px;
    padding: 5px 8px;
    background: rgb(9 29 49 / 68%);
  }

  .hero-floating-card {
    right: 50%;
    bottom: 0;
    width: min(270px, calc(100% - 14px));
    min-width: 0;
    justify-content: flex-start;
    padding: 10px 12px;
    transform: translateX(50%);
  }

  .hero-floating-card > span:nth-child(2) {
    text-align: left;
  }

  .floating-icon {
    width: 38px;
    height: 38px;
  }

  .hero-orbit-one {
    right: -17px;
    width: 95px;
    height: 95px;
  }

  .hero-orbit-two {
    right: -6px;
    width: 70px;
    height: 70px;
  }

  .services-section,
  .catalog-section,
  .advice-section {
    margin-top: 52px;
  }

  .section-heading,
  .catalog-heading {
    align-items: center;
    flex-direction: column;
    gap: 13px;
    margin-bottom: 21px;
    text-align: center;
  }

  .section-title-group {
    align-items: center;
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .section-mark {
    width: 42px;
    height: 42px;
    border-radius: 13px;
  }

  .section-eyebrow {
    font-size: 0.56rem;
  }

  .section-heading h2,
  .catalog-heading h2 {
    font-size: clamp(1.65rem, 8.2vw, 2.15rem);
  }

  .section-intro,
  .catalog-heading > p {
    max-width: 100%;
    border-top: 1px solid #dce4ea;
    border-left: 0;
    padding: 12px 0 0;
    font-size: 0.74rem;
    text-align: center;
  }

  .services-grid {
    gap: 11px;
  }

  .service-card {
    min-height: 0;
    padding: 16px 14px 13px;
    text-align: center;
  }

  .service-card-top {
    margin-bottom: 14px;
  }

  .service-card-top,
  .service-link {
    justify-content: center;
  }

  .service-index {
    position: absolute;
    top: 24px;
    right: 14px;
  }

  .service-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }

  .service-icon :deep(svg) {
    width: 20px;
    height: 20px;
  }

  .service-eyebrow {
    min-height: 1em;
    font-size: 0.5rem;
    letter-spacing: 0.08em;
    justify-content: center;
  }

  .service-card h3 {
    font-size: 0.87rem;
  }

  .service-description {
    margin: 8px 0 13px;
    font-size: 0.67rem;
    line-height: 1.58;
  }

  .service-link {
    min-height: 34px;
    font-size: 0.61rem;
  }

  .service-link :deep(svg) {
    position: absolute;
    right: 14px;
  }

  .catalog-section,
  .advice-section {
    border-radius: 16px;
    padding: 23px 18px;
  }

  .catalog-section::before,
  .advice-section::before {
    left: 50%;
    transform: translateX(-50%);
  }

  .category-grid {
    grid-template-columns: 1fr;
    gap: 13px;
  }

  .category-detail {
    grid-template-columns: 1fr;
    gap: 0;
    text-align: center;
  }

  .category-detail-image {
    min-height: 220px;
  }

  .category-detail-copy {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 22px 17px;
  }

  .category-detail-copy .category-detail-note {
    border-top: 1px solid #dce4ea;
    border-left: 0;
    padding: 12px 0 0;
  }

  .category-detail-actions {
    align-items: center;
    justify-content: center;
  }

  .category-image {
    height: 190px;
    min-height: 0;
  }

  .category-photo-label {
    right: 11px;
    bottom: 9px;
    left: 11px;
    gap: 6px;
    font-size: 0.58rem;
  }

  .category-photo-label :deep(svg) {
    width: 13px;
    height: 13px;
  }

  .category-copy {
    min-height: 0;
    gap: 13px;
    padding: 15px 14px;
    text-align: center;
  }

  .category-copy h3 {
    font-size: 0.8rem;
  }

  .category-copy p {
    font-size: 0.63rem;
  }

  .category-action {
    min-height: 44px;
    font-size: 0.69rem;
  }

  .catalog-note {
    align-items: center;
    justify-content: center;
    font-size: 0.61rem;
    text-align: center;
  }

  .advice-heading {
    align-items: center;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 22px;
    text-align: center;
  }

  .advice-heading-icon {
    width: 43px;
    height: 43px;
    border-radius: 13px;
  }

  .advice-heading h2 {
    font-size: clamp(1.6rem, 7.8vw, 2.05rem);
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: 11px;
  }

  .advice-step {
    min-height: 0;
    padding: 15px;
    text-align: center;
  }

  .step-number {
    top: 14px;
    right: 14px;
  }

  .step-icon {
    width: 40px;
    height: 40px;
    margin-inline: auto;
  }

  .advice-step h3 {
    margin: 11px 0 5px;
  }

  .advice-step p {
    max-width: 100%;
    margin-inline: auto;
  }

  .step-connector {
    top: auto;
    right: auto;
    bottom: -13px;
    left: 50%;
    width: 0;
    height: 14px;
    border-top: 0;
    border-left: 1px dashed #92a8ba;
  }

  .step-connector::after {
    top: auto;
    right: auto;
    bottom: 0;
    left: -4px;
    transform: rotate(135deg);
  }

  .advice-cta {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    margin-top: 23px;
    border-radius: 14px;
    padding: 19px 16px;
    text-align: center;
  }

  .cta-icon {
    width: 42px;
    height: 42px;
    border-radius: 13px;
    margin-inline: auto;
  }

  .cta-icon :deep(svg) {
    width: 21px;
    height: 21px;
  }

  .cta-copy .section-eyebrow {
    font-size: 0.52rem;
  }

  .advice-cta h2 {
    font-size: 1.05rem;
  }

  .cta-copy > p:last-child {
    font-size: 0.66rem;
  }

  .cta-button {
    grid-column: 1 / -1;
    justify-self: stretch;
  }
}

@media (max-width: 380px) {
  .hero-actions {
    align-items: center;
    flex-direction: column;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-card {
    padding: 18px;
  }

  .service-card h3 {
    font-size: 0.97rem;
  }

  .service-description {
    font-size: 0.72rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
