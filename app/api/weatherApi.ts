// lib/weatherApi.ts
import { CurrentWeather, ForecastDay } from "../types/weather";

const API_KEY = "6af3e11b3e0e5778cd8e04ef54b90fd9";

export const WeatherApi = {
    async getWeather(city: string): Promise<CurrentWeather> {
        if (!API_KEY) {
            throw new Error(
                "Missing API key. Check NEXT_PUBLIC_WEATHER_API_KEY in .env.local and restart the dev server."
            );
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid or inactive API key.");
            }
            if (response.status === 404) {
                throw new Error(`City "${city}" not found.`);
            }
            throw new Error(`Failed to fetch weather (status ${response.status}).`);
        }

        const data = await response.json();

        return {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            windDeg: data.wind.deg,
            visibility: data.visibility,
            condition: {
                id: data.weather[0].id,
                main: data.weather[0].main,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
            },
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            timezone: data.timezone,
            dt: data.dt,
        };
    },

    // 👇 new method, added right after getWeather, still inside the same object
    async getForecast(city: string): Promise<ForecastDay[]> {
        if (!API_KEY) {
            throw new Error(
                "Missing API key. Check NEXT_PUBLIC_WEATHER_API_KEY in .env.local and restart the dev server."
            );
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid or inactive API key.");
            }
            if (response.status === 404) {
                throw new Error(`City "${city}" not found.`);
            }
            throw new Error(`Failed to fetch forecast (status ${response.status}).`);
        }

        const data = await response.json();

        // group 3-hour blocks into one entry per calendar day
        const dailyMap = new Map<string, any[]>();
        data.list.forEach((item: any) => {
            const date = new Date(item.dt * 1000).toISOString().split("T")[0];
            if (!dailyMap.has(date)) dailyMap.set(date, []);
            dailyMap.get(date)!.push(item);
        });

        return Array.from(dailyMap.entries())
            .slice(0, 5)
            .map(([date, items]) => {
                const temps = items.map((i) => i.main.temp);
                const midday = items.find((i) => new Date(i.dt * 1000).getHours() === 12) ?? items[0];

                return {
                    date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
                    dt: midday.dt,
                    tempMin: Math.min(...temps),
                    tempMax: Math.max(...temps),
                    condition: {
                        id: midday.weather[0].id,
                        main: midday.weather[0].main,
                        description: midday.weather[0].description,
                        icon: midday.weather[0].icon,
                    },
                };
            });
    },
};