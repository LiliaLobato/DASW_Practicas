"use strict";

const express = require('express');
const router = express.Router();
const routerHabit = require('../routes/habit');
const routerDaily = require('../routes/daily');
const routerTodo = require('../routes/todo');
const routerReward = require('../routes/reward');
const routerUser = require('../routes/user');
const path = require('path');

router.use('/habit', routerHabit);
router.use('/daily', routerDaily);
router.use('/todo', routerTodo);
router.use('/reward', routerReward);
router.use('/user', routerUser);

router.get('/',
  (req, res) => res.send('habitica')
);

router.get('/habitica',function(req, res) {
    res.sendFile(path.join(__dirname, '../../view/habitica_home.html'));
});
router.get('/login',function(req, res) {
    res.sendFile(path.join(__dirname, '../../view/habitica_login.html'));
});
router.get('/style',function(req, res) {
    res.sendFile(path.join(__dirname, '../../view/style.css'));
});
router.get('/loginStyle',function(req, res) {
    res.sendFile(path.join(__dirname, '../../view/loginStyle.css'));
});

module.exports = router;
