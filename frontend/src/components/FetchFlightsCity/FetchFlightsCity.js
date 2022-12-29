import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios/axiosInstance';

import EmployeeNavBar from '../NavBar/EmployeeNavBar';
import Flights from '../Flights/Flights';

const FetchFlightsCity = props => {
    const { city } = useParams();

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get(`/schedule/fetchflights/${city}`)
        .then(response => {
            setFlights(response.data);
        })
    }, []);

    return (
        <>
            <EmployeeNavBar />
            <Flights 
                flights={flights} 
                heading={props.heading} 
                loader={props.loader}
                buttonText={props.buttonText}
            />
        </>
    );
}

export default FetchFlightsCity;