<script setup lang="ts">
import evaluationImage from '~/assets/RecOpt.webp'
import classicFramesImage from '~/assets/ClassicFrames.webp'
import modernFramesImage from '~/assets/Sunglasses.webp'
import safetyGlassesImage from '~/assets/Fondo.webp'
import safetyStoreImage from '~/assets/Seguridad.webp'
import lifestyleFramesImage from '~/assets/FondoPrincipal.webp'

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
    image: lifestyleFramesImage,
    imageAlt: 'Armazón de lentes de estilo clásico',
    imageFit: 'cover',
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
    imageFit: 'contain',
    category: 'Seguridad graduada',
    title: 'Lentes de seguridad graduados',
    description: 'Lentes graduados con protección ocular para el trabajo. Se revisan la receta, el armazón y los requisitos de tu actividad.'
  }
]

const products = [
  {
    id: 'clasico-havana',
    category: 'clasicos',
    name: 'Armazón clásico Havana',
    subtitle: 'Estilo atemporal',
    description: 'Una propuesta de estilo clásico para quienes buscan un armazón versátil para el día a día. La graduación y las micas se definen con asesoría profesional.',
    material: 'Diseño clásico',
    images: [
      { src: lifestyleFramesImage, alt: 'Armazón clásico de referencia en exhibición' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' },
      { src: modernFramesImage, alt: 'Otra propuesta de armazón de referencia' }
    ]
  },
  {
    id: 'clasico-esencial',
    category: 'clasicos',
    name: 'Armazón clásico Esencial',
    subtitle: 'Diseño para todos los días',
    description: 'Una alternativa de inspiración clásica con una silueta fácil de combinar. Consulta en clínica los modelos disponibles y su compatibilidad con tu receta.',
    material: 'Línea clásica',
    images: [
      { src: lifestyleFramesImage, alt: 'Armazón de estilo clásico de referencia' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' },
      { src: modernFramesImage, alt: 'Otra propuesta de armazón de referencia' }
    ]
  },
  {
    id: 'clasico-heritage',
    category: 'clasicos',
    name: 'Armazón clásico Heritage',
    subtitle: 'Elegancia discreta',
    description: 'Un estilo de inspiración tradicional para quienes prefieren líneas sobrias. Los materiales, colores y opciones de graduación se confirman en clínica.',
    material: 'Estilo tradicional',
    images: [
      { src: classicFramesImage, alt: 'Armazón clásico oscuro de referencia' },
      { src: lifestyleFramesImage, alt: 'Armazón clásico en exhibición' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'clasico-sereno',
    category: 'clasicos',
    name: 'Armazón clásico Sereno',
    subtitle: 'Silueta versátil',
    description: 'Una propuesta de líneas sencillas pensada como referencia para el uso cotidiano. Consulta las opciones reales y su compatibilidad con tu receta.',
    material: 'Diseño versátil',
    images: [
      { src: lifestyleFramesImage, alt: 'Armazón de silueta clásica en exhibición' },
      { src: classicFramesImage, alt: 'Armazón oscuro de estilo clásico' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'clasico-legado',
    category: 'clasicos',
    name: 'Armazón clásico Legado',
    subtitle: 'Inspiración vintage',
    description: 'Una propuesta clásica con carácter atemporal. Consulta en clínica las formas, acabados y opciones compatibles con tu receta.',
    material: 'Diseño vintage',
    images: [
      { src: classicFramesImage, alt: 'Armazón clásico de referencia' },
      { src: lifestyleFramesImage, alt: 'Armazón clásico en exhibición' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'clasico-equilibrio',
    category: 'clasicos',
    name: 'Armazón clásico Equilibrio',
    subtitle: 'Sencillo y versátil',
    description: 'Un modelo ilustrativo de líneas sobrias para distintas ocasiones. Disponibilidad, color y graduación se confirman en clínica.',
    material: 'Línea versátil',
    images: [
      { src: lifestyleFramesImage, alt: 'Armazón sobrio de referencia en exhibición' },
      { src: classicFramesImage, alt: 'Armazón oscuro de estilo clásico' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'moderno-urbano',
    category: 'modernos',
    name: 'Armazón moderno Urbano',
    subtitle: 'Estilo contemporáneo',
    description: 'Una propuesta de inspiración actual para complementar distintos estilos. Las opciones de graduación y mica se confirman de acuerdo con tu receta.',
    material: 'Diseño moderno',
    images: [
      { src: modernFramesImage, alt: 'Vista principal del armazón moderno Urbano' },
      { src: lifestyleFramesImage, alt: 'Armazón moderno de referencia en exhibición' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'moderno-actitud',
    category: 'modernos',
    name: 'Armazón moderno Actitud',
    subtitle: 'Diseño con personalidad',
    description: 'Un modelo de muestra con una silueta contemporánea. Acércate para conocer diseños reales, colores y opciones adecuadas para tu graduación.',
    material: 'Línea moderna',
    images: [
      { src: classicFramesImage, alt: 'Armazón negro de estilo contemporáneo de referencia' },
      { src: lifestyleFramesImage, alt: 'Otra propuesta de armazón moderno en exhibición' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'moderno-aura',
    category: 'modernos',
    name: 'Armazón moderno Aura',
    subtitle: 'Líneas ligeras',
    description: 'Una referencia de estilo contemporáneo con una apariencia ligera. El armazón y las micas adecuadas se eligen según tu graduación.',
    material: 'Diseño contemporáneo',
    images: [
      { src: lifestyleFramesImage, alt: 'Armazón contemporáneo de referencia' },
      { src: modernFramesImage, alt: 'Armazón moderno de líneas definidas' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'moderno-norte',
    category: 'modernos',
    name: 'Armazón moderno Norte',
    subtitle: 'Estilo urbano',
    description: 'Una propuesta de muestra para explorar formas actuales y combinables. Consulta en clínica por colores, modelos reales y disponibilidad.',
    material: 'Estilo urbano',
    images: [
      { src: classicFramesImage, alt: 'Armazón moderno oscuro de referencia' },
      { src: lifestyleFramesImage, alt: 'Armazón en exhibición' },
      { src: modernFramesImage, alt: 'Otra propuesta de armazón moderno' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' }
    ]
  },
  {
    id: 'moderno-pulso',
    category: 'modernos',
    name: 'Armazón moderno Pulso',
    subtitle: 'Geometría actual',
    description: 'Una referencia de diseño actual para explorar siluetas con personalidad. Consulta modelos reales y opciones para tu graduación.',
    material: 'Diseño geométrico',
    images: [
      { src: modernFramesImage, alt: 'Armazón de diseño moderno de referencia' },
      { src: classicFramesImage, alt: 'Armazón oscuro de referencia' },
      { src: lifestyleFramesImage, alt: 'Armazón en exhibición' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' }
    ]
  },
  {
    id: 'moderno-esencia',
    category: 'modernos',
    name: 'Armazón moderno Esencia',
    subtitle: 'Diseño contemporáneo',
    description: 'Una propuesta de muestra que combina una apariencia limpia con un estilo actual. La graduación se define según tu receta.',
    material: 'Línea contemporánea',
    images: [
      { src: classicFramesImage, alt: 'Armazón contemporáneo oscuro de referencia' },
      { src: lifestyleFramesImage, alt: 'Armazón de referencia en exhibición' },
      { src: modernFramesImage, alt: 'Otra silueta moderna de referencia' },
      { src: safetyStoreImage, alt: 'Selección de armazones en Clínica Óptica' }
    ]
  },
  {
    id: 'seguridad-pro',
    category: 'seguridad-graduada',
    name: 'Lente de seguridad Pro',
    subtitle: 'Protección para el trabajo',
    description: 'Una referencia visual de lentes de protección. La graduación, el nivel de protección y la compatibilidad con cada actividad requieren valoración y confirmación en clínica.',
    material: 'Seguridad visual',
    images: [
      { src: safetyGlassesImage, alt: 'Vista principal de referencia de lentes de seguridad' },
      { src: classicFramesImage, alt: 'Otra opción de protección ocular de referencia' },
      { src: safetyStoreImage, alt: 'Exhibición de opciones de lentes en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'seguridad-industrial',
    category: 'seguridad-graduada',
    name: 'Lente de seguridad Industrial',
    subtitle: 'Asesoría según tu actividad',
    description: 'Una opción de muestra para explorar lentes de protección. Consulta con el equipo los requisitos de seguridad y las alternativas graduadas disponibles.',
    material: 'Uso industrial',
    images: [
      { src: safetyGlassesImage, alt: 'Vista principal de referencia de lentes de seguridad industrial' },
      { src: classicFramesImage, alt: 'Otra opción de protección ocular de referencia' },
      { src: safetyStoreImage, alt: 'Exhibición de opciones de lentes en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'seguridad-laboral',
    category: 'seguridad-graduada',
    name: 'Lente de seguridad Laboral',
    subtitle: 'Protección cotidiana',
    description: 'Una referencia para conversar sobre protección ocular en el trabajo. El nivel de protección y la opción graduada se confirman según tu actividad.',
    material: 'Protección visual',
    images: [
      { src: classicFramesImage, alt: 'Lentes protectores oscuros de referencia' },
      { src: safetyGlassesImage, alt: 'Lentes de seguridad de referencia' },
      { src: safetyStoreImage, alt: 'Exhibición de opciones de lentes en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'seguridad-activa',
    category: 'seguridad-graduada',
    name: 'Lente de seguridad Activa',
    subtitle: 'Asesoría para tu actividad',
    description: 'Modelo ilustrativo para explorar alternativas de protección. La compatibilidad con tu receta y los requisitos de seguridad requieren valoración.',
    material: 'Uso profesional',
    images: [
      { src: modernFramesImage, alt: 'Lentes de protección de referencia' },
      { src: classicFramesImage, alt: 'Otra opción de lentes protectores de referencia' },
      { src: safetyStoreImage, alt: 'Exhibición de opciones de lentes en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'seguridad-resguardo',
    category: 'seguridad-graduada',
    name: 'Lente de seguridad Resguardo',
    subtitle: 'Protección para el trabajo',
    description: 'Una referencia visual para consultar alternativas de protección ocular. La certificación y graduación requieren confirmación en clínica.',
    material: 'Protección profesional',
    images: [
      { src: safetyGlassesImage, alt: 'Lentes de protección de referencia' },
      { src: classicFramesImage, alt: 'Otra alternativa de protección de referencia' },
      { src: safetyStoreImage, alt: 'Exhibición de opciones de lentes en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  },
  {
    id: 'seguridad-enfoque',
    category: 'seguridad-graduada',
    name: 'Lente de seguridad Enfoque',
    subtitle: 'Ajuste según tu actividad',
    description: 'Un modelo ilustrativo para iniciar una consulta sobre protección visual graduada. Las especificaciones dependen de tu entorno laboral.',
    material: 'Asesoría de seguridad',
    images: [
      { src: modernFramesImage, alt: 'Lentes de seguridad de referencia' },
      { src: safetyGlassesImage, alt: 'Otra opción protectora de referencia' },
      { src: safetyStoreImage, alt: 'Exhibición de opciones de lentes en Clínica Óptica' },
      { src: evaluationImage, alt: 'Espacio de asesoría visual' }
    ]
  }
]

const selectedCategory = computed(() => {
  const categorySlug = route.query.categoria
  return typeof categorySlug === 'string'
    ? categories.find(category => category.slug === categorySlug)
    : undefined
})

const categoryProducts = computed(() => products.filter(product => product.category === selectedCategory.value?.slug))

const productCarousel = ref<HTMLElement | null>(null)
const canScrollProductsBackward = ref(false)
const canScrollProductsForward = ref(false)

function updateProductCarouselState() {
  const carousel = productCarousel.value

  if (!carousel) {
    canScrollProductsBackward.value = false
    canScrollProductsForward.value = false
    return
  }

  canScrollProductsBackward.value = carousel.scrollLeft > 2
  canScrollProductsForward.value = carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 2
}

function scrollProductCarousel(direction: -1 | 1) {
  const carousel = productCarousel.value
  const cards = carousel?.querySelectorAll<HTMLElement>('.product-card')
  const firstCard = cards?.[0]

  if (!carousel || !cards?.length || !firstCard) return

  const styles = getComputedStyle(carousel)
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
  const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0
  const paddingRight = Number.parseFloat(styles.paddingRight) || 0
  const padding = paddingLeft + paddingRight
  const cardStep = firstCard.getBoundingClientRect().width + gap
  const carouselContentLeft = carousel.getBoundingClientRect().left + carousel.clientLeft + paddingLeft
  const requestedCardsPerPage = window.matchMedia('(max-width: 700px)').matches ? 1 : 3
  const visibleCards = Math.max(1, Math.min(
    requestedCardsPerPage,
    Math.round((carousel.clientWidth - padding + gap) / cardStep)
  ))
  const currentStart = Array.from(cards).reduce((closestIndex, card, index) => {
    const cardLeft = card.getBoundingClientRect().left
    const currentCardLeft = cards[closestIndex]?.getBoundingClientRect().left ?? cardLeft
    return Math.abs(cardLeft - carouselContentLeft) < Math.abs(currentCardLeft - carouselContentLeft)
      ? index
      : closestIndex
  }, 0)
  const lastFullPageStart = Math.max(0, cards.length - visibleCards)
  const nextStart = direction > 0
    ? Math.min(currentStart + visibleCards, lastFullPageStart)
    : Math.floor(Math.max(0, currentStart - 1) / visibleCards) * visibleCards
  const targetCard = cards[nextStart]

  if (!targetCard) return

  const targetScrollLeft = carousel.scrollLeft
    + targetCard.getBoundingClientRect().left
    - carouselContentLeft

  carousel.scrollTo({
    left: Math.max(0, Math.min(carousel.scrollWidth - carousel.clientWidth, targetScrollLeft)),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.visibilityState === 'hidden'
      ? 'auto'
      : 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('resize', updateProductCarouselState, { passive: true })
  updateProductCarouselState()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateProductCarouselState)
})

watch(
  () => [route.query.categoria, route.query.producto],
  async () => {
    await nextTick()

    if (!productCarousel.value) return

    productCarousel.value.scrollLeft = 0
    updateProductCarouselState()
  },
  { immediate: true }
)

const selectedProduct = computed(() => {
  const productId = route.query.producto
  return typeof productId === 'string'
    ? categoryProducts.value.find(product => product.id === productId)
    : undefined
})

const selectedPhotoIndex = ref(0)

watch(
  () => route.query.producto,
  () => {
    selectedPhotoIndex.value = 0
  }
)

const productAdviceUrl = computed(() => {
  const productName = selectedProduct.value?.name ?? 'un modelo de lentes'
  const message = encodeURIComponent(`Hola, quisiera recibir asesoría sobre ${productName}.`)
  return `https://wa.me/${whatsappNumber}?text=${message}`
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
        <p class="catalog-heading-note">
          <span class="catalog-heading-note-icon">
            <UIcon
              name="i-lucide-scan-eye"
              aria-hidden="true"
            />
          </span>
          <span>Descubre algunas opciones y pide asesoría para conocer modelos, disponibilidad y detalles.</span>
        </p>
      </div>

      <div
        v-if="selectedCategory && selectedProduct"
        id="producto"
        class="product-detail"
      >
        <div class="product-gallery">
          <div class="product-main-photo">
            <img
              :src="selectedProduct.images[selectedPhotoIndex]?.src"
              :alt="selectedProduct.images[selectedPhotoIndex]?.alt"
              decoding="async"
            >
            <span class="product-reference-label">
              <UIcon
                name="i-lucide-image"
                aria-hidden="true"
              />
              Imagen de referencia
            </span>
          </div>
          <div
            class="product-thumbnails"
            aria-label="Foto principal y tres imágenes adicionales de referencia"
          >
            <button
              v-for="(photo, index) in selectedProduct.images"
              :key="photo.alt"
              class="product-thumbnail"
              :class="{ 'is-selected': selectedPhotoIndex === index }"
              type="button"
              :aria-label="`Mostrar foto ${index + 1}: ${photo.alt}`"
              :aria-pressed="selectedPhotoIndex === index"
              @click="selectedPhotoIndex = index"
            >
              <img
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
                decoding="async"
              >
              <span>{{ index === 0 ? 'Principal' : `Foto ${index + 1}` }}</span>
            </button>
          </div>
        </div>
        <div class="product-detail-copy">
          <NuxtLink
            class="product-back-link"
            :to="{ path: '/lentes', query: { categoria: selectedCategory.slug }, hash: '#catalogo' }"
          >
            <UIcon
              name="i-lucide-arrow-left"
              aria-hidden="true"
            />
            Volver a {{ selectedCategory.category }}
          </NuxtLink>
          <p class="section-eyebrow">
            {{ selectedCategory.category }} · {{ selectedProduct.subtitle }}
          </p>
          <h3>{{ selectedProduct.name }}</h3>
          <p class="product-description">
            {{ selectedProduct.description }}
          </p>
          <div class="product-detail-spec">
            <span class="spec-icon">
              <UIcon
                name="i-lucide-glasses"
                aria-hidden="true"
              />
            </span>
            <span>
              <strong>{{ selectedProduct.material }}</strong>
              <small>Modelo de muestra · Consulta opciones en clínica</small>
            </span>
          </div>
          <p class="product-detail-note">
            Las imágenes son ilustrativas. Modelo, existencia, color y compatibilidad con graduación se confirman con el equipo.
          </p>
          <div class="category-detail-actions">
            <a
              class="lenses-button primary-button"
              :href="productAdviceUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <UIcon
                name="i-lucide-message-circle"
                aria-hidden="true"
              />
              Consultar este modelo
              <UIcon
                name="i-lucide-arrow-up-right"
                aria-hidden="true"
              />
            </a>
            <NuxtLink
              class="explore-link"
              :to="{ path: '/cotizar', query: { categoria: selectedCategory.slug } }"
            >
              Solicitar cotización
            </NuxtLink>
          </div>
        </div>
      </div>

      <template v-else-if="selectedCategory">
        <div class="selected-category-heading">
          <NuxtLink
            class="product-back-link"
            to="/lentes#catalogo"
          >
            <UIcon
              name="i-lucide-arrow-left"
              aria-hidden="true"
            />
            Ver todas las categorías
          </NuxtLink>
          <div>
            <p class="section-eyebrow">
              Categoría seleccionada
            </p>
            <h3>{{ selectedCategory.title }}</h3>
            <p>{{ selectedCategory.description }}</p>
          </div>
          <div class="selected-category-meta">
            <span class="category-product-count">
              <UIcon
                name="i-lucide-glasses"
                aria-hidden="true"
              />
              {{ categoryProducts.length }} modelos de muestra
            </span>
            <div
              class="product-carousel-controls"
              role="group"
              aria-label="Controles del carrusel de modelos"
            >
              <button
                class="product-carousel-arrow"
                type="button"
                aria-label="Ver modelos anteriores"
                :disabled="!canScrollProductsBackward"
                @click="scrollProductCarousel(-1)"
              >
                <UIcon
                  name="i-lucide-arrow-left"
                  aria-hidden="true"
                />
              </button>
              <button
                class="product-carousel-arrow"
                type="button"
                aria-label="Ver más modelos"
                :disabled="!canScrollProductsForward"
                @click="scrollProductCarousel(1)"
              >
                <UIcon
                  name="i-lucide-arrow-right"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="product-carousel-stage">
          <div
            ref="productCarousel"
            class="product-carousel"
            role="region"
            aria-roledescription="carrusel"
            :aria-label="`Modelos de ${selectedCategory.category}`"
            tabindex="0"
            @scroll.passive="updateProductCarouselState"
          >
            <NuxtLink
              v-for="(product, index) in categoryProducts"
              :key="product.id"
              class="product-card"
              :to="{ path: '/lentes', query: { categoria: selectedCategory.slug, producto: product.id }, hash: '#producto' }"
              :aria-label="`Ver detalles de ${product.name}, modelo ${index + 1} de ${categoryProducts.length}`"
            >
              <div class="product-card-image">
                <img
                  :src="product.images[0]?.src"
                  :alt="product.images[0]?.alt"
                  loading="lazy"
                  decoding="async"
                >
                <span class="product-sample-badge">
                  <UIcon
                    name="i-lucide-sparkles"
                    aria-hidden="true"
                  />
                  Modelo de muestra
                </span>
                <span class="product-card-open">
                  <UIcon
                    name="i-lucide-arrow-up-right"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div class="product-card-copy">
                <div class="product-card-heading">
                  <span class="product-card-eyebrow">{{ selectedCategory.category }}</span>
                  <span class="product-card-subtitle">{{ product.subtitle }}</span>
                </div>
                <h4>{{ product.name }}</h4>
                <p>{{ product.description }}</p>
                <div class="product-card-footer">
                  <strong>Explorar modelo</strong>
                  <span class="product-card-arrow">
                    <UIcon
                      name="i-lucide-arrow-right"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </template>

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
            :to="{ path: '/lentes', query: { categoria: category.slug }, hash: '#catalogo' }"
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
                decoding="async"
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
                Ver productos
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
        Los productos y fotografías de este catálogo son de muestra. Consulta en Clínica Óptica los modelos, precios y disponibilidad reales.
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

<style scoped>
.selected-category-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0 24px;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #dbe5eb;
  padding-bottom: 16px;
}

.selected-category-heading .product-back-link {
  grid-column: 1 / -1;
  width: fit-content;
  margin: 0 0 12px;
  border-color: #dce6ec;
  padding: 7px 11px;
  background: rgb(255 255 255 / 78%);
  box-shadow: 0 3px 9px rgb(16 43 74 / 4%);
}

.selected-category-heading .section-eyebrow {
  margin-bottom: 6px;
}

.selected-category-heading h3 {
  margin: 0;
  color: var(--lenses-navy);
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 850;
  letter-spacing: -0.045em;
  line-height: 1.08;
}

.selected-category-heading > div > p:last-child {
  max-width: 700px;
  margin: 6px 0 0;
  color: var(--lenses-gray);
  font-size: 0.75rem;
  line-height: 1.55;
}

.selected-category-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
}

.category-product-count {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #d7e3ea;
  border-radius: 999px;
  padding: 8px 11px;
  background: linear-gradient(145deg, #fff, #f4f8fa);
  color: #47677c;
  font-size: 0.65rem;
  font-weight: 750;
  white-space: nowrap;
  box-shadow: 0 4px 11px rgb(16 43 74 / 5%);
}

.category-product-count :deep(svg) {
  width: 14px;
  height: 14px;
  color: #57829a;
}

.product-carousel-controls {
  display: flex;
  align-items: center;
  gap: 7px;
}

.product-carousel-arrow {
  display: grid;
  width: 39px;
  height: 39px;
  place-items: center;
  border: 1px solid #d7e2e9;
  border-radius: 12px;
  background: linear-gradient(145deg, #fff, #f0f5f8);
  color: #244c73;
  box-shadow: 0 4px 10px rgb(16 43 74 / 6%);
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease, background-color 180ms ease, box-shadow 180ms ease, opacity 180ms ease, transform 180ms ease;
}

.product-carousel-arrow :deep(svg) {
  width: 18px;
  height: 18px;
}

.product-carousel-arrow:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: #244c73;
  background: linear-gradient(145deg, #315f7e, #193f5f);
  color: #fff;
  box-shadow: 0 7px 15px rgb(16 43 74 / 17%);
}

.product-carousel-arrow:focus-visible,
.product-carousel:focus-visible {
  outline: 3px solid rgb(36 76 115 / 35%);
  outline-offset: 3px;
}

.product-carousel-arrow:disabled {
  background: transparent;
  color: #a7b4bc;
  opacity: 0.58;
  box-shadow: none;
  cursor: not-allowed;
}

.product-carousel-stage {
  position: relative;
  overflow: hidden;
  border: 1px solid #e2eaf0;
  border-radius: 23px;
  padding: 7px;
  background:
    radial-gradient(ellipse at 8% 0%, rgb(223 237 245 / 75%), transparent 42%),
    linear-gradient(145deg, #f6f9fb, #eef3f6);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 85%);
}

.product-carousel {
  display: flex;
  overflow-x: auto;
  gap: 18px;
  padding: 10px 9px 13px;
  scroll-padding-inline: 9px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  overscroll-behavior-inline: contain;
  -webkit-overflow-scrolling: touch;
}

.product-carousel::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background: transparent;
  -webkit-appearance: none;
}

.product-card {
  display: grid;
  flex: 0 0 calc((100% - 36px) / 3);
  min-width: 0;
  grid-template-rows: 206px minmax(144px, auto);
  overflow: hidden;
  border: 1px solid rgb(214 226 234 / 92%);
  border-radius: 19px;
  background: linear-gradient(150deg, #fff 0%, #fff 68%, #f6f9fb 100%);
  color: inherit;
  box-shadow: 0 10px 24px rgb(16 43 74 / 7%), 0 1px 2px rgb(16 43 74 / 4%);
  text-decoration: none;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  scroll-snap-align: start;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: #a9c6d6;
  box-shadow: 0 18px 36px rgb(16 43 74 / 13%), 0 2px 5px rgb(16 43 74 / 5%);
}

.product-card:focus-visible,
.product-thumbnail:focus-visible,
.product-back-link:focus-visible {
  outline: 3px solid rgb(36 76 115 / 35%);
  outline-offset: 3px;
}

.product-card-image {
  position: relative;
  display: grid;
  overflow: hidden;
  place-items: center;
  background:
    radial-gradient(ellipse at 52% 50%, #fff 0%, #f4f8fa 54%, #e8f0f4 100%);
}

.product-card-image::before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 158px;
  height: 158px;
  border: 1px solid rgb(76 119 145 / 12%);
  border-radius: 50%;
  content: "";
  pointer-events: none;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 17px rgb(255 255 255 / 35%), 0 0 0 36px rgb(76 119 145 / 4%);
}

.product-card-image img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 20px 24px;
  object-fit: contain;
  transition: transform 380ms cubic-bezier(0.2, 0.75, 0.25, 1);
}

.product-card:hover .product-card-image img {
  transform: scale(1.065);
}

.product-sample-badge {
  position: absolute;
  z-index: 2;
  top: 11px;
  left: 11px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid rgb(255 255 255 / 88%);
  border-radius: 999px;
  padding: 7px 10px;
  background: rgb(255 255 255 / 82%);
  color: #49677b;
  font-size: 0.58rem;
  font-weight: 750;
  box-shadow: 0 4px 13px rgb(16 43 74 / 7%);
  backdrop-filter: blur(12px);
}

.product-sample-badge :deep(svg) {
  width: 12px;
  height: 12px;
  color: #57839a;
}

.product-card-open {
  position: absolute;
  z-index: 2;
  right: 11px;
  bottom: 11px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 55%);
  border-radius: 13px;
  background: var(--lenses-navy);
  color: #fff;
  box-shadow: 0 7px 17px rgb(16 43 74 / 22%);
  transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.product-card-open :deep(svg) {
  width: 18px;
  height: 18px;
}

.product-card:hover .product-card-open {
  transform: translate(2px, -2px);
  background: #245477;
  box-shadow: 0 9px 20px rgb(16 43 74 / 25%);
}

.product-card-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px 16px;
}

.product-card-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.product-card-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #386d8b;
  font-size: 0.57rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.product-card-eyebrow::before {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5c92ad;
  box-shadow: 0 0 0 3px rgb(92 146 173 / 12%);
  content: "";
}

.product-card-subtitle {
  color: #81909b;
  font-size: 0.62rem;
  font-weight: 600;
}

.product-card-copy h4 {
  margin: 8px 0 0;
  color: var(--lenses-navy);
  font-size: 0.92rem;
  font-weight: 850;
  letter-spacing: -0.035em;
  line-height: 1.18;
}

.product-card-copy p {
  display: -webkit-box;
  overflow: hidden;
  margin: 6px 0 9px;
  color: #637785;
  font-size: 0.67rem;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-card-footer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  border-top: 1px solid #e7edf1;
  padding-top: 8px;
}

.product-card-footer > strong {
  color: #315e79;
  font-size: 0.65rem;
  font-weight: 800;
  transition: color 160ms ease;
}

.product-card-arrow {
  display: grid;
  width: 27px;
  height: 27px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d6e2e9;
  border-radius: 50%;
  background: #f8fafb;
  color: #315e79;
  transition: transform 180ms ease, color 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.product-card-arrow :deep(svg) {
  width: 15px;
  height: 15px;
}

.product-card:hover .product-card-footer > strong {
  color: #173f5f;
}

.product-card:hover .product-card-arrow {
  transform: translateX(3px);
  border-color: var(--lenses-navy);
  background: var(--lenses-navy);
  color: #fff;
}

.product-detail {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(24px, 4vw, 48px);
  align-items: center;
  border: 1px solid #dce5eb;
  border-radius: 18px;
  padding: clamp(17px, 2.5vw, 28px);
  background:
    radial-gradient(ellipse at 0 0, rgb(228 239 245 / 52%), transparent 42%),
    linear-gradient(145deg, #fff, #fafcfd);
  box-shadow: 0 12px 31px rgb(16 43 74 / 8%);
}

.product-gallery {
  display: grid;
  min-width: 0;
  gap: 11px;
}

.product-main-photo {
  position: relative;
  display: grid;
  min-height: 350px;
  overflow: hidden;
  place-items: center;
  border: 1px solid #e2e9ed;
  border-radius: 14px;
  background:
    radial-gradient(circle at 50% 46%, #fff 0%, #f8fafb 53%, #eaf0f3 100%);
}

.product-main-photo img {
  width: 100%;
  height: 100%;
  max-height: 420px;
  padding: clamp(15px, 3vw, 34px);
  object-fit: contain;
}

.product-reference-label {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid rgb(255 255 255 / 83%);
  border-radius: 999px;
  padding: 7px 10px;
  background: rgb(255 255 255 / 88%);
  color: #526a7b;
  font-size: 0.59rem;
  font-weight: 750;
  box-shadow: 0 4px 12px rgb(16 43 74 / 7%);
  backdrop-filter: blur(8px);
}

.product-reference-label :deep(svg) {
  width: 14px;
  height: 14px;
  color: #437e9b;
}

.product-thumbnails {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.product-thumbnail {
  position: relative;
  display: grid;
  min-width: 0;
  height: 91px;
  overflow: hidden;
  place-items: center;
  border: 1px solid #e0e7eb;
  border-radius: 11px;
  padding: 4px;
  background: linear-gradient(145deg, #fff, #f0f4f6);
  cursor: pointer;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.product-thumbnail:hover {
  border-color: #9ebfd0;
}

.product-thumbnail.is-selected {
  border: 2px solid #397da0;
  box-shadow: 0 0 0 3px rgb(57 125 160 / 12%);
}

.product-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-thumbnail > span {
  position: absolute;
  right: 4px;
  bottom: 4px;
  left: 4px;
  border-radius: 5px;
  padding: 3px 4px;
  background: rgb(16 43 74 / 83%);
  color: #fff;
  font-size: 0.5rem;
  font-weight: 750;
  text-align: center;
}

.product-detail-copy {
  min-width: 0;
  padding: 8px 4px 8px 0;
}

.product-back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 17px;
  border: 1px solid #dbe6ec;
  border-radius: 999px;
  padding: 8px 12px;
  background: rgb(255 255 255 / 82%);
  color: #416b84;
  font-size: 0.69rem;
  font-weight: 750;
  text-decoration: none;
  box-shadow: 0 4px 11px rgb(16 43 74 / 4%);
  transition: color 150ms ease, gap 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
}

.product-back-link:hover {
  gap: 10px;
  border-color: #b9d3df;
  color: #183f5b;
  box-shadow: 0 7px 15px rgb(16 43 74 / 8%);
}

.product-back-link :deep(svg) {
  width: 15px;
  height: 15px;
}

.product-detail-copy .section-eyebrow {
  display: flex;
  width: fit-content;
  max-width: 100%;
  margin-bottom: 9px;
  color: #426f8a;
  font-size: 0.62rem;
}

.product-detail-copy h3 {
  margin: 0;
  color: var(--lenses-navy);
  font-size: clamp(1.8rem, 3.1vw, 2.55rem);
  font-weight: 850;
  letter-spacing: -0.055em;
  line-height: 1.07;
}

.product-description {
  margin: 14px 0 0;
  color: var(--lenses-gray);
  font-size: 0.82rem;
  line-height: 1.72;
}

.product-detail-spec {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-top: 19px;
  border: 1px solid #e1e9ed;
  border-radius: 12px;
  padding: 11px;
  background: linear-gradient(120deg, #f8fafb, #fff);
}

.spec-icon {
  display: grid;
  width: 37px;
  height: 37px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 11px;
  background: #eaf2f6;
  color: #356f8c;
}

.spec-icon :deep(svg) {
  width: 19px;
  height: 19px;
}

.product-detail-spec > span:last-child {
  display: grid;
  gap: 4px;
}

.product-detail-spec strong {
  color: #264b65;
  font-size: 0.69rem;
}

.product-detail-spec small {
  color: #788895;
  font-size: 0.61rem;
  line-height: 1.45;
}

.product-detail-note {
  margin: 15px 0 0;
  border-left: 2px solid #85afc4;
  padding: 2px 0 2px 11px;
  color: #687d8d;
  font-size: 0.67rem;
  line-height: 1.6;
}

.product-detail-copy .category-detail-actions {
  align-items: flex-start;
  gap: 13px 18px;
  margin-top: 21px;
}

.product-detail-copy .lenses-button {
  gap: 8px;
  font-size: 0.7rem;
}

.product-detail-copy .explore-link {
  min-height: 40px;
  border: 1px solid #bfd2de;
  border-radius: 9px;
  padding: 9px 14px;
  background: linear-gradient(135deg, #fff, #f2f7fa);
  color: #244c73;
  font-size: 0.7rem;
  font-weight: 800;
  box-shadow: 0 5px 13px rgb(16 43 74 / 7%);
  transition: border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease, color 160ms ease;
}

.product-detail-copy .explore-link:hover {
  border-color: #8eafc2;
  background: #eaf3f7;
  color: #173b5d;
  text-decoration: none;
  box-shadow: 0 7px 16px rgb(16 43 74 / 11%);
}

.product-detail-copy .explore-link:focus-visible {
  outline: 3px solid rgb(36 76 115 / 35%);
  outline-offset: 3px;
}

.catalog-note {
  border-radius: 8px;
  padding: 8px 10px;
  background: rgb(237 243 246 / 73%);
}

.catalog-section .catalog-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.48fr);
  align-items: center;
  gap: clamp(22px, 4vw, 54px);
  margin-bottom: 22px;
}

.catalog-section .catalog-heading > div {
  min-width: 0;
}

.catalog-section .catalog-heading h2 {
  max-width: 660px;
  margin: 0;
  color: var(--lenses-navy);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 850;
  letter-spacing: -0.055em;
  line-height: 0.99;
}

.catalog-section .catalog-heading-note {
  display: flex;
  max-width: 390px;
  align-items: flex-start;
  gap: 13px;
  margin: 0 0 0 auto;
  border: 1px solid #d9e5eb;
  border-left: 3px solid #4c7f9b;
  border-radius: 14px;
  padding: 16px 17px;
  background:
    radial-gradient(circle at 100% 0, rgb(219 235 243 / 62%), transparent 55%),
    linear-gradient(145deg, #fff, #f6f9fb);
  color: #557083;
  font-size: 0.76rem;
  line-height: 1.6;
  box-shadow: 0 8px 21px rgb(16 43 74 / 5%);
}

.catalog-heading-note-icon {
  display: grid;
  width: 35px;
  height: 35px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d7e5ec;
  border-radius: 11px;
  background: #edf4f7;
  color: #3f718d;
}

.catalog-heading-note-icon :deep(svg) {
  width: 17px;
  height: 17px;
}

.product-card {
  flex: 0 0 calc((100% - 36px) / 3);
}

@media (max-width: 980px) {
  .catalog-section .catalog-heading {
    grid-template-columns: minmax(0, 1fr) minmax(220px, 0.62fr);
    gap: 20px;
    margin-bottom: 19px;
    text-align: left;
  }

  .catalog-section .catalog-heading h2 {
    font-size: clamp(1.9rem, 4.2vw, 2.65rem);
  }

  .catalog-section .catalog-heading-note {
    margin: 0 0 0 auto;
    border-top: 1px solid #d9e5eb;
    border-left: 3px solid #4c7f9b;
    padding: 13px 14px;
    text-align: left;
  }

  .product-carousel {
    gap: 16px;
  }

  .product-card {
    flex: 0 0 calc((100% - 32px) / 3);
  }

  .product-detail {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: 25px;
  }

  .product-main-photo {
    min-height: 300px;
  }

  .product-detail-copy h3 {
    font-size: clamp(1.7rem, 3.5vw, 2.2rem);
  }
}

@media (max-width: 700px) {
  .selected-category-heading {
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 0;
    margin-bottom: 13px;
    padding-bottom: 13px;
    text-align: left;
  }

  .catalog-section .catalog-heading {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
    margin-bottom: 18px;
    text-align: left;
  }

  .catalog-section .catalog-heading h2 {
    font-size: clamp(1.75rem, 8vw, 2.25rem);
    line-height: 1.02;
  }

  .catalog-section .catalog-heading-note {
    max-width: none;
    align-items: center;
    gap: 10px;
    margin: 0;
    border-top: 0;
    border-left-width: 2px;
    padding: 11px 12px;
    font-size: 0.69rem;
    text-align: left;
  }

  .catalog-heading-note-icon {
    width: 31px;
    height: 31px;
    border-radius: 9px;
  }

  .selected-category-heading .product-back-link {
    grid-column: auto;
    margin: 0 0 10px;
  }

  .selected-category-heading h3 {
    font-size: clamp(1.4rem, 6.5vw, 1.65rem);
  }

  .selected-category-heading > div > p:last-child {
    font-size: 0.7rem;
  }

  .selected-category-meta {
    justify-content: space-between;
    gap: 10px;
    margin-top: 12px;
  }

  .category-product-count {
    padding: 7px 9px;
    font-size: 0.6rem;
  }

  .product-carousel-controls {
    gap: 6px;
  }

  .product-carousel-arrow {
    width: 35px;
    height: 35px;
    border-radius: 11px;
  }

  .product-carousel-stage {
    border-radius: 19px;
    padding: 4px;
  }

  .product-carousel {
    gap: 13px;
    padding: 7px 6px 10px;
  }

  .product-card {
    flex-basis: min(86%, 380px);
    grid-template-columns: 1fr;
    grid-template-rows: 190px minmax(144px, auto);
    border-radius: 16px;
  }

  .product-card-image {
    min-height: 0;
  }

  .product-card-image img {
    padding: 16px 20px;
  }

  .product-card-copy {
    min-height: 0;
    padding: 15px 14px;
  }

  .product-card-copy h4 {
    font-size: 0.88rem;
  }

  .product-card-copy p {
    margin-block: 6px 9px;
    font-size: 0.63rem;
  }

  .product-detail {
    grid-template-columns: 1fr;
    gap: 18px;
    border-radius: 16px;
    padding: 13px;
  }

  .product-gallery {
    gap: 9px;
  }

  .product-main-photo {
    min-height: clamp(230px, 69vw, 345px);
    border-radius: 12px;
  }

  .product-main-photo img {
    max-height: 350px;
    padding: 18px;
  }

  .product-thumbnails {
    gap: 8px;
  }

  .product-thumbnail {
    height: clamp(68px, 21vw, 92px);
    border-radius: 9px;
  }

  .product-detail-copy {
    padding: 0 5px 7px;
    text-align: center;
  }

  .product-back-link {
    margin-bottom: 16px;
  }

  .product-detail-copy .section-eyebrow {
    margin-inline: auto;
    justify-content: center;
    margin-bottom: 8px;
  }

  .product-detail-copy h3 {
    font-size: clamp(1.65rem, 7.5vw, 2.1rem);
  }

  .product-description {
    font-size: 0.75rem;
  }

  .product-detail-spec {
    text-align: left;
  }

  .product-detail-note {
    border-top: 1px solid #dce4ea;
    border-left: 0;
    padding: 11px 0 0;
    font-size: 0.64rem;
  }

  .product-detail-copy .category-detail-actions {
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .product-detail-copy .lenses-button {
    width: 100%;
    justify-content: center;
  }

  .product-detail-copy .explore-link {
    min-height: 40px;
    padding: 9px 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-card-image img,
  .product-card-copy > strong :deep(svg),
  .product-thumbnail,
  .product-back-link {
    transition: none;
  }
}
</style>
