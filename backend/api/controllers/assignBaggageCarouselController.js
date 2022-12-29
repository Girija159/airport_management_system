const axios = require('axios');

const terminalsGates = require('../models/terminalsGates');

/**
 * 
 * @param {Array} airport 
 * 
 * Update baggage carousel for airport
 */
 const updateTerminalsGates = (airport) => {
    terminalsGates.findByIdAndUpdate(airport[0].id, airport[0], {new: true})
    .exec()
    .then(updatedAirport => {
        console.log("Update Terminals Gates in updateTerminalsGates", updatedAirport);
    })
    .catch(error => {
        console.log("Error updating Terminals Gates in updateTerminalsGates", error);
    });
};

/**
 * 
 * @param {Object} schedule 
 * @param {Array} airport 
 * 
 * Update baggage carousels in flight schedule
 */
const updateFlightBaggageCarousel = (schedule, airport, carousel) => {
    schedule.baggage_carousel = carousel;

    axios.post(`${process.env.BASE_URL}/schedule/update/${schedule._id}`, schedule)
    .then(result => {
        console.log("Update baggage carousel in flight schedule in updateFlightBaggageCarousel", result.data);
        
        const index = airport[0].carousel.indexOf(carousel);
        
        if (index > -1) {
            airport[0].carousel.splice(index, 1);
        }

        updateTerminalsGates(airport);
        
    })
    .catch(error => {
        console.log("Error updating baggage carousel in flight schedule in updateFlightBaggageCarousel", error);
    });
};

/**
 * 
 * @param {Object} schedule 
 * 
 * Fetch baggage information from Data base
 */
const fetchTerminals = (schedule, carousel) => {
    terminalsGates.find({
        'city': schedule.destination
    })
    .exec()
    .then(airport => {
        if(airport[0].carousel.length > 0) {
            console.log("Fetch baggage carousel information from DB in fetchTerminals", airport[0].carousel.length);
            
            updateFlightBaggageCarousel(schedule, airport, carousel);
        }
    })
    .catch(error => {
        console.log("Error fetching baggage carousel information from DB in fetchTerminals", error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch flight schedule 
 */
exports.fetchFlight = (request, response) => {
    axios.get(`${process.env.BASE_URL}/schedule/${request.params.flightId}`)
    .then(schedule => {
        console.log("Fetch flight schedule from DB in fetchFlight", schedule.data);
        
        fetchTerminals(schedule.data, request.params.carousel);
        
        response.status(200).json({
            "flightId": schedule.data._id
        });
    })
    .catch(error => {
        console.log("Fetch flight schedule from DB in fetchFlight", error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch flights schedule for city from DB 
 */
exports.fetchFlights = (request, response) => {
    axios.get(`${process.env.BASE_URL}/schedule/fetchflights/${request.params.city}`)
    .then(result => {
        console.log("Fetch flight schedule for city from DB in fetchFlights", result.data);

        response.status(200).json(result.data);
    })
    .catch(error => {
        console.log("Error fetching flight schedule for city from DB in fetchFlights", error);
        
        response.status(500).json(error);
    });
};