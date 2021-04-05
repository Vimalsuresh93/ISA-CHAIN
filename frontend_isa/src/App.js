import React from 'react';
import "./App.css";
import {Switch,Route} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./Common components/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import FireWelcome from "./Fire Department/pages/Firewelcome";
import ElectricityWelcome from "./Electricity Department/pages/Electricitywelcome";
import CorporationWelcome from "./Corporation/pages/CorporationWelcome";
import Fireform from "./Fire Department/Components/FireForm";
import FireDetails from "./Fire Department/Components/FireDetails";
import FireUpdateDetails from "./Fire Department/Components/FireUpdate";
import ElectricityForm from "./Electricity Department/Components/ElectricityForm";
import ElectricityDetails from "./Electricity Department/Components/ElectricityDetails";
import ElectricityUpdateDetails from "./Electricity Department/Components/ElectricalUpdate";
import CorporationForm from "./Corporation/Components/CorporationForm";
import CorporationDetails from "./Corporation/Components/CorporationDetails";
import CorporationUpdate from "./Corporation/Components/CorpupdateDetails";
import Home from "./Home"
const App=() =>{
  return (
    <>
    <Header/>
    <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/fire" component={FireWelcome}/>
         <Route exact path="/electricity" component={ElectricityWelcome}/>
        <Route exact path="/corporation" component={CorporationWelcome}/>
        <Route exact path="/fire/register" component={Fireform}/>
        <Route exact path="/fire/getdetails" component={FireDetails}/>
        <Route exact path="/fire/updatedetails" component={FireUpdateDetails}/>
        <Route exact path="/electricity/register" component={ElectricityForm}/>
        <Route exact path="/electricity/getdetails" component={ElectricityDetails}/>
        <Route exact path="/electricity/updatedetails" component={ElectricityUpdateDetails}/>
        <Route exact path="/corporation/register" component={CorporationForm}/>
        <Route exact path="/corporation/getdetails" component={CorporationDetails}/>
        <Route exact path="/corporation/updatedetails" component={CorporationUpdate}/>
      </Switch>
      </>
  );
}

export default App;






















