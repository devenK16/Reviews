// Reviews.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rating.css';

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setShowAnimation(true);

    setTimeout(() => {
      if (newRating <= 3) {
        // navigate('/feedback', { state: { rating: newRating } });
        window.location.href = 'https://ia186u6fs18.typeform.com/to/cVcFewh5'
      } else {
        window.location.href = 'https://search.google.com/local/writereview?placeid=ChIJOVejjAZ_1DsRIZhuoMgNTAk';
      }
    }, 1000);
  };

  return (
    <div className={`reviews-container ${showAnimation ? 'animate' : ''}`}>
      <div className="reviews-content">
        <h2>Rate Your Experience</h2>
        <div className="rating-image-container">
          <img src="/rating_m_1.png" alt="Rating" className="rating-image" />
        </div>
        <hr className="divider centered-divider" />
        <p>Please select a star below that best represents your experience.</p>
        <div className={`rating ${showAnimation ? 'center-animation' : ''}`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (showAnimation ? rating : (hoverRating || rating)) ? 'active' : ''} ${showAnimation && star > rating ? 'hide' : ''}`}
              onClick={() => !showAnimation && handleRatingChange(star)}
              onMouseEnter={() => !showAnimation && setHoverRating(star)}
              onMouseLeave={() => !showAnimation && setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="rating-footer">
        Your rating helps us improve, we appreciate your honest feedback!
      </div>
    </div>
  );
};

export default Reviews;