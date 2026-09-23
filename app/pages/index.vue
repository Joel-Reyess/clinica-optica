<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { PageFeatureProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Agendar Evaluación',
    to: '/docs/getting-started',
    icon: 'i-lucide-arrow-right'
  },
  {
    label: 'Ver armazones',
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-glasses'
  }
])

</script>

<template>
  <div>
    <UPageHero class="bg-[url(../../assets/FondoPrincipal.jpg)]" w-full h-full title="Bienvenido a Clinica Óptica"
      description="Lentes para verte mejor y cuidar tu salud visual
    Explora nuestra amplia gama de productos y servicios para encontrar la solución perfecta para tus necesidades"
      headline="" orientation="horizontal" reverse :links="links">
    </UPageHero>

    <USeparator class="my-8" />

    <UCard variant="subtle">
        <div class="flex justify-center pb-4">
          <h1 class="text-3xl font-bold">¿Cómo podemos ayudarte?</h1>
        </div>

      <UPageGrid class="flex justify-center-safe selt-center items-center flex-wrap gap-4 sm:gap-8 p-4 ">
        <UPageCard title="Campañas visuales para empresas" description="Llevamos la atención visual a tu equipo."
          icon="i-lucide-building-2">
          <UButton label="Solicitar campaña" variant="solid" color="primary" />
        </UPageCard>
        <UPageCard title="Agenda tu cita" description="Eliga el día y horario que prefieres." icon="i-lucide-calendar">
          <UButton label="Solicitar cita" variant="solid" color="primary" />
        </UPageCard>
        <UPageCard title="Resolvemos tus dudas" description="Servicios convenios y formas de pago."
          icon="i-lucide-messages-circle">
          <UButton label="Pedir información" variant="solid" color="primary" />
        </UPageCard>
        <UPageCard title="Lentes con tu graduación" description="Elige tu armazón y comparte tu receta."
          icon="i-lucide-glasses">
          <UButton label="Cotizar mis lentes" variant="solid" color="primary" />
        </UPageCard>
      </UPageGrid>
    </UCard>

      <div class="flex justify-center pb-8 pt-8">
        <h1 class="text-3xl font-bold">Encuentra tus proximos lentes</h1>
      </div>
    <UCard variant="subtle">
      <UPageGrid class="flex justify-center-safe selt-center items-center flex-wrap gap-4 sm:gap-8 p-4 ">
        <UPageCard title="Clásicos">
          <img src="../assets/Clasicos.jpg" class="w-xs h-62" />
          <UButton label="Cotizar mi graduación" variant="solid" color="primary" />
        </UPageCard>
        <UPageCard title="Modernos">
            <img src="../assets/Modernos.jpg" class="w-xs h-62 object-cover" />
          <UButton label="Cotizar mi graduación" variant="solid" color="primary" />
        </UPageCard>
        <UPageCard title="Resolvemos tus dudas">
          <img src="../assets/Seguridad.jpeg" class="w-xs h-62 object-cover" />
          <UButton label="Cotizar mi graduación" variant="solid" color="primary" />
        </UPageCard>
      </UPageGrid>
    </UCard>
    
    <USeparator class="my-8" />

  <UPageGrid class="flex justify-center-safe selt-center items-center flex-wrap gap-4 sm:gap-8 p-4">
    <UCard
    title="Introducing Nuxt Icon v1"
    description="Discover Nuxt Icon v1 - a modern, versatile, and customizable icon solution for your Nuxt projects.">
    <UButton label="Read more" variant="solid" color="primary" />
    </UCard>
    <UCard
    title="Introducing Nuxt Icon v1"
    description="Discover Nuxt Icon v1 - a modern, versatile, and customizable icon solution for your Nuxt projects.">
    <UButton label="Read more" variant="solid" color="primary" />
    </UCard>
  </UPageGrid>
    <Footer />
  </div>
</template>
