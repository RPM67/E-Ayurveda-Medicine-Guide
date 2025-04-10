import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackSection.css';

axios.defaults.withCredentials = true;

const FeedbackSection = ({ medicineName }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ comment: '', rating: 5 });
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbacks();
    checkUser();
  }, [medicineName]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/feedback/medicine/${medicineName}`
      );
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const checkUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        withCredentials: true
      });
      setUser(response.data);
    } catch (error) {
      console.error('Not logged in');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback/add', {
        medicineName,
        ...newFeedback
      });
      setNewFeedback({ comment: '', rating: 5 });
      fetchFeedbacks();
    } catch (error) {
      setError(error.response?.data?.error || 'Error submitting feedback');
    }
  };

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`);
      fetchFeedbacks();
    } catch (error) {
      setError(error.response?.data?.error || 'Error deleting feedback');
    }
  };

  return (
    <div className="feedback-section">
      <h3>Feedback</h3>
      
      {error && <div className="error">{error}</div>}

      {user && (
        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            value={newFeedback.comment}
            onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
            placeholder="Write your feedback..."
            required
          />
          <select
            value={newFeedback.rating}
            onChange={(e) => setNewFeedback({...newFeedback, rating: Number(e.target.value)})}
          >
            {[5,4,3,2,1].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
          <button type="submit">Submit Feedback</button>
        </form>
      )}

      <div className="feedbacks-list">
        {feedbacks.map(feedback => (
          <div key={feedback._id} className="feedback-item">
            <p>{feedback.comment}</p>
            <div className="feedback-meta">
              <span>Rating: {feedback.rating}/5</span>
              <span>By: {feedback.userId.username}</span>
              {user && user._id === feedback.userId._id && (
                <button 
                  onClick={() => handleDelete(feedback._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSection;