import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function sanitizeString(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 20)
}

export function isValidPseudo(str) {
  if (typeof str !== 'string') return false
  const trimmed = str.trim()
  return trimmed.length >= 2 && trimmed.length <= 20 && /^[a-zA-Z0-9\s]+$/.test(trimmed)
}

export function validateScore(score) {
  const num = parseInt(score, 10)
  if (isNaN(num) || num < 0 || num > 9) return 0
  return num
}
