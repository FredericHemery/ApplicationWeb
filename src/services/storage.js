const DB_NAME = 'starwars-quiz'
const DB_VERSION = 2
const STORE_QUESTIONS = 'questions'
const STORE_ANSWERS = 'answers'
const STORE_SCORES = 'scores'

let db = null

export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = event.target.result

      if (!database.objectStoreNames.contains(STORE_QUESTIONS)) {
        database.createObjectStore(STORE_QUESTIONS, { keyPath: 'id' })
      }

      if (!database.objectStoreNames.contains(STORE_ANSWERS)) {
        database.createObjectStore(STORE_ANSWERS, { keyPath: 'id', autoIncrement: true })
      }

      if (!database.objectStoreNames.contains(STORE_SCORES)) {
        database.createObjectStore(STORE_SCORES, { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

export async function saveQuestions(questions) {
  const database = await initDB()
  const transaction = database.transaction([STORE_QUESTIONS], 'readwrite')
  const store = transaction.objectStore(STORE_QUESTIONS)

  await store.clear()

  for (const question of questions) {
    store.put(question)
  }

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}

export async function getQuestions() {
  const database = await initDB()
  const transaction = database.transaction([STORE_QUESTIONS], 'readonly')
  const store = transaction.objectStore(STORE_QUESTIONS)
  const request = store.getAll()

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function saveAnswer(answer) {
  const database = await initDB()
  const transaction = database.transaction([STORE_ANSWERS], 'readwrite')
  const store = transaction.objectStore(STORE_ANSWERS)
  const request = store.put(answer)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function saveScore(scoreEntry) {
  const database = await initDB()
  const transaction = database.transaction([STORE_SCORES], 'readwrite')
  const store = transaction.objectStore(STORE_SCORES)
  const request = store.put(scoreEntry)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function getScores() {
  const database = await initDB()
  const transaction = database.transaction([STORE_SCORES], 'readonly')
  const store = transaction.objectStore(STORE_SCORES)
  const request = store.getAll()

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
