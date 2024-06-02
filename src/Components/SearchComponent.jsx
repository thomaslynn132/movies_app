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
      // Include the search query as a query parameter in the URL
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchInput(false); // Hide search input after search
      setSearchQuery(""); // Clear search query
    }
  };

  return (
    <>
      <FaSearch
        onClick={handleSearchClick}
        className="exactMovieButton reveal"
      />
      {showSearchInput && (
        <div>
          <input
            type="text"
            value={searchQuery}
            className="searchBar reveal"
            style={{ padding: "7px", borderRadius: "12px" }}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies..."
          />
          <button onClick={handleSearch} className="button reveal">
            <FaSearch />
          </button>
        </div>
      )}
    </>
  );
}

export default Search;
