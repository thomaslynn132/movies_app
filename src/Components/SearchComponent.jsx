import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { collection, query, where, getDocs, firestore } from "../firebase";
function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false); // State to manage visibility of search input

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput); // Show search input when search icon is clicked
  };

  const handleSearch = async () => {
    try {
      const moviesCollection = collection(firestore, "movies");
      const q = query(moviesCollection, where("title", "==", searchQuery));
      const querySnapshot = await getDocs(q);
      const searchResults = [];
      querySnapshot.forEach((doc) => {
        searchResults.push({ id: doc.id, ...doc.data() });
      });

      setShowSearchInput(!showSearchInput);
      setSearchQuery("");
      console.log("Search results:", searchResults); // Output search results to console
    } catch (error) {
      console.error("Error searching for movies: ", error);
    }
  };

  return (
    <>
      <FaSearch onClick={handleSearchClick} />{" "}
      {/* Show search input when search icon is clicked */}
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
