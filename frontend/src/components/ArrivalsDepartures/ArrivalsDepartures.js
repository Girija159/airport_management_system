import { useState, useEffect } from 'react';
import axios from '../../axios/axiosInstance';

import styles from './ArrivalsDepartures.module.css';

import Heading from '../Heading/Heading';
import ArrivalsDeparturesFlights from '../ArrivalsDeparturesFlights/ArrivalsDeparturesFlights';
import UserNavBar from '../NavBar/UserNavBar';

const Arrivals = props => {
    const city = props.arrivals ? "destination" : "source";
    const userCity = localStorage.getItem('userCity');

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get(`/arrivalsdepartures/${userCity}`)
        .then(response => {
            setFlights(response.data);
        })
    }, []);

    const oneHourFlights = [];
    const twoHourFlights = [];
    const fourHourFlights = [];
    
    flights.map(flight => {
        if(flight[city] === userCity) {
            const arrivalDeparturetime = props.arrivals ? flight.end_time : flight.start_time;
            const timeDiff = (new Date(arrivalDeparturetime).getTime() - new Date().getTime())/3600000;
            
            if(timeDiff >= 0 && timeDiff <= 1) {
                oneHourFlights.push(flight);
            }
            else if(timeDiff > 1 && timeDiff <= 2) {
                twoHourFlights.push(flight);
            }
            else if(timeDiff > 2 && timeDiff <= 4) {
                fourHourFlights.push(flight);
            }
        }
    });

    return (
        <div>
            <UserNavBar />
            
            <Heading header="1" heading={props.heading} />
            
            <div className={styles["arrivals-departures"]}>
                <ArrivalsDeparturesFlights 
                    arrivals={props.arrivals}
                    departures={props.departures}
                    flights={oneHourFlights} 
                    heading={props.arrivals ? "Arrivals in next 1 hour"  : "Departures in next 1 hour"}
                    loader={oneHourFlights.length > 0 ? props.loader : "No flights in next 1 hour"}
                />

                <ArrivalsDeparturesFlights 
                    arrivals={props.arrivals}
                    departures={props.departures}
                    flights={twoHourFlights} 
                    heading={props.arrivals ? "Arrivals in next 2 hours" : "Departures in next 2 hours"}
                    loader={twoHourFlights.length > 0 ? props.loader : "No flights in next 2 hours"}
                />

                <ArrivalsDeparturesFlights 
                    arrivals={props.arrivals}
                    departures={props.departures}
                    flights={fourHourFlights} 
                    heading={props.arrivals ? "Arrivals in next 4 hours" : "Departures in next 4 hours"} 
                    loader={fourHourFlights.length > 0 ? props.loader : "No flights in next 4 hours"}
                />
            </div>
        </div>
    );
}

export default Arrivals;
