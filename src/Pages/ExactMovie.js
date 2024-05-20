import React, { useEffect, useState, useRef } from "react";
import { firestore } from "../firebase"; // Ensure firestore is imported from your Firebase configuration
import { doc, getDoc } from "firebase/firestore"; // Import these from 'firebase/firestore'
import { useParams } from "react-router-dom";
import VideoJS from "../Components/VideoPlayer"; // Ensure you have this component or package installed
import NavBar from "../Components/NavBar";

export default function ExactMovie() {
  const { id } = useParams();
  const [additionalData, setAdditionalData] = useState(null);
  const [quality, setQuality] = useState("720p");
  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Handle player events
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const movieDocRef = doc(firestore, "movies", id); // Ensure 'movies' collection name matches your Firestore setup
        const movieDocSnapshot = await getDoc(movieDocRef);
        if (movieDocSnapshot.exists()) {
          const movieData = movieDocSnapshot.data();
          setAdditionalData(movieData);
          // Set default video source based on the initial quality
          if (playerRef.current) {
            playerRef.current.src({ type: "video/mp4", src: movieData.hd }); // Default to 'hd'
          }
        } else {
          console.error("Movie not found");
        }
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };

    fetchAdditionalData();
  }, [id]);

  const changeQuality = (quality) => {
    if (!additionalData) return;

    const sources = {
      "360p": additionalData.sd,
      "720p": additionalData.hd,
      "1080p": additionalData.fhd,
    };

    if (playerRef.current) {
      playerRef.current.src({ type: "video/mp4", src: sources[quality] });
      setQuality(quality);
    }
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: additionalData
      ? [
          {
            quality: "360p",
            src: additionalData.sd, // Default source, can be empty initially
            type: "video/mp4",
          },
          {
            quality: "720p",
            src: additionalData.hd, // Default source, can be empty initially
            type: "video/mp4",
          },
          {
            quality: "1080p",
            src: additionalData.fhd, // Default source, can be empty initially
            type: "video/mp4",
          },
        ]
      : [],
  };

  return (
    <div>
      {additionalData ? (
        <>
          <div className="heading d-flex flex-col">
            <NavBar />
            <div className="poster d-flex flex-row">
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
              <div>
                <label>Resolution:</label>
                <button
                  className="exactMovieButton"
                  onClick={() => changeQuality("360p")}>
                  360p
                </button>
                <button
                  className="exactMovieButton"
                  onClick={() => changeQuality("720p")}>
                  720p
                </button>
                <button
                  className="exactMovieButton"
                  onClick={() => changeQuality("1080p")}>
                  1080p
                </button>
                <br />
                <p>Now playing as {quality}.</p>
              </div>
              <div>
                <label>Download:</label>
                <a href={additionalData.sd}>
                  <button className="exactMovieButton">360p</button>
                </a>
                <a href={additionalData.hd}>
                  <button className="exactMovieButton">720p</button>
                </a>
                <a href={additionalData.fhd}>
                  <button className="exactMovieButton">1080p</button>
                </a>
              </div>
              <h2 className="movieTitle fs-1">{additionalData.title}</h2>
              <p className="releasedYear">
                Released Year: {additionalData.releasedYear} <br />
                IMDb Rating: {additionalData.rating} <br />
                Genres:{" "}
                {additionalData.genres.map((genre, index) => (
                  <button key={index} type="button" className="btn btn-info">
                    {genre}
                  </button>
                ))}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading Movie data...</p>
      )}
    </div>
  );
}
