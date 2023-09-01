import React from "react";
import { useLocation } from "react-router-dom";
import { NewsResults } from "../../utils/DataTypes";
import Header from "../Layout/Header";

import "./NewsContent.css";

const NewsContent = () => {
  const location = useLocation();
  let newsData: NewsResults = location.state.newsData;
  return (
    <>
      <Header />
      <div className="container">
        <div className="div-center">
          <img src={newsData.image_url} className="image" />
        </div>
        <div className="div-center">
          <h2>
            {newsData.title
              .split(" ")
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join(" ")}
          </h2>{" "}
        </div>
        <p>{newsData.pubDate}</p>
        <div className="div-center">
          <p className="content">{newsData.content}</p>
        </div>
      </div>
    </>
  );
};

export default NewsContent;
