import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
const HeaderText = () => {
  const textRef = useRef(null);

  const scrambleText = (element, newText, duration) => {
    const oldText = element.innerText;
    gsap.to(element, {
      duration: duration,
      text: {
        value: newText,
        ease: "none",
        scrambleText: true,
        chars: "upperCase",
      },
      onComplete: () => {
        element.innerText = newText;
      },
    });
  };

  useEffect(() => {
    const textElement = textRef.current;

    scrambleText(textElement, "Watch Online", 1);
    setTimeout(() => {
      scrambleText(textElement, "or", 1);
    }, 2000);
    setTimeout(() => {
      scrambleText(textElement, "Download Best Quality Movies", 1);
    }, 4000);
  });

  return (
    <div className="headerText text-center fw-lighter my-6">
      <h2
        className="text-danger"
        style={{ color: "cyan", opacity: "0.8" }}
        ref={textRef}>
        Watch Online
      </h2>
      {/* <h2 style={{ color: "red" }}> or </h2>
      <h2 className="text-danger" style={{ color: "cyan", opacity: "0.8" }}>
        Download Best Quality Movies
      </h2> */}

      <h1 style={{ color: "lightyellow", opacity: "0.7" }}>Anytime Anywhere</h1>
    </div>
  );
};

export default HeaderText;
