const Books = require('../models/books.model');

const getAllBooks = (req, res) => {
    Books.getAllBooks((err, books) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving books', error: err.message });
            return;
        }

        if (!books || books.length === 0) {
            res.status(404).json({ message: 'No books found' });
            return;
        }

        res.status(200).json(books);
    });
};

const getBookById = (req, res) => {
    const bookId = req.params.id;
    Books.getBookById(bookId, (err, book) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving book', error: err.message });
            return;
        }
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json(book);
    })
}

const getBookByName = (req, res) => {
    const bookName = req.params.name;
    Books.getBookByName(bookName, (err, book) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving book', error: err.message });
            return;
        }
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json(book);
    })
}

const addBook = (req, res) => {
    const newBook = req.body;
    Books.addBook(newBook, (err, result) => {
        if (err) {
            console.error('There was some bug!:', err);
            return res.status(500).send(err);
        }
        res.status(201).send({ message: 'Book added successfully', bookId: result.insertId });
    });
}

const burnBook = (req, res) => {
    const bookId = req.params.id;
    Books.burnBook(bookId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error burning book', error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json({ message: 'Book burned successfully' });
    });
}

const modernizeBook = (req, res) => {
    const updatedBook = req.body;
    Books.modernizeBook(updatedBook, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating book', error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json({ message: 'Book updated successfully' });
    });
}

const uploadFile = (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    const file = {
        cover: req.file.filename,
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    getBookByName,
    addBook,
    burnBook,
    modernizeBook
}