// VideoPlayer.js
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src, type = "video/mp4", poster }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: "auto",
        poster: poster,
        fluid: true,
      });

      playerRef.current.src({ src, type });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [src, type, poster]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default VideoPlayer;
