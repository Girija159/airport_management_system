const express = require('express');

const loginController = require('../controllers/loginController');

const router = express.Router();

/**
 * Route for login admin
 */
 router.post('/admin', (request, response, next) => {
    console.log("Route for login admin", request.body);

    loginController.loginAdmin(request, response);
});

/**
 * Route for login employee
 */
 router.post('/employee', (request, response, next) => {
    console.log("Route for login employee", request.body);

    loginController.loginEmployee(request, response);
});

/**
 * Route for login user
 */
 router.post('/user', (request, response, next) => {
    console.log("Route for login user", request.body);

    loginController.loginUser(request, response);
});

module.exports = router;
