import "./App.css";
import React from "react";
import "react-bootstrap";
import { Router } from "./Components/router";
import CopyrightNotice from "./Components/Copyright";
function App() {
  return (
    <div className="App">
      <Router />

      <CopyrightNotice />
    </div>
  );
}

export default App;
