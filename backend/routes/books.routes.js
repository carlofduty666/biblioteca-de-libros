const express = require('express');
const router = express.Router();
const multer = require('multer');
const booksController = require('../controllers/books.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
}
});

const upload = multer({ storage: storage });

router.get('/books', booksController.getAllBooks);

router.get('/books/id/:id', booksController.getBookById);

router.get('/books/name/:name', booksController.getBookByName);

router.post('/books', upload.single('cover'), booksController.addBook);

router.delete('/books/id/:id', booksController.burnBook);

router.put('/books', booksController.modernizeBook);


module.exports = router;