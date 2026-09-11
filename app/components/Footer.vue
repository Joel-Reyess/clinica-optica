<template>
    <div>
        <UFooter>
            <template #left>
                <p class="text-muted text-sm">Derechos reservados Clinica óptica © {{ new Date().getFullYear() }}</p>
            </template>

            <UNavigationMenu variant="link" />

            <template #right>
                <UButton icon="i-simple-icons-facebook" color="neutral" variant="ghost" to="https://go.nuxt.com/discord"
                    target="_blank" aria-label="Discord" />

                <UButton icon="i-simple-icons-whatsapp" color="neutral" variant="ghost"
                    to="https://github.com/nuxt/nuxt" target="_blank" aria-label="GitHub" />
            </template>
        </UFooter>
    </div>
</template>