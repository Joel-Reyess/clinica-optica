<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import NavbarClient from './components/NavbarClient.vue'
import FooterClient from './components/FooterClient.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
let revealObserver: IntersectionObserver | undefined

function observePageSections() {
  revealObserver?.disconnect()
  revealObserver = undefined

  if (isAdminRoute.value || !import.meta.client) return

  const sections = document.querySelectorAll<HTMLElement>('main > section:not(:first-child)')
  if (!sections.length) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return

  revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue

      entry.target.classList.add('is-revealed')
      observer.unobserve(entry.target)
    }
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  })

  sections.forEach((section) => {
    section.classList.remove('is-revealed')
    section.classList.add('scroll-reveal')
    revealObserver?.observe(section)
  })
}

onMounted(observePageSections)

watch(() => route.path, async () => {
  await nextTick()
  observePageSections()
}, { flush: 'post' })

onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <UApp>
    <NavbarClient v-if="!isAdminRoute" />
    <NuxtPage />
    <FooterClient v-if="!isAdminRoute" />
  </UApp>
</template>
