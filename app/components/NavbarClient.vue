<script setup lang="ts">
import AppLogo from './AppLogo.vue'

const route = useRoute()
const menuOpen = ref(false)

const links = [
  { label: 'Inicio', to: '/', icon: 'i-lucide-house' },
  { label: 'Nosotros', to: '/nosotros', icon: 'i-lucide-users-round' },
  { label: 'Lentes', to: '/lentes', icon: 'i-lucide-glasses' },
  { label: 'Empresas', to: '/empresas', icon: 'i-lucide-building-2' },
  { label: 'Contacto', to: '/contacto', icon: 'i-lucide-map-pinned' }
]

watch(() => route.path, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink
        class="brand"
        to="/"
        aria-label="Clínica Óptica, inicio"
        @click="menuOpen = false"
      >
        <AppLogo />
      </NuxtLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="menuOpen = !menuOpen"
      >
        <UIcon
          :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          aria-hidden="true"
        />
      </button>

      <nav
        id="primary-navigation"
        class="primary-navigation"
        :class="{ 'navigation-open': menuOpen }"
        aria-label="Navegación principal"
      >
        <p class="navigation-heading">
          Explora la clínica
        </p>
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="{ 'nav-active': route.path === link.to || (link.to === '/lentes' && route.path === '/servicios') }"
        >
          <span class="nav-link-icon">
            <UIcon
              :name="link.icon"
              aria-hidden="true"
            />
          </span>
          <span>{{ link.label }}</span>
          <UIcon
            class="nav-link-arrow"
            name="i-lucide-arrow-up-right"
            aria-hidden="true"
          />
        </NuxtLink>

        <a
          class="header-whatsapp"
          href="https://wa.me/529211371704"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UIcon
            name="i-simple-icons-whatsapp"
            aria-hidden="true"
          />
          <span>WhatsApp</span>
          <small>Atención directa</small>
          <UIcon
            class="whatsapp-arrow"
            name="i-lucide-arrow-up-right"
            aria-hidden="true"
          />
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 1px solid #edf0f2;
  background: rgb(255 255 255 / 97%);
}

.site-header::before {
  display: none;
}

.header-inner {
  display: flex;
  width: min(1200px, calc(100% - 56px));
  min-height: 62px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-inline: auto;
}

.brand {
  display: flex;
  width: clamp(170px, 25vw, 228px);
  flex: 0 1 auto;
  align-items: center;
}

.brand:focus-visible,
.menu-toggle:focus-visible,
.primary-navigation a:focus-visible {
  outline: 3px solid rgb(201 150 56 / 45%);
  outline-offset: 3px;
}

.primary-navigation {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.3vw, 32px);
}

.navigation-heading {
  display: none;
}

.primary-navigation > a:not(.header-whatsapp) {
  position: relative;
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  color: #253c55;
  font-size: 0.78rem;
  font-weight: 550;
  text-decoration: none;
  transition: color 160ms ease;
}

.primary-navigation > a:not(.header-whatsapp)::after {
  position: absolute;
  right: 0;
  bottom: 2px;
  left: 0;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  background: #c99638;
  content: '';
  transition: transform 160ms ease;
}

.nav-link-icon {
  display: none;
}

.nav-link-arrow {
  display: none;
}

.primary-navigation > a:not(.header-whatsapp):hover {
  color: #0c2745;
}

.primary-navigation > a.nav-active {
  color: #0c2745;
}

.primary-navigation > a.nav-active::after,
.primary-navigation > a:not(.header-whatsapp):hover::after {
  transform: scaleX(1);
}

.header-whatsapp {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid #63be8b;
  border-radius: 6px;
  padding: 7px 15px;
  color: #178d50;
  font-size: 0.77rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 160ms ease;
}

.header-whatsapp:hover {
  background: #effaf4;
}

.header-whatsapp > :deep(.iconify:first-child) {
  width: 16px;
  height: 16px;
}

.header-whatsapp small,
.whatsapp-arrow {
  display: none;
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e5e9;
  border-radius: 6px;
  background: white;
  color: #102b4a;
  font-size: 1.35rem;
  cursor: pointer;
}

