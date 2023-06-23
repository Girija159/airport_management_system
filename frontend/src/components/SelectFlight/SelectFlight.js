import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from '../../axios/axiosInstance';

import styles from './SelectFlight.module.css';

import Heading from "../Heading/Heading";
import Flight from "../Flight/Flight";
import EmployeeNavBar from '../NavBar/EmployeeNavBar';
import UpdateFlightForm from "../UpdateFlightForm/UpdateFlightForm";
import AssignCarousel from "../AssignCarousel/AssignCarousel";

const SelectFlight = props => {
    const role = localStorage.getItem('role');
    
    const { flightId } = useParams();
    
    const [flight, setFlight] = useState({});

    useEffect(() => {
        axios.get(`/schedule/${flightId}`)
        .then(response => {
            setFlight(response.data);
        })
    }, [flightId]);

    return (
        <>
            <EmployeeNavBar />
            <div className={styles.flights}>
                <Heading header="1" heading={props.heading} />
                <Flight flight={flight} />
                {role === "Airline" ? 
                    <UpdateFlightForm heading="Update Flight"  flight={flight} /> : 
                    <AssignCarousel flight={flight} />
                }
            </div>
        </>
    );
};

export default SelectFlight;
