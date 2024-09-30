import React, { useState } from "react";
import img from "./logo.png";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  search,
  handleSearchChange,
  handleSearchSubmit,
  suggestion,
  handleSuggestionClick,
  authToken,
  setAuthToken,
  email,
  setEmail,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setEmail(null);
    navigate("/login");
  };

  // Extract the first name from the email (assuming email format is used as username)
  const getFirstName = (email) => {
    if (email) {
      const firstName = email.split("@")[0]; // Use part before @ as the first name
      return firstName.toUpperCase();
    }
    return "";
  };

  return (
    <header className="bg-slate-100 h-16 flex items-center justify-between p-4 shadow-lg">
      <img src={img} alt="Logo" className="w-32" />

      <nav>
        <ul className="flex space-x-8 text-gray-700 text-lg font-semibold">
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => handleSearchChange({ target: { value: "songs" } })}
          >
            Songs
          </li>
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => handleSearchChange({ target: { value: "tech" } })}
          >
            Tech
          </li>
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => handleSearchChange({ target: { value: "food" } })}
          >
            Food
          </li>
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() => handleSearchChange({ target: { value: "movies" } })}
          >
            Movies
          </li>
          <li
            className="hover:text-gray-950 cursor-pointer"
            onClick={() =>
              handleSearchChange({ target: { value: "business" } })
            }
          >
            Business
          </li>
        </ul>
      </nav>

      <div className="flex items-center space-x-4">
        {/* Search Form */}
        <div className="hidden md:flex items-center relative">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border-2 border-white rounded-full overflow-hidden bg-white shadow-md"
          >
            <input
              type="text"
              placeholder="Type to search..."
              value={search}
              onChange={handleSearchChange}
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
              onClick={handleSuggestionClick}
              className="absolute top-full mt-2 bg-white text-gray-800 p-2 rounded-lg shadow-lg cursor-pointer"
            >
              Did you mean: <strong>{suggestion}</strong>?
            </div>
          )}
        </div>

        {/* Authentication Logic */}
        {authToken ? (
          <div className="relative">
            <div
              className="w-12 h-12 bg-slate-300 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-2xl text-white text-center">
                {getFirstName(email).charAt(0)}
              </span>
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="p-2 text-center text-gray-700">
                  {getFirstName(email)}
                </div>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition duration-200">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
