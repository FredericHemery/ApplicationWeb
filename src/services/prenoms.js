import { API_BASE } from '@/config/api'

const URL = `${API_BASE}/prenoms-des-enfants-nes-a-angers/records`

export async function fetchPrenoms({ limit = 20, offset = 0, where = '' } = {}) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset)
  })

  if (where) {
    params.set('where', where)
  }

  const response = await fetch(`${URL}?${params}`)

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`)
  }

  return response.json()
}
