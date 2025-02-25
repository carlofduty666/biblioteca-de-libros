const express = require('express');
const db = require('./db/db');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();




app.get('/', (req, res) => {
    res.send('Yes, it works!');
})

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

db.connect( async (err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ' + err.stack);
      return;
    }
    console.log('Conexión exitosa a la base de datos');
    app.listen(`${port}`, () => {
      console.log(`Server running on ${host}:${port}`);
    })
});
