import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase"; // Ensure this path is correct

function MoviesByGenre(genre) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesRef = firestore.collection("movies");
        const querySnapshot = await moviesRef
          .where("genres", "array-contains", genre)
          .get();
        const moviesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="reveal">Movies in Genre: {genre}</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2 className="reveal">{movie.title}</h2>
            <p className="reveal">{movie.description}</p>
            <p className="reveal">Genres: {movie.genres.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesByGenre;
