import React from "react";
import { NewsResults } from "../../utils/DataTypes";

import "./NewsCard.css";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ news }: { news: NewsResults }) => {
  const navigate = useNavigate();

  const readNews = () => {
    navigate("/news-content", {
      state: {
        newsData: news,
      },
    });
  };

  return (
    <div className="container">
      <div className="news-card" onClick={readNews}>
        <div className="news-image">
          <img src={news.image_url} alt="News Image" className="f-img" />
        </div>
        <div className="news-content">
          <h2 className="news-title">{news.title}</h2>
          <p className="news-description">
            {news.description?.length > 200
              ? news.description.slice(0, 200) + "..."
              : news.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
