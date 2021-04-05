import React, { Component } from 'react';
import { getcorpCertificate } from "../Helper/corphelper"
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import Loader from "../../Common components/Slowloader"
class CorporationDetails extends Component {


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
            status: "",
            loading: false,
        };
    }
    handleInputChange = (event) => {
        event.preventDefault();
        //storing input
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    findtcecert = async (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const details = await getcorpCertificate(this.state.tccertificateid)
        this.setState({ loading: false })
        if (details.data.status) {
            const { buildingid,
                buildingdetails,
                firecertificateid,
                electricitycertificateid,
                expirydate,
                status } = details.data
            this.setState({

                buildingid,
                buildingdetails,
                firecertificateid,
                electricitycertificateid,
                expirydate,
                showform: true,
                status
            })

        }
        else {
            toast.error("No Data Found")
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
                < div style={{backgroundColor: "#221f3b",height:"80rem"}}>
                    <Sidebar />
                    <div className="container">
                        <div className="card container text-white border-danger  mb-3" style={{ width: "120rem", position: "relative", left: "10rem", bottom: "5rem",backgroundColor: "#221f3b" }}>
                            <div className="card-header">TC NO DETAILS</div>
                            <div className="card-body">
                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Enter T.C ID</label>
                                    <input type="text" class="form-control" name={"tccertificateid"} onChange={(e) => { this.handleInputChange(e) }} id="floatingInput" placeholder="Enter Temp Building ID" />
                                </div>
                                <br />
                                <button type="number" onClick={this.findtcecert} class="btn btn-success">Find</button>
                            </div>
                        </div>


                        {this.state.showform && <table class="table table-bordered table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">SlNO</th>
                                    <th scope="col">Parameter</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td> Building ID</td>
                                    <td>{this.state.buildingid}</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Building Details</td>
                                    <td>{this.state.buildingdetails}</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Firecertificate ID,</td>
                                    <td>{this.state.firecertificateid}</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td> Electricty Certificate ID</td>
                                    <td>{this.state.electricitycertificateid}</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Reneval Date</td>
                                    <td>{this.state.expirydate}</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td> Status</td>
                                    <td>{this.state.status}</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            );

        }
    }

}

export default CorporationDetails;