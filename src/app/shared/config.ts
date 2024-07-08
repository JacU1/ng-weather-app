interface DefaultConfig {
    defaultLat: number,
    defaultLon: number,
    weatherApiUrl: string,
    locationApiUrl: string
}

export const config: DefaultConfig = {
    defaultLat: 51,
    defaultLon: 0,
    weatherApiUrl: 'https://api.openweathermap.org/data/2.5',
    locationApiUrl: 'https://api.geoapify.com/v1/geocode',
}
