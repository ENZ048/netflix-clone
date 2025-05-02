import React from 'react'

export default function Carousel({content}) {
  return (
    <div>
      <div className="trending-wrapper">
        <div className="trending-container">
          <h2 className="trending-title">Trending Now</h2>
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
    </div>
  )
}
