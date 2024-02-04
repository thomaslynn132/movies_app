import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  mint,
  mint1,
  mint2,
  mint3,
  mint4,
  mint5,
  mint6,
} from "../Assets/index";

const Vapes = () => {
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
    <div
      className="d-flex flex-row"
      style={{ marginLeft: "5vw", marginRight: "5vw" }}>
      <div className="dealsArrow">
        <FaArrowLeft
          onClick={handleLeftArrowClick}
          style={{ color: "black" }}
        />
      </div>

      <div className="d-flex flex-row rounded">
        {images.map((image, index) => (
          <div
            key={index}
            className={"d-flex flex-column bestDeal rounded bestDealShadowAdd"}
            style={{
              boxSizing: "border-box",
              transform: `translateX(-${currentIndex * (260 + 16)}px)`,
              transition: "transform 0.5s ease-in-out",
            }}>
            <img
              src={image}
              alt={`Mint ${index + 1}`}
              height={200}
              width={250}
            />
            <p>
              <p className="fs-4 text-dark">
                Refreshing Mint <br />
                30,000 MMK{" "}
                <p className="yellow fw-bold" style={{ fontSize: "12px" }}>
                  ⭐500 Points
                </p>
              </p>
            </p>
          </div>
        ))}
      </div>

      <div className="dealsArrow" onClick={handleRightArrowClick}>
        <FaArrowRight style={{ color: "black" }} />
      </div>
    </div>
  );
};

export default Vapes;
