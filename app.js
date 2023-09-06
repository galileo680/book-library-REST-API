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

const job = schedule.scheduleJob('0 10 * * *', () => {
  const users = email.returnUsersEmailWithOverdue();
  users.forEach((user) => {});
  transporter.sendMail({
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Overdue book reminder',
    html: email.createEmail(),
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
