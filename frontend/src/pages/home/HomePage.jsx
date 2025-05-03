import React from "react";
import Navbar from "../../components/Navbar";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import { useState } from "react";
import useGetTrending from "../../hooks/useGetTrending.jsx";
import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import "./HomePage.css";
import Carousel from "../../components/Carousel.jsx";

export default function HomePage() {
  const { trendingContent } = useGetTrending();
  const [imgLoading, setImgLoading] = useState(true);

  if (!trendingContent)
    return (
      <div className="homepage h-screen text-white relative">
        <Navbar />
        <div className="loading-overlay" />
      </div>
    );

  return (
    <>
      <div className="homepage h-screen text-white relative">
        <Navbar />

        {imgLoading && <div className="loading-overlay" />}

        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="Hero img"
          className="hero-img"
          onLoad={() => setImgLoading(false)}
        />

        <div className="black-overlay" aria-hidden="true" />

        <div className="content-container">
          <div className="gradient-overlay" />

          <div className="content-text">
            <h1 className="hero-title">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="hero-subtitle">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>

            <p className="hero-overview">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>

          <div className="button-group">
            <Link className="play-button">
              <Play className="button-icon" />
              Play
            </Link>

            <Link className="info-button">
              <Info className="button-icon" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <Carousel />
    </>
  );
}
