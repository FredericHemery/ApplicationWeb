import { describe, it, expect } from 'vitest'

describe('storage service', () => {
  describe('exported functions', () => {
    it('exporte initDB', async () => {
      const storage = await import('@/services/storage')
      expect(typeof storage.initDB).toBe('function')
    })

    it('exporte saveQuestions', async () => {
      const storage = await import('@/services/storage')
      expect(typeof storage.saveQuestions).toBe('function')
    })

    it('exporte getQuestions', async () => {
      const storage = await import('@/services/storage')
      expect(typeof storage.getQuestions).toBe('function')
    })

    it('exporte saveAnswer', async () => {
      const storage = await import('@/services/storage')
      expect(typeof storage.saveAnswer).toBe('function')
    })

    it('exporte saveScore', async () => {
      const storage = await import('@/services/storage')
      expect(typeof storage.saveScore).toBe('function')
    })

    it('exporte getScores', async () => {
      const storage = await import('@/services/storage')
      expect(typeof storage.getScores).toBe('function')
    })
  })
})
