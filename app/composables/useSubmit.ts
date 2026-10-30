// Envuelve el envío de un formulario: maneja "enviando", el error general y los
// errores por campo. Regla clave del cliente: si falla, NO se borra lo escrito.
//
// Uso en una página:
//
//   const { crearPregunta } = useSolicitudes()
//   const { pending, error, fieldErrors, submit } = useSubmit(crearPregunta, CAMPOS_PREGUNTA)
//
//   async function onSubmit() {
//     const referencia = await submit({ ...form })
//     if (!referencia) return      // falló: el formulario conserva lo que escribió
//     Object.assign(form, vacio)   // éxito: ahora sí se limpia
//     enviado.value = true         // mostrar confirmación + botón "Continuar por WhatsApp"
//   }
export function useSubmit<A extends unknown[], R>(
  accion: (...args: A) => Promise<R>,
  fieldMap: Record<string, string> = {}
) {
  const pending = ref(false)
  const error = ref('')
  const fieldErrors = ref<Record<string, string>>({})

  // Regresa el resultado si salió bien, o null si falló.
  async function submit(...args: A): Promise<R | null> {
    if (pending.value) return null

    pending.value = true
    error.value = ''
    fieldErrors.value = {}

    try {
      return await accion(...args)
    } catch (e) {
      const info = parseApiError(e, fieldMap)
      error.value = info.message
      fieldErrors.value = info.fields
      return null
    } finally {
      pending.value = false
    }
  }

  return { pending, error, fieldErrors, submit }
}
