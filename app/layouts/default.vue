<script setup lang="ts">
// Aviso o promoción editable desde el panel (si está vacío, no se muestra)
const { data: textos } = await useFetch<Record<string, string>>('/api/textos')
</script>

<template>
  <div>
    <p
      v-if="textos?.aviso_promocion"
      class="aviso-promo"
      role="status"
    >
      {{ textos.aviso_promocion }}
    </p>
    <NavbarClient />
    <slot />
    <FooterClient />
  </div>
</template>

<style scoped>
.aviso-promo {
  margin: 0;
  padding: 8px 16px;
  background: #102b4a;
  color: #fff;
  font-size: 0.92rem;
  text-align: center;
}
</style>
