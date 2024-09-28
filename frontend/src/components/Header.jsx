import React from "react";
import img from "./logo.png";
import { IoMdSearch } from "react-icons/io";

const Header = ({
  search,
  onSearchChange,
  onSearchSubmit,
  suggestion,
  onSuggestionClick,
}) => {
  return (
    <header className="bg-slate-100 h-16 flex items-center justify-between p-4 shadow-lg">
      <img src={img} alt="Logo" className="w-32" />

      <nav>
        <ul className="flex space-x-8 text-gray-700 text-lg font-semibold">
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => onSearchChange({ target: { value: "songs" } })}
          >
            Songs
          </li>
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => onSearchChange({ target: { value: "tech" } })}
          >
            Tech
          </li>
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => onSearchChange({ target: { value: "food" } })}
          >
            Food
          </li>
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => onSearchChange({ target: { value: "movies" } })}
          >
            Movies
          </li>
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => onSearchChange({ target: { value: "business" } })}
          >
            Business
          </li>
        </ul>
      </nav>

      <div className="hidden md:flex items-center relative">
        <form
          onSubmit={onSearchSubmit}
          className="flex items-center border-2 border-white rounded-full overflow-hidden bg-white shadow-md"
        >
          <input
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={onSearchChange}
            className="p-2 outline-none text-gray-700 w-64 rounded-l-full"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white flex items-center justify-center rounded-r-full"
          >
            <IoMdSearch size={20} />
          </button>
        </form>
        {suggestion && (
          <div
            onClick={onSuggestionClick}
            className="absolute top-full mt-2 bg-white text-gray-800 p-2 rounded-lg shadow-lg cursor-pointer"
          >
            Did you mean: <strong>{suggestion}</strong>?
          </div>
        )}
      </div>

      <div className="md:hidden">
        <button className="text-white text-2xl">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
