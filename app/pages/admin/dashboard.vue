<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

useHead({
  title: 'Panel de administración | Clínica Óptica',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    },
    {
      name: 'description',
      content: 'Panel de gestión administrativa de Clínica Óptica.'
    }
  ]
})

const navigation = [
  {
    label: 'Home',
    to: '/admin',
    icon: 'i-lucide-house',
    key: 'home'
  },
  {
    label: 'Clientes',
    to: '/admin/clientes',
    icon: 'i-lucide-users-round',
    key: 'clientes'
  },
  {
    label: 'Campañas',
    to: '/admin/campanas',
    icon: 'i-lucide-megaphone',
    key: 'campanas'
  },
  {
    label: 'Convenios',
    to: '/admin/convenios',
    icon: 'i-lucide-handshake',
    key: 'convenios'
  }
] as const

const sectionContent = {
  '/admin': {
    key: 'home',
    eyebrow: 'RESUMEN GENERAL',
    title: 'Panel de control',
    description: 'Una vista clara de la gestión de tu clínica, en un solo lugar.'
  },
  '/admin/clientes': {
    key: 'clientes',
    eyebrow: 'RELACIÓN CON PACIENTES',
    title: 'Clientes',
    description: 'Consulta y organiza la información de tus clientes.'
  },
  '/admin/campanas': {
    key: 'campanas',
    eyebrow: 'COMUNICACIÓN Y DIFUSIÓN',
    title: 'Campañas',
    description: 'Administra las campañas y promociones de Clínica Óptica.'
  },
  '/admin/convenios': {
    key: 'convenios',
    eyebrow: 'ALIANZAS ESTRATÉGICAS',
    title: 'Convenios',
    description: 'Da seguimiento a las empresas y organizaciones afiliadas.'
  }
} as const

const activeSection = computed(() => sectionContent[route.path as keyof typeof sectionContent] ?? sectionContent['/admin'])

const emptyStateContent = computed(() => {
  switch (activeSection.value.key) {
    case 'clientes':
      return {
        icon: 'i-lucide-users-round',
        title: 'Tu directorio está listo para comenzar',
        description: 'Cuando se conecte la gestión de clientes, aquí podrás consultar y organizar sus registros.'
      }
    case 'campanas':
      return {
        icon: 'i-lucide-megaphone',
        title: 'Aquí aparecerán tus campañas',
        description: 'Podrás revisar promociones, fechas y el estado de cada campaña desde este espacio.'
      }
    case 'convenios':
      return {
        icon: 'i-lucide-handshake',
        title: 'Gestiona tus alianzas desde aquí',
        description: 'En esta sección podrás consultar convenios y dar seguimiento a tus organizaciones afiliadas.'
      }
    default:
      return {
        icon: 'i-lucide-inbox',
        title: 'Aún no hay actividad para mostrar',
        description: 'Cuando se conecten los módulos de administración, aquí verás las novedades de tu clínica.'
      }
  }
})

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <main class="admin-shell">
    <button
      v-if="mobileMenuOpen"
      class="sidebar-scrim"
      type="button"
      aria-label="Cerrar menú"
      @click="closeMobileMenu"
    />

    <aside
      class="admin-sidebar"
      :class="{ 'is-open': mobileMenuOpen }"
      aria-label="Navegación de administración"
    >
      <NuxtLink
        class="admin-brand"
        to="/admin"
        aria-label="Clínica Óptica, ir a Home"
        @click="closeMobileMenu"
      >
        <span class="brand-symbol">
          <UIcon
            name="i-lucide-eye"
            aria-hidden="true"
          />
        </span>
        <span class="brand-copy">
          <strong>CLÍNICA ÓPTICA</strong>
          <small>PORTAL DE ADMINISTRACIÓN</small>
        </span>
      </NuxtLink>

      <div class="sidebar-profile">
        <span class="profile-avatar">AD</span>
        <span class="profile-copy">
          <strong>Administrador</strong>
          <small>Panel de gestión</small>
        </span>
        <span
          class="profile-status"
          aria-label="Estado de demostración"
        />
      </div>

      <div class="sidebar-divider" />

      <p class="sidebar-label">
        MENÚ PRINCIPAL
      </p>
      <nav class="primary-navigation">
        <NuxtLink
          v-for="item in navigation"
          :key="item.key"
          class="navigation-link"
          :class="{ 'is-active': activeSection.key === item.key }"
          :to="item.to"
          :aria-current="activeSection.key === item.key ? 'page' : undefined"
          @click="closeMobileMenu"
        >
          <span class="navigation-icon">
            <UIcon
              :name="item.icon"
              aria-hidden="true"
            />
          </span>
          <span>{{ item.label }}</span>
          <UIcon
            v-if="activeSection.key === item.key"
            class="navigation-arrow"
            name="i-lucide-chevron-right"
            aria-hidden="true"
          />
        </NuxtLink>
      </nav>

      <div class="sidebar-spacer" />

      <div class="sidebar-help">
        <span class="help-icon">
          <UIcon
            name="i-lucide-headset"
            aria-hidden="true"
          />
        </span>
        <div>
          <strong>¿Necesitas ayuda?</strong>
          <span>Estamos para apoyarte</span>
        </div>
        <UIcon
          class="help-arrow"
          name="i-lucide-arrow-up-right"
          aria-hidden="true"
        />
      </div>

      <NuxtLink
        class="logout-link"
        to="/admin/login"
        @click="closeMobileMenu"
      >
        <UIcon
          name="i-lucide-log-out"
          aria-hidden="true"
        />
        <span>Cerrar sesión</span>
      </NuxtLink>
    </aside>

    <section class="admin-workspace">
      <header class="topbar">
        <div class="topbar-context">
          <span class="context-mark" />
          <span>Clínica Óptica</span>
          <UIcon
            name="i-lucide-chevron-right"
            aria-hidden="true"
          />
          <strong>{{ activeSection.title }}</strong>
        </div>

        <div class="topbar-actions">
          <span class="prototype-badge">
            <span />
            Vista previa
          </span>
          <span class="topbar-divider" />
          <span
            class="topbar-avatar"
            aria-hidden="true"
          >AD</span>
          <button
            class="mobile-menu-toggle"
            type="button"
            :aria-expanded="mobileMenuOpen"
            :aria-label="mobileMenuOpen ? 'Cerrar menú de administración' : 'Abrir menú de administración'"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <UIcon
              :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      <div class="admin-content">
        <div class="page-heading">
          <div>
            <p class="page-eyebrow">
              {{ activeSection.eyebrow }}
            </p>
            <h1>{{ activeSection.title }}</h1>
            <p class="page-description">
              {{ activeSection.description }}
            </p>
          </div>
          <div class="heading-date">
            <span class="date-icon">
              <UIcon
                name="i-lucide-calendar-days"
                aria-hidden="true"
              />
            </span>
            <span>
              <strong>Tu espacio de trabajo</strong>
              <small>Clínica Óptica · Coatzacoalcos</small>
            </span>
          </div>
        </div>

        <template v-if="activeSection.key === 'home'">
          <section class="welcome-banner">
            <div class="welcome-copy">
              <span class="welcome-label">
                <UIcon
                  name="i-lucide-sparkles"
                  aria-hidden="true"
                />
                TODO EN UN SOLO LUGAR
              </span>
              <h2>Una mejor visión, también para tu gestión.</h2>
              <p>
                Administra las áreas clave de tu clínica con una experiencia clara, ordenada y sencilla.
              </p>
              <NuxtLink
                class="welcome-link"
                to="/admin/clientes"
              >
                Explorar clientes
                <UIcon
                  name="i-lucide-arrow-right"
                  aria-hidden="true"
                />
              </NuxtLink>
            </div>
            <div
              class="welcome-visual"
              aria-hidden="true"
            >
              <span class="visual-ring ring-one" />
              <span class="visual-ring ring-two" />
              <span class="visual-ring ring-three" />
              <span class="visual-eye">
                <UIcon name="i-lucide-eye" />
              </span>
              <span class="visual-orbit-dot" />
              <span class="visual-sparkle">✦</span>
              <span class="visual-place">
                <UIcon
                  name="i-lucide-map-pin"
                  aria-hidden="true"
                />
                <span>
                  <strong>Coatzacoalcos</strong>
                  <small>Salud visual con cercanía</small>
                </span>
              </span>
            </div>
            <span
              class="banner-number"
              aria-hidden="true"
            >01</span>
          </section>

          <div class="section-heading">
            <div>
              <p class="section-eyebrow">
                ACCESOS DIRECTOS
              </p>
              <h2>Gestión de tu clínica</h2>
            </div>
            <span class="section-caption">
              Selecciona un módulo para comenzar
            </span>
          </div>

          <section
            class="module-grid"
            aria-label="Módulos de administración"
          >
            <NuxtLink
              v-for="(item, index) in navigation.slice(1)"
              :key="item.key"
              class="module-card"
              :to="item.to"
            >
              <span
                class="module-icon"
                :class="`module-icon-${item.key}`"
              >
                <UIcon
                  :name="item.icon"
                  aria-hidden="true"
                />
              </span>
              <span class="module-card-copy">
                <span class="module-number">0{{ index + 1 }} · MÓDULO</span>
                <strong>{{ item.label }}</strong>
                <small>
                  {{ item.key === 'clientes' ? 'Consulta y organiza tu directorio' : item.key === 'campanas' ? 'Gestiona promociones y campañas' : 'Da seguimiento a tus alianzas' }}
                </small>
                <span class="module-open-label">ABRIR MÓDULO</span>
              </span>
              <span class="module-arrow">
                <UIcon
                  name="i-lucide-arrow-up-right"
                  aria-hidden="true"
                />
              </span>
            </NuxtLink>
          </section>

          <section class="activity-card">
            <div class="activity-heading">
              <span class="activity-icon">
                <UIcon
                  name="i-lucide-activity"
                  aria-hidden="true"
                />
              </span>
              <div>
                <h2>Actividad reciente</h2>
                <p>Un resumen de los movimientos de tu clínica</p>
              </div>
              <span class="activity-period">ÚLTIMOS MOVIMIENTOS</span>
            </div>
            <div class="activity-empty">
              <span class="empty-icon">
                <UIcon
                  name="i-lucide-inbox"
                  aria-hidden="true"
                />
              </span>
              <div>
                <strong>Aún no hay actividad para mostrar</strong>
                <p>Las novedades aparecerán aquí cuando se conecten los módulos de gestión.</p>
              </div>
            </div>
          </section>
        </template>

        <section
          v-else
          class="module-empty-card"
        >
          <div
            class="empty-art"
            aria-hidden="true"
          >
            <span class="empty-art-ring" />
            <span class="empty-art-icon">
              <UIcon
                :name="emptyStateContent.icon"
                aria-hidden="true"
              />
            </span>
            <span class="empty-art-sparkle sparkle-a">✦</span>
            <span class="empty-art-sparkle sparkle-b">✧</span>
          </div>
          <span class="empty-status">
            <span />
            MÓDULO EN PREPARACIÓN
          </span>
          <h2>{{ emptyStateContent.title }}</h2>
          <p>{{ emptyStateContent.description }}</p>
          <NuxtLink
            class="empty-home-link"
            to="/admin"
          >
            <UIcon
              name="i-lucide-arrow-left"
              aria-hidden="true"
            />
            Volver al Home
          </NuxtLink>
        </section>

        <footer class="workspace-footer">
          <span>© {{ new Date().getFullYear() }} Clínica Óptica</span>
          <span class="footer-divider" />
          <span>Portal de administración</span>
          <span class="footer-version">EXPERTOS EN SALUD VISUAL</span>
        </footer>
      </div>
    </section>
  </main>
