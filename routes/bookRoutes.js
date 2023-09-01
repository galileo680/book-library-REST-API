const express = require('express');
const { body } = require('express-validator');

const bookController = require('../controllers/bookController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /api/books => GET
router.get('/books', bookController.getAllBooks);

// /api/add-book => POST
router.post(
  '/add-book',
  isAuth,
  [
    body('title').trim().isLength({ min: 4 }).not().isEmpty(),
    body('author').trim().isLength({ min: 4 }).not().isEmpty(),
    body('genre').trim().isLength({ min: 4 }).not().isEmpty(),
    body('publicationYear').trim().isLength({ min: 4 }).not().isEmpty(),
  ],
  bookController.postAddBook
);

// /api/update-book => PUT
router.put(
  '/update-book/:bookId',
  isAuth,
  [
    body('title').trim().isLength({ min: 4 }).not().isEmpty(),
    body('author').trim().isLength({ min: 4 }).not().isEmpty(),
    body('genre').trim().isLength({ min: 4 }).not().isEmpty(),
    body('publicationYear').trim().isLength({ min: 4 }).not().isEmpty(),
  ],
  bookController.putUpdateBook
);

// /api/delete-book => DELETE
router.delete('/delete-book/:bookId', isAuth, bookController.deleteBook);

module.exports = router;
