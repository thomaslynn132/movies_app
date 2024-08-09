import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Suspense } from "react";
import { BsStarHalf, BsEye } from "react-icons/bs";
import {
  firestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "../../firebase";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SuspensePhoto from "./SuspensePhoto";

export default function NewReleasedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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
  if (loading) {
    return <div>Loading Recently Added Movies...</div>;
  }
  return (
    <>
      <div className="container">
        <h1 className="text-center mb-4">
          <span className="text-danger reveal">Recently Added Movies</span>
        </h1>

        <Row className="justify-content-center reveal">
          <Col lg={12}>
            <Row>
              {movies.map((movie, index) => (
                <Link key={index} to={`/movies/${movie.id}`}>
                  <div className={"d-flex flex-row bestDealShadowAdd"}>
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
                  </div>{" "}
                  <br />
                </Link>
              ))}
            </Row>
          </Col>
        </Row>

        <div className="text-center reveal">
          <Link to="/moviesByPostedDate" exact>
            <button className="rounded-pill viewBtn1" size="lg">
              View More <IoIosArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
