import { useNavigate } from 'react-router-dom';

import FormWrapper from '../FormWrapper/FormWrapper';
import Heading from '../Heading/Heading';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmployeeNavBar from '../NavBar/EmployeeNavBar';

const FlightSchedulesForm = props => {
    const navigate = useNavigate();

    const onFormSubmitHandler = event => {
        event.preventDefault();
        let target = event.target;
        
        navigate(`/flightschedules/${target[0].value}/${target[1].value}`);
    };

    return (
        <>
            <EmployeeNavBar />
            <FormWrapper>
                <Heading header="1" heading={props.heading} />
                
                <Form id="flight-form" onSubmit={onFormSubmitHandler}>
                    <Input label="Source" type="text" name="source" required={true} />
                    <Input label="Destination" type="text" name="destination" required={true} />
                    <Button type="submit"> Fetch Flights </Button>
                </Form>
            </FormWrapper>
        </>
    );
}

export default FlightSchedulesForm;