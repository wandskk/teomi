import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import "@/styles/Search/Search.scss";
import Link from "next/link";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSearchSubmit}>        
        <div className="search__field">
          <input
            className="search__input"
            placeholder="Pesquisa"
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search__button" type="submit">
            <FiFilter />
          </button>
        </div>
      </form>
      <ul className="search__list">
        <li className="search__list__item --active">Todos</li>
        <li className="search__list__item">Offiline</li>
        <li className="search__list__item">Online</li>
      </ul>
    </div>
  );
};

export default Search;
