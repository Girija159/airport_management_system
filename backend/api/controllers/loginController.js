const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const admin = require('../models/admin');
const employee = require('../models/employee');
const user = require('../models/user');

const findUser = (finder, request, response) => {
    console.log("Find user in findUser login", finder);
    
    finder.find({
        email: request.body.email
    })
    .exec()
    .then(user => {
        if(user.length < 1) {
            return response.status(401).json({
                message: "Authentication failed"
            })
        }
        else {
            bcrypt.compare(request.body.password, user[0].password, (error, result) => {
                if(error) {
                    return response.status(401).json({
                        message: "Authentication failed"
                    });
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    
                    return response.status(200).json({
                        message: "Authentication successful",
                        role: user[0].employeeType ? user[0].employeeType : "user",
                        token: token,
                        city: user[0].city,
                        airline: user[0].airline
                    });
                }

                return response.status(401).json({
                    message: "Authentication failed"
                });
            });
        }
    });
}

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * login admin
 */
 exports.loginAdmin = (request, response) => {
    findUser(admin, request, response);
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * login employee
 */
 exports.loginEmployee = (request, response) => {
    findUser(employee, request, response);
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * login user
 */
 exports.loginUser = (request, response) => {
    findUser(user, request, response);
};
