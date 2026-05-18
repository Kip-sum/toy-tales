import { useEffect, useState } from "react";
import ToyCard from "./components/ToyCard";
import ToyForm from "./components/ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  // GET ALL TOYS
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // ADD TOY
  function handleAddToy(newToyData) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToyData,
        likes: 0,
      }),
    })
      .then((res) => res.json())
      .then((newToy) => {
        setToys([...toys, newToy]);
      });
  }

  // DELETE TOY
  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((toy) => toy.id !== id);
      setToys(updatedToys);
    });
  }

  // LIKE TOY
  function handleLikeToy(clickedToy) {
    const updatedLikes = clickedToy.likes + 1;

    fetch(`http://localhost:3001/toys/${clickedToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikes,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy
        );

        setToys(updatedToys);
      });
  }

  return (
    <div className="app">
      <h1>Toy Tales</h1>

      <ToyForm onAddToy={handleAddToy} />

      <div className="toy-container">
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