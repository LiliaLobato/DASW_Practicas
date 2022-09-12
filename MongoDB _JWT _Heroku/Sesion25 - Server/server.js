"use strict";

process.env.TOKEN_KEY = "Welcome1234"

const express = require('express');
const router = require('./controllers/router');
const loginRouter = require('./controllers/login_router');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
  origin: ['http://127.0.0.1:5500']
}));
app.use(express.json()); // Use express body-parser to parse all request bodies.
app.use(loginRouter);
app.use('/api/users', router);

app.get('/',
  (req, res) => res.send('Hello DASWorld!')
);
app.route('/home').get(
  (req, res) => res.send('DASWorld Home')
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})
