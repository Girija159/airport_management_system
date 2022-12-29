const mongoose = require('mongoose');

const schedule = mongoose.Schema({
    flight: String,
	name: String,
	source: String,
    destination: String,
	start_time: String,
	end_time: String,
	baggage_carousel: Number,
	arrivalgate: String,
	destinationgate: String
});

module.exports = mongoose.model('Schedule', schedule);