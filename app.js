const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
require('dotenv').config();

const sequelize = require('./util/database');
const email = require('./util/email');

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const borrowingRoutes = require('./routes/borrrowingRoutes');

const User = require('./models/userModel');
const Book = require('./models/bookModel');
const Borrowing = require('./models/borrowingModel');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', bookRoutes);
app.use('/api', borrowingRoutes);
app.use('/auth', userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

User.hasMany(Borrowing);
Book.hasMany(Borrowing);
Borrowing.belongsTo(User);
Borrowing.belongsTo(Book);

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE_EMAIL,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.API_KEY_EMAIL,
  },
});

// Only for development purpose
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Notification runs on the first day of every month at midnight
const job = schedule.scheduleJob('0 0 1 * *', async () => {
  const overDueBorrowings = await email.getOverdueBorrowings();
  overDueBorrowings.forEach((borrowing) => {
    const formattedDueDate = new Date(borrowing.dueDate)
      .toISOString()
      .split('T')[0];
    transporter.sendMail({
      to: borrowing.email,
      from: process.env.SENDER_EMAIL,
      subject: 'Overdue book reminder',
      html: email.createEmail(
        borrowing.username,
        borrowing.bookTitle,
        borrowing.bookAuthor,
        formattedDueDate
      ),
    });
  });
});

sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    console.log('Connected to database');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
