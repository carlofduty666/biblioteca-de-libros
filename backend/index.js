const express = require('express');
const  db = require('./db/db');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const booksRoutes = require('./routes/books.routes');
const request = require('http');



app.use(express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, '../frontend/public'))); // express.static para archivos que no se actualizan como css, js, images...
app.set('views', path.join(__dirname, '../frontend/views')); // no se usa express.static porque los ejs se actualizan y se deben renderizar
app.set('view engine', 'ejs');

// const frontendPublicPath = path.join(__dirname, '../frontend/public');
// const frontendViewsPath = path.join(__dirname, '../frontend/views');

// app.use(express.static(frontendPublicPath));
// app.set('views', frontendViewsPath);
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index'); // renderiza el archivo index.ejs
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('bodyParser');

app.use('/', booksRoutes);



const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

db.connect( async (err) => {
    if (err) {
      console.error(`Something bad happened!: ${err.stack}`);
      return;
    }
    console.log('Database intertwined to server!');
    app.listen(`${port}`, () => {
      console.log(`Your server is running on ${host}:${port}`);
    })
});
