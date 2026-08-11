"use client"
import { ForecastDay } from "./../types/weather";
import ForeCastDay from "./ForeCastDay";

type ForeCastListProps = {
    days: ForecastDay[];
};

export default function ForeCastList({ days }: ForeCastListProps) {
    if (!days || days.length === 0) return null;

    return (
        <div className="mx-auto w-full max-w-sm rounded-2xl border-2 border-blue-200 bg-white p-4 shadow-sm dark:border-blue-900 dark:bg-[#0f1a3d]">
            <h3 className="mb-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                5-Day Forecast
            </h3>
            <div className="flex flex-col">
                {days.map((day) => (
                    <ForeCastDay key={day.dt} day={day} />
                ))}
            </div>
        </div>
    );
}