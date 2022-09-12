"use strict";

const router = require('express').Router();
const dataHandler = require('./data_handler');
const tokenUtils = require('./token_utils');

router.route('/')
  .get((req, res) => dataHandler.getUsers(req, res))
  .post((req, res) => dataHandler.createUser(req, res));

router.use('/:email', tokenUtils.verifyToken);

router.route('/:email')
  .get((req, res) => dataHandler.getUserByEmail(req, res))
  .put((req, res) => dataHandler.updateUser(req, res))
  .delete((req, res) => dataHandler.deleteUser(req, res));

module.exports = router;