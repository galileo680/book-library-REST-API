const Sequelize = require('sequelize');

const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Borrowing = require('../models/borrowingModel');

exports.createEmail = (userName, bookTitle, bookAuthor, dueDate) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Return Reminder</title>
    <style>
    
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    h1 {
        color: #333;
    }
    p {
        color: #666;
    }
    
    .notification {
        background-color: #ff9f9f;
        padding: 10px;
        border-radius: 5px;
    }
    .book-details {
        margin-top: 20px;
    }
    .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
    }
    </style>
</head>
<body>
    <div class="container">
        <h1>Book Return Reminder</h1>
        <div class="notification">
            <p>Dear ${userName},</p>
            <p>This is a friendly reminder that you have not returned the book "<strong>${bookTitle}</strong>" on time.</p>
            <p>The due date for returning this book was ${dueDate}. It is now overdue.</p>
            <p>Please return the book as soon as possible to avoid any late fees or penalties.</p>
            <div class="book-details">
                <p><strong>Book Title:</strong> ${bookTitle}</p>
                <p><strong>Author:</strong> ${bookAuthor}</p>
                <p><strong>Due Date:</strong> ${dueDate}</p>
            </div>
        </div>
    </div>
</body>
</html>
`;
};

exports.returnUsersEmailWithOverdue = () => {
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
};
