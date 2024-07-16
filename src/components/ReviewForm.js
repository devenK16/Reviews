import React, { useState } from 'react';
import StarRating from './StarRating';

function ParentComponent() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <StarRating rating={rating} onRatingChange={setRating} />
    </div>
  );
}

export default ParentComponent;