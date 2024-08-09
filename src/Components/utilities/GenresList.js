import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase"; // Adjust the path according to your project structure
import { Link } from "react-router-dom";

export default function GenresList() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const moviesRef = firestore.collection("movies");
        const querySnapshot = await moviesRef.get();
        const allGenres = new Set();

        querySnapshot.forEach((doc) => {
          const movie = doc.data();
          if (movie.genres && Array.isArray(movie.genres)) {
            movie.genres.forEach((genre) => allGenres.add(genre));
          }
        });

        setGenres(Array.from(allGenres));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Genres</h1>
      {genres.map((genre) => (
        <Link to={`./genres/${genre}`} key={genre}>
          <h2>{genre}</h2>
        </Link>
      ))}
    </div>
  );
}
