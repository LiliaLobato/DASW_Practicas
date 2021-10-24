"use strict";

const express = require('express');
const router = express.Router();
const routerProd = require('../routes/products');
const routerProdAdm = require('../routes/admin_products');

router.use('/products', routerProd);
router.use('/admin', validateAdmin , routerProdAdm);

router.get('/',
  (req, res) => res.send('e-commerce app práctica 3')
);

function validateAdmin(req, res, next){
  let  query = req.headers;
  let auth = query['x-auth'];
  if(auth != undefined && auth == 'admin'){
    next();
  }else{
    res.status(403).type("text/plain").send("HE HE HE");
  }
}

module.exports = router;