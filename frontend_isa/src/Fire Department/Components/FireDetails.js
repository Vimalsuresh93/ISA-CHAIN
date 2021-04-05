import React, { Component } from 'react';
import Sidebar from "../Components/Sidebar"
import { getCertificate } from "../Helper/fire"
import { toast } from "react-toastify";
import Loader from "../../Common components/Slowloader";

class FireDetails extends Component {
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
        const details = await getCertificate(this.state.firecertificateid)
        this.setState({ loading: false })
        if (details.data.status) {
            console.log(details)
            const { buildingid,
                buildingdetails,
                expirydate
                , totalarea,
                buildingheight,
                category,
                tankcapacity,
                nofirepumps,
                firepumpload,
                pumproomarea, status } = details.data
            this.setState({
                showform: true, buildingid,
                buildingdetails,
                expirydate
                , totalarea,
                buildingheight,
                category,
                tankcapacity,
                nofirepumps,
                firepumpload,
                pumproomarea,
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
                        <div className="card container border-danger  mb-3 text-white" style={{ width: "120rem", position: "relative", left: "10rem", bottom: "5rem",backgroundColor:"#221f3b" }}>
                            <div className="card-header">FIRE NOC Details</div>
                            <div className="card-body">
                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Enter Fire certificate ID</label>
                                    <input type="text" class="form-control" name={"firecertificateid"} onChange={(e) => { this.handleInputChange(e) }} id="floatingInput" placeholder="Enter Temp Building ID" autoFocus />
                                </div>
                                <br />
                                <button type="number" class="btn btn-success" onClick={this.findfirecert}>Get Details</button>
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
                                    <td>BuildingID</td>
                                    <td>{this.state.buildingid}</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>BuildingDetails</td>
                                    <td>{this.state.buildingdetails}</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td> ExpiryDate</td>
                                    <td>{this.state.expirydate}</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Totalarea</td>
                                    <td>{this.state.totalarea}</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Buildingheight</td>
                                    <td>{this.state.buildingheight}</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Category</td>
                                    <td>{this.state.category}</td>
                                </tr>
                                <tr>
                                    <th scope="row">7</th>
                                    <td>Tankcapacity</td>
                                    <td>{this.state.tankcapacity}</td>
                                </tr>
                                <tr>
                                    <th scope="row">8</th>
                                    <td>Nofirepumps</td>
                                    <td>{this.state.nofirepumps}</td>
                                </tr>
                                <tr>
                                    <th scope="row">9</th>
                                    <td>Firepumpload</td>
                                    <td>{this.state.firepumpload}</td>
                                </tr>
                                <tr>
                                    <th scope="row">10</th>
                                    <td>PumproomArea</td>
                                    <td>{this.state.pumproomarea}</td>
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
            )
        }
    }

}

export default FireDetails;