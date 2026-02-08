import { ref } from 'vue'
import { geoService, weatherService } from '../services/weatherService'
import type { CityResult, CurrentWeather, ForecastDay } from '../services/weatherService'

export function useWeather() {
  const weatherData = ref<CurrentWeather | null>(null)
  const forecastData = ref<ForecastDay[]>([])
  const cityInfo = ref<CityResult | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const suggestion = ref<boolean>(true)

  const fetchWeather = async (query: string) => {
    if (!query) return

    loading.value = true
    error.value = null
    suggestion.value = false

    try {
      const city = await geoService.searchCity(query)
      if (city === undefined) {
        throw new Error('Terjadi kesalahan')
      }
      cityInfo.value = city

      const { current, forecast } = await weatherService.getWeather(city.latitude, city.longitude)
      weatherData.value = current
      forecastData.value = forecast
    } catch (err: any) {
      error.value = err.message || 'Terjadi kesalahan'
      weatherData.value = null
      cityInfo.value = null
      suggestion.value = true
    } finally {
      loading.value = false
    }
  }

  return {
    weatherData,
    forecastData,
    cityInfo,
    loading,
    error,
    suggestion,
    fetchWeather,
  }
}
