const db = require('../db/db');

const Books = {
    getAllBooks: function(callback) {
        const consult = 'SELECT * FROM books';
        return db.query(consult, callback);
    },
    getBookById: function(id, callback) {
        const consult = 'SELECT * FROM books WHERE id = ?';
        return db.query(consult, [id], callback);
    },
    getBookByName: function(title, callback) {
        const consult = 'SELECT * FROM books WHERE title = ?';
        return db.query(consult, [title], callback);
    },
    addBook: function(book, callback) {
        const consult = 'INSERT INTO books (title, author, genre, cover, publish_date) VALUES (?, ?, ?, ?, ?)';
        return db.query(consult, [
            book.title, 
            book.author, 
            book.genre, 
            book.cover, 
            book.publish_date
        ], callback);
    },
    burnBook: function(id, callback) {
        const consult = 'DELETE FROM books WHERE id = ?';
        return db.query(consult, [id], callback);
    },
    modernizeBook: function(book, callback) {
        const consult = 'UPDATE books SET title = ?, author = ?, genre = ?, cover = ?, publish_date = ? WHERE id = ?';
        return db.query(consult, [book.title, book.author, book.genre, book.cover, book.publish_date, book.id], callback);
    }
}

module.exports = Books;
