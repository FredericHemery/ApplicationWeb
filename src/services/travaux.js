import { API_BASE } from '@/config/api'

const URL = `${API_BASE}/info-travaux/records`

export async function fetchTravaux({ limit = 20, offset = 0 } = {}) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset)
  })

  const response = await fetch(`${URL}?${params}`)

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`)
  }

  return response.json()
}
