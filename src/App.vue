<script setup lang="ts">
import { ref } from 'vue'
import { useWeather } from './composables/useWeather.ts'
import WeatherCard from './components/WeatherCard.vue'
import ForecastCard from './components/ForecastCard.vue'

const searchQuery = ref<string>('')

const { weatherData, forecastData, cityInfo, loading, error, suggestion, fetchWeather } = useWeather()

const handleSearch = () => {
  fetchWeather(searchQuery.value)
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-6"
  >
    <div class="w-full max-w-md mt-10">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
          Sky<span class="text-blue-300">Cast</span>
        </h1>
        <p class="text-white text-sm mt-1">Prakiraan cuaca akurat dalam genggaman</p>
      </div>

      <div class="flex flex-row gap-2 mb-8">
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="Cari kota (ex: Jakarta)..."
          class="flex-1 px-5 py-3 rounded-2xl outline-none shadow-xl text-grey-700 focus:ring-4 ring-blue-400/30 transition-all"
        />
        <button
          @click="handleSearch"
          class="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
        >
          {{ loading ? '...' : 'Cari' }}
        </button>
      </div>

      <div v-if="loading" class="text-white text-center animate-pulse">
        Sedang mencari lokasi...
      </div>

      <div
        v-if="error"
        class="bg-red-500/20 backdrop-blur-sm text-red-400 p-4 rounded-2xl mb-4 text-center border border-red-500/50"
      >
        {{ error }}
      </div>

      <div v-if="suggestion" class="text-white text-center">
        <p class="text-sm">Masukan nama kota untuk melihat cuaca.</p>
      </div>

      <div v-if="!loading" class="block w-full">
        <WeatherCard v-if="weatherData && cityInfo" :weather="weatherData" :city="cityInfo" />

        <ForecastCard v-if="weatherData" :days="forecastData" />
      </div>
    </div>
  </div>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>
