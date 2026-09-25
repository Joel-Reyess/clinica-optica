<template>
    <div>
        <UFooter>
            <div class="flex justifu-center pb-8 pt-8">
                <div class="place-self-start">
                    <img src="../assets/logoA.svg" alt="Clinica Óptica" class="w-xs h-40 place-self-start" />
                </div>
                <div class="place-self-center">
                    <h3 class="text-lg font-semibold i-lucide-map-pin">Visitanos en Coatzacoalcos</h3>
                    <p class="text-muted text-sm">Av Benito Juárez 608, Centro, 96400 Coatzacoalcos, Ver.</p>
                </div>
                <div class="place-self-end">
                    <h3 class="text-lg font-semibold" icon="i-simple-icons-whatsapp">Whatsapp</h3>
                    <p class="text-muted text-sm">921 137 1704</p>
                </div>
            </div>
            
            <template #right>
                <UButton icon="i-simple-icons-facebook" color="neutral" variant="ghost" to="https://go.nuxt.com/discord"
                target="_blank" aria-label="Discord" />
                
                <UButton icon="i-simple-icons-whatsapp" color="neutral" variant="ghost"
                to="https://github.com/nuxt/nuxt" target="_blank" aria-label="GitHub" />
            </template>
            <template #bottom>
                <p class="text-muted text-sm pl-20">Derechos reservados Clinica óptica © {{ new Date().getFullYear() }}
                </p>
            </template>

            <UNavigationMenu variant="link" />
        </UFooter>
    </div>
</template>