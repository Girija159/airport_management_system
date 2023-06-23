const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', user);
