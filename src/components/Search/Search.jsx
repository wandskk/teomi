import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import "@/styles/Search/Search.scss";

const Search = ({ setSearch, setFilter = undefined, noFilter = false }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterSearch, setFilterSearch] = React.useState(1);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  React.useEffect(() => {
    setFilter && setFilter(filterSearch);
  }, [filterSearch]);

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
      {!noFilter && (
        <ul className="search__list">
          <li
            className={`search__list__item ${filterSearch === 1 && "--active"}`}
            onClick={() => setFilterSearch(1)}
          >
            Todos
          </li>
          <li
            className={`search__list__item ${filterSearch === 2 && "--active"}`}
            onClick={() => setFilterSearch(2)}
          >
            Offiline
          </li>
          <li
            className={`search__list__item ${filterSearch === 3 && "--active"}`}
            onClick={() => setFilterSearch(3)}
          >
            Online
          </li>
        </ul>
      )}
    </div>
  );
};

export default Search;
