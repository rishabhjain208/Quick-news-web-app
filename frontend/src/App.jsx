import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Typo from "typo-js";
import Footer from "./components/Footer";

const API_KEY = "e7602362d72142009d1a8ac9be8b9dc7";
const url = "https://newsapi.org/v2/everything?q=";

const dictionary = new Typo("en_US");

function App() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState("");

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

  const handleSpellCheck = (query) => {
    const isCorrect = dictionary.check(query);
    if (!isCorrect) {
      const suggestions = dictionary.suggest(query);
      if (suggestions.length > 0) {
        setSuggestion(suggestions[0]); // Display the first suggestion
      }
    }
  };

  const handleSuggestionClick = () => {
    setSearch(suggestion);
    fetchData(suggestion);
    setSuggestion("");
  };

  return (
    <div>
      <Header
        search={search}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        suggestion={suggestion}
        onSuggestionClick={handleSuggestionClick}
      />
      <Main articles={articles} />
      <Footer />
    </div>
  );
}

export default App;
