import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { firestore, collection, query, where, getDocs } from "../firebase";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { BsEye, BsStarHalf } from "react-icons/bs";
import SuspensePhoto from "../Components/SuspensePhoto";
import NavBar from "../Components/NavBar";

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
      <NavBar />
      <h2>Search Results</h2>
      <div
        className="popularMovies"
        style={{ width: "90vw", display: "inline" }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              style={{ display: "inline-block" }}>
              <div
                className="bestDealShadowAdd"
                style={{
                  width: "20vw",
                  display: "grid",
                  margin: "7px",
                  textDecoration: "none",
                  color: "black",
                  textAlign: "start",
                }}>
                <div className="rounded bestDeal">
                  <Suspense fallback={<SuspensePhoto />}>
                    <div
                      className="moviePoster"
                      style={{
                        backgroundImage: `url(${movie.coverPhoto})`,
                        height: "33vw",
                        width: "20vw",
                        alignItems: "flex-end",
                        textAlign: "end",
                        backgroundPosition: "top",
                        backgroundSize: "cover",
                        border: "2px solid",
                        padding: "3px",
                        borderRadius: "7%",
                        textDecoration: "none",
                      }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}>
                        <span>
                          <BsEye
                            className="d-flex flex-row"
                            style={{ alignItems: "center" }}
                          />
                          {movie.views}
                        </span>
                        <span
                          className="d-flex flex-row "
                          style={{ alignItems: "center" }}>
                          <BsStarHalf /> {movie.rating}
                        </span>
                      </div>
                    </div>
                  </Suspense>
                </div>
                <div>
                  <h3>{movie.title}</h3>
                  <p>{movie.releasedYear}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No movies found for "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
