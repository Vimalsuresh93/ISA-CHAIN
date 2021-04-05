import React, { Component } from 'react';
import { createCertificate } from "../Helper/fire"
import FireSidebar from "./Sidebar"
import { toast } from "react-toastify"
import Loader from "../../Common components/Slowloader"
class FireInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firecertificateid: "",
            buildingid: "",
            buildingdetails: "",
            expiryDate: ""
            , totalarea: "",
            buildingheight: "",
            category: "",
            tankcapacity: "",
            nofirepumps: "",
            firepumpload: "",
            pumproomarea: "",
            loading:false
        };
    }
    handleInputChange = (event) => {
        event.preventDefault();
        //storing input
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    onsubmit = async (event) => {
        event.preventDefault();
        const details = {
            firecertificateid: this.state.firecertificateid,
            buildingid: this.state.buildingid,
            buildingdetails: this.state.buildingdetails,
            expirydate: this.state.expirydate
            ,totalarea: this.state.totalarea,
            buildingheight: this.state.buildingheight,
            category: this.state.category,
            tankcapacity: this.state.tankcapacity,
            nofirepumps: this.state.nofirepumps,
            firepumpload: this.state.firepumpload,
            pumproomarea: this.state.pumproomarea,

        }
        this.setState({ loading: true })
        const response = await createCertificate(details);
        this.setState({ loading: false })
        if (response.data) {
            toast.error("Certificate Creation Failed")
            toast.error(response.data)
            this.setState({
                firecertificateid: "",
                buildingid: "",
                buildingdetails: "",
                expiryDate: ""
                , totalarea: "",
                buildingheight: "",
                category: "",
                tankcapacity: "",
                nofirepumps: "",
                firepumpload: "",
                pumproomarea: "",
                loading:false
            })
        }
        else {
            toast.success("Certificate Created Successfully")
            this.setState({
                firecertificateid: "",
                buildingid: "",
                buildingdetails: "",
                expiryDate: ""
                , totalarea: "",
                buildingheight: "",
                category: "",
                tankcapacity: "",
                nofirepumps: "",
                firepumpload: "",
                pumproomarea: "",
                loading:false
            })
        }

    }
    render() {
        if (this.state.loading === true) {
            return (
                <Loader />
            )

        }
        else {
            return (
                <div style={{backgroundColor: "#221f3b"}}>
                    <FireSidebar />
                    <div className="container">
                        <div className="card container  border-success  mb-3 text-white" style={{ width: "120rem", position: "relative", left: "10rem", bottom: "5rem",backgroundColor: "#221f3b", }}>
                            <div className="card-header">FIRE NOC REGISTRATION</div>
                            <div className="card-body">
                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Building ID</label>
                                    <input type="text" class="form-control" id="floatingInput" name={"buildingid"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Fire Certificate ID" />
                                </div>
                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Building Details</label>
                                    <input type="text" class="form-control" id="floatingInput" name={"buildingdetails"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Fire Certificate ID" />
                                </div>
                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Certificate ID</label>
                                    <input type="text" class="form-control" id="floatingInput" name={"firecertificateid"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Certificate ID" />
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword">Expiry Date</label>
                                    <input type="date" class="form-control" id="floatingPassword" name={"expirydate"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Expiry Date" />
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword">Total Built Area in Sq/ft</label>
                                    <input type="number" class="form-control" id="floatingPassword" name={"totalarea"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Built Area in SQ/FT" />
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword">Building Height in Metres</label>
                                    <input type="number" class="form-control" id="floatingPassword" name={"buildingheight"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Building Height in Metres" />
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword">Fire Protection Category</label>
                                    <input type="text" class="form-control" id="floatingPassword" name={"category"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Building Category" />
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword">Fire Tank Capacity in Litres</label>
                                    <input type="number" class="form-control" id="floatingPassword" name={"tankcapacity"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Firetank capacity" />
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword">Number of Fire Pumps</label>
                                    <input type="number" class="form-control" id="floatingPassword" name={"nofirepumps"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Number of Fire Pumps" />
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword"> Fire Pump Power Rating</label>
                                    <input type="number" class="form-control" id="floatingPassword" name={"firepumpload"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Pump ratings" />
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword"> Fire Pump Room Area in Sq/ft</label>
                                    <input type="number" class="form-control" id="floatingPassword" name={"pumproomarea"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Pump Room Area in Sq/Ft" />
                                </div><br />
                                <button type="number" class="btn btn-success" onClick={this.onsubmit}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }



}

export default FireInputForm;