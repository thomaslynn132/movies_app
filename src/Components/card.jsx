import { TiStarFullOutline } from "react-icons/ti";

function Card(movieId) {
  return (
    <>
      <div
        className="card"
        style={{
          width: "200px",
          height: "400px",
          backgroundImage: `${movieId.coverPhoto}`,
        }}>
        <p>
          {movieId.releasedYear} <br />
          <TiStarFullOutline />
          {movieId.rating}
        </p>
      </div>
      <h5>{movieId.title}</h5>
    </>
  );
}

export default Card;
