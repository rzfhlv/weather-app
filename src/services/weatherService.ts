export interface CityResult {
  name: string
  latitude: number
  longitude: number
  admin?: string
  country: string
}

export interface GeoResponse {
  results?: CityResult[]
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  weathercode: number
  time: string
}

export interface ForecastDay {
  date: string
  maxTemp: number
  minTemp: number
  weatherCode: number
}

const BASE_URL_GEO = 'https://geocoding-api.open-meteo.com/v1/search'
const BASE_URL_WEATHER = 'https://api.open-meteo.com/v1/forecast'

export const geoService = {
  async searchCity(query: string): Promise<CityResult | undefined> {
    const res = await fetch(`${BASE_URL_GEO}?name=${query}&count=1&language=id&format=json`)
    const data: GeoResponse = await res.json()

    if (!data.results || data.results.length === 0) {
      throw new Error('Kota tidak ditemukan')
    }

    return data.results[0]
  },
}

export const weatherService = {
  async getWeather(lat: number, lon: number): Promise<{current: CurrentWeather, forecast: ForecastDay[] }> {
    const res = await fetch(
      `${BASE_URL_WEATHER}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
    )

    if (!res.ok) throw new Error('Gagal mengambil data cuaca')

    const data = await res.json()

    const forecast: ForecastDay[] = data.daily.time.map((t: string, index: number) => ({
      date: t,
      maxTemp: data.daily.temperature_2m_max[index],
      minTemp: data.daily.temperature_2m_min[index],
      weatherCode: data.daily.weathercode[index]
    }))

    return {
      current: data.current_weather,
      forecast: forecast
    }
  },
}
