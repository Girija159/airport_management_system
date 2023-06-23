import AdminNavBar from "../NavBar/AdminNavBar";
import EmployeeNavBar from "../NavBar/EmployeeNavBar";
import UserNavBar from "../NavBar/UserNavBar";
import CreateEmployee from '../CreateEmployee/CreateEmployee';

const Dashboard = (props) => {
  const role = localStorage.getItem("role");
  const city = localStorage.getItem("city");

  return (
    <>
      {role === "admin" && (<>
      <AdminNavBar />
      <CreateEmployee/>
      </>)}
      {(role === "Airport" || role === "Airline") && (
        <>
          <EmployeeNavBar />
          {role === "Airline" ? (
            <div className="user-select-page m-0">
              <section id="introduction">
                <div class="container">
                  <div class="row fill-viewport align-items-center">
                    <div class="col-6 col-md-6">
                      <div className="d-flex p-3 flex-column">
                        <a className="btn btn-primary m-3" href="/addflight">
                          Add Flight
                        </a>
                        <a
                          className="btn btn-primary m-3"
                          href="/getflightschedules"
                        >
                          Update Flight
                        </a>
                      </div>
                    </div>
                    <div className="col-6 p-4">
                      <iframe
                        src="https://giphy.com/embed/L06OGR3HU1IYyuUF1X"
                        width="480"
                        height="480"
                        frameBorder="0"
                        class="giphy-embed"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="user-select-page m-0">
              <section id="introduction">
                <div class="container">
                  <div class="row fill-viewport align-items-center">
                    <div class="col-6 col-md-6">
                      <div className="d-flex p-3 flex-column">
                        <a
                          className="btn btn-primary m-3"
                          href={`/assigncarousel/${city}`}
                        >
                          Assign Carousel
                        </a>
                        <a
                          className="btn btn-primary m-3"
                          href={`/enabledisablegates/${city}`}
                        >
                          Maintain Gates
                        </a>
                      </div>
                    </div>
                    <div className="col-6 p-4">
                      <iframe
                        src="https://giphy.com/embed/L06OGR3HU1IYyuUF1X"
                        width="480"
                        height="480"
                        frameBorder="0"
                        class="giphy-embed"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </>
      )}
      {role === "user" && <UserNavBar />}
    </>
  );
};

export default Dashboard;
