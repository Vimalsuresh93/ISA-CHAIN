import React, { Component } from 'react';
import { updateCertificate, getCertificate, getfireCertificate } from "../Helper/helper"
import FireSidebar from "./Sidebar";
import { toast } from "react-toastify";
import Loader from "../../Common components/Slowloader"
class ElectricalupdateInputForm extends Component {
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
            status: '',
            loading: false
        };
    }


    getfiredetail = async () => {
        this.setState({ loading: true })
        const details = await getfireCertificate(this.state.firecertificateid)
        this.setState({ loading: false })
        if (details) {

            const {
                buildingid,
                buildingdetails,
                nofirepumps,
                firepumpload,
                status
            } = details.data
            this.setState({
                buildingid,
                buildingdetails,
                nofirepumps,
                firepumpload,
                status,
            })
        }
        else {
            toast.error("No Fire Data Found")
        }
    }


    getdetails = async () => {
        this.setState({ loading: true })
        const details = await getCertificate(this.state.electricitycertificateid)
        this.setState({ loading: false })
        if (details) {
            const {
                firecertificateid,
                expirydate,
                totalelectricity,
                electricalroomarea,
                elecbuildingcat } = details.data
            console.log(details.data)
            this.setState({
                expirydate,
                totalelectricity,
                electricalroomarea,
                elecbuildingcat,
                firecertificateid
            })
            console.log(this.state.elecbuildingcat)
        }
        else {
            toast.error("No Electrical Data Found")
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
            electricitycertificateid: this.state.electricitycertificateid,
            firecertificateid: this.state.firecertificateid,
            expirydate: this.state.expirydate,
            status: this.state.status
        }
        console.log(details);
        this.setState({ loading: true })
        const response = await updateCertificate(details);
        this.setState({ loading: false })
        if (response.data) {
            toast.error("Certificate Renewal Failed")
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
                status: '',
                loading: false
            })
        }
        else {
            toast.success("Certificate Renewed Successfully")
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
                status: '',
                loading: false
            })
        }

    }

    updatestate = async (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        await this.getdetails();
        await this.getfiredetail();
        this.setState({ loading: false })
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
                        <div className="card container border-success text-white" style={{ width: "120rem", position: "relative", left: "10rem", bottom: "5rem",backgroundColor: "#221f3b" }}>
                            <div className="card-header">Electricity NOC Renewal</div>
                            <div className="card-body">
                                <div class="form-floating mb-3">
                                    <div class="form-floating mb-3">
                                        <label for="floatingInput">Enter Electricity Certificate ID</label>
                                        <input type="text" class="form-control" value={this.state.electricitycertificateid} id="floatingInput" name={"electricitycertificateid"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Electrical Certificate ID" />
                                    </div><br />
                                    <button type="number" class="btn btn-success" onClick={this.updatestate}>Find</button><br /><br />
                                </div>
                                <div class="form-floating mb-3">
                                    <label for="floatingInput">Building Details</label>
                                    <input type="text" class="form-control" value={this.state.buildingdetails} id="floatingInput" name={"buildingdetails"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Building Details" disabled={true}/>
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlSelect2">Select Status</label>
                                    <select multiple class="form-control" name={'status'} onChange={(e) => { this.handleInputChange(e) }} id="exampleFormControlSelect2">
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

export default ElectricalupdateInputForm;