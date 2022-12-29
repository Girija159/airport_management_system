import { useState } from 'react';
import axios from '../../axios/axiosInstance';

import Heading from '../Heading/Heading';
import ShowMessage from '../ShowMessage/ShowMessage';
import FormWrapper from '../FormWrapper/FormWrapper';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Button from '../Button/Button';
import AdminNavBar from '../NavBar/AdminNavBar';

const CreateEmployee = props => {
    const options = ["Airline", "Airport"];

    const [employeeType, setEmployeeType] = useState({
        "type": "Airline"
    });

    const [message, setMessage] = useState({});
    
    const onChange = value => {
        setEmployeeType({
            "type": value
        });
    };

    const showMessage = () => {
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    };
    
    const onFormSubmitHandler = event => {
        event.preventDefault();
    
        let employee = {};

        for(let i = 0; i < event.target.length - 1; i++) {
            employee[event.target[i].name] = event.target[i].value;
        }
    
        axios.post(`/signup/employee`, employee)
        .then(response => {
            setMessage({
                "className": "show-success-message",
                "message": response.data.message
            });
        })
        .catch(error => {
            setMessage({
                "className": "show-error-message",
                "message": error.response.data.message
            });
        });

        showMessage();

        document.getElementById("add-employee-form").reset();
    };
    
    return (
        <>
            {/* <AdminNavBar /> */}
            <FormWrapper>
                <Heading header="1" heading={props.heading} />

                {Object.keys(message).length > 0 && <ShowMessage showMessage={message} />}
                
                <Form id="add-employee-form" onSubmit={onFormSubmitHandler}>
                    <Input label="Username" type="text" name="username"  required={true} />
                    <Input label="Email" type="email" name="email" required={true} />
                    <Input label="Password" type="password" name="password"  required={true} />
                    <Select label="Employee Type" name="employeetype" required={true} options={options} onChange={onChange} />
                    {employeeType.type === "Airline" ? 
                        <Input label="Airline" type="text" name="airline"  required={true} /> :
                        <Input label="City" type="text" name="city"  required={true} />
                    }
                    <Button type="submit"> Add Employee </Button>
                </Form>
            </FormWrapper>
        </>
    )
};

export default CreateEmployee;