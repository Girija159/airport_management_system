const flightSchedule = require('../models/schedule');

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch flight arrivals and departures based on city 
 */
//Api for fetching the flights based on the city.
 exports.fetchArrivalsAndDestinations = (request, response) => {
    flightSchedule.find({
        $or: [
            {source: request.params.city},
            {destination: request.params.city}
        ]
    })
    .exec()
    .then(documents => {
        console.log("Success fetching arrivals and departures from city in fetchArrivalsAndDestinations", documents);
        
        response.status(200).json(documents);
    })
    .catch(error => {
        console.log("Error fetching arrivals and departures from city in fetchArrivalsAndDestinations", error);
        
        response.status(500).json(error);
    });
};