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
      console.log('Error with getAllBooks');
      res.status(500).json({ error: 'Internal server error' });
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
      console.log('Error with postAddBook');
      res.status(400).send(err);
    }
  },
};

module.exports = bookController;
