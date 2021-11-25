"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    let query = req.query.query;
    if(query == undefined){
      res.status(200).json(dataHandler.getRewards());
    }else{
      res.status(200).json(dataHandler.findProduct(query));
    }
  });

router.route('/:type')
  .get((req, res) => {
    let type = req.params.type;
    let product = dataHandler.getTypeRewards(type);
    if(product != undefined ) {
      res.status(200).json(product);
    } else {
      res.status(404).send(`Reward con type: ${type} no existe!`);
    }
  });

module.exports = router;