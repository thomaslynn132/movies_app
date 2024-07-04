import React, { Suspense, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {
  firestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "../firebase";
import { Link } from "react-router-dom";
import { BsEye, BsStarHalf } from "react-icons/bs";
import SuspensePhoto from "./SuspensePhoto";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const q = query(
          collection(firestore, "movies"),
          orderBy("views", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);

        const moviesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMovies(moviesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies: ", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const totalImages = movies.length;

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  console.log("Current Index:", currentIndex);
  if (loading) {
    return <div>Loading Popular Movies...</div>;
  }

  return (
    <>
      <div
        className="container"
        style={{ marginLeft: "5vw", marginRight: "5vw" }}>
        <h1 className="reveal">Popular Movies</h1>
        <div className="popularMoviesComp imgCtn reveal">
          <div className="dealsArrow" onClick={handleLeftArrowClick}>
            <FaArrowLeft />
          </div>

          <div
            className="popularMoviesComp"
            style={{
              width: "80vw",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {movies.map((movie, index) => (
              <Link key={index} to={`/movies/${movie.id}`}>
                <div
                  className={" bestDealShadowAdd"}
                  style={{
                    transform: `translateX(-${currentIndex * (225 + 10)}px)`,
                    transition: "transform 1s ease-in-out",
                  }}>
                  <div className="rounded reveal bestDeal">
                    <Suspense fallback={<SuspensePhoto />}>
                      {" "}
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
                            <BsEye
                              className="d-flex flex-row reveal"
                              style={{ alignItems: "center" }}
                            />
                            {movie.views}
                          </span>
                          <span
                            className="d-flex flex-row reveal"
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

          <div className="dealsArrow" onClick={handleRightArrowClick}>
            <FaArrowRight />
          </div>
        </div>
        <div className="text-center">
          <Link to="/moviesByViews" exact>
            <button className="rounded-pill viewBtn1" size="lg">
              View More <IoIosArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
