const bcrypt = require('bcrypt');

const signUpEmployee = require('../models/employee');
const signUpUser = require('../models/user');

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * @param {String} hash
 * 
 * Save employee to DB
 */
const saveEmployeeToDB = (request, response, hash) => {
    console.log("Save employee to DB in saveEmployeeToDB");
    
    let employeeProperties = request.body.airline ? {
        "airline": request.body.airline
    } : {
        "city": request.body.city
    };

    const employee = new signUpEmployee({
        username: request.body.username,
        email: request.body.email,
        password: hash,
        employeeType: request.body.employeetype,
        ...employeeProperties
    });

    employee.save()
    .then(emp => {
        response.status(201).json({
            message: "Employee created"
        });
    })
    .catch(err => {
        response.status(500).json({
            error: err
        })
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * @param {String} hash
 * 
 * Save user to DB
 */
const saveUserToDB = (request, response, hash) => {
    console.log("Save user to DB in saveUserToDB", request);
    
    const user = new signUpUser({
        username: request.body.username,
        email: request.body.email,
        password: hash
    });

    user.save()
    .then(res => {
        response.status(201).json({
            message: "User Sign Up Successful"
        });
    })
    .catch(err => {
        response.status(500).json({
            error: err
        })
    });
};

const findUser = (finder, request, response, callback) => {
    console.log("Find user in findUser in sign up", finder);
    
    finder.find({
        email: request.body.email
    })
    .exec()
    .then(result => {
        if(result.length > 0) {
            return response.status(409).json({
                message: "User with below email already exists"
            })
        }
        else {
            bcrypt.hash(request.body.password, 10, (error, hash) => {
                if(error) {
                    return response.status(500).json({
                        error: error
                    })
                }
                else {
                    callback(request, response, hash);
                }
            });
        }
    });
}


/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * Sign up and create employee for airline and airport
 */
exports.signUpEmployee = (request, response) => {
    findUser(signUpEmployee, request, response, saveEmployeeToDB);
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * Sign up and create user for airline and airport
 */
 exports.signUpUser = (request, response) => {
    findUser(signUpUser, request, response, saveUserToDB);
};
