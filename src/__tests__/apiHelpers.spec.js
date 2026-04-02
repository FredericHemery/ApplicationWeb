import { describe, it, expect, vi, afterEach } from 'vitest'
import { creerFiltreNumerique, validerSexe } from '@/services/apiHelpers'

describe('apiHelpers', () => {
  describe('creerFiltreNumerique', () => {
    it('cree un filtre avec un nombre', () => {
      const result = creerFiltreNumerique('annee', 2025)
      expect(result).toBe('annee=2025')
    })
  })

  describe('validerSexe', () => {
    it('retourne M pour garcon', () => {
      expect(validerSexe('M')).toBe('M')
    })

    it('retourne F pour fille', () => {
      expect(validerSexe('F')).toBe('F')
    })

    it('retourne all pour valeur invalide', () => {
      expect(validerSexe('X')).toBe('all')
    })
  })
})