</template>

<style scoped>
.admin-shell {
  --admin-navy: #102b4a;
  --admin-navy-deep: #0b2138;
  --admin-blue: #286b91;
  --admin-blue-bright: #4ca4d1;
  --admin-blue-light: #eaf4f8;
  --admin-ink: #17344f;
  --admin-muted: #708193;
  --admin-line: #e6ebee;
  --admin-canvas: #f5f7f8;
  display: flex;
  width: 100%;
  min-height: 100svh;
  background:
    radial-gradient(ellipse at 75% 4%, rgb(223 237 244 / 30%), transparent 34%),
    var(--admin-canvas);
  color: var(--admin-ink);
  font-family: inherit;
}

.admin-sidebar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  width: 268px;
  height: 100svh;
  min-height: 640px;
  flex: 0 0 268px;
  flex-direction: column;
  overflow-y: auto;
  padding: 27px 17px 18px;
  background:
    radial-gradient(ellipse at 3% 0%, rgb(70 145 185 / 19%), transparent 38%),
    linear-gradient(165deg, #112d4a 0%, #0b2138 75%, #0a1e33 100%);
  color: #fff;
  box-shadow: 12px 0 35px rgb(10 33 56 / 8%);
}

.admin-brand {
  display: flex;
  min-height: 51px;
  align-items: center;
  gap: 11px;
  padding: 0 7px;
  color: inherit;
  text-decoration: none;
}

.brand-symbol {
  display: grid;
  width: 41px;
  height: 41px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgb(145 203 231 / 27%);
  border-radius: 14px;
  background: linear-gradient(145deg, rgb(111 190 226 / 21%), rgb(255 255 255 / 5%));
  color: #a8daf1;
  box-shadow: inset 0 1px rgb(255 255 255 / 11%), 0 8px 20px rgb(0 0 0 / 11%);
}

.brand-symbol :deep(svg) {
  width: 23px;
  height: 23px;
}

.brand-copy {
  display: grid;
  min-width: 0;
  gap: 5px;
}

.brand-copy strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 0.94rem;
  letter-spacing: 0.005em;
}

.brand-copy small {
  color: #93adc1;
  font-size: 0.52rem;
  font-weight: 750;
  letter-spacing: 0.13em;
}

.sidebar-divider {
  height: 1px;
  margin: 19px 3px 22px;
  background: linear-gradient(90deg, rgb(177 206 224 / 20%), rgb(177 206 224 / 5%));
}

.sidebar-profile {
  display: flex;
  min-height: 63px;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  border: 1px solid rgb(160 194 216 / 14%);
  border-radius: 13px;
  padding: 9px 10px;
  background: linear-gradient(110deg, rgb(255 255 255 / 7%), rgb(255 255 255 / 3%));
}

