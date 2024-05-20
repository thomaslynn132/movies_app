import React, { useEffect, useState, useRef } from "react"; // useRef instead of React.useRef
import { firestore, doc, getDoc } from "../firebase"; // Ensure these functions are correctly imported
import { useParams } from "react-router-dom";
import VideoJS from "../Components/VideoPlayer"; // Ensure you have this component or package installed

export default function ExactMovie() {
  const { id } = useParams();
  const [additionalData, setAdditionalData] = useState(null);
  const [quality, setQuality] = useState("720p");

  const playerRef = useRef(null); // useRef directly

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://nx48182.your-storageshare.de/s/jCe36tkQomzpz7i",
        type: "video/mp4",
        label: "1080p",
        res: 1080,
      },
      {
        src: "https://nx48182.your-storageshare.de/s/jCe36tkQomzpz7i",
        type: "video/mp4",
        label: "720p",
        res: 720,
      },
      {
        src: "https://nx48182.your-storageshare.de/s/jCe36tkQomzpz7i",
        type: "video/mp4",
        label: "480p",
        res: 480,
      },
    ],
  };

  // Ensure videojs is imported if you're using it
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting"); // Use console.log instead of videojs.log
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const movieDocRef = doc(firestore, "movies", id); // 'movies' collection name should be plural if that's what you've named it
        const movieDocSnapshot = await getDoc(movieDocRef);
        if (movieDocSnapshot.exists()) {
          const movieData = movieDocSnapshot.data();
          setAdditionalData(movieData);
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
      {additionalData ? (
        <>
          <div className="heading d-flex flex-col">
            <div className="poster d-flex flex-row">
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

              <div>
                <button onClick={() => changeQuality("360p")}>360p</button>
                <button onClick={() => changeQuality("720p")}>720p</button>
                <button onClick={() => changeQuality("1080p")}>1080p</button>
              </div>
              <h2 className="movieTitle fs-1">{additionalData.title}</h2>
              <p className="releasedYear">
                Released Year: {additionalData.releasedYear} <br />
                IMDb Rating: {additionalData.rating} <br />
                Genres: {/* Fixed typo in 'Genres' */}
                {additionalData.genres.map(
                  (
                    genre,
                    index // Fixed typo in 'genres' and added 'index' as key
                  ) => (
                    <button key={index} type="button" className="btn btn-info">
                      {" "}
                      {/* Fixed nested button issue */}
                      {genre}
                    </button>
                  )
                )}
              </p>
            </div>
            {/* Removed empty div */}
          </div>
        </>
      ) : (
        <p>Loading Movie data...</p>
      )}
    </div>
  );
}
