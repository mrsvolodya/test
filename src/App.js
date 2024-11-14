import { useContext, useState } from "react";
import { PokemonsList } from "./pokemons/PokemonsList";
import { StorePokemons } from "./store/StoreProvider";

function App() {
  const [open, setOpen] = useState(false);
  const { list, favorites } = useContext(StorePokemons);

  return (
    <div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        {!open
          ? favorites.length > 0
            ? `All favorites ${favorites.length}`
            : "All favorites"
          : "Back to all"}
      </button>
      {!open ? <PokemonsList list={list} /> : <PokemonsList list={favorites} />}
    </div>
  );
}

export default App;
