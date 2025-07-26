import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
 const API_KEY ="9c3ed8ee95884dec979460a60f96675b";


  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      const articles = jsonData.articles.slice(0, 10);
      setNewsData(articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // 🔁 Fetch news whenever the `search` keyword changes
  useEffect(() => {
    getData();
  }, [search]);

  // 🔄 For typing in search input
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  // 🔘 When clicking category buttons
  const handleCategoryClick = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <div>
      <nav>
        <div>
          <h1>Trendy News</h1>
        </div>
        <ul style={{ display: "flex", gap: "11px" }}>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>All News</a>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a>
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
          />
          {/* 🔄 This button is optional now; search happens automatically */}
          {/* <button onClick={getData}>Search</button> */}
        </div>
      </nav>

      <div>
        <p className="head">Stay Updated with TrendyNews</p>
      </div>

      <div className="categoryBtn">
        <button onClick={handleCategoryClick} value="sports">Sports</button>
        <button onClick={handleCategoryClick} value="politics">Politics</button>
        <button onClick={handleCategoryClick} value="entertainment">Entertainment</button>
        <button onClick={handleCategoryClick} value="health">Health</button>
        <button onClick={handleCategoryClick} value="fitness">Fitness</button>
      </div>

      <div>
        {newsData ? <Card data={newsData} /> : <p>Loading news...</p>}
      </div>
    </div>
  );
};

export default Newsapp;
