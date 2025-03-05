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
    if (req.file) {
        newBook.cover = req.file.filename; // Asigna el nombre del archivo subido
    } else {
        console.log('You didn\'t upload any file!');

    }

    Books.addBook(newBook, (err, result) => {
        if (err) {
            console.error('There was some bug!:', err);
            return res.status(500).send(err);
        }
        res.status(201).send({ message: 'Book added successfully', bookId: result.insertId });
    });
};

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
    const bookId = req.params.id; // Obtén el ID del libro desde la ruta
    const updatedBook = req.body;

    // Verificar si se ha subido un archivo
    if (req.file) {
        updatedBook.cover = req.file.filename; // Asigna el nombre del archivo subido
    }

    // Verificar que haya campos para actualizar
    if (!updatedBook.title && !updatedBook.author && !updatedBook.genre && !updatedBook.publish_date && !req.file) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    // Asigna el ID del libro a updatedBook
    updatedBook.id = bookId;

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
};




module.exports = {
    getAllBooks,
    getBookById,
    getBookByName,
    addBook,
    burnBook,
    modernizeBook
}