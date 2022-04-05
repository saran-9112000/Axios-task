'use strict';

const { authSchema } = require('../validators/validate');


var mongoose = require('mongoose'),
     
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');



exports.register = async function(req, res) {
  try{
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  const result = await authSchema.validateAsync(req.body);
  console.log(result);
  
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: "email alrrady exist"
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
}catch(error){
  res.status(200).json({message:error?.message || error})
}
};

exports.sign_in = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
  });
};

// Retrieve and return all Coupon from the database.
exports.findAll = async(req, res) => {
    
  User.find({}).sort({_id:-1})
  .then(coupon => {
      res.send(coupon);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving user details."
      });
  });        
};
exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};

