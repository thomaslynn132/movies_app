import "./App.css";
import React from "react";
import "react-bootstrap";
import { Router } from "./Components/router";
// import VideoPlayer from "./Components/VideoPlayer";
import CopyrightNotice from "./Components/Copyright";
function App() {
  // const videoJsOptions = {
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   sources: [
  //     {
  //       src: "https://www.youtube.com/watch?v=yQUmFXzr2NA",
  //       type: "video/mp4",
  //     },
  //   ],
  // };

  // const handlePlayerReady = (player) => {
  //   // You can access player in here for further customization
  //   console.log("Player is ready: ", player);
  // };
  return (
    <div className="App">
      <Router />
      {/* <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} /> */}
      {/* <video
        width={900}
        src="https://nx48182.your-storageshare.de/s/F78ERfraBPi99PR"
      /> */}
      {/* <iframe
        width="640"
        height="360"
        src="https://www.youtube.com/embed/BhRx6JoMHWg?list=RDBhRx6JoMHWg"
        title="ဒဏ်ရာဒဏ်ချက်(Icecold ,ywal ywal)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      /> */}
      <CopyrightNotice />
    </div>
  );
}

export default App;
