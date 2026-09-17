<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [

    {
        label: 'Nosotros',
        to: '/nosotros',
        active: route.path.startsWith('/nosotros')
    },
    {
        label: 'Servicios y Lentes',
        to: '/servicios',
        active: route.path.startsWith('/servicios')
    },
    {
        label: 'Empresas y Convenios',
        to: '/empresas',
        active: route.path.startsWith('/empresas')
    },
    {
        label: 'Contacto',
        to: '/contacto',
        active: route.path.startsWith('/contacto')
    }
])

</script>

<template>
    <UHeader>
        <template #title>
            <Logo class="">
                <img src="../assets/logoA.svg" alt="Clinica Óptica" class="size-15 w-full" />
            </Logo>   
            <!-- <UHeader title="Clinica Optica" :toggle="false" /> -->
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