<script setup lang="ts">
import logo from '~/assets/LogoA.svg'
</script>

<template>
  <!-- El archivo trae mucho margen blanco: el viewBox recorta al dibujo real -->
  <svg
    class="brand-logo"
    viewBox="230 30 1160 730"
    role="img"
    aria-label="Clínica Óptica, expertos en salud visual"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      :href="logo"
      width="1536"
      height="778"
    />
  </svg>
</template>
