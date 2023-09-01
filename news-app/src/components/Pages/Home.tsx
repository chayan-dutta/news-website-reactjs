import { FC, useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";

import { NewsApiResponse } from "../../utils/DataTypes";
import NewsContext from "../../Contexts/NewsDataContext";
import AutoPlayCarousel from "../UI/AutoPlayCarousel";
import Header from "../Layout/Header";
import NewsCard from "../UI/NewsCard";
import "./Home.css";

const HomeComponent: FC = () => {
  const newsCtx = useContext(NewsContext);

  const [hasmore, setHasMore] = useState<boolean>(true);

  const country: string = "in",
    topic: null = null;

  useEffect(() => {
    if (newsCtx.results.length === 0) {
      newsCtx.getNewsData(country, topic);
    }
  }, []);

  const fetchMoreData = () => {
    if (newsCtx.totalResults <= newsCtx.results.length) {
      setHasMore(false);
    }

    let selectedCountry = localStorage.getItem("selectedCountries");
    let selectedCategory = localStorage.getItem("selectedCategory");
    if (selectedCountry != null && selectedCategory) {
      newsCtx.getNewsData(selectedCountry, selectedCategory);
    } else {
      newsCtx.getNewsData(country, topic);
    }
  };

  return (
    <div>
      <div className="header-class">
        <Header />
      </div>
      <div>
        <AutoPlayCarousel />
      </div>
      <div style={{ marginTop: "50px" }}>
        <InfiniteScroll
          dataLength={newsCtx.results.length}
          hasMore={hasmore}
          next={fetchMoreData}
          loader={
            <div className="loader-icon">
              <CircularProgress />
            </div>
          }
          scrollThreshold="100px"
          endMessage={
            <div className="loader-icon">
              <p>No more news with your selection</p>
            </div>
          }
        >
          {newsCtx.results.map((news, index) => {
            return (
              <div key={index}>
                <NewsCard news={news} />;
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomeComponent;
