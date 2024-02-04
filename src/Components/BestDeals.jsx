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

const BestDeals = () => {
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
    <div className="my-5" style={{ marginLeft: "5vw", marginRight: "5vw" }}>
      <p className="fs-1">Best Deals</p>
      <div className="d-flex flex-row imgCtn">
        <div className="dealsArrow" onClick={handleLeftArrowClick}>
          <FaArrowLeft />
        </div>

        <div className="d-flex flex-row Images">
          {images.map((image, index) => (
            <div
              key={index}
              className={"d-flex flex-column bestDealShadowAdd"}
              style={{
                width: "90vw",
                transform: `translateX(-${currentIndex * (260 + 16)}px)`,
                transition: "transform 0.5s ease-in-out",
              }}>
              <div className=" rounded bestDeal">
                <p className="bg-danger bsbb mx-5 fs-4 rounded text-light">
                  25% Off
                </p>
                <img
                  src={image}
                  alt={`Mint ${index + 1}`}
                  height={225}
                  width={260}
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
      <button className="rounded-pill viewBtn1 mb-5">
        View More <IoIosArrowForward />
      </button>
    </div>
  );
};

export default BestDeals;
