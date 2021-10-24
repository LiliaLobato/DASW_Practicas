"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => res.send('ADMIN PRODUCTS'))
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

module.exports = router;