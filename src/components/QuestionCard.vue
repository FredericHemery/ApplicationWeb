<script setup>
import { ref } from 'vue'
import { useQuizStore } from '@/stores/quizStore'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['answered'])

const store = useQuizStore()
const selectedOption = ref(null)

const hasAnswered = () => {
  return store.answers.some(a => a.questionId === props.question.id)
}

const isSelected = (index) => {
  const answer = store.answers.find(a => a.questionId === props.question.id)
  return answer && answer.selectedIndex === index
}

const getOptionClass = (index) => {
  const base = 'w-full p-4 text-left border rounded-lg transition-colors cursor-pointer'
  
  if (!hasAnswered()) {
    return `${base} hover:bg-accent border-input`
  }
  
  if (isSelected(index)) {
    return `${base} bg-primary/10 border-primary`
  }
  
  if (index === props.question.correctAnswer) {
    return `${base} bg-green-100 border-green-500 text-green-800`
  }
  
  return `${base} bg-destructive/5 border-input opacity-50`
}

const selectOption = (index) => {
  if (hasAnswered()) return
  
  selectedOption.value = index
  store.answerQuestion(props.question.id, index)
  emit('answered')
}
</script>

<template>
  <div class="bg-card border rounded-lg p-6 shadow-sm">
    <h3 class="text-lg font-semibold mb-4">{{ question.question }}</h3>
    
    <div class="space-y-3">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        :class="getOptionClass(index)"
        :disabled="hasAnswered()"
        @click="selectOption(index)"
      >
        <span class="font-medium">{{ String.fromCharCode(65 + index) }}.</span>
        {{ option }}
      </button>
    </div>

    <p v-if="hasAnswered()" class="mt-4 text-sm text-muted-foreground">
      Reponse enregistree
    </p>
  </div>
</template>
