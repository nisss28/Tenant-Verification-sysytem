import React from 'react';

const FeedbackCard = ({ feedbacks }) => {
  return (
    <div className="card">
      <h3>Landlord Feedback</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbacks.map((fb, index) => (
          <div key={index} className="feedback-item">
            <strong>{fb.landlord.name}</strong>: {fb.comment} ⭐ {fb.rating}/5
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackCard;
