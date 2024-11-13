import { useEffect, useState } from "react";
import "./App.css";
import { Reorder } from "framer-motion";

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
      .then((pokemon) => pokemon.json())
      .then((pokemon) => {
        const promises = pokemon.results.map((f) =>
          fetch(f.url).then((response) => response.json())
        );

        Promise.all(promises).then((data) => setList(data));
      });
  }, []);

  console.log(list);
  return (
    <div className="App">
      <Reorder.Group axis="y" onReorder={setList} values={list}>
        {list.length < 1
          ? null
          : list.map((p) => (
              <Reorder.Item
                key={p.id}
                id={p.id}
                value={p}
                style={{ backgroundColor: "red", marginBottom: "5px" }}
              >
                {p.name}
              </Reorder.Item>
            ))}
      </Reorder.Group>
    </div>
  );
}

export default App;
