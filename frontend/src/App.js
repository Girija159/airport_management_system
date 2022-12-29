import { Routes, Route } from 'react-router-dom';
 
import './App.css';

import AddFlight from './components/AddFlight/AddFlight';
import FlightSchedulesForm from './components/FlightSchedulesForm/FlightSchedulesForm';
import FetchFlightSourceDestination from './components/FetchFlightsSourceDestination/FetchFlightsSourceDestination';
import FetchFlightsCity from './components/FetchFlightsCity/FetchFlightsCity';
import SelectFlight from './components/SelectFlight/SelectFlight'
import EnableDisableGates from './components/EnableDisableGates/EnableDisableGates';
import ArrivalsDepartures from './components/ArrivalsDepartures/ArrivalsDepartures';
import CreateEmployee from './components/CreateEmployee/CreateEmployee';
import CreateUser from './components/CreateUser/CreateUser';
import LoginUser from './components/LoginUser/LoginUser';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <div className="App">
            <Routes>

            <Route 
                    path="/" 
                    element={
                        <Home />
                    } 
                />

                <Route 
                    path="/home" 
                    element={
                        <Home />
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <Dashboard />
                    } 
                />
                <Route 
                    path="/addflight" 
                    element={<AddFlight heading="Add Flight" />} 
                />
                <Route 
                    path="/getflightschedules" 
                    element={
                        <FlightSchedulesForm 
                            heading="Enter Cities" 
                        />
                    } 
                />
                <Route 
                    path="/flightschedules/:source/:destination" 
                    element={
                        <FetchFlightSourceDestination 
                            heading="Update Flights" 
                            loader="Loading Flights..." 
                            buttonText="Select"
                        />
                    } 
                />
                <Route 
                    path="/assigncarousel/:city" 
                    element={
                        <FetchFlightsCity 
                            heading="Assign Carousel" 
                            loader="Loading Flights..." 
                            buttonText="Select"
                        />
                    } 
                />
                <Route 
                    path="/selectflight/:flightId" 
                    element={
                        <SelectFlight 
                            // heading="Choose an Operation" 
                        />
                    } 
                />
                <Route 
                    path="/enabledisablegates/:city" 
                    element={
                        <EnableDisableGates 
                            heading="Enable or Disable Gates"
                            loader="Loading Terminals ..."  
                        />
                    } 
                />
                <Route 
                    path="/arrivals" 
                    element={
                        <ArrivalsDepartures 
                            heading="Arrivals"
                            arrivals={true}
                            loader="Loading Flights ..."  
                        />
                    } 
                />
                <Route 
                    path="/departures" 
                    element={
                        <ArrivalsDepartures 
                            heading="Departures"
                            departures={true}
                            loader="Loading Flights ..."  
                        />
                    } 
                />
                <Route 
                    path="/createemployee" 
                    element={
                        <CreateEmployee
                            heading="Add Employee"
                        />
                    } 
                />
                <Route 
                    path="/createuser" 
                    element={
                        <CreateUser
                            heading="Sign Up"
                        />
                    } 
                />
                <Route 
                    path="/loginadmin" 
                    element={
                        <LoginUser
                            role="admin"    
                            heading="Admin Log In"
                        />
                    } 
                />
                <Route 
                    path="/loginemployee" 
                    element={
                        <LoginUser
                            role="employee"    
                            heading="Employee Log In"
                        />
                    } 
                />
                <Route 
                    path="/loginuser" 
                    element={
                        <LoginUser
                            role="user"    
                            heading="Log In"
                        />
                    } 
                />
            </Routes>
        </div>
    );
}

export default App;
