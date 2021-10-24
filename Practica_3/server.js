"use strict";

const express = require('express');
const dataHandler = require('./app/controllers/data_handler');
//const router = require('./controllers/router');
const app = express();
const port = 3000;

app.use(express.json()); // Use express body-parser to parse all request bodies.
//app.use('/api/users', router);

app.get('/',
  (req, res) => res.send('e-commerce app práctica 3')
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})
