import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../axios/axiosInstance';

import styles from "./EnableDisableGates.module.css";

import EmployeeNavBar from '../NavBar/EmployeeNavBar';
import SmallCard from "../SmallCard/SmallCard";
import Heading from '../Heading/Heading';
import ShowMessage from "../ShowMessage/ShowMessage";

const EnableDisableGates = props => {
    const { city } = useParams();

    const [airport, setAirport] = useState({});
    const [message, setMessage] = useState({});
    
    const intToChar = (value) => {
        const code = 'A'.charCodeAt(0);
    
        return String.fromCharCode(code + value);
    };

    const showMessage = () => {
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    };

    const onClickHandler = id => {
        const isDisabled = airport[0].disabledgates.includes(id);

        if(isDisabled) {
            axios.post(`/enabledisablegates/enable/${airport[0]._id}/${id}`)
            .then(response => {
                console.log(response.data);
                setMessage({
                    "className": "show-success-message",
                    "message": "Successfully enabled gate"
                });
            })
        }
        else {
            axios.post(`/enabledisablegates/disable/${airport[0]._id}/${id}`)
            .then(response => {
                console.log(response.data);
                setMessage({
                    "className": "show-success-message",
                    "message": "Successfully disabled gate"
                });
            })
        }

        showMessage();
    };
    
    useEffect(() => {
        axios.get(`/enabledisablegates/${city}`)
        .then(response => {
            setAirport(response.data);
        })
    }, []);

    return (
        <>
            <EmployeeNavBar />
            <div className={styles["enable-disable-gates"]}>
                <h1> {props.heading} </h1>
                
                {Object.keys(message).length > 0 && <ShowMessage showMessage={message} />}
                
                {airport[0] && airport[0].terminals && airport[0].terminals.length > 0 ? 
                    <div className={styles.terminals}>
                        {airport[0].terminals.map((terminal, i) => { 
                            let count = 0;
                            
                            return (
                                <div key={i} className={styles.terminal}>
                                    {terminal.map((gate, j) => {
                                        const gateNumber = intToChar(i) + new String(j+1);
                                        const isGate =  gate.length > 1;
                                        const isGateDisabled = airport[0].disabledgates.includes(gateNumber);

                                        if(!isGate || isGateDisabled) {
                                            return (
                                                <SmallCard 
                                                    key={gateNumber}
                                                    id={gateNumber}
                                                    className={isGateDisabled ? "small-card-red" : "small-card-green"} 
                                                    onClick={onClickHandler}
                                                >
                                                    <Heading header="2" heading={gateNumber} />
                                                </SmallCard>
                                            )
                                        }
                                        else {
                                            count++;
                                        }
                                    })}

                                    {terminal.length === count &&
                                        <div className={styles["not-available"]}>
                                            {`All available gates in terminal ${intToChar(i)} are occupied`}
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                : <h1> {props.loader} </h1>}
            </div>
        </>
    )
}

export default EnableDisableGates;