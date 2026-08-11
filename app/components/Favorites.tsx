"use client"
import { XIcon, StarIcon, Trash2Icon } from "lucide-react";

type FavoritesDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    favorites: string[];
    onSelectCity: (city: string) => void;
    onRemoveCity: (city: string) => void;
};

export default function Favorites({
    isOpen,
    onClose,
    favorites,
    onSelectCity,
    onRemoveCity,
}: FavoritesDrawerProps) {
    return (
        <>
        
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

          
            <div
                className={`fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw] transform bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-slate-900 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
              
                <div className="flex items-center justify-between border-b border-blue-100 px-4 py-4 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <StarIcon size={18} className="text-amber-400" fill="currentColor" />
                        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                            Favorite Cities
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1.5 hover:bg-blue-50 dark:hover:bg-slate-800"
                        aria-label="Close favorites"
                    >
                        <XIcon size={18} />
                    </button>
                </div>

             
                <div className="flex flex-col gap-2 overflow-y-auto p-3">
                    {favorites.length === 0 ? (
                        <p className="mt-8 text-center text-sm text-slate-400">
                            No favorite cities yet. Tap the star icon after searching a city to add one.
                        </p>
                    ) : (
                        favorites.map((city) => (
                            <div
                                key={city}
                                className="group flex items-center justify-between rounded-lg border border-blue-100 px-3 py-2.5 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-slate-800"
                            >
                                <button
                                    onClick={() => {
                                        onSelectCity(city);
                                        onClose();
                                    }}
                                    className="flex-1 text-left text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    {city}
                                </button>
                                <button
                                    onClick={() => onRemoveCity(city)}
                                    className="rounded-md p-1.5 text-slate-400 opacity-0 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-red-950"
                                    aria-label={`Remove ${city} from favorites`}
                                >
                                    <Trash2Icon size={15} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}