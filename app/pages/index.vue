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

const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
</script>

<template>
  <div>
    <UPageHero class="bg-[url(../../assets/FondoPrincipal.jpg)]" title="Bienvenido a Clinica Óptica" description="Lentes para verte mejor y cuidar tu salud visual
    Explora nuestra amplia gama de productos y servicios para encontrar la solución perfecta para tus necesidades"
      headline="" orientation="horizontal" reverse :links="links">
    </UPageHero>


    <USeparator class="my-8" />


    <UCard variant="subtle">
      <template class="text-3xl sm:text-6xl font-bold text-center justify-center items-center align-center-safe">
        <div class="flex justify-center pb-8">
          <h1 class="text-3xl font-bold">¿Cómo podemos ayudarte?</h1>
        </div>
      </template>

      <Placeholder class="h-32" />
      <template class="flex justify-center-safe selt-center items-center flex-wrap gap-4 sm:gap-8 p-4 w-full">
        <UPageCard title="Campañas visuales para empresas" description="Llevamos la atención visual a tu equipo."
          icon="i-lucide-building-2">
          <UButton label="Solicitar campaña" variant="solid" color="primary" />
        </UPageCard>
        <UPageCard title="Agenda tu cita" description="Eliga el día y horario que prefieres." icon="i-lucide-calendar">
          <UButton label="Solicitar cita" variant="solid" color="primary" />
        </UPageCard>
        <UPageCard title="Resolvemos tus dudas" description="Servicios convenios y formas de pago."
          icon="i-lucide-messages-circle">
          <UButton label="Solicitar campaña" variant="solid" color="primary" />
        </UPageCard>
        <UPageCard title="Lentes con tu graduación" description="Elige tu armazón y comparte tu receta."
          icon="i-lucide-glasses">
          <UButton label="Solicitar campaña" variant="solid" color="primary" />
        </UPageCard>

      </template>
    </UCard>

    <template class="text-3xl sm:text-6xl font-bold text-center justify-center items-center align-center-safe">
        <div class="flex justify-center pb-8">
          <h1 class="text-3xl font-bold">Encuentra tus proximos lentes</h1>
        </div>
      </template>

    <UCarousel v-slot="{ item }" loop arrows :autoplay="{ delay: 2000 }" wheel-gestures :prev="{ variant: 'solid' }"
      :next="{ variant: 'solid' }" :items="items" :ui="{
        item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5',
        prev: 'sm:start-4',
        next: 'sm:end-4',
        container: 'ms-4'
      }">
      <img :src="item" width="320" height="320">
      <template class="footer">
        <div class="flex justify-between items-center w-full">
          <div class="font-semibold">
            $99.99
          </div>

          <UButton size="sm">
            Add to Cart
          </UButton>
        </div>
      </template>
    </UCarousel>

    <USeparator class="my-8" />
    <UMarquee :overlay="false">
      <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
      <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
    </UMarquee>

    <Footer />
  </div>
</template>
