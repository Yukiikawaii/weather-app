// app/components/Navbar.tsx
"use client"
import { useState } from "react";
import { StarIcon, MoonIcon, SunIcon } from "lucide-react";
import { Theme } from "../types/weather";
import Image from "next/image";
import logo from "../assets/logo.png";

type NavbarProps = {
    onSearch: (city: string) => void;
    onAddFavCity: (city: string) => void;
    onChangeTheme: () => void;
    onOpenFavorites: () => void;   
    theme: Theme;
};

export default function Navbar({
    onSearch,
    onAddFavCity,
    onChangeTheme,
    onOpenFavorites,               
    theme,
}: NavbarProps) {
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim() === "") return;
        onSearch(input);
        setInput("");
    };

    return (
        <nav className="w-full border-b border-blue-100 bg-white dark:border-blue-950 dark:bg-[#0a1128]">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-3">

                <div className="flex items-center gap-2 shrink-0">
                    <Image src={logo} alt="Logo" width={40} height={40} className="h-8 w-8 sm:h-10 sm:w-10" />
                    <h1 className="hidden text-lg font-semibold text-slate-800 dark:text-slate-100 sm:block">
                        Weather forecast
                    </h1>
                </div>

                <input
                    type="text"
                    placeholder="Search city"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleAdd();
                    }}
                    className="w-24 min-w-0 flex-1 rounded-md border-2 border-blue-200 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none focus:border-blue-400 dark:border-blue-900 dark:bg-[#0f1a3d] dark:text-slate-100 sm:w-auto sm:max-w-sm sm:px-3 sm:py-2"
                />

                <div className="flex items-center gap-1 shrink-0 sm:gap-2">
                    <button
                        onClick={onOpenFavorites}
                        className="rounded-md p-2 text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-blue-950"
                        aria-label="Open favorite cities"
                    >
                        <StarIcon size={16} className="text-amber-300" />
                    </button>
                    <button
                        onClick={onChangeTheme}
                        className="rounded-md p-2 text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-blue-950"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}