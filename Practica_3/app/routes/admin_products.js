"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => res.send('ADMIN PRODUCTS WORKING'))
  .post((req, res) => {
    let product = req.body;

    try {
      dataHandler.createProduct(product);
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(201).send(`User ${product.title} was created!`)

  });

router.route('/:id')
  .put((req, res) => {
    let id = req.params.id;
    let newProduct = req.body;

    let product = dataHandler.getProductById(id);
    if(product != undefined ) {
      try {
        dataHandler.updateProduct(id,newProduct);
      } catch (e){
        res.status(400).send(e.errorMessage);
        return;
      }
    } else {
      res.status(404).send();
    }
  
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(`User ${product.title} actualizado!`)
  })
  .delete((req, res) => {
    let id = req.params.id;

    let product = dataHandler.getProductById(id);
    if(product != undefined ) {
      try {
        dataHandler.deleteProduct(id);
      } catch (e){
        res.status(400).send(e.errorMessage);
        return;
      }
    } else {
      res.status(404).send();
    }
  
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(`User ${product.title} eliminado!`)
  });

module.exports = router;