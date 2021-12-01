//de aqui 
"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    dataHandler.getDailies(res);
  })
  .post((req, res) => {
    let daily = req.body;
    try {
      dataHandler.createDaily(daily);
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(201).send(`Daily was created!`)

  });

router.route('/:email')
  .get((req, res) => {
    let email = req.params.email;
    dataHandler.getDailyFromUser(email,res);
  });

router.route('/ById/:id')
  .get((req, res) => {
    let id = req.params.id;
    dataHandler.getDailyFromId(id,res);
  })
  .put((req, res) => {
    let id = req.params.id;
    let daily = req.body;
    try {
      dataHandler.updateDaily(id, daily); //updates daily by Id
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    res.type('text/plain; charset=utf-8');
    res.send(`Daily was updated!`);
  })
  .delete((req, res) => {
    let id = req.params.id;
    try {
      dataHandler.deleteDaily(id); //updates daily by Id
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    res.type('text/plain; charset=utf-8');
    res.send(`Daily was deleted!`);
    
  });
router.route('/filter/:tag/:email')
  .get((req, res) => {
    let tag = req.params.tag;
    let email = req.params.email;
    dataHandler.getDailiesFromTag(tag, email, res);
  });

module.exports = router;

//hasta aca 