const mongoose = require('mongoose');

const employee = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    airline: String,
    city: String,
    employeeType: String
});

module.exports = mongoose.model('Employee', employee);
