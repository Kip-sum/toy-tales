import { useEffect, useState } from "react";
import "./App.css";

import ToyContainer from "./components/ToyContainer";
import ToyForm from "./components/ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((toys) => setToys(toys));
  }, []);

  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0,
      }),
    })
      .then((r) => r.json())
      .then((toy) => {
        setToys([...toys, toy]);
      });
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((toy) => toy.id !== id);

      setToys(updatedToys);
    });
  }

  function handleLikeToy(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((r) => r.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((t) =>
          t.id === updatedToy.id ? updatedToy : t
        );

        setToys(updatedToys);
      });
  }

  return (
    <div className="App">
      <ToyForm onAddToy={handleAddToy} />

      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </div>
  );
}

export default App;