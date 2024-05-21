import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {
  mint,
  mint1,
  mint2,
  mint3,
  mint4,
  mint5,
  mint6,
} from "../Assets/index";
import { Link } from "react-router-dom";
export default function PopularMovies() {
  const images = [mint, mint1, mint2, mint3, mint4, mint5, mint6];
  const totalImages = images.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  console.log("Current Index:", currentIndex);

  return (
    <>
      <div className="my-5" style={{ marginLeft: "5vw", marginRight: "5vw" }}>
        <h1>Popular Movies</h1>
        <div className="popularMovies imgCtn">
          <div className="dealsArrow" onClick={handleLeftArrowClick}>
            <FaArrowLeft />
          </div>

          <div className="popularMovies" style={{ width: "80vw" }}>
            {images.map((image, index) => (
              <div
                key={index}
                className={"d-flex flex-column bestDealShadowAdd"}
                style={{
                  width: "25vw",
                  transform: `translateX(-${currentIndex * (225 + 10)}px)`,
                  transition: "transform 0.5s ease-in-out",
                }}>
                <div className=" rounded bestDeal">
                  <img
                    src={image}
                    alt={`Mint ${index + 1}`}
                    className="bestDealImg"
                    style={{
                      width: "20vw",
                      height: "25vw",
                      padding: "5px",
                    }}
                  />
                </div>
                <p>
                  <p className="fs-4">
                    Refreshing Mint <br />
                    30,000 MMK
                  </p>
                  <p className="text-decoration-line-through ">30,000 MMK</p>
                  <p className="yellow fw-bold">⭐500 Points</p>
                </p>
              </div>
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
