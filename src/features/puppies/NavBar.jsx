// I couldn't get <Link to... to work for the life of me. Used buttons to solve issue

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const goToPuppyList = () => {
    navigate("/puppy-list");
  };

  const goToPuppyForm = () => {
    navigate("/puppy-form");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/puppy-list?search=${searchTerm}`);
  };

  return (
    <nav>
      <button onClick={goToPuppyList}>List of Players</button>
      <button onClick={goToPuppyForm}>Add a Player</button>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search Puppies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
