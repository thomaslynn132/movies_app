import React, { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PiShoppingCart } from "react-icons/pi";
import { HiMenuAlt2 } from "react-icons/hi";
import {
  wallpaper,
  wallpaper1,
  wallpaper2,
  wallpaper3,
  wallpaper4,
  wallpaper5,
  pi,
} from "../Assets/index";

import HeaderText from "./HeaderText";

export default function Header() {
  const images = [
    wallpaper,
    wallpaper1,
    wallpaper2,
    wallpaper3,
    wallpaper4,
    wallpaper5,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setFade("fade-out");

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade("fade-in");
      }, 500); // Adjust the delay based on your transition duration
    }, 7000);

    return () => clearInterval(slideshowInterval);
  }, [images.length, setCurrentImageIndex, setFade]);

  const handleLeftArrowClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleRightArrowClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleButtonClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className="slideshow-container d-flex flex-column vh-100">
        <div
          className={`slide ${fade}`}
          style={{
            backgroundImage: `url("${images[currentImageIndex]}")`,
            backgroundPosition: "center",
            color: "white",
            fontWeight: "bold",
            alignItems: "center",
          }}>
          <div className="d-flex flex-row justify-content-between mx-3 my-1">
            <div className="flex-start">
              <img src={pi} alt="Logo" height={20} width={20} />
            </div>
            <div
              className="flex-end"
              style={{ marginRight: "25px", marginLeft: "auto" }}>
              <FaSearch className="mx-1" />
              <PiShoppingCart className="mx-1" />
              <HiMenuAlt2 className="mx-1" />
            </div>
            <div></div>
          </div>
          <div
            className=" text-center"
            style={{ marginBottom: "25px", marginTop: "auto" }}>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="headerArrow">
                <FaArrowLeft onClick={handleLeftArrowClick} />
              </div>
              <HeaderText />
              <div className="headerArrow">
                <FaArrowRight onClick={handleRightArrowClick} />
              </div>
            </div>
          </div>
          <div className="headerBtn">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <button
                key={index}
                type="button"
                className={`btn headerBtn rounded m-1 ${
                  index === currentImageIndex
                    ? "btn-outline-dark  bg-success"
                    : "btn-outline-danger"
                }`}
                onClick={() => handleButtonClick(index)}></button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
