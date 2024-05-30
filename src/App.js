import "./App.css";
import React from "react";
import "react-bootstrap";
import { Router } from "./Components/router";
import { background } from "./Assets";
import CopyrightNotice from "./Components/Copyright";

function App() {
  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url(${background})`, // Use url() function
          backgroundSize: "80px",
        }}>
        <Router />
      </div>
      <CopyrightNotice />
    </>
  );
}

export default App;
