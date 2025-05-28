const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const Book = require('../models/Book');

// Submit a review
router.post('/books/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const existing = await Review.findOne({ book: req.params.id, user: req.user.id });
    if (existing) return res.status(400).json({ message: 'Review already exists' });

    const review = new Review({ user: req.user.id, book: req.params.id, rating, comment });
    await review.save();

    const book = await Book.findById(req.params.id);
    book.reviews.push(review._id);
    await book.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting review', error: err });
  }
});

// Update a review
router.put('/reviews/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err });
  }
});

// Delete a review
router.delete('/reviews/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err });
  }
});

module.exports = router;
