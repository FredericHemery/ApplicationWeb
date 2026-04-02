<script setup>
import { ref } from 'vue'
import PrenomsListe from '@/components/PrenomsListe.vue'

const prenomSelectionne = ref(null)

function handlePrenomClique(prenom) {
  prenomSelectionne.value = prenom
}

function fermerDetail() {
  prenomSelectionne.value = null
}
</script>

<template>
  <div class="container mx-auto py-10 px-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold tracking-tight">Prenoms des enfants nes a Angers</h1>
      <p class="mt-2 text-lg text-muted-foreground">
        Decouvrez les prenoms les plus populaires par annee et par sexe.
      </p>
    </div>

    <PrenomsListe @prenom-clique="handlePrenomClique" />

    <Teleport to="body">
      <div
        v-if="prenomSelectionne"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        @click.self="fermerDetail"
      >
        <div class="bg-background rounded-lg shadow-lg max-w-md w-full p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold">{{ prenomSelectionne.enfant_prenom }}</h2>
            <button @click="fermerDetail" class="text-muted-foreground hover:text-foreground text-xl">X</button>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Commune</p>
              <p>{{ prenomSelectionne.commune_nom }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Sexe</p>
              <p>{{ prenomSelectionne.enfant_sexe }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Annee</p>
              <p>{{ prenomSelectionne.annee }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Nombre d'occurrences</p>
              <p class="text-2xl font-bold text-primary">{{ prenomSelectionne.nombre_occurrences }}</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
