<script setup lang="ts">
const route = useRoute()

const enlaces = [
  { to: '/admin', label: 'Solicitudes', icon: 'i-lucide-inbox' },
  { to: '/admin?tipo=cita', label: 'Citas', icon: 'i-lucide-calendar-days' },
  { to: '/admin/horarios', label: 'Horarios de citas', icon: 'i-lucide-clock-3' },
  { to: '/admin/convenios', label: 'Convenios', icon: 'i-lucide-handshake' },
  { to: '/admin/catalogo', label: 'Catálogo', icon: 'i-lucide-glasses' },
  { to: '/admin/marcas', label: 'Marcas', icon: 'i-lucide-tag' },
  { to: '/admin/textos', label: 'Textos y horarios', icon: 'i-lucide-type' }
]

async function salir() {
  await $fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="shell">
    <header class="shell-top">
      <strong>Clínica Óptica · Panel</strong>
      <nav aria-label="Panel">
        <NuxtLink
          v-for="e in enlaces"
          :key="e.to"
          :to="e.to"
          :class="{ activo: route.fullPath === e.to }"
        >
          <UIcon
            :name="e.icon"
            aria-hidden="true"
          />
          {{ e.label }}
        </NuxtLink>
      </nav>
      <button
        type="button"
        class="salir"
        @click="salir"
      >
        Cerrar sesión
      </button>
    </header>
    <main class="shell-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  background: #f4f6f9;
  color: #102b4a;
}

.shell-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background: #102b4a;
  color: #fff;
}

.shell-top nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-right: auto;
}

.shell-top a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  color: #cfe0f3;
  text-decoration: none;
}

.shell-top a.activo,
.shell-top a:hover {
  background: rgb(255 255 255 / 14%);
  color: #fff;
}

.salir {
  padding: 8px 12px;
  border: 1px solid rgb(255 255 255 / 40%);
  border-radius: 8px;
  background: none;
  color: #fff;
  cursor: pointer;
}

.shell-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
</style>