@media (max-width: 760px) {
  .site-header {
    z-index: 20;
    box-shadow: 0 5px 20px rgb(16 43 74 / 4%);
    backdrop-filter: blur(16px);
  }

  .site-header::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: block;
    height: 2px;
    background: linear-gradient(90deg, #c99638 0%, #e4d0a4 42%, #244c73 100%);
    content: '';
  }

  .header-inner {
    position: relative;
    width: calc(100% - 36px);
    min-height: 58px;
    gap: 12px;
  }

  .brand {
    width: clamp(150px, 32vw, 205px);
  }

  .menu-toggle {
    display: inline-flex;
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    border-color: #dbe4eb;
    border-radius: 13px;
    background: linear-gradient(145deg, #fff, #f0f4f7);
    box-shadow: 0 4px 12px rgb(16 43 74 / 7%);
    font-size: 1.3rem;
    transition: border-color 160ms ease, color 160ms ease, transform 160ms ease;
  }

  .menu-toggle:hover {
    transform: translateY(-1px);
    border-color: #c99638;
    color: #244c73;
  }

  .primary-navigation {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    display: none;
    width: min(390px, 100%);
    align-items: stretch;
    flex-direction: column;
    gap: 5px;
    border: 1px solid #dfe6eb;
    border-radius: 19px;
    padding: 13px;
    background: rgb(255 255 255 / 98%);
    box-shadow: 0 20px 48px rgb(16 43 74 / 19%);
    backdrop-filter: blur(18px);
  }

  .primary-navigation > a:not(.header-whatsapp)::after {
    display: none;
  }

  .primary-navigation.navigation-open {
    display: flex;
  }

  .navigation-heading {
    display: block;
    margin: 0;
    padding: 5px 9px 9px;
    color: #7b8b9a;
    font-size: 0.61rem;
    font-weight: 850;
    letter-spacing: 0.13em;
    text-align: left;
    text-transform: uppercase;
  }

  .primary-navigation > a:not(.header-whatsapp) {
    display: grid;
    min-height: 50px;
    grid-template-columns: 36px minmax(0, 1fr) 18px;
    justify-content: stretch;
    gap: 10px;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 5px 10px;
    text-align: left;
  }

  .nav-link-icon {
    display: grid;
    place-items: center;
  }

  .nav-link-arrow {
    display: block;
    width: 13px;
    height: 13px;
    margin-left: auto;
    color: #7890a4;
    opacity: 1;
    transform: none;
  }

  .nav-link-icon {
    width: 34px;
    height: 34px;
    justify-self: center;
    border: 1px solid #e1e8ed;
    border-radius: 10px;
    background: #f5f8fa;
  }

  .nav-link-icon :deep(.iconify) {
    display: block;
    width: 17px;
    height: 17px;
  }

  .primary-navigation > a:not(.header-whatsapp):hover {
    border-color: #e2e9ee;
    background: #f7f9fa;
  }

  .primary-navigation > a.nav-active {
    border-color: #d7e1e9;
    background: linear-gradient(100deg, #edf3f7, #fff);
    box-shadow: inset 3px 0 #c99638;
    color: #102b4a;
  }

  .primary-navigation > a.nav-active .nav-link-icon {
    border-color: #244c73;
    background: #244c73;
    color: #fff;
  }

  .primary-navigation > a.nav-active .nav-link-arrow {
    color: #244c73;
  }

  .header-whatsapp {
    display: grid;
    min-height: 58px;
    grid-template-columns: 26px minmax(0, 1fr) 18px;
    justify-content: stretch;
    gap: 0 10px;
    margin: 7px 0 0;
    border-color: #c5e2d0;
    border-radius: 13px;
    padding: 8px 12px;
    text-align: left;
  }

  .header-whatsapp > :deep(.iconify:first-child) {
    width: 22px;
    height: 22px;
    place-self: center;
    grid-row: span 2;
  }

  .header-whatsapp span {
    align-self: end;
  }

  .header-whatsapp small {
    display: block;
    grid-column: 2;
    align-self: start;
    margin-top: 2px;
    color: #527765;
    font-size: 0.65rem;
    font-weight: 550;
  }

  .whatsapp-arrow {
    display: block;
    width: 16px;
    height: 16px;
    grid-column: 3;
    grid-row: 1 / 3;
    align-self: center;
    margin-left: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .primary-navigation a,
  .primary-navigation a::after,
  .menu-toggle,
  .nav-link-icon,
  .nav-link-arrow,
  .header-whatsapp {
    transition: none;
  }
}
</style>
