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
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;