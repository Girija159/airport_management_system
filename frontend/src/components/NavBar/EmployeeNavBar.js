import { useNavigate } from "react-router-dom";

import Heading from "../Heading/Heading";

import styles from "./NavBar.module.css";

const EmployeeNavBar = (props) => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const city = localStorage.getItem("city");

  const onClickLogoutHandler = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("city");
    localStorage.removeItem("airline");
    localStorage.removeItem("authenticated");

    navigate("/home");
  };

  return (
    <>
      {role === "Airport" ? (
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            <p>Airport management system</p>
          </a>
          <div className="flex">
            <a className="btn btn-primary m-3" href={`/assigncarousel/${city}`}>
              Assign Carousel
            </a>
            <a
              className="btn btn-primary m-3"
              href={`/enabledisablegates/${city}`}
            >
              Maintain Gates
            </a>
            <a className="btn btn-primary m-3" href="/logout" onClick={onClickLogoutHandler}>
              Logout
            </a>
          </div>
        </nav>
      ) : (
        <>
          <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="/">
              <p>Airport management system</p>
            </a>
            <div className="flex">
              <a className="btn btn-primary m-3" href="/addflight">
                Add Flight
              </a>
              <a className="btn btn-primary m-3" href="/getflightschedules">
                Update Flight
              </a>
              <a className="btn btn-primary m-3" href="/logout" onClick={onClickLogoutHandler}>
                Logout
              </a>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default EmployeeNavBar;
