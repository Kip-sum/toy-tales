import { useEffect, useState } from "react";
import ToyCard from "./components/ToyCard";
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
      .then((toy) => setToys([...toys, toy]));
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((toy) => toy.id !== id);
      setToys(updatedToys);
    });
  }

  function handleLikeToy(updatedToy) {
    fetch(`http://localhost:3001/toys/${updatedToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedToy.likes + 1,
      }),
    })
      .then((r) => r.json())
      .then((updatedToyFromServer) => {
        const updatedToys = toys.map((toy) =>
          toy.id === updatedToyFromServer.id
            ? updatedToyFromServer
            : toy
        );

        setToys(updatedToys);
      });
  }

  return (
    <div className="App">
      <ToyForm onAddToy={handleAddToy} />

      <div className="card-container">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onDeleteToy={handleDeleteToy}
            onLikeToy={handleLikeToy}
          />
        ))}
      </div>
    </div>
  );
}

export default App;