# 📚 Book Review API

A RESTful API for a book review platform where users can register, log in, search for books, view book details (including average ratings), and submit/update/delete reviews. Built with **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**.

---

## 🔧 Features

- **User Authentication**
  - Signup & login with JWT-based authentication
- **Books**
  - Add a new book (auth required)
  - Get all books (with optional filters: author, genre, pagination)
  - Get a single book by ID (with reviews and average rating)
  - Search books by title or author
- **Reviews**
  - Add a review to a book (auth required, only once per user per book)
  - Edit or delete your review (auth required)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT
- **Middleware:** Custom auth middleware

---

## 📁 Folder Structure

project/
├── models/
│ ├── Book.js
│ ├── Review.js
│ └── User.js
├── routes/
│ ├── auth.js
│ ├── books.js
│ └── reviews.js
├── middleware/
│ └── auth.js
├── .env
├── server.js
└── package.json


---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shraddha2421/book-review-api.git
   cd book-review-api
   
  
----
2. **Install dependencies**
   ```bash
   npm install

----
3. **Run the server**
   ```bash
   npm start dev

---



