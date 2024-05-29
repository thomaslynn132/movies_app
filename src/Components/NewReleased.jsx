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
} from "../firebase";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SuspensePhoto from "./SuspensePhoto";

export default function MoviesByViews() {
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
      <Container className="my-4">
        <h1 className="text-center mb-4">
          <span className="text-danger">Recently Added Movies</span>
        </h1>

        <Row className="justify-content-center">
          <Col lg={12}>
            <Row>
              {movies.map((movie, index) => (
                <Link to={`/movies/${movie.id}`} exact>
                  <Col key={index} md={6} className="mb-4 devImg bsbb">
                    <div
                      className="product-container p-3 rounded"
                      style={{
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <div className="nRImgDiv">
                        <Suspense fallback={<SuspensePhoto />}>
                          {" "}
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

                      <div className="text-dark">
                        <p className="font-weight-bold">
                          {movie.title} <br />
                          {movie.rating}
                          <br />
                          {movie.releasedYear}
                        </p>
                      </div>
                    </div>
                  </Col>
                </Link>
              ))}
            </Row>
          </Col>
        </Row>

        <div className="text-center">
          <Link to="/moviesByPostedDate" exact>
            <button className="rounded-pill viewBtn1" size="lg">
              View More <IoIosArrowForward />
            </button>
          </Link>
        </div>
      </Container>
    </>
  );
}
