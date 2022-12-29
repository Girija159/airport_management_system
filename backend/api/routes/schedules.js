const express = require('express');

const authentication = require('../middleware/authentication');
const flightScheduleController = require('../controllers/schedulesController');

const router = express.Router();

/**
 * Route for fetching flights with city
 */
router.get('/fetchflights/:city', (request, response, next) => {
    console.log("Route for fetching flights with city", request.params);

    flightScheduleController.fetchFlightsWithCity(request, response);
});

/**
 * Route to fetch assigned airline carousel
 */
 router.get('/assignedairlinecarousel/:airline', (request, response, next) => {
    console.log("Route for fetching assigned carousel for airline", request.params.airline);

    flightScheduleController.assignedAirlineCarousel(request, response);
})

/**
 * Route to add flight schedule
 */
router.post('/', (request, response, next) => {
    console.log("-------------sunny-------------------------");
    console.log(request.body);
    console.log("-------------------------------------------");
    //console.log("Route to add flight schedule", request.body);
    
    flightScheduleController.assignTerminalGate(request, response, flightScheduleController.saveFlightScheduleToDB);
});

/**
 * Route to fetch flight schedule with source and destination
 */
 router.get('/:source/:destination', (request, response, next) => {
    console.log("Route to fetch flight schedule with source and destination", request.params);
    
    flightScheduleController.fetchFlights(request, response);
});

/**
 * Route to update flight schedule
 */
router.post('/update/:id', (request, response, next) => {
    console.log("Route to update flight schedule", request.params);
    
    flightScheduleController.assignTerminalGateUpdate(request, response, flightScheduleController.updateFlightSchedule);
});

/**
 * Route to fetch flight with id
 */
router.get('/:flightId', (request, response, next) => {
    console.log("Route for fetching flights with id", request.params);
    
    flightScheduleController.fetchFlightWithId(request, response);
});

module.exports = router;