import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Heading from "../Heading/Heading";
import ShowMessage from "../ShowMessage/ShowMessage";
import FormWrapper from "../FormWrapper/FormWrapper";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

import styles from "./NavBar.module.css";

const UserNavBar = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({});

  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    localStorage.setItem("userCity", event.target[0].value);

    setMessage({
      className: "show-success-message",
      message: "Now you can view arrivals and departures",
    });

    showMessage();

    document.getElementById("add-city-form").reset();
  };

  const showMessage = () => {
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };

  const onClickLogoutHandler = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("city");
    localStorage.removeItem("airline");
    localStorage.removeItem("userCity");
    localStorage.removeItem("authenticated");

    navigate("/home");
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          <p>Airport management system</p>
        </a>
        <div className="flex">
          {localStorage.getItem("userCity") ? (
            <>
              <a className="btn btn-primary m-3" href="/departures">
                Departures
              </a>
              <a className="btn btn-primary m-3" href="/arrivals">
                Arrivals
              </a>
            </>
          ) : (
            <></>
          )}
          {localStorage.getItem("authenticated") === "yes" ? (
            <a
              className="btn btn-primary m-3"
              href="/logout"
              onClick={onClickLogoutHandler}
            >
              Logout
            </a>
          ) : (
            <a className="btn btn-primary m-3" href="/loginemployee">
              Employee Login
            </a>
          )}
        </div>
      </nav>

      {window.location.pathname.includes("dashboard") && (
        <>
          <div className={styles["home-heading-top"]}>
            {/* <Heading header="1" heading="Welcome" /> */}
          </div>

          <FormWrapper>
            {localStorage.getItem("userCity") ? (
              <>
                <p>current city: {localStorage.getItem("userCity")}</p>
              </>
            ) : (
              <></>
            )}
            <Heading header="1" heading="Enter your current city" />

            {Object.keys(message).length > 0 && (
              <ShowMessage showMessage={message} />
            )}

            <Form id="add-city-form" onSubmit={onFormSubmitHandler}>
              <Input label="City" type="text" name="city" required={true} />
              <Button type="submit"> Submit </Button>
            </Form>
          </FormWrapper>
        </>
      )}
    </>
  );
};

export default UserNavBar;
