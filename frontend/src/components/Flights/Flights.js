import styles from './Flights.module.css';

import Flight from '../Flight/Flight';

const Flights = props => {
    const role = localStorage.getItem('role');
    const airline = localStorage.getItem('airline');

    return (
        <div className={styles.flights}>
            {props.flights.length > 0 ? 
                <div>
                    <h1> {props.heading} </h1>
                    <ul className={styles["flights-list"]}>
                        {props.flights.map((flight, i) => { 
                            return ((role === "Airport" && flight.baggage_carousel === null) || (role === "Airline" && airline === flight.name)) &&
                                <li key={flight._id}>
                                    <Flight flight={flight} buttonText={props.buttonText} />
                                </li>     
                        })}
                    </ul>
                </div>
            : <h1> {props.loader} </h1>}
                   
        </div>
    )
};

export default Flights;