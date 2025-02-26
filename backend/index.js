const express = require('express');
const  db = require('./db/db');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const booksRoutes = require('./routes/books.routes');
const request = require('http');


app.get('/', (req, res) => {
    res.send('Yes, it works!');
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');

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
