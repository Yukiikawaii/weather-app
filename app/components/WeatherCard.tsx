
"use client"
import {
    Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog,
    Droplets, Wind, Gauge, Eye, StarIcon
} from "lucide-react";
import { CurrentWeather } from "../types/weather";

type WeatherCardProps = {
    weather: CurrentWeather;
    isFavorite: boolean;
    onToggleFavorite: (city: string) => void;
};

function getWeatherIcon(main: string) {
    switch (main.toLowerCase()) {
        case "clear":
            return <Sun size={64} className="text-amber-400" />;
        case "clouds":
            return <Cloud size={64} className="text-slate-400" />;
        case "rain":
        case "drizzle":
            return <CloudRain size={64} className="text-blue-400" />;
        case "snow":
            return <CloudSnow size={64} className="text-sky-200" />;
        case "thunderstorm":
            return <CloudLightning size={64} className="text-purple-400" />;
        case "mist":
        case "fog":
        case "haze":
            return <CloudFog size={64} className="text-slate-300" />;
        default:
            return <Cloud size={64} className="text-slate-400" />;
    }
}

export default function WeatherCard({ weather, isFavorite, onToggleFavorite }: WeatherCardProps) {
    if (!weather || !weather.condition) return null;

    const {
        city, country, temp, feelsLike, tempMin, tempMax,
        humidity, windSpeed, pressure, visibility, condition,
    } = weather;

    return (
        <div className="relative mx-auto w-full max-w-sm rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-sm dark:border-blue-900 dark:bg-[#0f1a3d]">

           
            <button
                onClick={() => onToggleFavorite(city)}
                className="absolute right-4 top-4 rounded-md p-1.5 hover:bg-blue-50 dark:hover:bg-blue-950"
                aria-label={isFavorite ? `Remove ${city} from favorites` : `Add ${city} to favorites`}
            >
                <StarIcon
                    size={20}
                    className={isFavorite ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}
                    fill={isFavorite ? "currentColor" : "none"}
                />
            </button>

            <div className="text-center">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    {city}, {country}
                </h2>
                <p className="mt-1 text-sm capitalize text-slate-500 dark:text-slate-400">
                    {condition.description}
                </p>
            </div>

            
            <div className="mt-4 flex items-center justify-center gap-4">
                {getWeatherIcon(condition.main)}
                <span className="text-6xl font-bold text-slate-800 dark:text-slate-100">
                    {Math.round(temp)}°
                </span>
            </div>

          
            <div className="mt-2 flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>Feels like {Math.round(feelsLike)}°</span>
                <span>·</span>
                <span>H: {Math.round(tempMax)}°</span>
                <span>L: {Math.round(tempMin)}°</span>
            </div>

        
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-blue-100 pt-4 dark:border-blue-900">
                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <Droplets size={18} className="text-blue-400" />
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Humidity</p>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{humidity}%</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <Wind size={18} className="text-blue-400" />
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Wind</p>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{windSpeed} m/s</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <Gauge size={18} className="text-blue-400" />
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Pressure</p>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{pressure} hPa</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <Eye size={18} className="text-blue-400" />
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Visibility</p>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{(visibility / 1000).toFixed(1)} km</p>
                    </div>
                </div>
            </div>
        </div>
    );
}