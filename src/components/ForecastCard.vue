<script setup lang="ts">
import type { ForecastDay } from '../services/weatherService'

const props = defineProps<{
  days: ForecastDay[]
}>()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: 'numeric' }).format(date)
}

const getWeatherLabel = (code: number) => {
  if (code === 0) return '☀️';
  if (code < 4) return '☁️';
  if (code < 70) return '🌧️';
  return '⛈️';
}
</script>

<template>
  <div class="mt-6 bg-white/10 backdrop-blur-md p-6 border border-white/20">
    <h3 class="text-white text-center font-bold mb-4 px-2">Ramalan 7 Hari</h3>
    <div class="space-y-4">
      <div v-for="day in days" :key="day.date" 
           class="flex items-center justify-between text-white px-2 py-1 border-b border-white/5 last:border-0">
        <span class="w-20 font-medium">{{ formatDate(day.date) }}</span>
        <span class="text-2xl">{{ getWeatherLabel(day.weatherCode) }}</span>
        <div class="flex gap-3 w-24 justify-end">
          <span class="font-bold">{{ Math.round(day.maxTemp) }}°</span>
          <span class="opacity-50">{{ Math.round(day.minTemp) }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>