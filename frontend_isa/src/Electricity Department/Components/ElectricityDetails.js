import React, { Component } from 'react';
import Sidebar from "../Components/Sidebar"
import { getCertificate } from "../Helper/helper"
import { toast } from "react-toastify"
import Loader from "../../Common components/Slowloader"
class FireDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firecertificateid: "",
            electricitycertificateid: "",
            buildingid: "",
            buildingdetails: "",
            expirydate: "",
            totalarea: "",
            totalelectricity: "",
            firepumpload: "",
            nofirepumps: "",
            electricalroomarea: '',
            elecbuildingcat: "",
            showform: false,
            status: '',
            loading: false
        };
    }
    handleInputChange = (event) => {
        event.preventDefault();
        //storing input
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    findfirecert = async (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const details = await getCertificate(this.state.electricitycertificateid)
        this.setState({ loading: false });
        if (details.data.status) {
            const { firecertificateid,
                buildingid,
                buildingdetails,
                expirydate,
                totalarea,
                totalelectricity,
                firepumpload,
                nofirepumps,
                electricalroomarea,
                elecbuildingcat,
                status } = details.data
            console.log(details.data)
            this.setState({
                buildingid,
                buildingdetails,
                expirydate,
                totalarea,
                totalelectricity,
                firepumpload,
                nofirepumps,
                electricalroomarea,
                elecbuildingcat,
                firecertificateid,
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
                <div style={{backgroundColor: "#221f3b",height:"80rem"}}>
                    <Sidebar />
                    <div className="container">
                        <div className="card container text-white border-danger  mb-3" style={{ width: "120rem", position: "relative", left: "10rem", bottom: "5rem",backgroundColor: "#221f3b" }}>
                            <div className="card-header">ELECTRICITY NOC DETAILS</div>
                            <div className="card-body">
                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Enter Electricity certificate ID</label>
                                    <input type="text" class="form-control" name={"electricitycertificateid"} onChange={(e) => { this.handleInputChange(e) }} id="floatingInput" placeholder="Enter Temp Building ID" />
                                </div>
                                <br />
                                <button type="number" onClick={this.findfirecert} class="btn btn-success">Find</button>
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
                                    <td>FireCertificateID</td>
                                    <td>{this.state.firecertificateid}</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>BuildingId</td>
                                    <td>{this.state.buildingid}</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Building Details</td>
                                    <td>{this.state.buildingdetails}</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>ExpiryDate</td>
                                    <td>{this.state.expirydate}</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Total electricity</td>
                                    <td>{this.state.totalelectricity}</td>
                                </tr>
                                <tr>
                                    <th scope="row">7</th>
                                    <td>Fire pump load</td>
                                    <td>{this.state.firepumpload}</td>
                                </tr>
                                <tr>
                                    <th scope="row">8</th>
                                    <td>No Of Firepumps</td>
                                    <td>{this.state.nofirepumps}</td>
                                </tr>
                                <tr>
                                    <th scope="row">9</th>
                                    <td>Electrical Room area</td>
                                    <td>{this.state.electricalroomarea}</td>
                                </tr>
                                <tr>
                                    <th scope="row">10</th>
                                    <td>Electrical Building Category</td>
                                    <td>{this.state.elecbuildingcat}</td>
                                </tr>
                                <tr>
                                    <th scope="row">10</th>
                                    <td>NOC Status</td>
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

export default FireDetails;