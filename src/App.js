import "./App.css";
import React, { useEffect } from "react";
import "react-bootstrap";
import { Router } from "./Components/router/Router";
import { CopyrightNotice } from "./Components/utilities";
import ScrollReveal from "scrollreveal";
function App() {
  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      duration: 1500,
      origin: "bottom",
      distance: "20px",
      easing: "ease-in-out",
      reset: true,
    });
  }, []);
  return (
    <>
      <div className="App">
        <Router />
      </div>
      <CopyrightNotice />
    </>
  );
}

export default App;
