import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  wallpaper,
  wallpaper1,
  wallpaper2,
  wallpaper3,
  wallpaper4,
  wallpaper5,
} from "../Assets/index";

import HeaderText from "./HeaderText";
import NavBar from "./NavBar";

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
    }, 87000);

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
            backgroundSize: "cover",
          }}>
          <NavBar />
          <div className="navBar">
            <div className="headerArrow">
              <FaArrowLeft onClick={handleLeftArrowClick} />
            </div>
            <div>
              <HeaderText />
            </div>
            <div className="headerArrow">
              <FaArrowRight onClick={handleRightArrowClick} />
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
