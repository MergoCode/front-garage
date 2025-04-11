import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import "../css/TeacherCard.scss";

type Teacher = {
  id: string;
  fullName: string;
  department: string;
  position: string;
  photoUrl: string;
};

type TeacherCardProps = {
  teacher: Teacher;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number>(0);

  useEffect(() => {
    loadRatings();
  }, [teacher.id]);

  const loadRatings = () => {
    const ratingsData = localStorage.getItem(`teacherRatings_${teacher.id}`);
    if (ratingsData) {
      const ratings = JSON.parse(ratingsData);
      const userRating = localStorage.getItem(`userRating_${teacher.id}`);
      
      if (userRating) {
        setRating(parseFloat(userRating));
      }
      
      if (ratings.length > 0) {
        const sum = ratings.reduce((acc: number, curr: number) => acc + curr, 0);
        setAverageRating(sum / ratings.length);
        setRatingCount(ratings.length);
      }
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    
    // Save user's own rating
    localStorage.setItem(`userRating_${teacher.id}`, newRating.toString());
    
    // Update ratings array
    const ratingsData = localStorage.getItem(`teacherRatings_${teacher.id}`);
    let ratings: number[] = ratingsData ? JSON.parse(ratingsData) : [];
    
    // Check if user already rated
    const userRating = localStorage.getItem(`userRating_${teacher.id}`);
    if (userRating && ratings.length > 0) {
      // If user already rated, we need to remove their old rating first
      const oldRating = parseFloat(userRating);
      const oldRatingIndex = ratings.findIndex(r => r === oldRating);
      if (oldRatingIndex !== -1) {
        ratings.splice(oldRatingIndex, 1);
      }
    }
    
    // Add new rating
    ratings.push(newRating);
    localStorage.setItem(`teacherRatings_${teacher.id}`, JSON.stringify(ratings));
    
    // Update average
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    setAverageRating(sum / ratings.length);
    setRatingCount(ratings.length);
  };

  return (
    <div className="teacher-card">
      <div className="teacher-photo">
        <img src={teacher.photoUrl || "frontend/public/assets/people.svg"} alt={teacher.fullName} />
      </div>
      <div className="teacher-info">
        <h3>{teacher.fullName}</h3>
        <p className="department">{teacher.department}</p>
        <p className="position">{teacher.position}</p>
        
        <div className="rating-section">
          <div className="your-rating">
            <p>Ваша оцінка:</p>
            <StarRating 
              rating={rating} 
              onRatingChange={handleRatingChange} 
              editable={true}
            />
          </div>
          
          <div className="average-rating">
            <p>Середня оцінка ({ratingCount}):</p>
            <StarRating 
              rating={averageRating} 
              onRatingChange={() => {}} 
              editable={false}
            />
            <span className="rating-value">{averageRating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;