import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Authpage from "./components/Authpage";
import axios from "axios";

const API_KEY = "e7602362d72142009d1a8ac9be8b9dc7";
const url = "https://newsapi.org/v2/everything?q=";

function App() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [email, setEmail] = useState(null);

  // Get the current path
  const location = useLocation();

  useEffect(() => {
    const fetchEmail = async () => {
      if (authToken) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/auth/loginusername/${authToken}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setEmail(response.data.email);
        } catch (error) {
          console.error("Failed to fetch email:", error);
        }
      }
    };

    fetchEmail();
  }, [authToken]);

  useEffect(() => {
    fetchData(search || "all");
  }, [search]);

  const fetchData = async (query) => {
    try {
      const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      setArticles(data.articles);
      if (data.articles.length === 0) {
        handleSpellCheck(query);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSuggestion("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData(search || "all");
  };

  const handleSuggestionClick = () => {
    setSearch(suggestion);
    fetchData(suggestion);
    setSuggestion("");
  };

  // Conditionally render the Header component
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideHeader && (
        <Header
          search={search}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          suggestion={suggestion}
          handleSuggestionClick={handleSuggestionClick}
          authToken={authToken}
          setAuthToken={setAuthToken}
          email={email}
          setEmail={setEmail}
        />
      )}
      <Routes>
        <Route path="/" element={<Main articles={articles} />} />
        <Route
          path="/login"
          element={
            <Authpage
              isLogin={true}
              setAuthToken={setAuthToken}
              setEmail={setEmail}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Authpage
              isLogin={false}
              setAuthToken={setAuthToken}
              setEmail={setEmail}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
