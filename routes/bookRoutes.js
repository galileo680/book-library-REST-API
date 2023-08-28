const express = require('express');

const bookController = require('../controllers/bookController');

const router = express.Router();

// /api/books => GET
router.get('/books', bookController.getAllBooks);

// /api/add-book => POST
router.post('/add-book', bookController.postAddBook);

module.exports = router;
