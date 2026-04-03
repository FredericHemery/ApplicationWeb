import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useQuizStore } from '@/stores/quizStore'

vi.mock('@/services/storage', () => ({
  saveQuestions: vi.fn().mockResolvedValue(undefined),
  saveAnswer: vi.fn().mockResolvedValue(undefined),
  saveScore: vi.fn().mockResolvedValue(undefined),
  getScores: vi.fn().mockResolvedValue([])
}))

describe('quizStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('a 9 questions par defaut', () => {
      const store = useQuizStore()
      expect(store.questions).toHaveLength(9)
    })

    it('commence a letape 1', () => {
      const store = useQuizStore()
      expect(store.currentStep).toBe(1)
    })

    it('nest pas demarre', () => {
      const store = useQuizStore()
      expect(store.quizStarted).toBe(false)
      expect(store.quizFinished).toBe(false)
    })
  })

  describe('startQuiz', () => {
    it('demarre le quiz', () => {
      const store = useQuizStore()
      store.startQuiz()
      expect(store.quizStarted).toBe(true)
      expect(store.quizFinished).toBe(false)
    })

    it('remet les reponses a zero', () => {
      const store = useQuizStore()
      store.startQuiz()
      expect(store.answers).toHaveLength(0)
    })

    it('remet le score a zero', () => {
      const store = useQuizStore()
      store.startQuiz()
      expect(store.score).toBe(0)
    })
  })

  describe('answerQuestion', () => {
    it('ajoute une reponse', () => {
      const store = useQuizStore()
      store.answerQuestion(1, 2)
      expect(store.answers).toHaveLength(1)
      expect(store.answers[0].questionId).toBe(1)
      expect(store.answers[0].selectedIndex).toBe(2)
    })

    it('detects une bonne reponse', () => {
      const store = useQuizStore()
      store.answerQuestion(1, 2)
      expect(store.answers[0].isCorrect).toBe(true)
    })

    it('detects une mauvaise reponse', () => {
      const store = useQuizStore()
      store.answerQuestion(1, 0)
      expect(store.answers[0].isCorrect).toBe(false)
    })

    it('met a jour une reponse existante', () => {
      const store = useQuizStore()
      store.answerQuestion(1, 2)
      store.answerQuestion(1, 0)
      expect(store.answers).toHaveLength(1)
      expect(store.answers[0].selectedIndex).toBe(0)
    })
  })

  describe('nextStep', () => {
    it('passe a etape 2', () => {
      const store = useQuizStore()
      store.startQuiz()
      store.answerQuestion(1, 0)
      store.answerQuestion(2, 0)
      store.answerQuestion(3, 0)
      store.nextStep()
      expect(store.currentStep).toBe(2)
    })

    it('termine le quiz a etape 3', () => {
      const store = useQuizStore()
      store.startQuiz()
      store.answerQuestion(1, 0)
      store.answerQuestion(2, 0)
      store.answerQuestion(3, 0)
      store.nextStep()
      store.answerQuestion(4, 0)
      store.answerQuestion(5, 0)
      store.answerQuestion(6, 0)
      store.nextStep()
      store.answerQuestion(7, 0)
      store.answerQuestion(8, 0)
      store.answerQuestion(9, 0)
      store.nextStep()
      expect(store.quizFinished).toBe(true)
    })
  })

  describe('previousStep', () => {
    it('retourne a etape 1', () => {
      const store = useQuizStore()
      store.startQuiz()
      store.answerQuestion(1, 0)
      store.answerQuestion(2, 0)
      store.answerQuestion(3, 0)
      store.nextStep()
      store.previousStep()
      expect(store.currentStep).toBe(1)
    })

    it('ne fait rien a etape 1', () => {
      const store = useQuizStore()
      store.startQuiz()
      store.previousStep()
      expect(store.currentStep).toBe(1)
    })
  })

  describe('finishQuiz', () => {
    it('calcule le score', () => {
      const store = useQuizStore()
      store.startQuiz()
      store.answerQuestion(1, 2)
      store.answerQuestion(2, 1)
      store.answerQuestion(3, 0)
      store.nextStep()
      store.answerQuestion(4, 1)
      store.answerQuestion(5, 2)
      store.answerQuestion(6, 0)
      store.nextStep()
      store.answerQuestion(7, 1)
      store.answerQuestion(8, 3)
      store.answerQuestion(9, 0)
      store.nextStep()
      expect(store.score).toBe(9)
    })
  })

  describe('resetQuiz', () => {
    it('remet tout a zero', () => {
      const store = useQuizStore()
      store.startQuiz()
      store.answerQuestion(1, 2)
      store.finishQuiz()
      store.resetQuiz()
      expect(store.quizStarted).toBe(false)
      expect(store.quizFinished).toBe(false)
      expect(store.answers).toHaveLength(0)
      expect(store.score).toBe(0)
    })
  })

  describe('setPseudo', () => {
    it('definit le pseudo', () => {
      const store = useQuizStore()
      store.setPseudo('Luke')
      expect(store.pseudo).toBe('Luke')
    })
  })

  describe('computed properties', () => {
    it('questionsForCurrentStep retourne 3 questions', () => {
      const store = useQuizStore()
      expect(store.questionsForCurrentStep).toHaveLength(3)
    })

    it('progress calcule correctement', () => {
      const store = useQuizStore()
      store.startQuiz()
      expect(store.progress).toBe(0)
      store.answerQuestion(1, 0)
      expect(store.progress).toBe(11)
    })

    it('sortedLeaderboard tri par score', () => {
      const store = useQuizStore()
      store.leaderboard = [
        { pseudo: 'Bob', score: 5, total: 9 },
        { pseudo: 'Alice', score: 9, total: 9 },
        { pseudo: 'Charlie', score: 7, total: 9 }
      ]
      const sorted = store.sortedLeaderboard
      expect(sorted[0].pseudo).toBe('Alice')
      expect(sorted[1].pseudo).toBe('Charlie')
      expect(sorted[2].pseudo).toBe('Bob')
    })

    it('limite le leaderboard a 10 entrees', () => {
      const store = useQuizStore()
      store.leaderboard = Array.from({ length: 15 }, (_, i) => ({
        pseudo: `Player${i}`,
        score: i,
        total: 9
      }))
      expect(store.sortedLeaderboard).toHaveLength(10)
    })
  })
})
