import { createContext, useEffect, useState, useCallback } from "react";

export const StorePokemons = createContext({});

export function StoreProvider({ children }) {
  const [list, setList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToLocalStorage = useCallback((key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Local storage limit exceeded:", error);
    }
  }, []);

  const handleFavorites = useCallback(
    (pokemon) => {
      setFavorites((prevFavorites) => {
        const updatedFavorites = prevFavorites.some(
          (pok) => pok.id === pokemon.id
        )
          ? prevFavorites.filter((pok) => pok.id !== pokemon.id)
          : [
              ...prevFavorites,
              {
                id: pokemon.id,
                name: pokemon.name,
                img: pokemon.img,
              },
            ];

        addToLocalStorage("favorites", updatedFavorites);
        return updatedFavorites;
      });
    },
    [addToLocalStorage]
  );

  useEffect(() => {
    const orderFromStorage = JSON.parse(localStorage.getItem("order"));
    const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites"));

    if (favoritesFromStorage) {
      setFavorites(favoritesFromStorage);
    }

    if (orderFromStorage) {
      setList(orderFromStorage);
    } else {
      fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
        .then((response) => response.json())
        .then((data) => {
          const pokemonPromises = data.results.map(({ url }) =>
            fetch(url)
              .then((response) => response.json())
              .then(({ id, name, sprites }) => ({
                id,
                name,
                img: sprites.front_default,
              }))
          );

          Promise.all(pokemonPromises).then((pokemonData) => {
            setList(pokemonData);
            addToLocalStorage("order", pokemonData);
          });
        })
        .catch((error) => console.error("Error fetching Pokémon:", error));
    }
  }, [addToLocalStorage]);

  return (
    <StorePokemons.Provider
      value={{
        setList,
        list,
        favorites,
        setFavorites,
        handleFavorites,
        addToLocalStorage,
      }}
    >
      {children}
    </StorePokemons.Provider>
  );
}
