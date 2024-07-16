// Reviews.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rating.css';

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (newRating <= 3) {
      navigate('/feedback', { state: { rating: newRating } });
    } else {
      // Redirect to Google review link for 4 or 5 star ratings
      window.location.href = 'https://search.google.com/local/writereview?placeid=ChIJOVejjAZ_1DsRIZhuoMgNTAk';
    }
  };

  return ( 
    <div className="reviews-container">
      <div className="reviews-content">
        <h2>Rate Your Experience</h2>
        <div className="rating-image-container">
          <img src="/rating_m_1.png" alt="Rating" className="rating-image" />
        </div>
        
        <hr className="divider centered-divider" />

        <p>Please select a star below that best represents your experience.</p>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= (hoverRating || rating) ? 'star active' : 'star'}
              onClick={() => handleRatingChange(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>
          
      </div>
      

      {/* <hr className="divider centered-divider" /> */}

      <div className="rating-footer">
        Your rating helps us improve , we appreciate your honest feedback!
      </div>
    </div>
  );
};

export default Reviews;