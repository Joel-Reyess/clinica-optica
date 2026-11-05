<script setup lang="ts">
useHead({
  title: 'Aviso de privacidad | Clínica Óptica',
  meta: [{ name: 'robots', content: 'noindex' }]
})
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-16">
    <h1 class="mb-6 text-3xl font-semibold">
      Aviso de privacidad
    </h1>
    <!-- TODO(cliente): sustituir por el texto legal definitivo (responsable, datos que se recaban, finalidades, derechos ARCO, contacto). -->
    <p class="mb-4">
      Clínica Óptica recibe tus datos de contacto (nombre, teléfono, correo y, si la envías, tu receta)
      únicamente para atender tu solicitud y darle seguimiento.
    </p>
    <p class="mb-4">
      No compartimos tu información con terceros ajenos a la atención de tu solicitud.
      Las recetas se guardan de forma privada y solo las consulta el personal autorizado.
    </p>
    <p>
      El texto legal completo está pendiente de confirmar con la clínica.
    </p>
  </main>
</template>
