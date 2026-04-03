const PATTERNS = {
  PSEUDO: /^[a-zA-Z0-9\s]{2,20}$/,
  SEARCH: /^[a-zA-Z0-9\s]*$/,
  SAFE_CHARS: /^[a-zA-Z0-9\s]+$/,
  DANGEROUS_CHARS: /[<>'"&]/g
}

const LIMITS = {
  PSEUDO_MIN: 2,
  PSEUDO_MAX: 20,
  SCORE_MIN: 0,
  SCORE_MAX: 9
}

export function sanitizeInput(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(PATTERNS.DANGEROUS_CHARS, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, LIMITS.PSEUDO_MAX)
}

export function validatePseudo(str) {
  if (typeof str !== 'string') return false
  const trimmed = str.trim()
  return PATTERNS.PSEUDO.test(trimmed)
}

export function validateSearch(str) {
  if (typeof str !== 'string') return false
  return PATTERNS.SEARCH.test(str)
}

export function validateScore(value) {
  const num = parseInt(value, 10)
  if (isNaN(num)) return 0
  return Math.max(LIMITS.SCORE_MIN, Math.min(LIMITS.SCORE_MAX, num))
}

export function sanitizeForStorage(str) {
  return sanitizeInput(str)
}

export function getValidationState(value, minLength = LIMITS.PSEUDO_MIN) {
  const trimmed = (value || '').trim()
  if (trimmed.length === 0) return 'empty'
  if (trimmed.length < minLength) return 'invalid'
  if (!PATTERNS.SAFE_CHARS.test(trimmed)) return 'invalid'
  return 'valid'
}
