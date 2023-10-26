import React from "react";
import "./StarRating.css";

interface StarRatingProps {  // Structure of Props
  rating: number;
  id: number;
  onStarClick: (id: number, rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, id, onStarClick }) => {
  const renderStars = (): JSX.Element[] => { // Method for displaying stars for rating
    const stars: JSX.Element[] = [];
    for (let i: number = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? "selected" : ""}`}  // Dynamic css class on clicking the stars
          onClick={() => onStarClick(id, i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Calling the function for displaying stars for rating
  return <div className="star-rating">{renderStars()}</div>; 
};
export default StarRating;
