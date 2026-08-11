"use client"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from "lucide-react";
import { ForecastDay } from "./../types/weather";

type ForeCastDayProps = {
    day: ForecastDay;
};

function getIcon(main: string) {
    switch (main.toLowerCase()) {
        case "clear": return <Sun size={28} className="text-amber-400" />;
        case "clouds": return <Cloud size={28} className="text-slate-400" />;
        case "rain":
        case "drizzle": return <CloudRain size={28} className="text-blue-400" />;
        case "snow": return <CloudSnow size={28} className="text-sky-200" />;
        case "thunderstorm": return <CloudLightning size={28} className="text-purple-400" />;
        case "mist":
        case "fog":
        case "haze": return <CloudFog size={28} className="text-slate-300" />;
        default: return <Cloud size={28} className="text-slate-400" />;
    }
}

export default function ForeCastDay({ day }: ForeCastDayProps) {
    return (
        <div className="flex items-center justify-between border-b border-blue-100 py-2.5 last:border-b-0 dark:border-blue-900">
            <span className="w-10 text-sm font-medium text-slate-700 dark:text-slate-200">
                {day.date}
            </span>
            {getIcon(day.condition.main)}
            <span className="w-24 text-right text-sm capitalize text-slate-500 dark:text-slate-400">
                {day.condition.description}
            </span>
            <span className="text-sm text-slate-700 dark:text-slate-200">
                <span className="font-semibold">{Math.round(day.tempMax)}°</span>
                <span className="ml-1 text-slate-400 dark:text-slate-500">
                    {Math.round(day.tempMin)}°
                </span>
            </span>
        </div>
    );
}