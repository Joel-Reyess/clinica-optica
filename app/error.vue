<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const noEncontrada = computed(() => props.error.statusCode === 404)

useHead({ title: noEncontrada.value ? 'Página no encontrada | Clínica Óptica' : 'Algo salió mal | Clínica Óptica' })

function volver() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <UApp>
    <main class="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 class="text-3xl font-semibold">
        {{ noEncontrada ? 'No encontramos esta página' : 'Algo salió mal' }}
      </h1>
      <p>
        {{ noEncontrada ? 'Puede que el enlace haya cambiado.' : 'Intenta de nuevo en unos minutos.' }}
      </p>
      <UButton
        label="Volver al inicio"
        @click="volver"
      />
    </main>
  </UApp>
</template>
