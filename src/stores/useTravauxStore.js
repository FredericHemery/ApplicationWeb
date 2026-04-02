import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchTravaux } from '@/services/travaux'

export const useTravauxStore = defineStore('travaux', () => {
  const liste = ref([])
  const chargement = ref(false)
  const erreur = ref('')
  const trafficFiltre = ref('all')

  const travauxFiltres = computed(() => {
    if (trafficFiltre.value === 'all') {
      return liste.value
    }
    return liste.value.filter(t => t.traffic === trafficFiltre.value)
  })

  async function charger() {
    chargement.value = true
    erreur.value = ''

    try {
      const reponse = await fetchTravaux({ limit: 50 })
      liste.value = reponse.results
    } catch (e) {
      erreur.value = 'Impossible de charger les travaux.'
    } finally {
      chargement.value = false
    }
  }

  function getTrafficClass(traffic) {
    const map = {
      slow: 'bg-yellow-100 text-yellow-800',
      deviated: 'bg-red-100 text-red-800',
      normal: 'bg-green-100 text-green-800'
    }
    return map[traffic] || 'bg-gray-100 text-gray-800'
  }

  return {
    liste,
    travauxFiltres,
    chargement,
    erreur,
    trafficFiltre,
    charger,
    getTrafficClass
  }
})
