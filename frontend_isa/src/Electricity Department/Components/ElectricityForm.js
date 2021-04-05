import React, { Component } from 'react';
import { toast } from "react-toastify"
import { createCertificate, getfireCertificate } from "../Helper/helper"
import Sidebar from "./Sidebar"
import Loader from "../../Common components/Slowloader"

class ElectricityInputForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            firecertificateid: "",
            electricitycertificateid: "",
            buildingid: "",
            buildingdetails: "",
            expirydate: "",
            totalelectricity: "",
            firepumpload: "",
            nofirepumps: "",
            electricalroomarea: '',
            elecbuildingcat: "",
            showform:false,
            loading: false
        };
    }

    getfiredetail = async (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const details = await getfireCertificate(this.state.firecertificateid)
console.log(details)
        if (details) {

            const {
                buildingid,
                buildingdetails,
                nofirepumps,
                firepumpload,
            } = details.data
            this.setState({
                buildingid,
                buildingdetails,
                nofirepumps,
                firepumpload,
                showform: true
            })

        }
        this.setState({ loading: false });

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
            electricitycertificateid: this.state.electricitycertificateid,
            buildingid: this.state.buildingid,
            buildingdetails: this.state.buildingdetails,
            expirydate: this.state.expirydate,
            totalelectricity: this.state.totalelectricity,
            firepumpload: this.state.firepumpload,
            nofirepumps: this.state.nofirepumps,
            electricalroomarea: this.state.electricalroomarea,
            elecbuildingcat: this.state.elecbuildingcat,
        }
        this.setState({ loading: true })
        const response = await createCertificate(details);
        this.setState({ loading: false });
        if (response.data) {
            toast.error("Certificate Registration Failed")
            toast.error(response.data)
            this.setState({
                firecertificateid: "",
                electricitycertificateid: "",
                buildingid: "",
                buildingdetails: "",
                expirydate: "",
                totalelectricity: "",
                firepumpload: "",
                nofirepumps: "",
                electricalroomarea: '',
                elecbuildingcat: "",
                showform:false,
                loading: false
            })
        }
        else {
            toast.success("Certificate Registration Success")
            this.setState({
                firecertificateid: "",
                electricitycertificateid: "",
                buildingid: "",
                buildingdetails: "",
                expirydate: "",
                totalelectricity: "",
                firepumpload: "",
                nofirepumps: "",
                electricalroomarea: '',
                elecbuildingcat: "",
                showform:false,
                loading: false
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
                <div style={{backgroundColor: "#221f3b",height:"100rem"}}>
                    <Sidebar />
                    <div className="container">
                        <div className="card container border-success text-white" style={{ width: "120rem", position: "relative", left: "10rem",backgroundColor: "#221f3b"}}>
                            <div className="card-header">Electricity NOC REGISTRATION</div>
                            <div className="card-body">

                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Enter Fire Certificate ID</label>
                                    <input type="text" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.firecertificateid} name={"firecertificateid"} id="floatingInput" placeholder="Enter Fire Certificate ID" autoFocus />
                                </div>
                                <button type="number" class="btn btn-success" onClick={this.getfiredetail}>Find</button>

                                {this.state.showform && <>
                                    <div class="form-floating mb-3">
                                        <label for="floatingInput">Building Details</label>
                                        <input type="text" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.buildingdetails} name={"buildingdetails"} id="floatingInput" placeholder="Enter Building Details" disabled={true} />
                                    </div>

                                    <div class="form-floating">
                                        <label for="floatingPassword">Electrical Cerificate ID</label>
                                        <input type="text" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.electricitycertificateid} name={"electricitycertificateid"} id="floatingPassword" placeholder="Enter Electrical Certificate ID" />
                                    </div>
                                    <div class="form-floating">
                                        <label for="floatingPassword">Expiry Date</label>
                                        <input type="date" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.expiryDate} name={"expirydate"} id="floatingPassword" placeholder="Enter Expiry Date" />
                                    </div>
                                    <div class="form-floating">
                                        <label for="floatingPassword">Total Electricity Load</label>
                                        <input type="number" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.totalelectricity} name={"totalelectricity"} id="floatingPassword" placeholder="Enter Total Electricity Load" />
                                    </div>
                                    <div class="form-floating">
                                        <label for="floatingPassword">Fire Pump Load</label>
                                        <input type="text" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.firepumpload} name={"firepumpload"} id="floatingPassword" placeholder="Enter Fire Pump Load" disabled={true} />
                                    </div>
                                    <div class="form-floating">
                                        <label for="floatingPassword">Number of Fire Pumps</label>
                                        <input type="number" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.nofirepumps} name={"nofirepumps"} id="floatingPassword" placeholder="Enter Number of Fire Pumps" disabled={true} />
                                    </div>
                                    <div class="form-floating">
                                        <label for="floatingPassword"> Electrical Room Area</label>
                                        <input type="number" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.electricalroomarea} name={"electricalroomarea"} id="floatingPassword" placeholder="Enter Electrical Room Area" />
                                    </div>
                                    <div class="form-floating">
                                        <label for="floatingPassword">Electrical Building Category</label>
                                        <input type="text" class="form-control" onChange={(e) => { this.handleInputChange(e) }} value={this.state.elecbuildingcat} name={"elecbuildingcat"} id="floatingPassword" placeholder="Enter Building Category" />
                                    </div><br />
                                    <button type="number" class="btn btn-success" onClick={this.onsubmit}>Register</button>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            );

        }
    }
}

export default ElectricityInputForm;