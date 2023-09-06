const express = require('express');

const borrowingController = require('../controllers/borrowingController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /api/borrow => POST
router.post('/borrow', isAuth, borrowingController.borrowBook);

// /api/return => POST
router.post('/return', isAuth, borrowingController.returnBook);

// /api/user-books => GET
router.get('/user-books', isAuth, borrowingController.getBorrowedBooksForUser);

// /api/borrowed-books => GET
router.get('/borrowed-books', isAuth, borrowingController.getAllBorrowedBooks);

module.exports = router;
