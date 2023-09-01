const { validationResult } = require('express-validator');
const Book = require('../models/bookModel');

const bookController = {
  getAllBooks: async (req, res, next) => {
    try {
      const books = await Book.findAll();

      res.status(200).json({
        message: 'Fetched posts successfully.',
        books: books,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  postAddBook: async (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const publicationYear = req.body.publicationYear;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Entered data is incorrect.');
        error.statusCode = 422;
        throw error;
      }
      const book = await Book.create({
        title: title,
        author: author,
        genre: genre,
        publicationYear: publicationYear,
      });
      res.status(201).json({
        message: 'New book added',
        book: book,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  putUpdateBook: async (req, res, next) => {
    const bookId = req.params.bookId;

    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const publicationYear = req.body.publicationYear;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Entered data is incorrect.');
        error.statusCode = 422;
        throw error;
      }

      const book = await Book.findAll({
        where: {
          id: bookId,
        },
      });

      console.log(book);

      if (book.length === 0) {
        const error = new Error(`Could not find book with this id: ${bookId}`);
        error.statusCode = 404;
        throw error;
      }

      const result = await Book.update(
        {
          title: title,
          author: author,
          genre: genre,
          publicationYear: publicationYear,
        },
        { where: { id: bookId } }
      );
      res.status(200).json({ message: 'Book updated!', book: result });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  deleteBook: async (req, res, next) => {
    const bookId = req.params.bookId;

    try {
      const book = await Book.findAll({
        where: {
          id: bookId,
        },
      });

      if (book.length === 0) {
        const error = new Error(`Could not find book with this id: ${bookId}`);
        error.statusCode = 404;
        throw error;
      }

      const result = await Book.destroy({ where: { id: bookId } });
      res.status(200).json({ message: 'Book deleted!', book: result });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

module.exports = bookController;
