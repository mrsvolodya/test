import { useContext } from "react";
import { StorePokemons } from "../store/StoreProvider";
import { Reorder } from "framer-motion";
import { Pokemon } from "./pokemon/Pokemon";
export function PokemonsList({ list }) {
  const { setList, addToLocalStorage } = useContext(StorePokemons);
  const handleReorder = (newList) => {
    setList(newList);
    addToLocalStorage("order", newList);
  };
  return (
    <Reorder.Group axis="y" onReorder={handleReorder} values={list}>
      {list.length < 1
        ? null
        : list.map((pokemon) => (
            <Reorder.Item key={pokemon.id} id={pokemon.id} value={pokemon}>
              <Pokemon pokemon={pokemon} />
            </Reorder.Item>
          ))}
    </Reorder.Group>
  );
}
