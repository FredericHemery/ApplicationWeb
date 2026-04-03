<script setup>
defineProps({
  entries: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="overflow-hidden bg-card border rounded-lg p-4">
    <h3 class="text-lg font-semibold mb-4">Classement des Fans</h3>

    <div class="relative">
      <div class="flex gap-8 animate-marquee whitespace-nowrap">
        <div
          v-for="(entry, index) in entries"
          :key="entry.id || index"
          class="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
        >
          <span class="font-bold text-primary">#{{ index + 1 }}</span>
          <span class="font-medium">{{ entry.pseudo }}</span>
          <span class="text-muted-foreground">{{ entry.score }}/{{ entry.total }}</span>
        </div>

        <div
          v-for="(entry, index) in entries"
          :key="'dup-' + (entry.id || index)"
          class="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
        >
          <span class="font-bold text-primary">#{{ index + 1 }}</span>
          <span class="font-medium">{{ entry.pseudo }}</span>
          <span class="text-muted-foreground">{{ entry.score }}/{{ entry.total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
