const express = require('express');

const bookController = require('../controllers/bookController');

const router = express.Router();

// /api/books => GET
router.get('/books', bookController.getAllBooks);

// /api/add-book => POST
router.post('/add-book', bookController.postAddBook);

// /api/update-book => PUT
router.put('/update-book/:bookId', bookController.putUpdateBook);

// /api/delete-book => DELETE
router.delete('/delete-book/:bookId', bookController.deleteBook);

module.exports = router;
