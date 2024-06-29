import React, { useEffect, useState, useRef } from "react";
import { firestore, doc, getDoc, updateDoc } from "../firebase"; // Ensure firestore is imported from your Firebase configuration
import { Link, useParams } from "react-router-dom";
import VideoJS from "../Components/VideoPlayer"; // Ensure you have this component or package installed
import NavBar from "../Components/NavBar";
import { Helmet } from "react-helmet"; // Import Helmet
import { gsap } from "gsap"; // Import GSAP
import { useGSAP } from "@gsap/react";
export default function ExactMovie() {
  const id = useParams();
  const [additionalData, setAdditionalData] = useState(null);
  const [quality, setQuality] = useState("720p");
  const playerRef = useRef(null);
  const [coverPhotoMetadata, setCoverPhotoMetadata] = useState(null);
  const [seeLess, setSeeLess] = useState(true);
  const qualityRef = useRef(null); // Ref for quality text
  const titleRef = useRef(null); // Ref for movie title
  const detailsRef = useRef(null); // Ref for movie details

  const container = useRef();

  const { contextSafe } = useGSAP({ scope: container }); // we can pass in a config object as the 1st parameter to make scoping simple

  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  // selector text is scoped properly to the container.
  const onClickGood = contextSafe(() => {
    gsap.to(".good", { rotation: 360 });
  });

  // Define fetchMetadata function
  const fetchMetadata = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const metadata = await response.json();
      return metadata;
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };

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
    const fetchAndIncrementViews = async () => {
      try {
        const movieDocRef = doc(firestore, "movies", id.id); // Ensure 'movies' collection name matches your Firestore setup
        const movieDocSnapshot = await getDoc(movieDocRef);
        if (movieDocSnapshot.exists()) {
          const movieData = movieDocSnapshot.data();
          setAdditionalData(movieData);
          // Increment the view count
          if (movieData.coverPhoto) {
            const metadata = await fetchMetadata(movieData.coverPhoto);
            setCoverPhotoMetadata(metadata);
          }
          await updateDoc(movieDocRef, {
            views: (movieData.views || 0) + 1,
          });
          // Set default video source based on the initial quality
          if (playerRef.current) {
            playerRef.current.src({ type: "video/mp4", src: movieData.hd }); // Default to 'hd'
          }
          // Trigger animations
          gsap.fromTo(
            qualityRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 }
          );
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1 }
          );
          gsap.fromTo(
            detailsRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 1 }
          );
        } else {
          console.error("Movie not found");
        }
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };

    fetchAndIncrementViews();
  }, [id]);

  const changeQuality = (quality) => {
    if (!additionalData) return;

    const sources = {
      "480p": additionalData.sd,
      "720p": additionalData.hd,
      "1080p": additionalData.fhd,
    };

    if (playerRef.current) {
      playerRef.current.src({ type: "video/mp4", src: sources[quality] });
      setQuality(quality);
      // Trigger animation for quality change
      gsap.fromTo(
        qualityRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
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
  // const showless = additionalData.review.length
  // const toggleShowFullReview  = () =>{

  // }

  return (
    <div>
      {additionalData ? (
        <>
          <div ref={container}>
            <div className="heading d-flex flex-col">
              <Helmet>
                <title>{additionalData.title}</title>
              </Helmet>
              <NavBar />
              <div className="poster d-flex flex-row">
                {coverPhotoMetadata && (
                  <div>
                    <img
                      className="reveal"
                      src={coverPhotoMetadata.imageUrl}
                      alt="Cover Preview"
                    />
                    <p className="reveal">{coverPhotoMetadata.title}</p>
                    <p className="reveal">{coverPhotoMetadata.description}</p>
                  </div>
                )}
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                <div>
                  <label className="reveal">Resolution:</label>
                  <button
                    className={`good reveal exactMovieButton ${
                      quality === "360p" ? "activeButton" : ""
                    }`}
                    onClick={() => changeQuality("360p")}>
                    360p
                  </button>
                  <button
                    className={`good reveal exactMovieButton ${
                      quality === "720p" ? "activeButton" : ""
                    }`}
                    onClick={() => changeQuality("720p")}>
                    720p
                  </button>
                  <button
                    className={`good reveal exactMovieButton ${
                      quality === "1080p" ? "activeButton" : ""
                    }`}
                    onClick={() => changeQuality("1080p")}>
                    1080p
                  </button>
                  <br />
                  <p
                    className="reveal"
                    ref={qualityRef}
                    style={{ fontFamily: "fantasy" }}>
                    Now playing as {quality}.
                  </p>
                </div>
                <div>
                  <label className="reveal">Download:</label>
                  <a href={additionalData.sd}>
                    <button
                      onClick={onClickGood}
                      className="good reveal exactMovieButton">
                      360p
                    </button>
                  </a>
                  <a href={additionalData.hd}>
                    <button
                      onClick={onClickGood}
                      className="good reveal exactMovieButton">
                      720p
                    </button>
                  </a>
                  <a href={additionalData.fhd}>
                    <button
                      onClick={onClickGood}
                      className="good reveal exactMovieButton">
                      1080p
                    </button>
                  </a>
                </div>
                <h2 ref={titleRef} className="reveal movieTitle fs-1">
                  {additionalData.title}
                </h2>
                <p ref={detailsRef} className="reveal releasedYear">
                  Released Year: {additionalData.releasedYear} <br />
                  IMDb Rating: {additionalData.rating} <br />
                  Genres:{" "}
                  {additionalData.genres.map((genre, index) => (
                    <Link to={`./genres/${genre}`} key={genre}>
                      <button
                        key={index}
                        type="button"
                        style={{ height: "40px", width: "auto" }}
                        className="reveal button btn btn-info">
                        {genre}
                      </button>
                    </Link>
                  ))}
                </p>
                <p
                  ref={detailsRef}
                  className="reveal Review"
                  onClick={() => {
                    setSeeLess(!seeLess);
                  }}>
                  {seeLess
                    ? additionalData.review.substring(0, 200) + "......"
                    : additionalData.review}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading Movie data...</p>
      )}
    </div>
  );
}