.profile-avatar,
.topbar-avatar {
  display: grid;
  width: 37px;
  height: 37px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgb(116 184 216 / 40%);
  border-radius: 50%;
  background: linear-gradient(145deg, #39799e, #214a6b);
  color: #e6f5fc;
  font-size: 0.69rem;
  font-weight: 800;
  box-shadow: inset 0 1px rgb(255 255 255 / 15%);
}

.profile-copy {
  display: grid;
  min-width: 0;
  gap: 4px;
}

.profile-copy strong {
  overflow: hidden;
  color: #e4edf3;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-copy small {
  color: #91a8ba;
  font-size: 0.62rem;
}

.profile-status {
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  margin-left: auto;
  border-radius: 50%;
  background: #7db8d8;
  box-shadow: 0 0 0 4px rgb(125 184 216 / 13%);
}

.sidebar-label,
.section-eyebrow {
  margin: 0;
  color: #85a0b5;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.sidebar-label {
  padding: 0 12px;
}

.primary-navigation {
  display: grid;
  gap: 7px;
  margin-top: 15px;
}

.navigation-link {
  position: relative;
  display: flex;
  min-height: 49px;
  align-items: center;
  gap: 12px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0 12px;
  color: #c0d0dc;
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 160ms ease, background 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.navigation-link:hover {
  transform: translateX(2px);
  background: rgb(255 255 255 / 5%);
  color: #fff;
}

.navigation-link.is-active {
  border-color: rgb(128 192 222 / 17%);
  background: linear-gradient(105deg, rgb(74 145 182 / 29%), rgb(255 255 255 / 5%));
  color: #fff;
  box-shadow: inset 3px 0 #76c4e8, inset 0 1px rgb(255 255 255 / 4%);
}

.navigation-icon {
  display: grid;
  width: 25px;
  height: 25px;
  flex: 0 0 auto;
  place-items: center;
  color: #a6c2d5;
}

.navigation-icon :deep(svg) {
  width: 19px;
  height: 19px;
}

.is-active .navigation-icon {
  color: #9cdbf3;
}

.navigation-arrow {
  width: 15px;
  height: 15px;
  margin-left: auto;
  color: #8cc9e6;
}

.sidebar-spacer {
  min-height: 36px;
  flex: 1 1 auto;
}

.sidebar-help {
  display: flex;
  min-height: 65px;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(160 194 216 / 14%);
  border-radius: 13px;
  padding: 10px;
  background: linear-gradient(110deg, rgb(255 255 255 / 7%), rgb(255 255 255 / 3%));
}

.help-icon {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 11px;
  background: rgb(83 159 197 / 18%);
  color: #a9def4;
}

.help-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.sidebar-help > div {
  display: grid;
  min-width: 0;
  gap: 4px;
}

.sidebar-help strong {
  color: #e5edf3;
  font-size: 0.69rem;
  font-weight: 700;
}

.sidebar-help > div span {
  color: #91a9ba;
  font-size: 0.61rem;
}

.help-arrow {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  margin-left: auto;
  color: #83b8d2;
}

.logout-link {
  display: flex;
  min-height: 45px;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  border-radius: 11px;
  padding: 0 12px;
  color: #b5c6d3;
  font-size: 0.81rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 160ms ease, color 160ms ease;
}

.logout-link:hover {
  background: rgb(236 247 252 / 7%);
  color: #e1f3fc;
}

.logout-link :deep(svg) {
  width: 18px;
  height: 18px;
  color: #8eb4cc;
}

.sidebar-profile {
  margin-bottom: 2px;
}

.admin-workspace {
  min-width: 0;
  min-height: 100svh;
  flex: 1 1 auto;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  height: 72px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid rgb(222 229 233 / 84%);
  padding: 0 clamp(24px, 4vw, 56px);
  background: rgb(255 255 255 / 87%);
  backdrop-filter: blur(18px);
}

.topbar-context {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  color: #8795a2;
  font-size: 0.75rem;
}

.topbar-context > :deep(svg) {
  width: 14px;
  height: 14px;
  color: #a5b0b8;
}

.topbar-context strong {
  overflow: hidden;
  color: #27445e;
  font-size: 0.76rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.context-mark {
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #4d9bc3;
  box-shadow: 0 0 0 4px rgb(77 155 195 / 12%);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 17px;
}

.prototype-badge {
  display: inline-flex;
  min-height: 29px;
  align-items: center;
  gap: 7px;
  border: 1px solid #d5e7ef;
  border-radius: 999px;
  padding: 0 11px;
  background: #f3f9fb;
  color: #52768b;
  font-size: 0.64rem;
  font-weight: 700;
  white-space: nowrap;
}

.prototype-badge > span,
.empty-status > span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #63aaca;
  box-shadow: 0 0 0 3px rgb(99 170 202 / 13%);
}

.topbar-divider {
  width: 1px;
  height: 27px;
  background: #e2e8eb;
}

.topbar-avatar {
  width: 35px;
  height: 35px;
  border-color: #c8e1ed;
  background: linear-gradient(145deg, #e1f1f7, #c7e2ee);
  color: #255574;
  box-shadow: none;
}

.mobile-menu-toggle {
  display: none;
}

.admin-content {
  width: min(100%, 1440px);
  margin-inline: auto;
  padding: 37px clamp(24px, 4vw, 56px) 20px;
}

.page-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 22px;
  margin-bottom: 25px;
}

.page-eyebrow {
  margin: 0 0 8px;
  color: #4084a7;
  font-size: 0.63rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.page-heading h1 {
  margin: 0;
  color: #132f4b;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 3.2vw, 2.65rem);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1.12;
}

.page-description {
  margin: 8px 0 0;
  color: #758595;
  font-size: 0.83rem;
  line-height: 1.55;
}

.heading-date {
  display: flex;
  min-height: 55px;
  align-items: center;
  gap: 10px;
  border: 1px solid #e4ebee;
  border-radius: 13px;
  padding: 8px 13px;
  background: rgb(255 255 255 / 74%);
}

.date-icon {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 10px;
  background: #edf5f8;
  color: #397c9f;
}

.date-icon :deep(svg) {
  width: 17px;
  height: 17px;
}

.heading-date > span:last-child {
  display: grid;
  gap: 4px;
}

.heading-date strong {
  color: #385269;
  font-size: 0.68rem;
}

.heading-date small {
  color: #82919d;
  font-size: 0.62rem;
}

.welcome-banner {
  position: relative;
  display: flex;
  min-height: 246px;
  align-items: center;
  overflow: hidden;
  border: 1px solid rgb(161 204 225 / 37%);
  border-radius: 22px;
  padding: 31px clamp(28px, 4vw, 50px);
  background:
    radial-gradient(ellipse at 75% 48%, rgb(84 156 195 / 30%), transparent 32%),
    radial-gradient(ellipse at 20% 120%, rgb(83 156 195 / 18%), transparent 42%),
    linear-gradient(112deg, #102b4a 0%, #153a5a 56%, #1c5476 100%);
  color: #fff;
  box-shadow: 0 18px 42px rgb(16 43 74 / 12%), inset 0 1px rgb(255 255 255 / 8%);
}

.welcome-banner::before {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px);
  background-size: 36px 36px;
  content: "";
  mask-image: linear-gradient(100deg, #000, transparent 87%);
  pointer-events: none;
}

.welcome-copy {
  position: relative;
  z-index: 2;
  width: min(62%, 620px);
}

.welcome-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #9edaf3;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.welcome-label :deep(svg) {
  width: 14px;
  height: 14px;
}

.welcome-copy h2 {
  max-width: 535px;
  margin: 13px 0 9px;
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.65rem, 2.9vw, 2.35rem);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1.12;
}

.welcome-copy p {
  max-width: 440px;
  margin: 0;
  color: rgb(232 241 248 / 76%);
  font-size: 0.78rem;
  line-height: 1.7;
}

.welcome-link {
  display: inline-flex;
  min-height: 39px;
  align-items: center;
  gap: 9px;
  margin-top: 19px;
  border: 1px solid rgb(157 213 239 / 38%);
  border-radius: 10px;
  padding: 0 13px;
  background: linear-gradient(110deg, #a9def3, #6db8dc);
  color: #123550;
  font-size: 0.71rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 8px 20px rgb(4 21 36 / 18%), inset 0 1px rgb(255 255 255 / 45%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.welcome-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 11px 25px rgb(4 21 36 / 24%), inset 0 1px rgb(255 255 255 / 52%);
}

.welcome-link :deep(svg) {
  width: 15px;
  height: 15px;
  transition: transform 160ms ease;
}

.welcome-link:hover :deep(svg) {
  transform: translateX(2px);
}

.welcome-visual {
  position: absolute;
  top: 50%;
  right: 11%;
  width: 235px;
  height: 235px;
  transform: translateY(-50%);
}

.visual-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  aspect-ratio: 1;
  border: 1px solid rgb(191 230 247 / 23%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.ring-one {
  width: 218px;
  box-shadow: 0 0 0 23px rgb(145 205 232 / 4%), 0 0 0 46px rgb(145 205 232 / 3%);
}

.ring-two {
  width: 160px;
  border-color: rgb(171 221 243 / 31%);
  box-shadow: inset 0 0 30px rgb(125 192 221 / 8%);
}

.ring-three {
  width: 108px;
  border-color: rgb(203 237 250 / 41%);
}

.visual-eye {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  width: 70px;
  height: 70px;
  place-items: center;
  border: 1px solid rgb(202 237 250 / 59%);
  border-radius: 24px;
  background:
    radial-gradient(circle at 28% 20%, rgb(255 255 255 / 30%), transparent 38%),
    linear-gradient(145deg, rgb(130 200 231 / 25%), rgb(255 255 255 / 7%));
  color: #c5ecfb;
  box-shadow: 0 0 38px rgb(99 178 215 / 25%), inset 0 1px rgb(255 255 255 / 16%);
  transform: translate(-50%, -50%) rotate(-8deg);
}

.visual-eye :deep(svg) {
  width: 34px;
  height: 34px;
}

.visual-orbit-dot {
  position: absolute;
  top: 38px;
  right: 38px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #a6ddf3;
  box-shadow: 0 0 18px 5px rgb(137 207 236 / 43%);
}

.visual-sparkle {
  position: absolute;
  bottom: 36px;
  left: 25px;
  color: #b7e5f6;
  font-size: 1.3rem;
  text-shadow: 0 0 18px rgb(122 198 231 / 62%);
}

.banner-number {
  position: absolute;
  right: 22px;
  bottom: -43px;
  color: rgb(255 255 255 / 4%);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 9rem;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 14px;
  margin: 30px 0 14px;
}

.section-eyebrow {
  color: #6090a9;
  font-size: 0.59rem;
}

.section-heading h2 {
  margin: 5px 0 0;
  color: #193650;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.32rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.section-caption {
  padding-bottom: 3px;
  color: #84929e;
  font-size: 0.68rem;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.module-card {
  position: relative;
  display: flex;
  min-height: 123px;
  align-items: flex-start;
  gap: 13px;
  overflow: hidden;
  border: 1px solid #e5ebee;
  border-radius: 15px;
  padding: 17px 16px;
  background: linear-gradient(145deg, #fff, #fbfcfc);
  text-decoration: none;
  box-shadow: 0 4px 14px rgb(19 49 75 / 3%);
  transition: transform 170ms ease, border-color 170ms ease, box-shadow 170ms ease;
}

.module-card::before {
  position: absolute;
  top: -33px;
  right: -32px;
  width: 80px;
  height: 80px;
  border: 1px solid rgb(74 150 188 / 10%);
  border-radius: 50%;
  box-shadow: 0 0 0 12px rgb(74 150 188 / 3%);
  content: "";
  pointer-events: none;
}

.module-card:hover {
  transform: translateY(-3px);
  border-color: #c7e0eb;
  box-shadow: 0 14px 27px rgb(22 61 89 / 8%);
}

.module-icon {
  display: grid;
  width: 41px;
  height: 41px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #dcebf1;
  border-radius: 13px;
  background: linear-gradient(145deg, #eff8fb, #e2f0f5);
  color: #357b9f;
  box-shadow: inset 0 1px #fff;
}

.module-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.module-icon-campanas {
  border-color: #dce6ef;
  background: linear-gradient(145deg, #f1f6fa, #e4edf4);
  color: #486f91;
}

.module-icon-convenios {
  border-color: #d9e8ef;
  background: linear-gradient(145deg, #eff7f9, #dfedf2);
  color: #39748f;
}

.module-card-copy {
  display: grid;
  min-width: 0;
  gap: 5px;
  padding-top: 1px;
}

.module-number {
  color: #7c9aac;
  font-size: 0.53rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.module-card-copy strong {
  color: #1b3a55;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.02rem;
  font-weight: 600;
}

.module-card-copy small {
  color: #81909d;
  font-size: 0.63rem;
  line-height: 1.45;
}

.module-arrow {
  display: grid;
  width: 27px;
  height: 27px;
  flex: 0 0 auto;
  place-items: center;
  margin: auto 0 0 auto;
  border: 1px solid #e3eaee;
  border-radius: 9px;
  background: #fff;
  color: #5286a2;
  transition: color 170ms ease, background 170ms ease, transform 170ms ease;
}

.module-arrow :deep(svg) {
  width: 15px;
  height: 15px;
}

.module-card:hover .module-arrow {
  transform: translate(1px, -1px);
  border-color: #b6d8e7;
  background: #eef7fa;
  color: #286b91;
}

.activity-card {
  margin-top: 19px;
  border: 1px solid #e5ebee;
  border-radius: 16px;
  padding: 17px 19px 13px;
  background: linear-gradient(145deg, #fff, #fcfdfd);
  box-shadow: 0 4px 14px rgb(19 49 75 / 3%);
}

.activity-heading {
  display: flex;
  align-items: center;
  gap: 11px;
  padding-bottom: 14px;
  border-bottom: 1px solid #edf0f1;
}

.activity-icon {
  display: grid;
  width: 35px;
  height: 35px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 11px;
  background: #edf5f8;
  color: #4486a5;
}

.activity-icon :deep(svg) {
  width: 17px;
  height: 17px;
}

.activity-heading > div h2 {
  margin: 0;
  color: #1f3d56;
  font-size: 0.82rem;
  font-weight: 750;
}

.activity-heading > div p {
  margin: 4px 0 0;
  color: #85929d;
  font-size: 0.64rem;
}

.activity-period {
  margin-left: auto;
  color: #8a9aa6;
  font-size: 0.55rem;
  font-weight: 750;
  letter-spacing: 0.11em;
}

.activity-empty {
  display: flex;
  min-height: 77px;
  align-items: center;
  justify-content: center;
  gap: 11px;
  padding: 10px;
}

.empty-icon {
  display: grid;
  width: 35px;
  height: 35px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #e5edf0;
  border-radius: 50%;
  background: #f8fafb;
  color: #7394a8;
}

.empty-icon :deep(svg) {
  width: 17px;
  height: 17px;
}

.activity-empty > div {
  text-align: left;
}

.activity-empty strong {
  color: #4e6578;
  font-size: 0.68rem;
}

.activity-empty p {
  margin: 4px 0 0;
  color: #8997a1;
  font-size: 0.62rem;
  line-height: 1.5;
}

.module-empty-card {
  display: flex;
  min-height: min(490px, 60vh);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #e3eaee;
  border-radius: 21px;
  padding: 34px 25px;
  background:
    radial-gradient(ellipse at 50% 25%, rgb(222 238 245 / 66%), transparent 35%),
    linear-gradient(150deg, #fff, #fbfcfc);
  text-align: center;
  box-shadow: 0 12px 35px rgb(19 49 75 / 5%);
}

.empty-art {
  position: relative;
  display: grid;
  width: 150px;
  height: 150px;
  margin-bottom: 17px;
  place-items: center;
}

.empty-art-ring {
  position: absolute;
  inset: 8px;
  border: 1px solid #d8e9f0;
  border-radius: 50%;
  box-shadow: 0 0 0 15px rgb(86 156 190 / 4%), inset 0 0 26px rgb(86 156 190 / 7%);
}

.empty-art-icon {
  position: relative;
  display: grid;
  width: 70px;
  height: 70px;
  place-items: center;
  border: 1px solid #c9e1eb;
  border-radius: 23px;
  background: linear-gradient(145deg, #fff, #e8f3f7);
  color: #4384a4;
  box-shadow: 0 15px 32px rgb(28 83 115 / 11%), inset 0 1px #fff;
}

.empty-art-icon :deep(svg) {
  width: 30px;
  height: 30px;
}

.empty-art-sparkle {
  position: absolute;
  color: #5c9fc0;
  text-shadow: 0 0 13px rgb(92 159 192 / 25%);
}

.sparkle-a {
  top: 14px;
  right: 24px;
  font-size: 1.2rem;
}

.sparkle-b {
  bottom: 22px;
  left: 19px;
  font-size: 1.7rem;
}

.empty-status {
  display: inline-flex;
  min-height: 27px;
  align-items: center;
  gap: 8px;
  border: 1px solid #dceaf0;
  border-radius: 999px;
  padding: 0 11px;
  background: #f4f9fb;
  color: #588099;
  font-size: 0.56rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.module-empty-card h2 {
  max-width: 520px;
  margin: 16px 0 8px;
  color: #183651;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.55rem, 3vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.035em;
}

.module-empty-card > p {
  max-width: 490px;
  margin: 0;
  color: #778998;
  font-size: 0.8rem;
  line-height: 1.7;
}

.empty-home-link {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  border: 1px solid #cfe2eb;
  border-radius: 10px;
  padding: 0 13px;
  background: linear-gradient(120deg, #f1f8fa, #fff);
  color: #286384;
  font-size: 0.71rem;
  font-weight: 750;
  text-decoration: none;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.empty-home-link:hover {
  transform: translateY(-1px);
  border-color: #a9cfdf;
  background: #eaf4f8;
}

.empty-home-link :deep(svg) {
  width: 15px;
  height: 15px;
}

.workspace-footer {
  display: flex;
  min-height: 49px;
  align-items: flex-end;
  gap: 10px;
  padding: 17px 2px 0;
  color: #8b98a2;
  font-size: 0.6rem;
}

.footer-divider {
  width: 3px;
  height: 3px;
  margin-bottom: 3px;
  border-radius: 50%;
  background: #9db0bd;
}

.footer-version {
  margin-left: auto;
  color: #879eac;
  font-size: 0.52rem;
  font-weight: 750;
  letter-spacing: 0.11em;
}

.sidebar-scrim {
  display: none;
}

@media (max-width: 1100px) {
  .admin-sidebar {
    width: 238px;
    flex-basis: 238px;
  }

  .admin-content {
    padding-inline: 30px;
  }

  .welcome-visual {
    right: 6%;
    transform: translateY(-50%) scale(0.88);
  }

  .module-grid {
    gap: 10px;
  }

  .module-card {
    gap: 10px;
    padding-inline: 13px;
  }
}

@media (max-width: 860px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: min(310px, calc(100vw - 55px));
    height: 100dvh;
    min-height: 0;
    transform: translateX(-105%);
    transition: transform 220ms ease;
    box-shadow: 20px 0 45px rgb(5 23 39 / 18%);
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-scrim {
    position: fixed;
    z-index: 19;
    inset: 0;
    display: block;
    border: 0;
    background: rgb(6 21 35 / 47%);
    backdrop-filter: blur(3px);
  }

  .topbar {
    height: 66px;
    padding-inline: 25px;
  }

  .mobile-menu-toggle {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 1px solid #dce7ec;
    border-radius: 11px;
    background: #fff;
    color: #275674;
    cursor: pointer;
  }

  .mobile-menu-toggle :deep(svg) {
    width: 19px;
    height: 19px;
  }

  .topbar-actions {
    gap: 12px;
  }

  .admin-content {
    padding: 31px 25px 19px;
  }

  .welcome-banner {
    min-height: 225px;
  }

  .welcome-copy {
    width: 68%;
  }

  .welcome-visual {
    right: 0;
    transform: translateY(-50%) scale(0.76);
  }
}

@media (max-width: 640px) {
  .topbar {
    height: 60px;
    gap: 10px;
    padding-inline: 16px;
  }

  .topbar-context {
    gap: 7px;
    font-size: 0.67rem;
  }

  .topbar-context strong {
    max-width: 110px;
    font-size: 0.69rem;
  }

  .topbar-actions {
    gap: 9px;
  }

  .prototype-badge {
    min-height: 25px;
    gap: 6px;
    padding-inline: 8px;
    font-size: 0.57rem;
  }

  .topbar-divider,
  .topbar-avatar {
    display: none;
  }

  .mobile-menu-toggle {
    width: 36px;
    height: 36px;
  }

  .admin-content {
    padding: 25px 16px 14px;
  }

  .page-heading {
    align-items: flex-start;
    margin-bottom: 19px;
  }

  .page-heading h1 {
    font-size: 2rem;
  }

  .page-description {
    max-width: 410px;
    font-size: 0.77rem;
  }

  .heading-date {
    display: none;
  }

  .welcome-banner {
    min-height: 239px;
    align-items: flex-start;
    border-radius: 18px;
    padding: 25px 21px;
  }

  .welcome-copy {
    width: min(100%, 400px);
  }

  .welcome-copy h2 {
    max-width: 330px;
    font-size: clamp(1.55rem, 6vw, 2rem);
  }

  .welcome-copy p {
    max-width: 330px;
    font-size: 0.74rem;
  }

  .welcome-link {
    min-height: 37px;
    margin-top: 15px;
  }

  .welcome-visual {
    top: auto;
    right: -77px;
    bottom: -82px;
    transform: scale(0.76);
    transform-origin: center;
    opacity: 0.65;
  }

  .banner-number {
    right: 10px;
    bottom: -27px;
    font-size: 6.5rem;
  }

  .section-heading {
    align-items: flex-start;
    margin-top: 25px;
  }

  .section-heading h2 {
    font-size: 1.2rem;
  }

  .section-caption {
    max-width: 118px;
    padding-top: 5px;
    font-size: 0.59rem;
    line-height: 1.45;
    text-align: right;
  }

  .module-grid {
    grid-template-columns: 1fr;
    gap: 9px;
  }

  .module-card {
    min-height: 88px;
    align-items: center;
    padding: 13px;
  }

  .module-icon {
    width: 41px;
    height: 41px;
  }

  .module-card-copy {
    gap: 4px;
  }

  .module-card-copy strong {
    font-size: 0.98rem;
  }

  .module-card-copy small {
    font-size: 0.62rem;
  }

  .module-arrow {
    margin: 0 2px 0 auto;
  }

  .activity-card {
    margin-top: 13px;
    padding: 14px 13px 10px;
  }

  .activity-period {
    display: none;
  }

  .activity-empty {
    min-height: 88px;
    justify-content: flex-start;
    padding-inline: 2px;
  }

  .activity-empty strong {
    font-size: 0.65rem;
  }

  .activity-empty p {
    font-size: 0.6rem;
  }

  .module-empty-card {
    min-height: 59vh;
    border-radius: 18px;
    padding: 25px 18px;
  }

  .empty-art {
    width: 130px;
    height: 130px;
  }

  .empty-art-icon {
    width: 63px;
    height: 63px;
    border-radius: 21px;
  }

  .module-empty-card h2 {
    font-size: 1.55rem;
  }

  .module-empty-card > p {
    font-size: 0.75rem;
  }

  .workspace-footer {
    flex-wrap: wrap;
    align-items: center;
    gap: 7px;
    padding-top: 14px;
    font-size: 0.56rem;
  }

  .footer-version {
    width: 100%;
    margin: 2px 0 0;
    font-size: 0.49rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>

<style scoped>
.admin-shell {
  background:
    radial-gradient(ellipse at 87% 5%, rgb(214 234 243 / 45%), transparent 27%),
    radial-gradient(ellipse at 24% 57%, rgb(231 238 241 / 38%), transparent 42%),
    #f3f6f7;
}

.admin-sidebar {
  padding: 25px 17px 18px;
  background:
    radial-gradient(ellipse at 0% 0%, rgb(85 161 200 / 22%), transparent 36%),
    radial-gradient(ellipse at 95% 55%, rgb(52 107 146 / 11%), transparent 35%),
    linear-gradient(165deg, #102d4b 0%, #0b2138 67%, #081b2e 100%);
  box-shadow: 14px 0 42px rgb(8 30 50 / 11%), inset -1px 0 rgb(255 255 255 / 5%);
}

.admin-brand {
  min-height: 54px;
  gap: 12px;
  padding-inline: 5px;
}

.brand-symbol {
  width: 44px;
  height: 44px;
  border-color: rgb(150 211 238 / 32%);
  border-radius: 15px;
  background: linear-gradient(145deg, rgb(102 178 213 / 27%), rgb(255 255 255 / 5%));
  color: #c0e8f8;
  box-shadow: inset 0 1px rgb(255 255 255 / 14%), 0 9px 23px rgb(0 0 0 / 14%);
}

.brand-copy strong {
  font-size: 0.97rem;
  letter-spacing: 0.015em;
}

.brand-copy small {
  color: #a1bbce;
  font-size: 0.53rem;
  letter-spacing: 0.15em;
}

.sidebar-profile {
  position: relative;
  min-height: 72px;
  margin-top: 19px;
  border-color: rgb(162 203 226 / 18%);
  border-radius: 15px;
  padding: 12px;
  background:
    radial-gradient(ellipse at 0% 0%, rgb(117 187 218 / 12%), transparent 66%),
    linear-gradient(115deg, rgb(255 255 255 / 8%), rgb(255 255 255 / 3%));
  box-shadow: inset 0 1px rgb(255 255 255 / 6%), 0 10px 25px rgb(3 17 29 / 9%);
}

.profile-avatar {
  width: 41px;
  height: 41px;
  border-color: rgb(167 220 243 / 54%);
  background: linear-gradient(145deg, #75b8d8, #34779d 73%);
  color: #f3fbff;
  font-size: 0.72rem;
  box-shadow: 0 5px 14px rgb(0 0 0 / 16%), inset 0 1px rgb(255 255 255 / 29%);
}

.profile-copy strong {
  font-size: 0.75rem;
  letter-spacing: 0.005em;
}

.profile-copy small {
  color: #a4bac9;
  font-size: 0.64rem;
}

.profile-status {
  background: #86c8e6;
  box-shadow: 0 0 0 4px rgb(134 200 230 / 15%), 0 0 12px rgb(134 200 230 / 25%);
}

.sidebar-divider {
  height: 1px;
  margin: 21px 3px 23px;
  background: linear-gradient(90deg, rgb(177 206 224 / 22%), rgb(177 206 224 / 5%));
}

.sidebar-label {
  color: #93aec1;
  font-size: 0.61rem;
  letter-spacing: 0.17em;
}

.primary-navigation {
  gap: 8px;
  margin-top: 16px;
}

.navigation-link {
  min-height: 51px;
  gap: 13px;
  border-radius: 13px;
  padding-inline: 12px;
  font-size: 0.85rem;
}

.navigation-link.is-active {
  border-color: rgb(135 204 234 / 24%);
  background: linear-gradient(105deg, rgb(80 157 198 / 31%), rgb(255 255 255 / 5%));
  box-shadow: inset 3px 0 #8bd2f1, inset 0 1px rgb(255 255 255 / 5%), 0 7px 17px rgb(1 16 29 / 12%);
}

.navigation-icon {
  color: #afc7d8;
}

.is-active .navigation-icon {
  color: #b3e3f7;
}

.sidebar-help {
  min-height: 68px;
  border-color: rgb(169 208 229 / 19%);
  border-radius: 14px;
  background: linear-gradient(110deg, rgb(255 255 255 / 8%), rgb(255 255 255 / 3%));
  box-shadow: inset 0 1px rgb(255 255 255 / 5%);
}

.help-icon {
  border: 1px solid rgb(140 200 228 / 15%);
  background: rgb(83 159 197 / 22%);
  color: #b9e3f4;
}

.logout-link {
  min-height: 47px;
  margin-top: 12px;
}

.admin-workspace {
  background:
    radial-gradient(ellipse at 80% 13%, rgb(225 238 244 / 28%), transparent 35%),
    #f5f7f8;
}

.topbar {
  height: 76px;
  border-bottom-color: rgb(220 229 234 / 86%);
  padding-inline: clamp(27px, 4vw, 60px);
  background: rgb(255 255 255 / 91%);
  box-shadow: 0 6px 22px rgb(22 55 79 / 3%);
}

.topbar-context {
  gap: 12px;
  font-size: 0.76rem;
}

.topbar-context strong {
  color: #203f59;
  font-size: 0.78rem;
}

.context-mark {
  width: 8px;
  height: 8px;
  background: #4c9cc5;
  box-shadow: 0 0 0 4px rgb(76 156 197 / 13%), 0 0 12px rgb(76 156 197 / 21%);
}

.prototype-badge {
  min-height: 31px;
  border-color: #d0e4ed;
  background: linear-gradient(110deg, #f5fafc, #eaf4f8);
  color: #426f89;
  font-size: 0.66rem;
  box-shadow: inset 0 1px #fff;
}

.topbar-avatar {
  border-color: #b9dbe9;
  background: linear-gradient(145deg, #eaf6fa, #c9e5f0);
  box-shadow: 0 3px 9px rgb(35 92 122 / 10%), inset 0 1px #fff;
}

.admin-content {
  width: min(100%, 1510px);
  padding: 40px clamp(27px, 4vw, 60px) 24px;
}

.page-heading {
  margin-bottom: 27px;
}

.page-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 9px;
  color: #397da0;
  font-size: 0.62rem;
  letter-spacing: 0.17em;
}

.page-eyebrow::before {
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, #397da0, #8bcbe6);
  content: "";
}

.page-heading h1 {
  color: #122f4b;
  font-size: clamp(2.2rem, 3.35vw, 2.9rem);
  letter-spacing: -0.05em;
}

.page-description {
  margin-top: 9px;
  color: #6f8190;
  font-size: 0.86rem;
}

.heading-date {
  min-height: 59px;
  gap: 11px;
  border-color: #e0e9ed;
  border-radius: 15px;
  padding: 9px 15px;
  background: linear-gradient(135deg, rgb(255 255 255 / 96%), rgb(246 250 251 / 92%));
  box-shadow: 0 5px 17px rgb(21 56 80 / 4%), inset 0 1px #fff;
}

.date-icon {
  width: 37px;
  height: 37px;
  border: 1px solid #d8e9f0;
  border-radius: 12px;
  background: linear-gradient(145deg, #f4fafc, #e6f1f5);
  color: #32799d;
}

.heading-date strong {
  color: #2e4d65;
  font-size: 0.7rem;
}

.heading-date small {
  color: #7a8d9b;
  font-size: 0.63rem;
}

.welcome-banner {
  min-height: 305px;
  border-color: rgb(127 183 211 / 42%);
  border-radius: 25px;
  padding: 38px clamp(31px, 4.4vw, 58px);
  background:
    radial-gradient(ellipse at 76% 46%, rgb(92 177 219 / 27%), transparent 27%),
    radial-gradient(ellipse at 5% 105%, rgb(88 159 194 / 17%), transparent 42%),
    linear-gradient(112deg, #0c2742 0%, #123958 51%, #1c5477 100%);
  box-shadow: 0 22px 50px rgb(13 46 73 / 15%), inset 0 1px rgb(255 255 255 / 11%);
}

.welcome-banner::before {
  opacity: 0.72;
  background-size: 43px 43px;
  mask-image: linear-gradient(100deg, #000 5%, transparent 90%);
}

.welcome-copy {
  width: min(61%, 670px);
}

.welcome-label {
  gap: 8px;
  color: #a9e1f8;
  font-size: 0.62rem;
  letter-spacing: 0.19em;
}

.welcome-label :deep(svg) {
  width: 15px;
  height: 15px;
  filter: drop-shadow(0 0 7px rgb(155 218 245 / 42%));
}

.welcome-copy h2 {
  max-width: 580px;
  margin: 16px 0 11px;
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  letter-spacing: -0.045em;
  line-height: 1.09;
  text-wrap: balance;
}

.welcome-copy p {
  max-width: 475px;
  font-size: 0.84rem;
  line-height: 1.75;
}

.welcome-link {
  min-height: 43px;
  gap: 10px;
  margin-top: 22px;
  border-color: rgb(180 225 244 / 52%);
  border-radius: 11px;
  padding-inline: 16px;
  background: linear-gradient(110deg, #c6ebf9 0%, #89cce8 52%, #69b4d8 100%);
  font-size: 0.74rem;
  box-shadow: 0 10px 22px rgb(3 19 33 / 21%), inset 0 1px rgb(255 255 255 / 68%);
}

.welcome-link:hover {
  box-shadow: 0 14px 27px rgb(3 19 33 / 27%), inset 0 1px rgb(255 255 255 / 75%);
}

.welcome-visual {
  right: 13%;
  width: 268px;
  height: 268px;
}

.ring-one {
  width: 250px;
  border-color: rgb(191 230 247 / 27%);
  box-shadow: 0 0 0 24px rgb(145 205 232 / 5%), 0 0 0 52px rgb(145 205 232 / 3%);
}

.ring-two {
  width: 186px;
  border-color: rgb(171 221 243 / 38%);
}

.ring-three {
  width: 125px;
  border-color: rgb(203 237 250 / 48%);
}

.visual-eye {
  width: 82px;
  height: 82px;
  border-color: rgb(202 237 250 / 68%);
  border-radius: 27px;
  background:
    radial-gradient(circle at 28% 20%, rgb(255 255 255 / 38%), transparent 38%),
    linear-gradient(145deg, rgb(130 200 231 / 32%), rgb(255 255 255 / 8%));
  box-shadow: 0 0 48px rgb(99 178 215 / 30%), inset 0 1px rgb(255 255 255 / 20%);
}

.visual-eye :deep(svg) {
  width: 40px;
  height: 40px;
}

.visual-orbit-dot {
  top: 31px;
  right: 37px;
  width: 10px;
  height: 10px;
  background: #c2ebfb;
  box-shadow: 0 0 20px 6px rgb(137 207 236 / 50%);
}

.visual-sparkle {
  bottom: 29px;
  left: 28px;
  font-size: 1.55rem;
}

.visual-place {
  position: absolute;
  right: -26px;
  bottom: 6px;
  display: flex;
  min-width: 208px;
  min-height: 58px;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(200 229 242 / 28%);
  border-radius: 14px;
  padding: 9px 12px;
  background: linear-gradient(120deg, rgb(255 255 255 / 15%), rgb(255 255 255 / 7%));
  box-shadow: 0 12px 29px rgb(4 20 34 / 19%), inset 0 1px rgb(255 255 255 / 11%);
  backdrop-filter: blur(15px);
}

.visual-place > :deep(svg) {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  color: #b7e8fa;
}

.visual-place > span {
  display: grid;
  gap: 4px;
}

.visual-place strong {
  color: #f5fbfe;
  font-size: 0.7rem;
  font-weight: 750;
}

.visual-place small {
  color: rgb(225 241 249 / 75%);
  font-size: 0.59rem;
}

.banner-number {
  right: 18px;
  bottom: -53px;
  color: rgb(255 255 255 / 4.5%);
  font-size: 10rem;
}

.section-heading {
  align-items: flex-end;
  margin: 34px 0 16px;
}

.section-eyebrow {
  color: #4d849f;
  font-size: 0.6rem;
  letter-spacing: 0.16em;
}

.section-heading h2 {
  margin-top: 6px;
  color: #173650;
  font-size: 1.45rem;
  letter-spacing: -0.035em;
}

.section-caption {
  color: #758b9a;
  font-size: 0.7rem;
}

.module-grid {
  gap: 16px;
}

.module-card {
  min-height: 145px;
  gap: 14px;
  border-color: #e1e9ed;
  border-radius: 17px;
  padding: 20px 18px;
  background:
    radial-gradient(ellipse at 100% 0%, rgb(219 237 245 / 40%), transparent 43%),
    linear-gradient(145deg, #fff, #fbfcfc);
  box-shadow: 0 7px 20px rgb(19 49 75 / 4%), inset 0 1px #fff;
}

.module-card::before {
  top: -40px;
  right: -40px;
  width: 100px;
  height: 100px;
  border-color: rgb(74 150 188 / 12%);
  box-shadow: 0 0 0 15px rgb(74 150 188 / 4%), 0 0 0 31px rgb(74 150 188 / 2%);
}

.module-card::after {
  position: absolute;
  top: 0;
  right: 24px;
  left: 24px;
  height: 2px;
  border-radius: 0 0 999px 999px;
  background: linear-gradient(90deg, transparent, #9acfe5 50%, transparent);
  opacity: 0;
  content: "";
  transition: opacity 170ms ease;
}

.module-card:hover {
  transform: translateY(-4px);
  border-color: #c4dfe9;
  box-shadow: 0 16px 30px rgb(22 61 89 / 9%), inset 0 1px #fff;
}

.module-card:hover::after {
  opacity: 1;
}

.module-icon {
  width: 47px;
  height: 47px;
  border-color: #d2e5ed;
  border-radius: 15px;
  background: linear-gradient(145deg, #f5fbfd, #e4f1f5);
  color: #317b9f;
  box-shadow: 0 5px 12px rgb(35 99 130 / 7%), inset 0 1px #fff;
}

.module-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.module-icon-campanas {
  border-color: #d7e5ef;
  background: linear-gradient(145deg, #f6f9fc, #e6eff5);
  color: #4b7998;
}

.module-icon-convenios {
  border-color: #d4e6ec;
  background: linear-gradient(145deg, #f4fafb, #e2eff3);
  color: #36788f;
}

.module-card-copy {
  gap: 6px;
  padding-top: 2px;
}

.module-number {
  color: #688ba0;
  font-size: 0.56rem;
  letter-spacing: 0.15em;
}

.module-card-copy strong {
  color: #173752;
  font-size: 1.13rem;
}

.module-card-copy small {
  color: #748896;
  font-size: 0.68rem;
  line-height: 1.5;
}

.module-open-label {
  margin-top: 4px;
  color: #4284a3;
  font-size: 0.53rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  transition: color 170ms ease;
}

.module-card:hover .module-open-label {
  color: #1e6488;
}

.module-arrow {
  width: 31px;
  height: 31px;
  border-color: #dae7ec;
  border-radius: 10px;
  background: linear-gradient(145deg, #fff, #f2f7f9);
  color: #4c85a1;
  box-shadow: 0 3px 9px rgb(31 78 104 / 5%);
}

.activity-card {
  margin-top: 21px;
  border-color: #e1e9ed;
  border-radius: 18px;
  padding: 19px 21px 15px;
  background:
    radial-gradient(ellipse at 95% 0%, rgb(227 239 245 / 36%), transparent 38%),
    linear-gradient(145deg, #fff, #fbfcfc);
  box-shadow: 0 7px 20px rgb(19 49 75 / 4%), inset 0 1px #fff;
}

.activity-heading {
  gap: 12px;
  padding-bottom: 16px;
  border-bottom-color: #e9eff1;
}

.activity-icon {
  width: 39px;
  height: 39px;
  border: 1px solid #dceaf0;
  border-radius: 13px;
  background: linear-gradient(145deg, #f5fafc, #e7f1f5);
  color: #3d7f9f;
}

.activity-heading > div h2 {
  color: #193a54;
  font-size: 0.88rem;
}

.activity-heading > div p {
  color: #7e909d;
  font-size: 0.67rem;
}

.activity-period {
  border: 1px solid #e1ebef;
  border-radius: 999px;
  padding: 7px 10px;
  background: #f8fbfc;
  color: #6f8a9b;
  font-size: 0.53rem;
}

.activity-empty {
  min-height: 91px;
  gap: 13px;
}

.empty-icon {
  width: 40px;
  height: 40px;
  border-color: #e0ebef;
  background: linear-gradient(145deg, #fff, #f0f6f8);
  color: #5b8da5;
}

.activity-empty strong {
  color: #3f5b70;
  font-size: 0.72rem;
}

.activity-empty p {
  color: #7e8f9b;
  font-size: 0.65rem;
}

.module-empty-card {
  position: relative;
  min-height: min(530px, 62vh);
  border-color: #dfe9ed;
  border-radius: 24px;
  background:
    radial-gradient(ellipse at 50% 19%, rgb(219 237 245 / 75%), transparent 37%),
    radial-gradient(ellipse at 50% 110%, rgb(236 243 246 / 75%), transparent 39%),
    linear-gradient(150deg, #fff, #fbfcfc);
  box-shadow: 0 17px 45px rgb(19 49 75 / 7%), inset 0 1px #fff;
}

.module-empty-card::before {
  position: absolute;
  inset: 13px;
  border: 1px solid rgb(209 226 234 / 47%);
  border-radius: 17px;
  content: "";
  pointer-events: none;
}

.empty-art {
  width: 164px;
  height: 164px;
  margin-bottom: 20px;
}

.empty-art-ring {
  inset: 8px;
  border-color: #cde2eb;
  box-shadow: 0 0 0 17px rgb(86 156 190 / 4%), inset 0 0 34px rgb(86 156 190 / 8%);
}

.empty-art-icon {
  width: 76px;
  height: 76px;
  border-color: #c5dfe9;
  border-radius: 25px;
  background: linear-gradient(145deg, #fff, #e4f1f6);
  color: #347b9f;
  box-shadow: 0 17px 36px rgb(28 83 115 / 13%), inset 0 1px #fff;
}

.empty-art-icon :deep(svg) {
  width: 33px;
  height: 33px;
}

.empty-status {
  min-height: 29px;
  border-color: #d3e6ee;
  background: linear-gradient(110deg, #f5fafc, #eaf4f8);
  color: #4d7d96;
}

.module-empty-card h2 {
  margin-top: 18px;
  color: #153550;
  font-size: clamp(1.7rem, 3vw, 2.15rem);
}

.module-empty-card > p {
  color: #6f8291;
  font-size: 0.84rem;
}

.empty-home-link {
  min-height: 43px;
  border-color: #c8dfe9;
  border-radius: 11px;
  padding-inline: 15px;
  background: linear-gradient(120deg, #f0f8fb, #fff);
  color: #286b8b;
  box-shadow: 0 5px 13px rgb(35 91 119 / 6%), inset 0 1px #fff;
}

.workspace-footer {
  min-height: 55px;
  color: #7d8f9b;
}

.footer-version {
  color: #6f8c9d;
}

@media (max-width: 1100px) and (min-width: 861px) {
  .welcome-visual {
    right: 7%;
    transform: translateY(-50%) scale(0.86);
  }

  .visual-place {
    right: -25px;
  }

  .module-card {
    min-height: 155px;
    padding: 17px 14px;
  }

  .module-card-copy small {
    font-size: 0.63rem;
  }
}

@media (max-width: 860px) {
  .admin-content {
    padding: 34px 25px 22px;
  }

  .welcome-banner {
    min-height: 285px;
  }

  .welcome-copy {
    width: 66%;
  }

  .welcome-visual {
    right: 1%;
    transform: translateY(-50%) scale(0.8);
  }

  .module-card {
    min-height: 145px;
  }
}

@media (max-width: 640px) {
  .topbar {
    height: 62px;
    background: rgb(255 255 255 / 95%);
  }

  .admin-content {
    padding: 27px 16px 16px;
  }

  .page-heading {
    margin-bottom: 21px;
  }

  .page-eyebrow {
    margin-bottom: 8px;
    font-size: 0.58rem;
  }

  .page-heading h1 {
    font-size: 2.12rem;
  }

  .page-description {
    margin-top: 7px;
    font-size: 0.79rem;
  }

  .welcome-banner {
    min-height: 255px;
    border-radius: 20px;
    padding: 25px 21px;
    background:
      radial-gradient(ellipse at 87% 88%, rgb(92 177 219 / 24%), transparent 39%),
      linear-gradient(118deg, #0c2742 0%, #153d5e 68%, #1b4f70 100%);
  }

  .welcome-copy {
    width: 100%;
  }

  .welcome-label {
    font-size: 0.57rem;
    letter-spacing: 0.15em;
  }

  .welcome-copy h2 {
    max-width: 325px;
    margin-top: 14px;
    font-size: clamp(1.7rem, 7vw, 2.13rem);
  }

  .welcome-copy p {
    max-width: 310px;
    font-size: 0.75rem;
  }

  .welcome-link {
    min-height: 40px;
    margin-top: 17px;
  }

  .welcome-visual {
    right: -105px;
    bottom: -107px;
    transform: scale(0.72);
    opacity: 0.5;
  }

  .visual-place {
    display: none;
  }

  .banner-number {
    right: 7px;
    bottom: -25px;
    font-size: 6.2rem;
  }

  .section-heading {
    margin: 27px 0 14px;
  }

  .section-heading h2 {
    font-size: 1.28rem;
  }

  .section-caption {
    max-width: 120px;
    color: #73899a;
  }

  .module-grid {
    gap: 10px;
  }

  .module-card {
    min-height: 104px;
    gap: 13px;
    border-radius: 15px;
    padding: 14px;
  }

  .module-icon {
    width: 43px;
    height: 43px;
    border-radius: 14px;
  }

  .module-card-copy {
    gap: 4px;
  }

  .module-card-copy strong {
    font-size: 1.04rem;
  }

  .module-card-copy small {
    font-size: 0.63rem;
  }

  .module-open-label {
    margin-top: 3px;
    font-size: 0.49rem;
  }

  .module-arrow {
    width: 28px;
    height: 28px;
    margin: 0 1px 0 auto;
  }

  .activity-card {
    margin-top: 15px;
    border-radius: 16px;
    padding: 14px 13px 10px;
  }

  .activity-heading {
    padding-bottom: 13px;
  }

  .activity-heading > div h2 {
    font-size: 0.82rem;
  }

  .activity-heading > div p {
    font-size: 0.61rem;
  }

  .activity-empty {
    min-height: 87px;
  }

  .activity-empty strong {
    font-size: 0.65rem;
  }

  .activity-empty p {
    font-size: 0.6rem;
  }

  .module-empty-card {
    min-height: 57vh;
    border-radius: 20px;
    padding: 25px 18px;
  }

  .module-empty-card::before {
    inset: 9px;
    border-radius: 14px;
  }

  .empty-art {
    width: 138px;
    height: 138px;
    margin-bottom: 17px;
  }

  .empty-art-icon {
    width: 67px;
    height: 67px;
    border-radius: 22px;
  }

  .module-empty-card h2 {
    font-size: 1.68rem;
  }

  .module-empty-card > p {
    font-size: 0.77rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .module-card::after {
    transition: none;
  }
}
</style>
