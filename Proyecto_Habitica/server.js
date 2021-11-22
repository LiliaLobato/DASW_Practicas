"use strict";

const express = require('express');
const router = require('./app/server/controllers/router');
const app = express();
const port = process.env.PORT || 8080;

app.use("/static", express.static('./app/controllers'));
app.use("/object", express.static('./app/view/Objects'));
app.use("/avatar", express.static('./app/view/avatar'));
app.use(express.json()); // Use express body-parser to parse all request bodies.
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})
