import { ref } from 'vue'
import { geoService, weatherService } from '../services/weatherService'
import type { CityResult, CurrentWeather } from '../services/weatherService'

export function useWeather() {
  const weatherData = ref<CurrentWeather | null>(null)
  const cityInfo = ref<CityResult | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchWeather = async (query: string) => {
    if (!query) return

    loading.value = true
    error.value = null

    try {
      const city = await geoService.searchCity(query)
      if (city === undefined) {
        throw new Error('Terjadi kesalahan')
      }
      cityInfo.value = city

      const weather = await weatherService.getWeather(city.latitude, city.longitude)
      weatherData.value = weather.current_weather
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan'
      weatherData.value = null
      cityInfo.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    weatherData,
    cityInfo,
    loading,
    error,
    fetchWeather,
  }
}
