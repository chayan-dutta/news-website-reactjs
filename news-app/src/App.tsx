import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/Pages/Home";

import "./App.css";
import { NewsDataProvider } from "./Contexts/NewsDataContext";
import About from "./components/Pages/About";
import NewsContent from "./components/Pages/NewsContent";

function App() {
  return (
    <NewsDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<About />} />
          <Route path="/news-content" element={<NewsContent />} />
        </Routes>
      </Router>
    </NewsDataProvider>
  );
}

export default App;
