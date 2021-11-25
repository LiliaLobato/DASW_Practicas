"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    dataHandler.getUsers(res);
  })
  .post((req, res) => {
    let user = req.body;
    try {
      dataHandler.createUser(user);
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(201).send(`User ${user.avatarName} was created!`)

  });

router.route('/:email')
  .get((req, res) => {
    let email = req.params.email;
    dataHandler.getUserByEmail(email,res);
  })
  .put((req, res) => {
    let email = req.params.email;
    let user = req.body;
    try {
      dataHandler.updateUser(email, user);
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    res.type('text/plain; charset=utf-8');
    res.send(`User was updated!`);
  });

module.exports = router;