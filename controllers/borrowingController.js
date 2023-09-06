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
    const bookId = req.body.bookId;
    const userId = req.userId;

    try {
      const bookToReturn = await Borrowing.findOne({
        where: {
          BookId: bookId,
          UserId: userId,
          returnedDate: null,
        },
      });

      if (!bookToReturn) {
        const error = new Error(`Can't return this book!`);
        error.statusCode = 400;
        throw error;
      }

      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      bookToReturn.update({
        returnedDate: currentDate,
      });

      res.status(200).json({ message: 'Book returned!' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getBorrowedBooksForUser: async (req, res, next) => {
    const userId = req.userId;

    try {
      const userBooks = await Borrowing.findAll({
        where: { UserId: userId, returnedDate: null },
      });

      if (!userBooks) {
        res
          .status(200)
          .json({ message: 'No book is currently borrowed by user' });
      }

      console.log(userBooks);
      res.status(200).json({
        message: 'Fetched user books successfully.',
        userBooks: userBooks,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getAllBorrowedBooks: async (req, res, next) => {
    try {
      const borrowedBooks = await Borrowing.findAll({
        where: { returnedDate: null },
      });

      if (!borrowedBooks) {
        res.status(200).json({ message: 'No book is currently borrowed' });
      }

      const borrowedBooksIds = borrowedBooks.map((Borrowing) => {
        return Borrowing['dataValues'].BookId;
      });

      const books = await Book.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: borrowedBooksIds,
          },
        },
      });

      res.status(200).json({
        message: 'Fetched borrowed books successfully.',
        books: books,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

module.exports = borrowingController;
