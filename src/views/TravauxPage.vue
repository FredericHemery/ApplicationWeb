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
  <div class="page-container">
    <div class="page-content">
      <div class="page-header">
        <span class="page-icon">🔨</span>
        <h1 class="page-title">Travaux a Angers</h1>
        <p class="page-subtitle">Liste des travaux et perturbations en cours dans la ville.</p>
      </div>

      <div class="page-card">
        <TravauxListe @travail-clique="handleTravailClique" />
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="travailSelectionne"
        class="modal-overlay"
        @click.self="fermerDetail"
      >
        <div class="modal-content">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-bold text-white">{{ travailSelectionne.title }}</h2>
            <button @click="fermerDetail" class="text-white/60 hover:text-white text-xl transition-colors">X</button>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-amber-400">Adresse</p>
              <p class="text-white/80">{{ travailSelectionne.address }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-amber-400">Description</p>
              <p class="text-white/80">{{ travailSelectionne.description }}</p>
            </div>
            <div class="flex gap-4">
              <div>
                <p class="text-sm font-medium text-amber-400">Debut</p>
                <p class="text-white/80">{{ travailSelectionne.startat }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-amber-400">Fin</p>
                <p class="text-white/80">{{ travailSelectionne.endat }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.page-container {
  padding: 3rem 1.5rem;
}

.page-content {
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.page-title {
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  color: #ffd700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #a0a0a0;
}

.page-card {
  background: rgba(30, 30, 47, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
}

.modal-content {
  background: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 32rem;
  width: 100%;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.1);
}
</style>
