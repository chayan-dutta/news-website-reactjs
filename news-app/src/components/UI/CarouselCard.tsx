import { useNavigate } from "react-router-dom";

import { NewsResults } from "../../utils/DataTypes";
import "./CarouselCard.css";

const CarouselCard = ({ newsData }: { newsData: NewsResults }) => {
  const navigate = useNavigate();

  const readNews = () => {
    navigate("/news-content", {
      state: {
        newsData,
      },
    });
  };

  return (
    <div className="my-container" onClick={readNews}>
      <img src={newsData?.image_url} className="news-img" />
      <figcaption className="caption">{newsData?.title}</figcaption>
    </div>
  );
};

export default CarouselCard;
