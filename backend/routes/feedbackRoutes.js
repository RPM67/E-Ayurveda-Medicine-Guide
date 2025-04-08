const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authUser = require('../middleware/authUser');

// Public route - anyone can view feedback
router.get('/medicine/:name', feedbackController.getMedicineFeedback);

// Protected routes - require user authentication
router.post('/add', authUser, feedbackController.addFeedback);
router.delete('/:id', authUser, feedbackController.deleteFeedback);

module.exports = router;