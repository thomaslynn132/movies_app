import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import BestDeals from "./Components/BestDeals";
import Membership from "./Components/Membership";
import NewRelease from "./Components/NewReleased";
import NewReleaseOne from "./Components/NewReleasedOne";
import NewReleaseTwo from "./Components/NewReleasedTwo";
import Footer from "./Components/Footer";
import CopyrightNotice from "./Components/Copyright";
function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <BestDeals />
        <Membership />
        <NewRelease />
        <NewReleaseOne />
        <NewReleaseTwo />
        <Footer />
        <CopyrightNotice />
      </div>
    </div>
  );
}

export default App;
