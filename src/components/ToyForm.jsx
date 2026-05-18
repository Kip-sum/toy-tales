import { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
    };

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
      .then((toy) => onAddToy(toy));

    setName("");
    setImage("");
  }

  return (
    <form className="NewToyForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Toy name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">
        Add Toy
      </button>
    </form>
  );
}

export default ToyForm;