import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './FeedbackForm.css';

const questions = [
  "Quality of the food ",
  "Quality of the service",
  "Cleanliness of our restaurant?",
  "Ambiance of our restaurant?",
  "Rate overall experience?"
];

const FeedbackForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRating = location.state?.rating || 0;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [review, setReview] = useState('');
  const [direction, setDirection] = useState('down');

  const showReviewInput = currentQuestion === questions.length;

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = newAnswers[currentQuestion] === answer ? null : answer;
    setAnswers(newAnswers);

    if (newAnswers[currentQuestion] !== null) {
      if (currentQuestion < questions.length - 1) {
        setDirection('down');
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setDirection('down');
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handlePrevious = () => {
    if (showReviewInput) {
      setDirection('up');
      setCurrentQuestion(questions.length - 1);
    } else if (currentQuestion > 0) {
      setDirection('up');
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const feedbackData = {
      initialRating: initialRating,
      answers: answers.reduce((acc, answer, index) => {
        acc[questions[index]] = answer;
        return acc;
      }, {}),
      review: review
    };

    console.log('Submitting feedback:', feedbackData);

    const existingFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('feedbackData', JSON.stringify(existingFeedback));

    navigate('/thank-you');
  };

  const variants = {
    initial: (direction) => ({
      y: direction === 'down' ? 100 : -100,
      opacity: 0
    }),
    animate: {
      y: 0,
      opacity: 1
    },
    exit: (direction) => ({
      y: direction === 'down' ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <div className="feedback-form">
      <div className="progress-bar">
        <div style={{ width: `${(currentQuestion + 1) / (questions.length + 1) * 100}%` }}></div>
      </div>
      
      <AnimatePresence mode="wait" custom={direction}>
        {!showReviewInput ? (
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="question-container"
          >
            <p>
              <span className="question-number">{currentQuestion + 1}.</span>
              {questions[currentQuestion]}
            </p>
            <div className="answer-options">
              {[0, 1, 2, 3, 4, 5].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={answers[currentQuestion] === option ? 'selected' : ''}
                  onClick={() => handleAnswerChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="review"
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            <h2>Any additional feedback? (Optional)</h2>
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Please provide any additional feedback"
            />
          </motion.form>
        )}
      </AnimatePresence>

      <div className="bottom-button">
        {!showReviewInput ? (
          <button type="button" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </button>
        ) : (
          <button type="button" onClick={handleSubmit}>
            Submit Feedback
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;