const express = require('express');

const authentication = require('../middleware/authentication');
const assignBaggageCarouselController = require('../controllers/assignBaggageCarouselController');

const router = express.Router();

/**
 * Route for fetching flight
 */
router.post('/:flightId/:carousel', (request, response, next) => {
    console.log("Route for fetch flight", request.params);
    
    assignBaggageCarouselController.fetchFlight(request, response);
});

/**
 * Route for fetching flights for city
 */
router.get('/:city', (request, response, next) => {
    console.log("Route for fetch flights for city", request.params);
    
    assignBaggageCarouselController.fetchFlights(request, response);
});

module.exports = router;