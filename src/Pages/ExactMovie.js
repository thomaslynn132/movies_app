import React, { useEffect, useState } from "react";
import { firestore, doc, getDoc } from "../firebase"; // Adjusted imports
import { useParams } from "react-router-dom";
export default function ExactMovie() {
  const { id } = useParams();
  const [additionalData, setAdditionalData] = useState(null);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const movieDocRef = doc(firestore, "movie", id);
        const movieDocSnapshot = await getDoc(movieDocRef);
        if (movieDocSnapshot.exists()) {
          const movieData = movieDocSnapshot.data();
          setAdditionalData(movieData);
        } else {
          console.error("Movie not found");
        }
      } catch (error) {
        console.error("Error fetching additional data: ", error);
      }
    };

    fetchAdditionalData();
  }, [id]);

  return (
    <div>
      {additionalData ? (
        <>
          <div className="heading d-flex flex-col">
            <div className="poster d-flex flex-row">
              <iframe
                width="640"
                height="360"
                src={additionalData.title}
                title={additionalData.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              />
              <h2 className="movieTitle fs-1">{additionalData.title}</h2>
              <p className="releasedYear">
                Released Year:{additionalData.releasedYear} <br />
                IMDb Rating: {additionalData.rating} <br />
                Generes :{" "}
                {additionalData.generes.map((genere) => (
                  <button key={id}>
                    {/* // onClick={() => handlePartClick(genere)}> */}
                    <button type="button" class="btn btn-info">
                      {genere}
                    </button>
                  </button>
                ))}
              </p>
            </div>
            <div className="movie.details"></div>
          </div>
        </>
      ) : (
        <p>Loading Movie data...</p>
      )}
    </div>
  );
}
