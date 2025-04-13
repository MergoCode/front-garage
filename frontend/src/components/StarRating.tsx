import React from "react";
import "../css/StarRating.scss";

type StarRatingProps = {
  rating: number | null;
  onRatingChange: (rating: number) => void;
  editable: boolean;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, editable }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (star: number) => {
    if (editable) {
      onRatingChange(star);
    }
  };

  return (
    <div className={`star-rating ${editable ? "editable" : ""}`}>
      {stars.map((star) => (
        <span
          key={star}
          className="star"
          onClick={() => handleStarClick(star)}
          style={{ cursor: editable ? "pointer" : "default" }}
        >
          {rating && star <= rating ? (
            // Заповнена жовта зірка
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
              <path
                d="M13.1611 19.2884L21.2947 24L19.1363 15.12L26.3222 9.14526L16.8594 8.37474L13.1611 0L9.46284 8.37474L0 9.14526L7.18597 15.12L5.02754 24L13.1611 19.2884Z"
                fill="#FFDD00"
              />
            </svg>
          ) : (
            // Сіра порожня зірка
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
              <path
                d="M13.4117 18.8558L13.1611 18.7106L12.9105 18.8558L5.78989 22.9806L7.67182 15.2381L7.7455 14.935L7.50563 14.7355L1.26185 9.54417L9.50342 8.87309L9.80001 8.84894L9.92023 8.57672L13.1611 1.23774L16.402 8.57672L16.5222 8.84894L16.8188 8.87309L25.0604 9.54417L18.8166 14.7355L18.5767 14.935L18.6504 15.2381L20.5323 22.9806L13.4117 18.8558Z"
                stroke="#939393"
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
