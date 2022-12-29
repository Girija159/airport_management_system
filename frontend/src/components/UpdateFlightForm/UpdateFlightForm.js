import { useState } from 'react';
import axios from '../../axios/axiosInstance';

import Heading from '../Heading/Heading';
import ShowMessage from '../ShowMessage/ShowMessage';
import FormWrapper from '../FormWrapper/FormWrapper';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';

const UpdateFlightForm = props => {
    const [message, setMessage] = useState({});
    
    const showMessage = () => {
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    };
    
    const onFormSubmitHandler = event => {
        event.preventDefault();

        let flightSchedule = {
            "baggage_carousel": null,
            "arrivalgate": null,
            "destinationgate": null
        };
    
        for(let i = 0; i < event.target.length - 1; i++) {
            flightSchedule[event.target[i].name] = event.target[i].value;
        }
    
        axios.post(`/schedule/update/${props.flight._id}`, flightSchedule)
        .then(response => {
            setMessage({
                "className": "show-success-message",
                "message": "Flight schedule updated successfully"
            });
            
            showMessage();

            document.getElementById("add-flight-form").reset();
        })
        .catch(() => {
            setMessage({
                "className": "show-error-message",
                "message": "Error while updating flight schedule"
            });
        });
    };
    
    return (
        <FormWrapper>
            <Heading header="1" heading={props.heading} />

            {Object.keys(message).length > 0 && <ShowMessage showMessage={message} />}
            
            <Form id="add-flight-form" onSubmit={onFormSubmitHandler}>
                <Input label="Flight" inputClassName="input-disabled" type="text" name="flight" value={props.flight.flight} required={true} disabled={true} />
                <Input label="Name" inputClassName="input-disabled" type="text" name="name" value={props.flight.name} required={true} disabled={true} />
                <Input label="Source" inputClassName="input-disabled" type="text" name="source" value={props.flight.source} required={true} disabled={true} />
                <Input label="Destination" inputClassName="input-disabled" type="text" name="destination" value={props.flight.destination} required={true} disabled={true} />
                <Input label="Start Time" type="datetime-local" name="start_time" value={props.flight.starttime} required={true} />
                <Input label="End Time" type="datetime-local" name="end_time" value={props.flight.endtime} required={true} />
                <Button type="submit"> Update Flight </Button>
            </Form>
        </FormWrapper>
    )
};

export default UpdateFlightForm;