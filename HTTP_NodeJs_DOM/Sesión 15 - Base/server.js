"use strict";

const express = require('express');
const dataHandler = require('./controllers/data_handler');

const app = express();
const port = 3000;

app.use(express.json()); // Use express body-parser to parse all request bodies.

app.get('/',
  (req, res) => res.send('Hello DASWorld!')
);
app.route('/home').get(
  (req, res) => res.send('DASWorld Home')
);

app.get('/api/users',
  (req, res) => {
  //res.set('Content-Type','application/json: charset=utf-8');
  res.json(dataHandler.getUsers());
});

app.post('/api/users', (req, res)=> {
  let user = req.body;
  dataHandler.createUser(user);
  //res.set('Content-Type','text/plain: charset=utf-8');
  res.send('Usuario creado');
});

app.get('/api/users/:email',
  (req, res) => {
  let email = req.params.email;
  //res.type('application/json; charset=utf-8');
  res.json(dataHandler.getUserByEmail(email));
});

app.put('/api/users/:email', (req, res)=> {
  let email = req.params.email;
  let user = req.body;
  dataHandler.updateUser(email, user);
  //res.type('text/plain: charset=utf-8');
  res.send(user != undefined ? 'Usuario $(user.nombre) actualizado' : 'Usuario no encontrado');
});

app.delete('/api/users/:email', (req, res)=> {
  let email = req.params.email;
  dataHandler.deleteUser(email);
  //res.set('Content-Type','text/plain: charset=utf-8');
  res.send('Usuario borrado');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})
