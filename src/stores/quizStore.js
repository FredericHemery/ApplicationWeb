import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { saveQuestions, saveAnswer, saveScore, getScores } from '@/services/storage'
import { sanitizeForStorage, validateScore } from '@/services/validator'

const QUESTIONS = [
  {
    id: 1,
    step: 1,
    question: 'Qui est le pere de Luke Skywalker ?',
    options: ['Obi-Wan', 'Han Solo', 'Dark Vador', 'Chewbacca'],
    correctAnswer: 2
  },
  {
    id: 2,
    step: 1,
    question: 'Comment s\'appelle le droide de Luke ?',
    options: ['C-3PO', 'R2-D2', 'BB-8', 'B0-MR'],
    correctAnswer: 1
  },
  {
    id: 3,
    step: 1,
    question: 'Qui a construit C-3PO ?',
    options: ['Anakin Skywalker', 'Obi-Wan Kenobi', 'Luke Skywalker', 'Leia Organa'],
    correctAnswer: 0
  },
  {
    id: 4,
    step: 2,
    question: 'En quelle annee est sorti le premier film Star Wars ?',
    options: ['1975', '1977', '1979', '1980'],
    correctAnswer: 1
  },
  {
    id: 5,
    step: 2,
    question: 'Combien y a-t-il de films de la saga principale ?',
    options: ['6', '7', '9', '11'],
    correctAnswer: 2
  },
  {
    id: 6,
    step: 2,
    question: 'Quel est le premier ordre militaire cree par l\'Empire ?',
    options: ['Ordre 66', 'Ordre 77', 'Ordre 99', 'Ordre 100'],
    correctAnswer: 0
  },
  {
    id: 7,
    step: 3,
    question: 'Sur quelle planete se trouve la base rebelle Echo ?',
    options: ['Tatooine', 'Hoth', 'Yavin 4', 'Alderaan'],
    correctAnswer: 1
  },
  {
    id: 8,
    step: 3,
    question: 'De quelle planete vient Yoda ?',
    options: ['Coruscant', 'Naboo', 'Jakku', 'Inconnu'],
    correctAnswer: 3
  },
  {
    id: 9,
    step: 3,
    question: 'Ou se trouve la planete Mustafar ?',
    options: ['Bordure exterieure', 'Noyau', 'Colonie', 'Espace inconnu'],
    correctAnswer: 0
  }
]

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref(QUESTIONS)
  const currentStep = ref(1)
  const currentQuestionIndex = ref(0)
  const answers = ref([])
  const quizStarted = ref(false)
  const quizFinished = ref(false)
  const score = ref(0)
  const pseudo = ref('')
  const leaderboard = ref([])
  const maxLeaderboard = 10

  const currentQuestion = computed(() => {
    return questions.value.find(q => q.step === currentStep.value)
  })

  const questionsForCurrentStep = computed(() => {
    return questions.value.filter(q => q.step === currentStep.value)
  })

  const totalSteps = computed(() => 3)

  const progress = computed(() => {
    const totalQuestions = questions.value.length
    const answeredQuestions = answers.value.length
    return Math.round((answeredQuestions / totalQuestions) * 100)
  })

  const stepProgress = computed(() => {
    const totalStepQuestions = questionsForCurrentStep.value.length
    const stepAnswers = answers.value.filter(a => a.step === currentStep.value).length
    return Math.round((stepAnswers / totalStepQuestions) * 100)
  })

  const sortedLeaderboard = computed(() => {
    return [...leaderboard.value]
      .sort((a, b) => b.score - a.score)
      .slice(0, maxLeaderboard)
  })

  async function loadLeaderboard() {
    const scores = await getScores()
    leaderboard.value = scores
      .filter(s => s.type !== 'result')
      .map(s => ({
        ...s,
        pseudo: sanitizeForStorage(s.pseudo) || 'Anonyme',
        score: validateScore(s.score),
        total: validateScore(s.total) || 9
      }))
  }

  function setPseudo(name) {
    pseudo.value = sanitizeForStorage(name) || 'Anonyme'
  }

  function startQuiz() {
    quizStarted.value = true
    currentStep.value = 1
    currentQuestionIndex.value = 0
    answers.value = []
    quizFinished.value = false
    score.value = 0
    saveQuestions(QUESTIONS)
  }

  function answerQuestion(questionId, selectedIndex) {
    const question = questions.value.find(q => q.id === questionId)
    const isCorrect = question && question.correctAnswer === selectedIndex

    const existingIndex = answers.value.findIndex(a => a.questionId === questionId)
    if (existingIndex >= 0) {
      answers.value[existingIndex] = { questionId, selectedIndex, isCorrect, step: currentStep.value }
    } else {
      answers.value.push({ questionId, selectedIndex, isCorrect, step: currentStep.value })
    }

    saveAnswer({ questionId, selectedIndex, isCorrect, step: currentStep.value })
  }

  function nextStep() {
    if (currentStep.value < totalSteps.value) {
      currentStep.value++
      currentQuestionIndex.value = 0
    } else {
      finishQuiz()
    }
  }

  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value--
      currentQuestionIndex.value = 0
    }
  }

  async function finishQuiz() {
    score.value = answers.value.filter(a => a.isCorrect).length
    quizFinished.value = true

    if (pseudo.value) {
      const entry = {
        type: 'score',
        pseudo: sanitizeForStorage(pseudo.value),
        score: validateScore(score.value),
        total: questions.value.length,
        date: new Date().toISOString()
      }
      await saveScore(entry)
      await loadLeaderboard()
    }
  }

  function resetQuiz() {
    quizStarted.value = false
    quizFinished.value = false
    currentStep.value = 1
    currentQuestionIndex.value = 0
    answers.value = []
    score.value = 0
    pseudo.value = ''
  }

  return {
    questions,
    currentStep,
    currentQuestionIndex,
    answers,
    quizStarted,
    quizFinished,
    score,
    pseudo,
    leaderboard,
    sortedLeaderboard,
    currentQuestion,
    questionsForCurrentStep,
    totalSteps,
    progress,
    stepProgress,
    loadLeaderboard,
    setPseudo,
    startQuiz,
    answerQuestion,
    nextStep,
    previousStep,
    finishQuiz,
    resetQuiz
  }
})
