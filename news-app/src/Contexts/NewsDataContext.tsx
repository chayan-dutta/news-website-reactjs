import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

import {
  NewsApiResponse,
  NewsContextType,
  NewsResults,
} from "../utils/DataTypes";

interface ComponentProps {
  children: ReactNode;
}

const NewsContext = createContext<NewsContextType>({
  nextPage: 0,
  status: "",
  results: [],
  totalResults: 0,
  getNewsData: (country: string, topic: string | null) => {},
});

export const NewsDataProvider = ({ children }: ComponentProps) => {
  const [nextPage, setNextPage] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [results, setResults] = useState<NewsResults[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receivedData, setReceivedData] = useState<NewsApiResponse>({
    nextPage: 0,
    status: "",
    results: [],
    totalResults: 0,
  });

  var defaultApiUrl: string =
    "https://newsdata.io/api/1/news?apikey=pub_28051c10216fbeb8864d0b1d48b4f96dc4690&language=en&image=1";

  const getNewsData = (country: string, topic: string | null) => {
    if (country === "") {
      country = "in";
    }
    var apiUrl: string = `${defaultApiUrl}&country=${country}`;
    if (topic && topic !== "") {
      apiUrl = `${apiUrl}&category=${topic}`;
    }
    if (nextPage != 0 && nextPage != null) {
      apiUrl = `${apiUrl}&page=${nextPage}`;
    }
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(apiUrl);
        setReceivedData(response.data);
        setNextPage(response.data.nextPage);
        setResults((prevResults) => [...prevResults, ...response.data.results]);
        setStatus(response.data.status);
        setTotalResults(response.data.totalResults);
        console.log(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  };

  // useEffect(() => {
  //   setNextPage(receivedData.nextPage);
  //   setResults((prevResults) => [...prevResults, ...receivedData.results]);
  //   setStatus(receivedData.status);
  //   setTotalResults(receivedData.totalResults);
  //   console.log(receivedData);
  // }, [isLoading]);

  const newsContext = {
    nextPage: nextPage,
    status: status,
    results: results,
    totalResults: totalResults,
    getNewsData: getNewsData,
  };

  return (
    <NewsContext.Provider value={newsContext}>{children}</NewsContext.Provider>
  );
};

export default NewsContext;
