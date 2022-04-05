'use strict';
const express = require('express');
const router  = express.Router();
const { route } = require('express/lib/application');
var userHandlers = require('../controllers/userController.js');
// todoList Routes

        
//outer.post('/tasks',userHandlers.loginRequired, userHandlers.profile);

        
router.post('/auth/register',userHandlers.register);
 
        
router.post('/auth/sign_in',userHandlers.sign_in);

        
router.get('/user', userHandlers.findAll);

module.exports = router;
    