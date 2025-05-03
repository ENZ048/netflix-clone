import { useContentStore } from "../store/content";
import useGetCategory from "../hooks/useGetCategory";
import './Carousel.css';

const Carousel = () => {
  const { contentType } = useContentStore();

  const { categoryContent: firstCategory } = useGetCategory(
    contentType === "movie" ? "now_playing" : "airing_today"
  );
  const { categoryContent: secondCategory } = useGetCategory(
    contentType === "movie" ? "top_rated" : "top_rated"
  );
  const { categoryContent: thirdCategory } = useGetCategory(
    contentType === "movie" ? "upcoming" : "on_the_air"
  );
  const { categoryContent: fourthCategory } = useGetCategory(
    contentType === "movie" ? "popular" : "popular"
  );

  const renderCarousel = (title, content) => (
    <div className="trending-wrapper">
      <div className="trending-container">
        <h2 className="trending-title">{title}</h2>
        <div className="trending-carousel">
          {content.map((item, index) => (
            <div key={item.id} className="trending-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
              />
              <div className="trending-rank">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {renderCarousel(
        contentType === "movie" ? "Now Playing" : "Airing Today",
        firstCategory
      )}
      {renderCarousel("Top Rated", secondCategory)}
      {renderCarousel(
        contentType === "movie" ? "Upcoming" : "On the Air",
        thirdCategory
      )}
      {renderCarousel("Popular", fourthCategory)}
    </div>
  );
};

export default Carousel;
