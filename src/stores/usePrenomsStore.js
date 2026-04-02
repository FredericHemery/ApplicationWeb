import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchPrenoms } from '@/services/prenoms'
import { creerFiltreNumerique, validerSexe } from '@/services/apiHelpers'

export const usePrenomsStore = defineStore('prenoms', () => {
  const liste = ref([])
  const chargement = ref(false)
  const erreur = ref('')
  const termeRecherche = ref('')
  const anneeSelectionnee = ref(2025)
  const sexeSelectionne = ref('all')
  const listeAnnees = [2025, 2024, 2023, 2022, 2021]

  const prenomsFiltres = computed(() => {
    if (!termeRecherche.value) {
      return liste.value
    }
    const terme = termeRecherche.value.toLowerCase()
    return liste.value.filter(p =>
      p.enfant_prenom.toLowerCase().includes(terme)
    )
  })

  async function charger() {
    chargement.value = true
    erreur.value = ''

    try {
      const filtres = []
      filtres.push(creerFiltreNumerique('annee', anneeSelectionnee.value))
      const sexeValide = validerSexe(sexeSelectionne.value)
      if (sexeValide !== 'all') {
        filtres.push(`enfant_sexe="${sexeValide}"`)
      }
      const where = filtres.join(' AND ')
      const reponse = await fetchPrenoms({ limit: 100, where })
      liste.value = reponse.results
    } catch (e) {
      erreur.value = 'Impossible de charger les prenoms.'
    } finally {
      chargement.value = false
    }
  }

  function getSexeColor(sexe) {
    return sexe === 'M' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
  }

  return {
    liste,
    prenomsFiltres,
    chargement,
    erreur,
    termeRecherche,
    anneeSelectionnee,
    sexeSelectionne,
    listeAnnees,
    charger,
    getSexeColor
  }
})
