const axios = require('axios');

const flightSchedule = require('../models/schedule');

/**
 * 
 * @param {Array} flights 
 * @returns Array with assigned carousels for airline
 */
const fetchCarousel = (flights) => {
    let assignedCarousel = [];

    flights.forEach(flight => {
        if(flight.baggage_carousel) {
            assignedCarousel.push(flight.baggage_carousel);
        }
    });

    assignedCarousel = [... new Set(assignedCarousel)];

    return assignedCarousel;
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * Fetch flight schedule with id
 */
 exports.fetchFlightWithId = (request, response) => {
    flightSchedule.findById(request.params.flightId)
    .exec()
    .then(schedule => {
        console.info('Fetch flight schedule in fetchFlightWithId', schedule);
  
        response.status(200).json(schedule);
    })
    .catch(error => {
        console.info('Error fetching flight schedule in fetchFlightWithId', error);
  
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * Fetch flights schedule with city
 */
exports.fetchFlightsWithCity = (request, response) => {
    flightSchedule.find({
        destination: request.params.city
    })
    .exec()
    .then(result => {
        console.log("Fetch flights schedule with city in fetchFlightsWithCity", result);

        response.status(200).json(result);
    })
    .catch(error => {
        console.log("Error fetching flights schedule with city in fetchFlightsWithCity", error);
        
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} schedule 
 * @param {Object} response
 * 
 * Save flight schedule to DB 
 */
exports.saveFlightScheduleToDB = (request, response, schedule) => {
    const scheduleRecord = new flightSchedule(schedule);

    scheduleRecord.save()
    .then(result => {
        console.info('Saved flight schedule in DB in saveFlightScheduleToDB', result);
        
        response.status(201).json(schedule);
    }).catch(error => {
        console.error('Error saving flight schedule to DB in saveFlightScheduleToDB', error);
        
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Assign random gate and save flight schedule to DB 
 */
exports.assignTerminalGate = (request, response, callback) => {
    flightSchedule.findOne({flight: request.body.flight})
    .exec()
    .then(document => {
        if(!document || new Date(document.end_time).getTime() < new Date(request.body.start_time).getTime()) {
            axios.post(`${process.env.BASE_URL}/terminalgates`, request.body)
            .then(result => {
                console.log("Schedule with gate assigned in assignTerminalGate", result.data.schedule);
                
                callback(request, response, result.data.schedule);
            })
            .catch(error => {
                console.log("Error while assigning gate in assignTerminalGate", error);
            });
        }
        else {  
            console.log("Flight schedule conflict in assignTerminalGate", document);
            
            response.status(409).json({
                message: "Flight schedule conflict"
            });
        }
    })
    .catch(error => {
        console.log("Error while validating flight schedule in assignTerminalGate", error);
  
        response.status(500).json(error);

    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * @param {Function} callback
 * 
 * Assign random gate for updated flight schedule and save to DB
 */
exports.assignTerminalGateUpdate = (request, response, callback) => {
    axios.post(`${process.env.BASE_URL}/terminalgates`, request.body)
    .then(result => {
        console.log("Schedule with gate assigned in assignTerminalGate", result.data.schedule);
        
        callback(request, response, result.data.schedule);
    })
    .catch(error => {
        console.log("Error while assigning gate in assignTerminalGate", error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch flight schedule based on source and destination 
 */
exports.fetchFlights = (request, response) => {
    const source = decodeURI(request.params.source);
    const destination = decodeURI(request.params.destination);
    
    flightSchedule.find({
        source: source,
        destination: destination
    })
    .exec()
    .then(documents => {
        console.log("Success get flight schedules between source and destination in fetchFlights", documents);
  
        response.status(200).json(documents);
    })
    .catch(error => {
        console.log("Unable to get flight schedules between source and destination in fetchFlights", error);
  
        response.status(500).json(error);

    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Update flight schedule by id 
 */
exports.updateFlightSchedule = (request, response, schedule) => {
    flightSchedule.findByIdAndUpdate(request.params.id, schedule, {new: true})
    .exec()
    .then(document => {
        console.log("Document updated for id in updateFlightSchedule", request.params.id);

        response.status(200).json(document);
    })
    .catch(error => {
        console.log("Document update failed for id in updateFlightSchedule", request.params.id);

        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch flights for specific airline 
 */
exports.assignedAirlineCarousel = (request, response) => {
    flightSchedule.find({
        name: request.params.airline
    })
    .exec()
    .then(flights => {
        console.log("Successfully fetched flights for airline in assignedAirlineCarousel", flights);

        response.status(200).json({
            assignedCarousel: fetchCarousel(flights)
        });
    })
    .catch(error => {
        console.log("Error fetching flights for airline in assignedAirlineCarousel", flights);
        
        response.status(500).json(error);
    });
};
