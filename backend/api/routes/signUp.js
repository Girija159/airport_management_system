const express = require('express');

const authentication = require('../middleware/authentication');
const signUpController = require('../controllers/signUpController');

const router = express.Router();

router.post('/employee', (request, response, next) => {
    console.log("Route to sign up employee", request.body);
    
    signUpController.signUpEmployee(request, response);
});

router.post('/user', (request, response, next) => {
    console.log("Route to sign up user", request.body);
    
    signUpController.signUpUser(request, response);
});

module.exports = router;
