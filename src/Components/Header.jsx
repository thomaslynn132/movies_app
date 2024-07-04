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
  const [hideHeader, setHideHeader] = useState(true);
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

  return hideHeader ? (
    <>
      <section
        className={`slideshow-container slide ${fade}  reveal`}
        style={{
          backgroundImage: `url("${images[currentImageIndex]}")`,
          backgroundPosition: "center",
          color: "white",
          fontWeight: "bolder",
          alignItems: "center",
          backgroundSize: "cover",
          display: "flex",
          width: "100vw",
          justifyContent: "space-between",
          flexDirection: "column",
        }}>
        <div
          style={{
            width: "100vw",
          }}>
          <NavBar />
        </div>{" "}
        <div
          className="headMid"
          style={{
            width: "100vw",
          }}>
          <div className="headerArrow reveal">
            <FaArrowLeft onClick={handleLeftArrowClick} />
          </div>
          <div>
            <HeaderText />
          </div>
          <div className="headerArrow reveal">
            <FaArrowRight onClick={handleRightArrowClick} />
          </div>
        </div>
        <div>
          <button
            className="button"
            onClick={() => {
              setHideHeader(false);
            }}>
            Watch Now
          </button>
        </div>
        <div className="headerBtn">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <button
              key={index}
              type="button"
              className={`buttn headerBtn rounded m-1 ${
                index === currentImageIndex ? "btn-active" : "btn-inactive"
              }`}
              onClick={() => handleButtonClick(index)}></button>
          ))}
        </div>
      </section>
    </>
  ) : (
    <NavBar />
  );
}
