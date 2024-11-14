import { useContext } from "react";
import { StorePokemons } from "../../store/StoreProvider";

export function Pokemon({ pokemon }) {
  const { favorites, handleFavorites } = useContext(StorePokemons);
  const isFavorites = favorites.some((pok) => pok.name === pokemon.name);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md mb-2">
      <img src={pokemon.img} alt="Pokemon" className="w-16 h-16" />
      <h2 className="text-lg font-semibold text-gray-700 text-center flex-1">
        {pokemon.name}
      </h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => handleFavorites(pokemon)}
      >
        {isFavorites ? "Remove from favorites" : "Add to favorites"}
      </button>
    </div>
  );
}
