<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import QuestionCard from '@/components/QuestionCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import LeaderboardTicker from '@/components/LeaderboardTicker.vue'
import { validatePseudo, getValidationState } from '@/services/validator'

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
  <div class="container mx-auto py-10 px-6">
    <div v-if="!store.quizStarted" class="max-w-2xl mx-auto text-center">
      <h1 class="text-4xl font-bold tracking-tight mb-4">Quiz Star Wars</h1>
      <p class="text-lg text-muted-foreground mb-8">
        Teste tes connaissances sur l'univers Star Wars !
      </p>
      
      <div v-if="store.sortedLeaderboard.length > 0" class="mb-8">
        <LeaderboardTicker :entries="store.sortedLeaderboard" />
      </div>

      <p class="mb-4 text-muted-foreground">
        3 etapes | 9 questions | Decouvre ta note finale
      </p>
      <div class="mb-6">
        <input
          :value="localPseudo"
          type="text"
          placeholder="Entre ton pseudo"
          :class="[
            'w-full max-w-xs mx-auto px-4 py-3 border rounded-lg text-center bg-background focus:outline-none focus:ring-2 transition-colors',
            pseudoStatus === 'valid' ? 'border-green-500 focus:ring-green-500' : 
            pseudoStatus === 'invalid' ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-primary'
          ]"
          maxlength="20"
          @input="handleInput"
        />
        <p v-if="charRejected" class="text-red-500 text-sm mt-2 font-medium">
          Caracteres non autorises (lettres et chiffres uniquement)
        </p>
        <p v-else-if="pseudoStatus === 'invalid'" class="text-red-500 text-sm mt-2">
          Minimum 2 caracteres
        </p>
        <p v-else-if="pseudoStatus === 'valid'" class="text-green-600 text-sm mt-2">
          OK
        </p>
        <p v-else class="text-muted-foreground text-sm mt-2">
          2-20 caracteres, lettres et chiffres uniquement
        </p>
      </div>
      <button
        @click="handleStartQuiz"
        :disabled="pseudoStatus === 'invalid'"
        :class="[
          'px-6 py-3 rounded-lg font-medium transition-colors',
          pseudoStatus === 'invalid' 
            ? 'bg-muted text-muted-foreground cursor-not-allowed' 
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        ]"
      >
        Commencer le quiz
      </button>
    </div>

    <div v-else-if="store.quizFinished" class="max-w-2xl mx-auto text-center">
      <h1 class="text-4xl font-bold tracking-tight mb-4">Quiz Termine !</h1>
      
      <div class="bg-card border rounded-lg p-8 mb-8">
        <p class="text-muted-foreground mb-2">Ton score</p>
        <p class="text-6xl font-bold text-primary mb-2">
          {{ store.score }}/{{ store.questions.length }}
        </p>
        <p class="text-lg">
          {{ Math.round((store.score / store.questions.length) * 100) }}% de bonnes reponses
        </p>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Recapitulatif</h2>
        <div class="text-left space-y-2">
          <div
            v-for="answer in store.answers"
            :key="answer.questionId"
            class="flex items-center gap-2"
          >
            <span
              :class="answer.isCorrect ? 'text-green-600' : 'text-red-600'"
            >
              {{ answer.isCorrect ? '✓' : '✗' }}
            </span>
            <span class="text-sm">
              {{ store.questions.find(q => q.id === answer.questionId)?.question }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="store.sortedLeaderboard.length > 0" class="mb-8">
        <LeaderboardTicker :entries="store.sortedLeaderboard" />
      </div>

      <button
        @click="store.resetQuiz()"
        class="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Recommencer
      </button>
    </div>

    <div v-else class="max-w-2xl mx-auto">
      <div class="mb-6">
        <ProgressBar :value="store.progress" label="Progression globale" />
      </div>

      <div class="mb-4">
        <ProgressBar :value="store.stepProgress" :label="`Etape ${store.currentStep} : ${stepLabels[store.currentStep]}`" />
      </div>

      <div class="flex gap-2 mb-6">
        <button
          v-for="step in store.totalSteps"
          :key="step"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            step === store.currentStep
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
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
          class="px-6 py-3 border border-input rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Etape precedente
        </button>
        <div v-else />

        <button
          v-if="allQuestionsAnswered()"
          @click="store.nextStep()"
          class="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {{ store.currentStep === store.totalSteps ? 'Voir les resultats' : 'Etappe suivante' }}
        </button>
        <button
          v-else
          class="px-6 py-3 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed"
          disabled
        >
          Reponds a toutes les questions
        </button>
      </div>
    </div>
  </div>
</template>
