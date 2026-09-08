<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import routercondig from '../router.options.ts'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Opticos',
        to: '/opticos',
        active: route.path.startsWith('/opticos'),
    },
    {
        label: 'Pala compu',
        to: '/compu',
        active: route.path.startsWith('/compu')
    },
    {
        label: 'Sol',
        to: '/sol',
        active: route.path.startsWith('/sol')
    },
    {
        label: 'Clip on',
        to: '/clipon',
        active: route.path.startsWith('/clipon')
    },
    {
        label: 'Elementales',
        to: '/elementales',
        active: route.path.startsWith('/elementales')
    },
    {
        label: 'Agenda tu cita',
        to: '/citas',
        active: route.path.startsWith('/citas')
    }
])

</script>

<template>
    <UHeader>
        <template #title>
            <Logo class="h-6 w-autop" />
            <UHeader title="Clinica Optica" :toggle="false" />
        </template>
        <UNavigationMenu :items="items"/>

        <template #right>
            <UColorModeButton />

            <UTooltip text="Perfil" :kbds="['meta', 'G']">
                <UButton 
                icon="i-lucide-user"
                variant="ghost"
                aria-label="Perfil"
                color="neutral"
                />
            </UTooltip>
            <UTooltip text="Tú carrito" :kbds="['meta', 'G']">
                <UButton 
                icon="i-lucide-shopping-cart"
                variant="ghost"
                aria-label="Tú carrito"
                color="neutral"
                />
            </UTooltip>
        </template>

        <template #body>
            <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>