const mongoose = require('mongoose');

const terminalsGates = mongoose.Schema({
    city: String,
    carousel: Array,
    terminals: Array,
    disabledgates: Array
});

module.exports = mongoose.model('TerminalsGates', terminalsGates);