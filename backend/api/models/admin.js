const mongoose = require('mongoose');

const admin = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    employeeType: String
});

module.exports = mongoose.model('Admin', admin);
