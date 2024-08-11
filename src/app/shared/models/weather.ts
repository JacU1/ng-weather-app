export interface WeatherData {
    coord: Coord
    weather: WeatherInfo[]
    base: string
    main: MainWeatherInfo
    visibility: number
    wind: WindInfo
    clouds: CloudsInfo
    dt: number
    sys: Sys
    timezone: number
    id: number
    name: string
    cod: number
  }
  
  export interface Coord {
    lon: number
    lat: number
  }
  
  export interface WeatherInfo {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface MainWeatherInfo {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  
  export interface WindInfo {
    speed: number
    deg: number
  }
  
  export interface CloudsInfo {
    all: number
  }
  
  export interface Sys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  