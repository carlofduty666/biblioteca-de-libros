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
        let consult = 'UPDATE books SET ';
        const params = [];
    
        if (book.title) {
            consult += 'title = ?, ';
            params.push(book.title);
        }
        if (book.author) {
            consult += 'author = ?, ';
            params.push(book.author);
        }
        if (book.genre) {
            consult += 'genre = ?, ';
            params.push(book.genre);
        }
        if (book.cover) {
            consult += 'cover = ?, ';
            params.push(book.cover);
        }
        if (book.publish_date) {
            consult += 'publish_date = ?, ';
            params.push(book.publish_date);
        }
    
        // Eliminar la última coma y espacio si hay campos para actualizar
        if (params.length > 0) {
            consult = consult.slice(0, -2); // Elimina la última coma y espacio
        } else {
            return callback(new Error('No fields to update'), null);
        }
    
        consult += ' WHERE id = ?';
        params.push(book.id);
    
        // Log para depurar
        console.log('Generated SQL:', consult);
        console.log('Parameters:', params);
    
        return db.query(consult, params, callback);
    }
    
    
}

module.exports = Books;
