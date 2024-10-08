import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { firestore, collection, query, where, getDocs } from "../../firebase";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { BsEye, BsStarHalf } from "react-icons/bs";
import { NavBar, SuspensePhoto } from "../../Components/utilities";

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
      <div className="navBarBgAdd">
        <NavBar />
      </div>
      <h2 className="reveal">Search Results</h2>
      <div
        className="popularMovies reveal"
        style={{ width: "90vw", display: "inline" }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              style={{ display: "inline-block" }}>
              <div
                className="bestDealShadowAdd reveal"
                style={{
                  width: "20vw",
                  display: "grid",
                  margin: "7px",
                  textDecoration: "none",
                  color: "black",
                  textAlign: "start",
                }}>
                <div className="rounded bestDeal reveal">
                  <Suspense fallback={<SuspensePhoto />}>
                    <div
                      className="moviePoster reveal"
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
                        className="reveal"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}>
                        <span>
                          <BsEye style={{ alignItems: "center" }} />
                          {movie.views}
                        </span>
                        <span
                          className="reveal d-flex flex-row "
                          style={{ alignItems: "center" }}>
                          <BsStarHalf /> {movie.rating}
                        </span>
                      </div>
                    </div>
                  </Suspense>
                </div>
                <div>
                  <h3 className="reveal">{movie.title}</h3>
                  <p className="reveal">{movie.releasedYear}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="reveal">No movies found for "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
