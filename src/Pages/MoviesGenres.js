import React from "react";
import NavBar from "../Components/NavBar";
import GenresList from "../Components/GenresList";

export default function MovieGenres() {
  return (
    <>
      <div className="navBarBgAdd">
        <NavBar />
      </div>
      <GenresList />
    </>
  );
}
