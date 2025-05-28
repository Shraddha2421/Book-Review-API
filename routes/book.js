const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');
const Review = require('../models/Review');

// Add a book
router.post('/books', auth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add book', error: err });
  }
});

// Get all books with optional filter and pagination
router.get('/books', async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = genre;

  try {
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err });
  }
});

// Get book by ID with reviews and average rating
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const avgRating = book.reviews.reduce((sum, r) => sum + r.rating, 0) / (book.reviews.length || 1);

    res.json({ book, avgRating });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book details', error: err });
  }
});

// Search books
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { author: new RegExp(q, 'i') }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Search error', error: err });
  }
});

module.exports = router;
