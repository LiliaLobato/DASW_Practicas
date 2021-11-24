"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.json(dataHandler.getUsers());
  })
  .post((req, res) => {
    let product = req.body;
    try {
      dataHandler.createUser(product);
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(201).send(`Producto ${product.title} was created!`)

  });

router.route('/:email')
  .get((req, res) => {
    let email = req.params.email;
    let product = dataHandler.getUserByEmail(email);
    if(product != undefined ) {
      res.status(200).json(product);
    } else {
      res.status(404).send(`Usuario con UUID: ${email} no existe!`);
    }
  })
  .put((req, res) => {
    let email = req.params.email;
    let user = req.body;
    console.log(email)
    user = dataHandler.updateUser(email, user);
    res.type('text/plain; charset=utf-8');
    res.send(`User was updated!`);
  });


router.route('/:email')
  .get((req, res) => {
    let email = req.params.email;
    res.json(dataHandler.getUserByEmail(email));
  })
  .delete((req, res) => {
    let email = req.params.email;
    let user = dataHandler.deleteUser(email);

    res.type('text/plain; charset=utf-8');
    res.send(user != undefined ? `User ${user.firstName} was deleted!` : `No user with email ${email} was found!`);
  });

module.exports = router;