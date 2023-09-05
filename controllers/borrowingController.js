const Sequelize = require('sequelize');

const Borrowing = require('../models/borrowingModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');

const borrowingController = {
  borrowBook: async (req, res, next) => {
    const bookId = req.body.bookId;
    const userId = req.userId;

    try {
      const book = await Book.findOne({ where: { id: bookId } });

      if (!book) {
        const error = new Error(`There is no book with ID: ${bookId}`);
        error.statusCode = 404;
        throw error;
      }

      const isBorrowed = await Borrowing.findOne({
        where: {
          BookId: bookId,
          returnedDate: null,
        },
      });

      if (isBorrowed) {
        const error = new Error(`Book with ID: ${bookId} is already borrowed!`);
        error.statusCode = 400;
        throw error;
      }

      const oneMonthFromNow = Sequelize.literal(
        'DATE_ADD(NOW(), INTERVAL 1 MONTH)'
      );

      const borrowing = await Borrowing.create({
        dueDate: oneMonthFromNow,
        UserId: userId,
        BookId: bookId,
      });

      res.status(201).json({ message: 'Book borrowed', data: borrowing });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  returnBook: async (req, res, next) => {
    const bookId = req.params.bookId;
    const userId = req.userId;

    try {
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getBorrowedBooksForUser: async (req, res, next) => {},
  getAllBorrowedBooks: async (req, res, next) => {},
};

module.exports = borrowingController;
