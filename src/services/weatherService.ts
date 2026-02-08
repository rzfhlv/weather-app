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

export interface WeatherResponse {
  current_weather: CurrentWeather
  daily: {
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
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
  async getWeather(lat: number, lon: number): Promise<WeatherResponse> {
    const res = await fetch(
      `${BASE_URL_WEATHER}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
    )

    if (!res.ok) throw new Error('Gagal mengambil data cuaca')

    return await res.json()
  },
}
