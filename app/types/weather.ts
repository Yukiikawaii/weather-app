export type WeatherCondition = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

export type CurrentWeather = {
    city: string;
    country: string;
    temp: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDeg: number;
    visibility: number;
    condition: WeatherCondition;  
    sunrise: number;
    sunset: number;
    timezone: number;
    dt: number;
};
export type Theme = "light" | "dark";

export type ForecastDay = {
    date: string;      
    dt: number;
    tempMin: number;
    tempMax: number;
    condition: WeatherCondition;
};