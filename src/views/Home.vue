<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  {
    title: 'Travaux',
    description: 'Decouvrez les travaux et perturbations en cours a Angers',
    icon: '🔨',
    path: '/travaux',
    color: 'from-orange-500 to-red-600'
  },
  {
    title: 'Prenoms',
    description: 'Explorez les prenoms les plus populaires par annee',
    icon: '👶',
    path: '/prenoms',
    color: 'from-pink-500 to-purple-600'
  },
  {
    title: 'Quiz Star Wars',
    description: 'Testez vos connaissances sur la galaxie tres tres lointaine',
    icon: '🚀',
    path: '/questionnaire',
    color: 'from-yellow-400 to-amber-500'
  }
]
</script>

<template>
  <div class="home-container">
    <div class="content">
      <div class="text-center mb-16">
        <h1 class="title-text">
          Que la Force soit avec vous
        </h1>
        <p class="subtitle-text">
          Bienvenue dans l'application Star Wars
        </p>
      </div>

      <div class="quote-container">
        <p class="quote-text">
          "La peur mene a la colere, la colere mene a la haine, la haine mene a la souffrance."
        </p>
        <p class="quote-author">— Yoda</p>
      </div>

      <div class="grid gap-8 md:grid-cols-3 mt-16">
        <button
          v-for="feature in features"
          :key="feature.path"
          @click="router.push(feature.path)"
          :class="[
            'feature-card group relative overflow-hidden rounded-xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border border-white/10',
            'bg-gradient-to-br ' + feature.color
          ]"
        >
          <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          <div class="relative z-10">
            <span class="text-6xl mb-4 block">{{ feature.icon }}</span>
            <h2 class="text-2xl font-bold text-white mb-2">{{ feature.title }}</h2>
            <p class="text-white/80 text-sm">{{ feature.description }}</p>
          </div>
        </button>
      </div>

      <div class="mt-20 text-center">
        <p class="text-white/40 text-sm">
          Donnees fournies par la Ville d'Angers — Open Data
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: calc(100vh - 4rem);
  background: radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a12 50%);
  position: relative;
}

.content {
  position: relative;
  z-index: 10;
  padding: 4rem 2rem;
}

.title-text {
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  color: #ffd700;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 165, 0, 0.6);
  letter-spacing: 0.05em;
}

.subtitle-text {
  font-size: 1.25rem;
  color: #c0c0c0;
  margin-top: 1rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.quote-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-left: 3px solid #ffd700;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 0 0.5rem 0.5rem 0;
}

.quote-text {
  font-size: 1.25rem;
  color: #e0e0e0;
  font-style: italic;
  line-height: 1.8;
}

.quote-author {
  margin-top: 1rem;
  color: #ffd700;
  font-weight: bold;
  text-align: right;
}

.feature-card {
  background: rgba(30, 30, 47, 0.9);
  border: 1px solid rgba(255, 215, 0, 0.2);
}

@media (max-width: 768px) {
  .title-text {
    font-size: 1.75rem;
  }
  
  .quote-text {
    font-size: 1rem;
  }
}
</style>
