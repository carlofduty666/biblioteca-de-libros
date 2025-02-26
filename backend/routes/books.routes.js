const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');
const upload = require('../middlewares/upload');

router.get('/books', booksController.getAllBooks);

router.get('/books/id/:id', booksController.getBookById);

router.get('/books/name/:name', booksController.getBookByName);

router.post('/books', upload.single('cover'), booksController.addBook);

router.delete('/books/id/:id', booksController.burnBook);

router.put('/books', booksController.modernizeBook);


module.exports = router;