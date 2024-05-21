// Search.js
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigate = useNavigate(); // Get navigate function from React Router

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("/search"); // Navigate to search results page with query
      setShowSearchInput(false); // Hide search input after search
      setSearchQuery(""); // Clear search query
    }
  };

  return (
    <>
      <FaSearch onClick={handleSearchClick} className="exactMovieButton" />
      {showSearchInput && (
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </>
  );
}

export default Search;
