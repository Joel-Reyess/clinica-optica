<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Opticos',
        to: '/opticos',
        active: route.path.startsWith('/opticos')
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
            <Logo class="h-6 w-autop"/>
        </template>

        <UNavigationMenu :items="items"/>

        <template #right>
            <UColorModeButton />

            <UTooltip text="Perfil" :kbds="['meta' , 'G']">
                <UBotton 
                icon="user"
                variant="ghost"
                aria-label="Perfil"
                />
            </UTooltip>
        </template>
    </UHeader>
</template>