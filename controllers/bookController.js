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
      console.log(err);
      if (!err.statusCode) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(err.statusCode).json({ error: err.message });
      }
    }
  },
  postAddBook: async (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const publicationYear = req.body.publicationYear;

    try {
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
      console.log(err);
      if (!err.statusCode) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(err.statusCode).json({ error: err.message });
      }
    }
  },
  putUpdateBook: async (req, res, next) => {
    const bookId = req.params.bookId;

    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const publicationYear = req.body.publicationYear;

    try {
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
      console.log(err);
      if (!err.statusCode) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(err.statusCode).json({ error: err.message });
      }
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
      console.log(err);
      if (!err.statusCode) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(err.statusCode).json({ error: err.message });
      }
    }
  },
};

module.exports = bookController;
