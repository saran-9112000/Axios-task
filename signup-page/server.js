'use strict';

var express = require('express'),
  app = express(),



  User = require('./api/validators/validate'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");
  

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

const routes = require('./api/route/userRoute.js'
  );
  app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});

  app.use('/', routes);
 

  mongoose.connect(
    process.env.MONGODB_URI,
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connected")
    }
);
