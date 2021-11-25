"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    dataHandler.getHabits(res);
  })
  .post((req, res) => {
    let habit = req.body;
    try {
      dataHandler.createHabit(habit);
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(201).send(`Habit was created!`)

  });

router.route('/:email')
  .get((req, res) => {
    let email = req.params.email;
    dataHandler.getHabitFromUser(email,res);
  });

router.route('/ById/:id')
  .get((req, res) => {
    let id = req.params.id;
    dataHandler.getHabitFromId(id,res);
  })
  .put((req, res) => {
    let id = req.params.id;
    let habit = req.body;
    try {
      dataHandler.updateHabit(id, habit); //updates habit by Id
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    res.type('text/plain; charset=utf-8');
    res.send(`User was updated!`);
  })
  .delete((req, res) => {
    let id = req.params.id;
    try {
      dataHandler.deleteHabit(id); //updates habit by Id
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    res.type('text/plain; charset=utf-8');
    res.send(`User was deleted!`);
    
  });

module.exports = router;