import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ReviewForm from './components/ReviewForm';
import FeedbackForm from './components/FeedbackForm';
import ThankYouPage from './components/ThankYouPage';

function App() {
  const [reviews, setReviews] = useState([]);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ReviewForm onAddReview={addReview} />} />
          <Route path="/feedback" element={<FeedbackForm onAddReview={addReview} />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;