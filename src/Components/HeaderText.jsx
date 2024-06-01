import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const HeaderText = () => {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);
  const scrambleText = (element, newText, duration) => {
    gsap.to(element, {
      duration: duration,
      text: {
        value: newText,
        ease: "none",
        scramble: {
          text: true,
          chars: "upperCase",
        },
      },
      onComplete: () => {
        element.innerText = newText;
      },
    });
  };

  useEffect(() => {
    scrambleText(textRef1.current, "Watch Online", 2);
    setTimeout(() => {
      scrambleText(textRef2.current, "Or", 2);
    }, 2000);
    setTimeout(() => {
      scrambleText(textRef3.current, "Download Best Quality Movies", 5);
    }, 5000);
  }); // Empty dependency array to run only once
  useEffect(() => {
    scrambleText(textRef4.current, "Anytime Anywhere", 10);
  }, 10000);
  return (
    <div className="headerText text-center fw-lighter my-6">
      <h2
        className="text-danger"
        style={{ color: "cyan", opacity: "0.8" }}
        ref={textRef1}>
        OXOXOXOXOXOX
      </h2>
      <h2
        className="text-danger"
        style={{ color: "red", opacity: "0.8" }}
        ref={textRef2}>
        XO
      </h2>
      <h2
        className="text-danger"
        style={{ color: "cyan", opacity: "0.8" }}
        ref={textRef3}>
        OXOXOXOXXOXOXOXOXOXOXOXOXOXO
      </h2>
      <h1 ref={textRef4} style={{ color: "lightyellow", opacity: "0.7" }}>
        OXOXOXOOXOXOXOXO
      </h1>
    </div>
  );
};

export default HeaderText;
