import React, { Component } from 'react';
import { updateCertificate, getCertificate } from "../Helper/fire"
import FireSidebar from "./Sidebar";
import { toast } from "react-toastify";
import Loader from "../../Common components/Slowloader"
class FireupdateInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firecertificateid: "",
            buildingid: "",
            buildingdetails: "",
            expirydate: ""
            , totalarea: "",
            buildingheight: "",
            category: "",
            tankcapacity: "",
            nofirepumps: "",
            firepumpload: "",
            pumproomarea: "",
            status: "",
            loader: false
        };
    }

    getdetails = async (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const details = await getCertificate(this.state.firecertificateid)
        this.setState({ loading: false })
        if (details) {

            const { buildingid,
                buildingdetails,
                expirydate
                , totalarea,
                buildingheight,
                category,
                tankcapacity,
                nofirepumps,
                firepumpload,
                pumproomarea } = details.data
            this.setState({
                buildingid,
                buildingdetails,
                expirydate
                , totalarea,
                buildingheight,
                category,
                tankcapacity,
                nofirepumps,
                firepumpload,
                pumproomarea
            })
        }
        else {
            toast.error("Certificate Does not exist")
        }

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
            firecertificateid: this.state.firecertificateid
            , expirydate: this.state.expirydate
            , status: this.state.status
        }
        this.setState({ loading: true })
        const response = await updateCertificate(details);
        this.setState({ loading: false })
        if (response.data) {
            toast.error("Certificate Renewal Failed");
            toast.error(response.data);
            this.setState({
                firecertificateid: "",
                buildingid: "",
                buildingdetails: "",
                expirydate: ""
                , totalarea: "",
                buildingheight: "",
                category: "",
                tankcapacity: "",
                nofirepumps: "",
                firepumpload: "",
                pumproomarea: "",
                status: "",
                loader: false
                
            })
        }
        else {
            toast.success("Certificate Renewed Successfully")
            this.setState({
                firecertificateid: "",
                buildingid: "",
                buildingdetails: "",
                expirydate: ""
                , totalarea: "",
                buildingheight: "",
                category: "",
                tankcapacity: "",
                nofirepumps: "",
                firepumpload: "",
                pumproomarea: "",
                status: "",
                loader: false
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
                    <FireSidebar />
                    <div className="container">
                        <div className="card container border-success text-white" style={{ width: "120rem", position: "relative", left: "10rem", bottom: "5rem",backgroundColor:"#221f3b" }}>
                            <div className="card-header">RENEW FIRE CERTIFICATE</div>
                            <div className="card-body">
                                <div class="form-floating mb-3">
                                    <div class="form-floating mb-3">
                                        <label for="floatingInput">Fire Certificate ID</label>
                                        <input type="text" class="form-control" value={this.state.firecertificateid} id="floatingInput" name={"firecertificateid"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Certificate ID" />
                                    </div><br />
                                    <button type="number" class="btn btn-success" onClick={this.getdetails}>Find</button><br /><br />
                                </div>
                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Building Details</label>
                                    <input type="text" class="form-control" value={this.state.buildingdetails} id="floatingInput" name={"buildingdetails"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Fire Certificate ID" disabled={true} />
                                </div>

                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Select Status</label>
                                    <select multiple class="form-control" id="exampleFormControlSelect1" name={"status"} onChange={(e) => { this.handleInputChange(e) }}>
                                        <option value='renewed'>RENEW</option>
                                        <option value='expired'>REJECT</option>
                                    </select>
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword">Expiry Date</label>
                                    <input type="date" class="form-control" value={this.state.expirydate} id="floatingPassword" name={"expirydate"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Expiry Date" />
                                </div>
                                <br />
                                <button type="number" class="btn btn-success" onClick={this.onsubmit}>Renew</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }



}

export default FireupdateInputForm;