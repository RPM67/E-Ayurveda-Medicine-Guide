const Feedback = require('../models/feedback');
const Medicine = require('../models/medicine');

exports.addFeedback = async (req, res) => {
  try {
    const { medicineName, comment, rating } = req.body;
    const trimmedName = medicineName.trim();
    
    // Validate medicine exists with trimmed name
    const medicine = await Medicine.findOne({ name: trimmedName });
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    // Check if user already gave feedback for this medicine
    const existingFeedback = await Feedback.findOne({
      medicineName: trimmedName,
      userId: req.session.userId
    });

    if (existingFeedback) {
      return res.status(400).json({ error: 'You have already reviewed this medicine' });
    }

    const feedback = new Feedback({
      medicineName: trimmedName,
      userId: req.session.userId,
      comment: comment.trim(),
      rating: parseInt(rating)
    });

    await feedback.save();
    await feedback.populate('userId', 'username');

    res.status(201).json({
      message: 'Feedback added successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicineFeedback = async (req, res) => {
  try {
    const medicineName = req.params.name.trim();
    
    // Find medicine with trimmed name
    const medicine = await Medicine.findOne({ name: medicineName });
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    const feedbacks = await Feedback.find({ medicineName })
      .populate('userId', 'username')
      .sort('-createdAt');

    const avgRating = feedbacks.length > 0 
      ? feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length 
      : 0;

    res.json({
      medicine: {
        name: medicine.name,
        description: medicine.description
      },
      feedbacks,
      stats: {
        totalFeedbacks: feedbacks.length,
        averageRating: Math.round(avgRating * 10) / 10
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    // Check if feedback belongs to logged-in user
    if (feedback.userId.toString() !== req.session.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this feedback' });
    }

    await feedback.deleteOne();
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};