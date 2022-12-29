import { useNavigate } from "react-router-dom";

import Heading from "../Heading/Heading";

import styles from "./NavBar.module.css";

const AdminNavBar = (props) => {
  const navigate = useNavigate();

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
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          <p>Airport management system</p>
        </a>
        <div className="flex">
        <a className="btn btn-primary m-3" href="/logout" onClick={onClickLogoutHandler}>Logout</a>
        </div>
      </nav>
    </>
  );
};

export default AdminNavBar;
