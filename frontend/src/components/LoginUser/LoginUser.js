import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axiosInstance";

import Heading from "../Heading/Heading";
import ShowMessage from "../ShowMessage/ShowMessage";
import FormWrapper from "../FormWrapper/FormWrapper";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Home from "../Home/Home";
import logo from "../emp.png";
import Navbar from "../Navbar2/Navbar";
import "./Login.css";

const LoginUser = (props) => {
  const navigate = useNavigate();
  let isSuccessful = false;
  const [message, setMessage] = useState({});

  const showMessage = () => {
    setTimeout(() => {
      setMessage(false);
      if (isSuccessful) navigate("/dashboard");
    }, 1000);
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    let user = {};

    for (let i = 0; i < event.target.length - 1; i++) {
      user[event.target[i].name] = event.target[i].value;
    }

    axios
      .post(`/login/${props.role}`, user)
      .then((response) => {
        isSuccessful = true;

        setMessage({
          className: "show-success-message",
          message: response.data.message,
        });

        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        localStorage.setItem("city", response.data.city);
        localStorage.setItem("airline", response.data.airline);
      })
      .catch((error) => {
        isSuccessful = false;

        setMessage({
          className: "show-error-message",
          message: error.response.data.message,
        });
      });

    showMessage();

    document.getElementById("add-user-form").reset();
  };

  return (
    <>
      <Navbar style={{ marginBottom: "125px" }} />

      <img src="https://i.imgur.com/3BGEqFQ.png" className="plane" />

      <FormWrapper>
        <h5 className="text-center">
          {window.location.pathname.includes("loginemployee")
            ? "Employee login"
            : "Admin login"}
        </h5>
        {Object.keys(message).length > 0 && (
          <ShowMessage showMessage={message} />
        )}

        <Form id="add-user-form" onSubmit={onFormSubmitHandler}>
          <Input label="Email" type="email" name="email" required={true} />
          <Input
            label="Password"
            type="password"s
            name="password"
            required={true}
          />
          <Button type="submit" className="btn btn-primary">
            {" "}
            Login{" "}
          </Button>
          {window.location.pathname.includes("loginemployee") ? (
            <a className="py-3" href="/loginadmin">
              Login as Admin
            </a>
          ) : (
            <a className="py-3" href="/loginemployee">
              Login as Employee
            </a>
          )}
        </Form>
      </FormWrapper>
    </>
  );
};

export default LoginUser;
