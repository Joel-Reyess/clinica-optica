<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import RouterConfig from './router.options.ts'
</script>
<template>
  <UApp>
    <Navbar/>
    <router-view />
  </UApp>
</template>