import React from "react";
import { NavBar, GenresList } from "../../Components/utilities";

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
