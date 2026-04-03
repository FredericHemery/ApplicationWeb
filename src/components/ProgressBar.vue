<script setup>
defineProps({
  value: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="w-full">
    <div v-if="label" class="flex justify-between mb-1">
      <span class="text-sm font-medium">{{ label }}</span>
      <span class="text-sm text-muted-foreground">{{ value }}%</span>
    </div>
    <div class="w-full bg-secondary rounded-full h-2">
      <div
        class="bg-primary h-2 rounded-full transition-all duration-300"
        :style="{ width: `${value}%` }"
      />
    </div>
  </div>
</template>
