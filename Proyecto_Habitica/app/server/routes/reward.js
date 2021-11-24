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

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    let product = dataHandler.getRewardById(id);
    if(product != undefined ) {
      res.status(200).json(product);
    } else {
      res.status(404).send(`Reward con UUID: ${id} no existe!`);
    }
  });

module.exports = router;