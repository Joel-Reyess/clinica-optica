<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [{
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    required: true
}, {
    name: 'password',
    type: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    required: true
},{
    name: 'remember',
    type: 'checkbox',
    label: 'Recordarme',
    required: false
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: 'Ingresa con Google' })
  }
}]

const schema = z.object({
    email: z.email('Ingresa un correo electrónico válido'),
    password: z.string('Ingresa tu contraseña').min(6, 'La contraseña debe tener al menos 6 caracteres'),
})
type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Submmited', payload)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Iniciar sesión"
        description="Ingresa tus credenciales para acceder a tu cuenta."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>