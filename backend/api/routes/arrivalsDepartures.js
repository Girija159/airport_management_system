const express = require('express');

const arrivalsDeparturesController = require('../controllers/arrivalsDeparturesController');

const router = express.Router();



/**
 * Route for fetching arrivals and destinations with city
 */
router.get('/:city', (request, response, next) => {
    console.log("Route for fetching arrivals and destinations with city", request.params);
    
    arrivalsDeparturesController.fetchArrivalsAndDestinations(request, response);
});

module.exports = router;