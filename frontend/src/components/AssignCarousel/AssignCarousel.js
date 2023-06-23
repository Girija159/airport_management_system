import { useEffect, useState } from "react";
import axios from '../../axios/axiosInstance';

import Heading from '../Heading/Heading';
import ShowMessage from '../ShowMessage/ShowMessage';
import FormWrapper from '../FormWrapper/FormWrapper';
import Form from '../Form/Form';
import Select from '../Select/Select';
import Button from "../Button/Button";

const AssignCarousel = props => {
    let carousels = [];
    const airline = props.flight.name;
    const city = localStorage.getItem('city');

    const [displayForm, setDisplayForm] = useState(true);
    const [message, setMessage] = useState({});
    const [availableCarousel, setAvailableCarousel] = useState([]);
    const [assignedCarousel, setAssignedCarousel] = useState([]);
    
    const showMessage = () => {
        setTimeout(() => {
            setMessage(false);
            setDisplayForm(false);
        }, 3000);
    };

    const onFormSubmitHandler = event => {
        event.preventDefault();
    
        axios.post(`/assignbaggagecarousel/${props.flight._id}/${event.target[0].value}`)
        .then(response => {
            if(response.status === 200) {
                setMessage({
                    "className": "show-success-message",
                    "message": "Assigned baggage claim carousel successfully"
                });
            }
            else {
                setMessage({
                    "className": "show-error-message",
                    "message": "Error assigning baggage claim carousel"
                });
            }
            
        });
        
        showMessage();
    };

    useEffect(() => {
        axios.get(`/schedule/assignedairlinecarousel/${airline}`)
        .then(response => {
            setAssignedCarousel(response.data.assignedCarousel);
        })

        axios.get(`/terminalgates/${city}`)
        .then(response => {
            setAvailableCarousel(response.data[0].carousel);
        })
    }, [airline]);

    carousels = availableCarousel.concat(assignedCarousel);
    
    return (
        <>
            {!props.flight.baggage_carousel && displayForm && 
                <FormWrapper>
                    <Heading header="1" heading="Assign Carousel" />

                    {Object.keys(message).length > 0 && <ShowMessage showMessage={message} />}
                    
                    <Form id="add-carousel-form" onSubmit={onFormSubmitHandler}>
                        <Select label="Select Carousel" name="baggage_carousel" required={true} options={carousels} />
                        <Button type="submit"> Assign Carousel </Button>
                    </Form>
                </FormWrapper>
            }
        </>
    )
};

export default AssignCarousel;