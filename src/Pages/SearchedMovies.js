// SearchResults.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { firestore, collection, query, where, getDocs } from "../firebase";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = useQuery().get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const moviesCollection = collection(firestore, "movies");
        const q = query(moviesCollection, where("title", "==", searchQuery));
        const querySnapshot = await getDocs(q);

        const moviesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMovies(moviesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  if (loading) {
    return <div>Loading search results...</div>;
  }

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Views: {movie.views}</p>
              <p>Released Year: {movie.releasedYear}</p>
            </li>
          ))
        ) : (
          <p>No movies found for "{searchQuery}"</p>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
