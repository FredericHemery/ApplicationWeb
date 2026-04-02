<script setup>
import { onMounted } from 'vue'
import { useTravauxStore } from '@/stores/useTravauxStore'

const emit = defineEmits(['travail-clique'])

const store = useTravauxStore()

onMounted(() => store.charger())
</script>

<template>
  <div class="space-y-6">
    <div class="flex gap-4 items-end">
      <div>
        <label class="block text-sm font-medium mb-1">Filtrer par impact</label>
        <select v-model="store.trafficFiltre" class="px-3 py-2 border rounded-md bg-background">
          <option value="all">Tous</option>
          <option value="slow">Slow</option>
          <option value="deviated">Deviated</option>
          <option value="normal">Normal</option>
        </select>
      </div>
    </div>

    <div v-if="store.chargement" class="text-center py-8">
      <p class="text-muted-foreground">Chargement des travaux...</p>
    </div>

    <div v-else-if="store.erreur" class="p-4 bg-destructive/10 text-destructive rounded-md">
      {{ store.erreur }}
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="travail in store.travauxFiltres"
        :key="travail.id"
        class="p-4 border rounded-lg bg-card hover:bg-accent/50 cursor-pointer transition-colors"
        @click="emit('travail-clique', travail)"
      >
        <div class="flex justify-between items-start gap-4">
          <div class="flex-1">
            <h3 class="font-semibold text-lg">{{ travail.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ travail.address }}</p>
            <p class="text-sm mt-2">{{ travail.description }}</p>
          </div>
          <span :class="['px-2 py-1 rounded text-xs font-medium', store.getTrafficClass(travail.traffic)]">
            {{ travail.traffic }}
          </span>
        </div>
        <div class="mt-3 text-xs text-muted-foreground">
          <span>Debut: {{ travail.startat }}</span>
          <span class="mx-2">|</span>
          <span>Fin: {{ travail.endat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
