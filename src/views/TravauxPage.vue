<script setup>
import { ref } from 'vue'
import TravauxListe from '@/components/TravauxListe.vue'

const travailSelectionne = ref(null)

function handleTravailClique(travail) {
  travailSelectionne.value = travail
}

function fermerDetail() {
  travailSelectionne.value = null
}
</script>

<template>
  <div class="container mx-auto py-10 px-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold tracking-tight">Travaux a Angers</h1>
      <p class="mt-2 text-lg text-muted-foreground">
        Liste des travaux et perturbations en cours dans la ville.
      </p>
    </div>

    <TravauxListe @travail-clique="handleTravailClique" />

    <Teleport to="body">
      <div
        v-if="travailSelectionne"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        @click.self="fermerDetail"
      >
        <div class="bg-background rounded-lg shadow-lg max-w-lg w-full p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-bold">{{ travailSelectionne.title }}</h2>
            <button @click="fermerDetail" class="text-muted-foreground hover:text-foreground">X</button>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Adresse</p>
              <p>{{ travailSelectionne.address }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Description</p>
              <p>{{ travailSelectionne.description }}</p>
            </div>
            <div class="flex gap-4">
              <div>
                <p class="text-sm font-medium text-muted-foreground">Debut</p>
                <p>{{ travailSelectionne.startat }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-muted-foreground">Fin</p>
                <p>{{ travailSelectionne.endat }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
