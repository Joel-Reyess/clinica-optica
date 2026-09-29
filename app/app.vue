<script setup lang="ts">
import NavbarClient from './components/NavbarClient.vue'
import FooterClient from './components/FooterClient.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <UApp>
    <NavbarClient v-if="!isAdminRoute" />
    <NuxtPage />
    <FooterClient v-if="!isAdminRoute" />
  </UApp>
</template>
