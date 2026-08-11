
"use client"
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import FavoritesDrawer from "./components/Favorites";
import { WeatherApi } from "./api/weatherApi";
import { CurrentWeather, Theme , ForecastDay} from "./types/weather";

import { ForeCastList } from "./components/index";
export default function Page() {
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [favorites, setFavorites] = useState<string[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [theme, setTheme] = useState<Theme>("light");

  
     const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
        const [current, days] = await Promise.all([
            WeatherApi.getWeather(city),
            WeatherApi.getForecast(city),
        ]);
        setWeather(current);
        setForecast(days);
    } catch (err) {
        setWeather(null);
        setForecast([]);
        setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
        setLoading(false);
    }
};

   
    const handleAddFavCity = (city: string) => {
        if (!city.trim() || favorites.includes(city)) return;
        setFavorites((prev) => [...prev, city]);
    };

    const handleRemoveFavCity = (city: string) => {
        setFavorites((prev) => prev.filter((c) => c !== city));
    };

    const handleSelectFavCity = (city: string) => {
        handleSearch(city);
    };

   
    const handleChangeTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-blue-950">
        <Navbar
            onSearch={handleSearch}
            onAddFavCity={handleAddFavCity}
            onChangeTheme={handleChangeTheme}
            theme={theme}
            onOpenFavorites={() => setDrawerOpen(true)}
        />

        <main className="mx-auto flex w-full flex-1 max-w-5xl flex-col items-center gap-4 px-4 py-8">
            {loading && (
                <p className="text-sm text-slate-500 dark:text-slate-400">Loading...</p>
            )}

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {weather && !loading && (
                <>
                    <WeatherCard
                        weather={weather}
                        isFavorite={favorites.includes(weather.city)}
                        onToggleFavorite={(city) => {
                            if (favorites.includes(city)) {
                                handleRemoveFavCity(city);
                            } else {
                                handleAddFavCity(city);
                            }
                        }}
                    />

                    <ForeCastList days={forecast} />
                </>
            )}
        </main>

        <FavoritesDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            favorites={favorites}
            onSelectCity={handleSelectFavCity}
            onRemoveCity={handleRemoveFavCity}
        />

        <footer className={`flex h-10 w-full items-center justify-center ${
            theme === "dark" ? "bg-blue-950" : "bg-white"
        }`}>
            <p className={`text-sm font-bold ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
                developed by: Kie Jay Denian
            </p>
        </footer>
    </div>
);
}