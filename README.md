# Book Library REST API

This is a RESTful API for managing a book library, allowing users to borrow and return books. It is built using Node.js, Express.js, Sequelize ORM, and MySQL database.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  <!-- - [Prerequisites](#prerequisites) -->
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)

## Features

- User registration and authentication.
- CRUD operations for books.
- Borrowing and returning books with due dates.
- Get a list of all currently borrowed books.
- Get a list of currently borrowed books by user.

## Getting Started

<!-- ### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MySQL database server installed and running.
- ... -->

### Installation

1. Clone the repository:
2. Go to the projects root directory.
3. Configure environment variables:

Create a .env file in the root directory with the following variables:

```env
DATABASE_NAME = database-name
DATABASE_USER = mysql-user
DATABASE_PASSWORD = mysql-password
JWT_SECRET_TOKEN = JWT-secret
SERVICE_EMAIL = email-service
SENDER_EMAIL = sender-email
API_KEY_EMAIL = api-key-email
```

4. Install dependencies:

```javascript
npm install
```

5. Start the server:

```javascript
npm start
```

## API Endpoints

### User Authorization Endpoints

-POST /auth/signup: Register a new user.
-POST /auth/login: Log in an existing user.

### Books Endpoints

-GET /api/books: Fetch books.
-POST /api/add-book: Add a new book.
-PUT /api/update-book: Update book.
-DELETE /api/delete-book: Delete book.

### Borrowing Endpoints

-POST /api/borrow: Borrow book.
-POST /api/return: Return book.
-GET /api/user-books: Fetch books borrowed by currently logged user.
-GET /api/borrowed-books: Fetch all currently borrowed books.

## Authentication

Authentication is implemented using JSON Web Tokens (JWT). To access protected endpoints, include the JWT token in the request headers
