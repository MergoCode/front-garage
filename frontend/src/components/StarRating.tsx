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
    <div className={`star-rating ${editable ? 'editable' : ''}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${(rating && star <= rating) ? 'filled' : ''}`}
          onClick={() => handleStarClick(star)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
  <path d="M13.1611 19.2884L21.2947 24L19.1363 15.12L26.3222 9.14526L16.8594 8.37474L13.1611 0L9.46284 8.37474L0 9.14526L7.18597 15.12L5.02754 24L13.1611 19.2884Z" fill="#FFDD00"/>
</svg>
        </span>
      ))}
    </div>
  );
};

export default StarRating;