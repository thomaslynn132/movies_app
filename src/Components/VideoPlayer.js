import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [quality, setQuality] = useState("720p");

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        if (onReady) onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const changeQuality = (quality) => {
    const sources = {
      "360p":
        "https://nx48182.your-storageshare.de/s/jCe36tkQomzpz7i/download/SSIS-948-09-nommsub-jav.mp4",
      "720p":
        "https://nx48182.your-storageshare.de/s/jCe36tkQomzpz7i/download/SSIS-948-09-nommsub-jav.mp4",
      "1080p":
        "https://nx48182.your-storageshare.de/s/jCe36tkQomzpz7i/download/SSIS-948-09-nommsub-jav.mp4",
    };

    if (playerRef.current) {
      playerRef.current.src({ type: "video/mp4", src: sources[quality] });
      setQuality(quality);
    }
  };

  return (
    <div>
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
      <div>
        <button onClick={() => changeQuality("360p")}>360p</button>
        <button onClick={() => changeQuality("720p")}>720p</button>
        <button onClick={() => changeQuality("1080p")}>1080p</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
