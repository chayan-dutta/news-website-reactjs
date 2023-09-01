import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useContext } from "react";

import "./AutoPlayCarousel.css";
import NewsContext from "../../Contexts/NewsDataContext";
import CarouselCard from "./CarouselCard";

const AutoPlayCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const newsCtx = useContext(NewsContext);

  return (
    <div className="container">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 10]}
            />
          </div>
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 1]}
            />
          </div>
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 2]}
            />
          </div>
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 3]}
            />
          </div>
          newsCtx.results.length -
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 4]}
            />
          </div>
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 5]}
            />
          </div>
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 6]}
            />
          </div>
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 7]}
            />
          </div>
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 8]}
            />
          </div>
          <div className="embla__slide">
            <CarouselCard
              newsData={newsCtx.results[newsCtx.results.length - 9]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPlayCarousel;
