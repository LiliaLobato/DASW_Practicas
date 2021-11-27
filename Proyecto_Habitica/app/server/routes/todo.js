//de aqui 
"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    dataHandler.getTodos(res);
  })
  .post((req, res) => {
    let todo = req.body;
    try {
      dataHandler.createTodo(todo);
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.status(201).send(`Todo was created!`)

  });

router.route('/:email')
  .get((req, res) => {
    let email = req.params.email;
    dataHandler.getTodoFromUser(email,res);
  });

router.route('/ById/:id')
  .get((req, res) => {
    let id = req.params.id;
    dataHandler.getTodoFromId(id,res);
  })
  .put((req, res) => {
    let id = req.params.id;
    let todo = req.body;
    try {
      dataHandler.updateTodo(id, todo); //updates todo by Id
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    res.type('text/plain; charset=utf-8');
    res.send(`Todo was updated!`);
  })
  .delete((req, res) => {
    let id = req.params.id;
    try {
      dataHandler.deleteTodo(id); //updates Todo by Id
    } catch (e){
      res.status(400).send(e.errorMessage);
      return;
    }
    res.type('text/plain; charset=utf-8');
    res.send(`Todo was deleted!`);
    
  });

module.exports = router;

//hasta aca 