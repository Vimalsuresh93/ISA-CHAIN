import React, { Component } from 'react';
import { createCertificate, getelecCertificate } from "../Helper/corphelper";
import Sidebar from "../Components/Sidebar"
import { toast } from "react-toastify"
import Loader from "../../Common components/Slowloader"
class CorporationInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tccertificateid: "",
            buildingid: "",
            buildingdetails: "",
            firecertificateid: "",
            electricitycertificateid: "",
            expirydate: "",
            showform: false,
            loading: false
        };
    }

    getelecdetail = async (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const details = await getelecCertificate(this.state.electricitycertificateid)
        this.setState({ loading: false })
        if (details) {
            const {
                buildingid,
                buildingdetails,
                tccertificateid,
                firecertificateid
            } = details.data
            this.setState({
                buildingid,
                buildingdetails,
                tccertificateid,
                firecertificateid,
                showform: true
            })
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
            tccertificateid: this.state.tccertificateid,
            buildingid: this.state.buildingid,
            buildingdetails: this.state.buildingdetails,
            firecertificateid: this.state.firecertificateid,
            electricitycertificateid: this.state.electricitycertificateid,
            expirydate: this.state.expirydate
        }
        console.log(details)
        this.setState({ loading: true })
        const response = await createCertificate(details);
        this.setState({ loading: false })
        if (response.data) {
            toast.error("Certificate Creation Failed");
            toast.error(response.data);
            this.setState({
                tccertificateid: "",
                buildingid: "",
                buildingdetails: "",
                firecertificateid: "",
                electricitycertificateid: "",
                expirydate: "",
                showform: false,
                loading: false
            })
        }
        else {
            toast.success("Certificate created successfully")
            this.setState({
                tccertificateid: "",
                buildingid: "",
                buildingdetails: "",
                firecertificateid: "",
                electricitycertificateid: "",
                expirydate: "",
                showform: true,
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
                        <div className="card container  border-success  mb-3 text-white" style={{ width: "120rem", position: "relative", left: "10rem", bottom: "5rem",backgroundColor: "#221f3b" }}>
                            <div className="card-header">CORPORATION NOC REGISTRATION</div>
                            <div className="card-body">

                                <div class="form-floating">
                                    <label for="floatingPassword"> Enter Electricity Certificate ID</label>
                                    <input type="text" class="form-control" id="floatingPassword" value={this.state.electricitycertificateid} name={"electricitycertificateid"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Electricity Certificate Number" />
                                </div>
                                <button type="number" class="btn btn-success" onClick={this.getelecdetail} >Find</button>
                                {this.state.showform && <>
                                    <div class="form-floating mb-3">
                                        <label for="floatingInput"> Building Details </label>
                                        <input type="text" class="form-control" id="floatingInput" value={this.state.buildingdetails} name={"buildingdetails"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Building Details" disabled={true}/>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <label for="floatingInput">Fire Certificate ID</label>
                                        <input type="text" class="form-control" id="floatingInput" value={this.state.firecertificateid} name={"firecertificateid"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Fire Certificate ID" disabled={true} />
                                    </div>

                                    <div class="form-floating">
                                        <label for="floatingPassword">T.C Number</label>
                                        <input type="text" class="form-control" id="floatingPassword" value={this.state.tccertificateid} name={"tccertificateid"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Expiry Date" />
                                    </div>
                                    <div class="form-floating">
                                        <label for="floatingPassword">Reneval Date</label>
                                        <input type="date" class="form-control" id="floatingPassword" value={this.state.expirydate} name={"expirydate"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Building Height in Metres" />
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

export default CorporationInputForm;