import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
  firestore,
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
} from "../firebase";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsEye, BsStarHalf } from "react-icons/bs";
import NavBar from "../Components/NavBar";
import { Helmet } from "react-helmet";
import SuspensePhoto from "../Components/SuspensePhoto";

const PAGE_SIZE = 25;

export default function MoviesByUploadedDate() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({});

  const { page } = useParams();
  const navigate = useNavigate();

  const fetchMovies = useCallback(
    async (pageNumber = 1) => {
      setLoading(true);
      try {
        let q = query(
          collection(firestore, "movies"),
          orderBy("uploadDate", "desc"),
          limit(PAGE_SIZE)
        );

        if (pageNumber > 1 && pageData[pageNumber - 1]?.lastDoc) {
          q = query(q, startAfter(pageData[pageNumber - 1].lastDoc));
        }

        const querySnapshot = await getDocs(q);
        const moviesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMovies(moviesList);

        setPageData((prevData) => ({
          ...prevData,
          [pageNumber]: {
            lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
            movies: moviesList,
          },
        }));
      } catch (error) {
        console.error("Error fetching movies: ", error);
      } finally {
        setLoading(false);
      }
    },
    [pageData]
  );

  useEffect(() => {
    const pageNum = page ? parseInt(page, 10) : 1;
    if (pageData[pageNum]?.movies) {
      setMovies(pageData[pageNum].movies);
      setLoading(false);
    } else {
      fetchMovies(pageNum);
    }
  }, [page, fetchMovies, pageData]);

  const handlePrevious = () => {
    const pageNum = page ? parseInt(page, 10) : 1;
    if (pageNum > 1) {
      navigate(`/moviesByViews/${pageNum - 1}`);
    }
  };

  const handleNext = () => {
    const pageNum = page ? parseInt(page, 10) : 1;
    if (movies.length === PAGE_SIZE) {
      navigate(`/moviesByViews/${pageNum + 1}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Recently Posted Movies</title>
      </Helmet>
      <NavBar />
      <div className="my-5" style={{ marginLeft: "5vw", marginRight: "5vw" }}>
        <h1 className="reveal">Recently Posted Movies</h1>
        {loading ? (
          <div>Loading Recently Posted Movies...</div>
        ) : (
          <div
            className="reveal popularMovies"
            style={{ width: "90vw", display: "inline" }}>
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                style={{ display: "inline-block" }}>
                <div
                  className="reveal bestDealShadowAdd"
                  style={{
                    width: "20vw",
                    display: "grid",
                    margin: "7px",
                    textDecoration: "none",
                    color: "black",
                    textAlign: "start",
                  }}>
                  <div className="reveal rounded bestDeal">
                    <Suspense fallback={<SuspensePhoto />}>
                      <div
                        className="reveal moviePoster"
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
                            <BsEye
                              className="reveal d-flex flex-row"
                              style={{ alignItems: "center" }}
                            />
                            {movie.views}
                          </span>
                          <span
                            className="d-flex reveal flex-row "
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
            ))}
          </div>
        )}
        <div className="pagination">
          <button
            onClick={handlePrevious}
            className="button reveal"
            disabled={parseInt(page, 10) <= 1}>
            Previous
          </button>
          <button
            className="button reveal"
            onClick={handleNext}
            disabled={movies.length < PAGE_SIZE}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
