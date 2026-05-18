function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  return (
    <div className="card">
      <div className="image">
        <img src={toy.image} alt={toy.name} />
      </div>

      <div className="details">
        <h2>{toy.name}</h2>

        <p>{toy.likes} Likes </p>

        <button onClick={() => onLikeToy(toy)}>
          Like ❤️
        </button>

        <button onClick={() => onDeleteToy(toy.id)}>
          Donate to Goodwill
        </button>
      </div>
    </div>
  );
}

export default ToyCard;