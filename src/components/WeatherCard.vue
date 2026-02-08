<script setup lang="ts">
interface City {
  name: string
  admin?: string
  country: string
}

interface Weather {
  temperature: number
  windspeed: number
  weathercode: number
  time: string
}

const props = defineProps<{
  weather: Weather
  city: City
}>()

const formattedTime = new Date(props.weather.time).toLocaleString('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
})
</script>

<template>
  <div
    class="bg-white/20 backdrop-blur-lg p-8 rounded-[2rem] text-white shadow-2xl border border-white/30 transition-all duration-500 hover:scale-[1.02]"
  >
    <div class="text-center mb-6">
      <h2 class="text-3xl font-bold tracking-tight">{{ city.name }}</h2>
      <p class="text-sm font-medium opacity-70 mt-1 uppercase tracking-widest">
        {{ city.admin ? `${city.admin}` : '' }}{{ city.country }}
      </p>
    </div>

    <div class="flex flex-col items-center py-4">
      <div class="text-7xl font-black drop-shadow-lg mb-2">
        {{ Math.round(weather.temperature) }}°C
      </div>
      <p class="text-lg font-medium opacity-90">Kondisi Saat Ini</p>
    </div>

    <div class="grid grid-cols-2 gap-6 mt-8 border-t border-white/20 pt-6">
      <div class="flex flex-col items-center border-r border-white/10">
        <span class="text-[10px] uppercase tracking-widest opacity-60 mb-1">Angin</span>
        <span class="text-lg font-bold"
          >{{ weather.windspeed }} <small class="text-xs font-normal">km/h</small></span
        >
      </div>
      <div class="flex flex-col items-center">
        <span class="text-[10px] uppercase tracking-widest opacity-60 mb-1">Waktu</span>
        <span class="text-lg font-bold">{{ formattedTime }}</span>
      </div>
    </div>
  </div>
</template>
