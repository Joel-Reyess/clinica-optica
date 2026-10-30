import type { ApiResponse, Armazon, ArmazonDetalle } from '~/types/api'

export function useArmazones() {
  const api = useApi()

  return useAsyncData(
    'armazones',
    () => api<ApiResponse<Armazon[]>>('/armazones'),
    {
      transform: res => res.info,
      default: () => [] as Armazon[]
    }
  )
}

export function useArmazon(nanoId: string) {
  const api = useApi()

  return useAsyncData(
    `armazon-${nanoId}`,
    () => api<ApiResponse<ArmazonDetalle>>(`/armazones/${nanoId}`),
    { transform: res => res.info }
  )
}
