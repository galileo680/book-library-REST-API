const express = require('express');

const bookController = require('../controllers/bookController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /api/books => GET
router.get('/books', bookController.getAllBooks);

// /api/add-book => POST
router.post('/add-book', isAuth, bookController.postAddBook);

// /api/update-book => PUT
router.put('/update-book/:bookId', isAuth, bookController.putUpdateBook);

// /api/delete-book => DELETE
router.delete('/delete-book/:bookId', isAuth, bookController.deleteBook);

module.exports = router;
