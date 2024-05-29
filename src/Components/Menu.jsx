import React, { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false); // State to manage visibility of search input
  const handleMenuClick = () => {
    setShowMenu(!showMenu); // Show search input when search icon is clicked
  };
  return (
    <>
      <HiMenuAlt2 onClick={handleMenuClick} className="exactMovieButton" />
      {showMenu && (
        <div>
          <Link to="/">
            <button>Movies</button>
          </Link>
          <Link to="/animes">
            <button>Animes</button>
          </Link>
        </div>
      )}
    </>
  );
}
