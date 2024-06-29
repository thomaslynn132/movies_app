import React, { useState } from "react";
import { firestore, collection, addDoc } from "../firebase";
import { storage, ref, uploadBytes, getDownloadURL } from "../firebase";

export default function AdminPage({ onMovieSubmit }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [duration, setDuration] = useState("");
  const [genres, setGenres] = useState([]);
  const [releasedYear, setReleasedYear] = useState(2024);
  const [rating, setRating] = useState("");
  const [noOfViews, setNoOfViews] = useState(0);
  const [fhd, setFhd] = useState("");
  const [hd, setHd] = useState("");
  const [sd, setSd] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const handleCoverPhotoChange = (e) => setCoverPhoto(e.target.files[0]);
  const handleFhdLink = (e) => setFhd(e.target.value);
  const handleHdLink = (e) => setHd(e.target.value);
  const handleSdLink = (e) => setSd(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storageRef = ref(
        storage,
        `cover_photos/${Date.now()}_${coverPhoto.name}`
      );
      await uploadBytes(storageRef, coverPhoto);
      const coverPhotoUrl = await getDownloadURL(storageRef);

      const newMovie = {
        title,
        review,
        coverPhoto: coverPhotoUrl,
        duration,
        genres,
        releasedYear,
        rating,
        noOfViews,
        fhd,
        hd,
        sd,
        uploadDate: new Date(),
      };

      const moviesCollection = collection(firestore, "movies");
      const newDocRef = await addDoc(moviesCollection, newMovie);

      onMovieSubmit({ ...newMovie, id: newDocRef.id });

      setTitle("");
      setReview("");
      setCoverPhoto(null);
      setDuration("");
      setGenres([]);
      setReleasedYear(2024);
      setRating("");
      setNoOfViews(0);
      setFhd("");
      setHd("");
      setSd("");
      alert("Movie Uploaded");
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  };

  return (
    <div>
      <h2 className="m-3">Admin Page</h2>
      <form onSubmit={handleSubmit} className="MovieSubmitForm">
        <label>
          Movie Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </label>
        <br />
        <label>
          Review:
          <textarea value={review} onChange={handleReviewChange} required />
        </label>
        <br />
        <label>
          Poster:
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoChange}
            required
          />
        </label>
        <br />
        <label>
          Duration (minutes):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Genres (comma-separated):
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value.split(","))}
            required
          />
        </label>
        <br />
        <label>
          Released Year:
          <input
            type="number"
            value={releasedYear}
            onChange={(e) => setReleasedYear(parseInt(e.target.value))}
            required
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          1080p Video Link:
          <input type="text" value={fhd} onChange={handleFhdLink} />
        </label>
        <br />
        <label>
          720p Video Link:
          <input type="text" value={hd} onChange={handleHdLink} />
        </label>
        <br />
        <label>
          480p Video Link:
          <input type="text" value={sd} onChange={handleSdLink} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h2>
        Note: Since this project is for my personal use, I don't decorate admin
        pages.
      </h2>
    </div>
  );
}
