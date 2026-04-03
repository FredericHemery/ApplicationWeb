import { describe, it, expect } from 'vitest'
import { sanitizeInput, validatePseudo, validateScore, sanitizeForStorage, getValidationState } from '@/services/validator'

describe('validator service', () => {
  describe('sanitizeInput', () => {
    it('retourne une chaine normale', () => {
      expect(sanitizeInput('Luke')).toBe('Luke')
    })

    it('retire les caracteres speciaux dangereux', () => {
      const result = sanitizeInput('<script>alert(1)</script>')
      expect(result).not.toContain('<')
      expect(result).not.toContain('>')
    })

    it('ne garde que lettres, chiffres et espaces', () => {
      expect(sanitizeInput('Luke 123')).toBe('Luke 123')
      expect(sanitizeInput("Luke's")).toBe('Lukes')
    })

    it('limite a 20 caracteres', () => {
      const long = 'a'.repeat(30)
      expect(sanitizeInput(long).length).toBe(20)
    })

    it('retourne vide pour non-string', () => {
      expect(sanitizeInput(123)).toBe('')
      expect(sanitizeInput(null)).toBe('')
      expect(sanitizeInput(undefined)).toBe('')
    })

    it('supprime les espaces multiples', () => {
      expect(sanitizeInput('Luke    Skywalker')).toBe('Luke Skywalker')
    })

    it('trim les espaces', () => {
      expect(sanitizeInput('  Luke  ')).toBe('Luke')
    })
  })

  describe('validatePseudo', () => {
    it('accepte un pseudo valide', () => {
      expect(validatePseudo('Luke')).toBe(true)
      expect(validatePseudo('Luke 123')).toBe(true)
      expect(validatePseudo('AB')).toBe(true)
    })

    it('rejette un pseudo trop court', () => {
      expect(validatePseudo('A')).toBe(false)
      expect(validatePseudo('')).toBe(false)
    })

    it('rejette un pseudo avec caracteres speciaux', () => {
      expect(validatePseudo('Luke<script>')).toBe(false)
      expect(validatePseudo("Luke's")).toBe(false)
      expect(validatePseudo('Luke-Skywalker')).toBe(false)
    })

    it('rejette les non-strings', () => {
      expect(validatePseudo(123)).toBe(false)
      expect(validatePseudo(null)).toBe(false)
    })
  })

  describe('validateScore', () => {
    it('accepte un score valide', () => {
      expect(validateScore(5)).toBe(5)
      expect(validateScore(0)).toBe(0)
      expect(validateScore(9)).toBe(9)
    })

    it('convertit les chaines numeriques', () => {
      expect(validateScore('7')).toBe(7)
    })

    it('retourne 0 pour valeur invalide', () => {
      expect(validateScore('abc')).toBe(0)
      expect(validateScore(NaN)).toBe(0)
    })

    it('limite entre 0 et 9', () => {
      expect(validateScore(15)).toBe(9)
      expect(validateScore(-5)).toBe(0)
    })
  })

  describe('sanitizeForStorage', () => {
    it('est equivalent a sanitizeInput', () => {
      expect(sanitizeForStorage('Luke')).toBe(sanitizeInput('Luke'))
      expect(sanitizeForStorage('<script>')).toBe(sanitizeInput('<script>'))
    })
  })

  describe('getValidationState', () => {
    it('retourne empty pour vide', () => {
      expect(getValidationState('')).toBe('empty')
      expect(getValidationState(null)).toBe('empty')
    })

    it('retourne invalid pour trop court', () => {
      expect(getValidationState('A')).toBe('invalid')
    })

    it('retourne valid pour valeur correcte', () => {
      expect(getValidationState('Luke')).toBe('valid')
      expect(getValidationState('AB')).toBe('valid')
    })

    it('retourne invalid pour caracteres speciaux', () => {
      expect(getValidationState('<script>')).toBe('invalid')
    })
  })
})
