import React from "react";

const ImageSlide = ({
  url,
  title,
  author,
  podcastId,
  getPodcastId,
  subscribed,
  unsubscribe,
}) => {
  return (
    <div id="carousel" className="slide-item">
      <img
        className="image-slide"
        src={url}
        alt=""
        onClick={(e) => getPodcastId(e, podcastId)}
      />

      <div
        className="slide-item-desc"
        onClick={(e) => getPodcastId(e, podcastId)}
      >
        <h3>{title}</h3>
        <p>{author}</p>
      </div>

      {subscribed && (
        <button onClick={(e) => unsubscribe(e, podcastId)}>Unsubscribe</button>
      )}
    </div>
  );
};

export { ImageSlide };
