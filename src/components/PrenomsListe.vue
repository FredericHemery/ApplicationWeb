<script setup>
import { onMounted } from 'vue'
import { usePrenomsStore } from '@/stores/usePrenomsStore'

const emit = defineEmits(['prenom-clique'])

const store = usePrenomsStore()

onMounted(() => store.charger())
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap gap-4 items-end">
      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm font-medium mb-1">Rechercher un prenom</label>
        <input v-model="store.termeRecherche" type="text" placeholder="Ex: Marie" class="w-full px-3 py-2 border rounded-md bg-background" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Annee</label>
        <select v-model="store.anneeSelectionnee" class="px-3 py-2 border rounded-md bg-background" @change="store.charger()">
          <option v-for="annee in store.listeAnnees" :key="annee" :value="annee">{{ annee }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Sexe</label>
        <select v-model="store.sexeSelectionne" class="px-3 py-2 border rounded-md bg-background" @change="store.charger()">
          <option value="all">Tous</option>
          <option value="M">Garcons</option>
          <option value="F">Filles</option>
        </select>
      </div>
    </div>

    <p class="text-sm text-muted-foreground">{{ store.prenomsFiltres.length }} prenom(s) trouve(s)</p>

    <div v-if="store.chargement" class="text-center py-8">
      <p class="text-muted-foreground">Chargement des prenoms...</p>
    </div>

    <div v-else-if="store.erreur" class="p-4 bg-destructive/10 text-destructive rounded-md">{{ store.erreur }}</div>

    <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="prenom in store.prenomsFiltres"
        :key="prenom.enfant_prenom + prenom.annee"
        class="p-4 border rounded-lg bg-card hover:bg-accent/50 cursor-pointer transition-colors"
        @click="emit('prenom-clique', prenom)"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-lg">{{ prenom.enfant_prenom }}</h3>
            <p class="text-sm text-muted-foreground">{{ prenom.commune_nom }}</p>
          </div>
          <span :class="['px-2 py-1 rounded text-xs font-medium', store.getSexeColor(prenom.enfant_sexe)]">{{ prenom.enfant_sexe }}</span>
        </div>
        <div class="mt-2 text-sm">
          <span class="font-medium">{{ prenom.nombre_occurrences }}</span>
          <span class="text-muted-foreground"> occurrence(s)</span>
        </div>
      </div>
    </div>
  </div>
</template>
