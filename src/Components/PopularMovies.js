import React, { useState, useEffect } from "react";
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
import { BsStarHalf } from "react-icons/bs";
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
      <div className="my-5" style={{ marginLeft: "5vw", marginRight: "5vw" }}>
        <h1>Popular Movies</h1>
        <div className="popularMovies imgCtn">
          <div className="dealsArrow" onClick={handleLeftArrowClick}>
            <FaArrowLeft />
          </div>

          <div className="popularMovies" style={{ width: "80vw" }}>
            {movies.map((movie, index) => (
              <Link to="/movies/:id">
                <div
                  key={index}
                  className={"d-flex flex-column bestDealShadowAdd"}
                  style={{
                    width: "25vw",
                    transform: `translateX(-${currentIndex * (225 + 10)}px)`,
                    transition: "transform 0.5s ease-in-out",
                  }}>
                  <div className=" rounded bestDeal">
                    <div
                      className="moviePoster"
                      style={{
                        backgroundImage: `${movie.coverPhoto}`,
                        height: "200px",
                        width: "150px",
                        alignItems: "flex-end",
                        textAlign: "end",
                      }}>
                      <BsStarHalf /> {movie.rating}
                    </div>
                  </div>
                  <p>
                    <h3>{movies.title}</h3>
                    <p>{movie.releasedYear}</p>
                  </p>
                </div>{" "}
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
