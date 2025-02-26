const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

router.get('/books', booksController.getAllBooks);

router.get('/books/id/:id', booksController.getBookById);

router.get('/books/name/:name', booksController.getBookByName);

router.post('/books', booksController.addBook);

router.post('/file-upload', upload.single('file'), booksController.uploadFile);

router.delete('/books/id/:id', booksController.burnBook);

router.put('/books', booksController.modernizeBook);


module.exports = router;