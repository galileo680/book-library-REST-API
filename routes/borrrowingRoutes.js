const express = require('express');

const borrowingController = require('../controllers/borrowingController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /api/borrowing => POST
router.post('/borrow', isAuth, borrowingController.borrowBook);

// /api/borrowing/:bookId => POST
//router.post('/return', isAuth, borrowingController.returnBook);

module.exports = router;
