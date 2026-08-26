<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Agenda tu cita',
    to: '/docs/getting-started',
    icon: 'i-lucide-calendar'
  },
  {
    label: 'Quiero unos',
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

    <UPageHero title="Bienvenido a Clinica Óptica" description="Lentes para verte mejor y cuidar tu salud visual
    Explora nuestra amplia gama de productos y servicios para encontrar la solución perfecta para tus necesidades"
      headline="" orientation="horizontal" reverse :links="links">
      <img src="../assets/fondo1.svg" alt="Clinica Óptica" class="w-full" />
    </UPageHero>

    <UBanner
      title="Checate esto"
      description="Encuentra tu lente ideal"
      :ui="{
        icon: 'size-11',
        title: 'text-lg font-semibold',
      }"
      align="center"
      color="secondary"
      padding="pb-8"
    />
   
    <USeparator class="my-8" />

    <UCarousel v-slot="{ item }" loop arrows :autoplay="{ delay: 2000 }" wheel-gestures :prev="{ variant: 'solid' }"
      :next="{ variant: 'solid' }" :items="items" :ui="{
        item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5',
        prev: 'sm:start-4',
        next: 'sm:end-4',
        container: 'ms-4'
      }">
      <img :src="item" width="320" height="320">
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
  </div>
</template>
