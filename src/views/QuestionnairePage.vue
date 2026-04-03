<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import QuestionCard from '@/components/QuestionCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import LeaderboardTicker from '@/components/LeaderboardTicker.vue'
import { getValidationState } from '@/services/validator'

const store = useQuizStore()
const localPseudo = ref('')
const charRejected = ref(false)

onMounted(() => {
  store.loadLeaderboard()
})

const stepLabels = {
  1: 'Personnages',
  2: 'Films',
  3: 'Planetes'
}

const pseudoStatus = computed(() => {
  return getValidationState(localPseudo.value)
})

const handleInput = (event) => {
  const value = event.target.value
  const lastChar = value.slice(-1)
  const isValidChar = /^[a-zA-Z0-9\s]$/.test(lastChar) || lastChar === ''
  
  if (!isValidChar && value.length > localPseudo.value.length) {
    charRejected.value = true
    event.target.value = localPseudo.value
    setTimeout(() => { charRejected.value = false }, 1500)
    return
  }
  
  localPseudo.value = value
}

const allQuestionsAnswered = () => {
  return store.questionsForCurrentStep.every(q => 
    store.answers.some(a => a.questionId === q.id)
  )
}

const handleQuestionAnswered = () => {
  // Optionnel : auto-scroll ou feedback
}

const handleStartQuiz = () => {
  if (pseudoStatus.value === 'invalid') return
  store.setPseudo(localPseudo.value.trim() || 'Anonyme')
  store.startQuiz()
  store.loadLeaderboard()
}
</script>

<template>
  <div class="page-container">
    <div class="page-content">
      <div v-if="!store.quizStarted">
        <div class="page-header">
          <span class="page-icon">🚀</span>
          <h1 class="page-title">Quiz Star Wars</h1>
          <p class="page-subtitle">Teste tes connaissances sur l'univers Star Wars !</p>
        </div>

        <div v-if="store.sortedLeaderboard.length > 0" class="mb-8">
          <LeaderboardTicker :entries="store.sortedLeaderboard" />
        </div>

        <div class="page-card">
          <div class="text-center mb-6">
            <p class="text-white/60 mb-6">
              3 etapes | 9 questions | Decouvre ta note finale
            </p>
            <input
              :value="localPseudo"
              type="text"
              placeholder="Entre ton pseudo"
              :class="[
                'w-full max-w-xs mx-auto px-4 py-3 border rounded-lg text-center bg-background/50 focus:outline-none focus:ring-2 transition-colors',
                pseudoStatus === 'valid' ? 'border-green-500 focus:ring-green-500' : 
                pseudoStatus === 'invalid' ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-amber-500'
              ]"
              maxlength="20"
              @input="handleInput"
            />
            <p v-if="charRejected" class="text-red-400 text-sm mt-2 font-medium">
              Caracteres non autorises (lettres et chiffres uniquement)
            </p>
            <p v-else-if="pseudoStatus === 'invalid'" class="text-red-400 text-sm mt-2">
              Minimum 2 caracteres
            </p>
            <p v-else-if="pseudoStatus === 'valid'" class="text-green-400 text-sm mt-2">
              OK
            </p>
            <p v-else class="text-white/40 text-sm mt-2">
              2-20 caracteres, lettres et chiffres uniquement
            </p>
          </div>
          <button
            @click="handleStartQuiz"
            :disabled="pseudoStatus === 'invalid'"
            :class="[
              'w-full py-3 rounded-lg font-semibold transition-all',
              pseudoStatus === 'invalid' 
                ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:shadow-lg hover:shadow-amber-500/30'
            ]"
          >
            Commencer le quiz
          </button>
        </div>
      </div>

      <div v-else-if="store.quizFinished">
        <div class="page-header">
          <span class="page-icon">🎉</span>
          <h1 class="page-title">Quiz Termine !</h1>
        </div>

        <div class="page-card text-center mb-8">
          <p class="text-white/60 mb-2">Ton score</p>
          <p class="text-7xl font-bold text-amber-400 mb-2">
            {{ store.score }}/{{ store.questions.length }}
          </p>
          <p class="text-xl text-white/80">
            {{ Math.round((store.score / store.questions.length) * 100) }}% de bonnes reponses
          </p>
        </div>

        <div class="page-card mb-8">
          <h2 class="text-xl font-semibold text-amber-400 mb-4 text-center">Recapitulatif</h2>
          <div class="space-y-2">
            <div
              v-for="answer in store.answers"
              :key="answer.questionId"
              class="flex items-center gap-3 p-2 rounded bg-white/5"
            >
              <span
                :class="answer.isCorrect ? 'text-green-400' : 'text-red-400'"
                class="text-lg"
              >
                {{ answer.isCorrect ? '✓' : '✗' }}
              </span>
              <span class="text-white/80 text-sm">
                {{ store.questions.find(q => q.id === answer.questionId)?.question }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="store.sortedLeaderboard.length > 0" class="mb-8">
          <LeaderboardTicker :entries="store.sortedLeaderboard" />
        </div>

        <div class="page-card">
          <button
            @click="store.resetQuiz()"
            class="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            Recommencer
          </button>
        </div>
      </div>

      <div v-else>
        <div class="page-header">
          <span class="page-icon">🚀</span>
          <h1 class="page-title">Quiz Star Wars</h1>
        </div>

        <div class="page-card mb-6">
          <ProgressBar :value="store.progress" label="Progression globale" />
        </div>

        <div class="page-card mb-4">
          <ProgressBar :value="store.stepProgress" :label="`Etape ${store.currentStep} : ${stepLabels[store.currentStep]}`" />
        </div>

        <div class="flex justify-center gap-2 mb-6">
          <button
            v-for="step in store.totalSteps"
            :key="step"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              step === store.currentStep
                ? 'bg-amber-500 text-black'
                : 'bg-white/10 text-white/50'
            ]"
            disabled
          >
            {{ stepLabels[step] }}
          </button>
        </div>

        <div class="space-y-4 mb-8">
          <QuestionCard
            v-for="question in store.questionsForCurrentStep"
            :key="question.id"
            :question="question"
            @answered="handleQuestionAnswered"
          />
        </div>

        <div class="flex justify-between">
          <button
            v-if="store.currentStep > 1"
            @click="store.previousStep()"
            class="px-6 py-3 border border-white/20 rounded-lg font-medium text-white/80 hover:bg-white/10 transition-colors"
          >
            Etape precedente
          </button>
          <div v-else />

          <button
            v-if="allQuestionsAnswered()"
            @click="store.nextStep()"
            class="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            {{ store.currentStep === store.totalSteps ? 'Voir les resultats' : 'Etappe suivante' }}
          </button>
          <button
            v-else
            class="px-6 py-3 bg-white/10 text-white/40 rounded-lg font-medium cursor-not-allowed"
            disabled
          >
            Reponds a toutes les questions
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 3rem 1.5rem;
}

.page-content {
  max-width: 700px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
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
</style>
