import Heading from "../Heading/Heading";

import styles from "../NavBar/NavBar.module.css";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();

  
  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          <p>Airport management system</p>
        </a>
        <div className="flex">
          <button
            className="btn btn-primary m-3"
            href="/user"
            onClick={() => {
              navigate("/dashboard");
              localStorage.setItem("role", "user");
            }}
          >
            User view
          </button>
          <a className="btn btn-primary m-3" href="/loginemployee">
            Employee Login
          </a>
        </div>
      </nav>
      {window.location.pathname.includes("home")}
    </>
  );
};

export default Home;
