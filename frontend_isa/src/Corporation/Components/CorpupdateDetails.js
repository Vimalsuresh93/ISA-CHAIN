import React, { Component } from 'react';
import { updateCertificate, getelecCertificate, getcorpCertificate } from "../Helper/corphelper"
import Sidebar from "../Components/Sidebar"
import { toast } from "react-toastify";
import Loader from "../../Common components/Slowloader"
class CorporationUpdateInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tccertificateid: "",
            buildingid: "",
            buildingdetails: "",
            firecertificateid: "",
            electricitycertificateid: "",
            expirydate: "",
            status: "",
            loading: false
        };
    }
    getelecdetail = async (event) => {
        this.setState({ loading: true })
        const details = await getelecCertificate(this.state.electricitycertificateid)
        this.setState({ loading: false })
        if (details) {
            const {
                buildingid,
                buildingdetails,
                firecertificateid
            } = details.data
            this.setState({
                buildingid,
                buildingdetails,
                firecertificateid,
            })
        }
    }
    gettcdetail = async () => {
        this.setState({ loading: true })
        const details = await getcorpCertificate(this.state.tccertificateid)
        this.setState({ loading: false })
        if (details) {
            const { electricitycertificateid } = details.data;
            this.setState({ electricitycertificateid: electricitycertificateid })
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
            tccertificateid: this.state.tccertificateid
            , status: this.state.status
            , electricitycertificateid: this.state.electricitycertificateid
            , firecertificateid: this.state.firecertificateid
            ,
            expirydate: this.state.expirydate
        }
        this.setState({ loading: true })
        const response = await updateCertificate(details);
        this.setState({ loading: false })
        if (response.data) {
            toast.error("Certificate Updation Failed")
            toast.error(response.data)
            this.setState({
                tccertificateid: "",
                buildingid: "",
                buildingdetails: "",
                firecertificateid: "",
                electricitycertificateid: "",
                expirydate: "",
                status: "",
                loading: false
            })
        }
        else {
            toast.success("Certificate Renewed Successfully")
            this.setState({
                tccertificateid: "",
                buildingid: "",
                buildingdetails: "",
                firecertificateid: "",
                electricitycertificateid: "",
                expirydate: "",
                status: "",
                loading: false
            })
        }

    }
    updatestate = async (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        await this.gettcdetail();
        await this.getelecdetail();
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
                    <Sidebar />
                    <div className="container">
                        <div className="card container border-success text-white" style={{ width: "120rem", position: "relative", left: "10rem", bottom: "5rem" ,backgroundColor: "#221f3b"}}>
                            <div className="card-header">CORPORATION NOC UPDATION</div>
                            <div className="card-body">
                                <div class="form-floating">
                                    <label for="floatingPassword"> Enter T.C ID</label>
                                    <input type="text" class="form-control" id="floatingPassword" value={this.state.tccertificateid} name={"tccertificateid"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Electricity T.C Number" />
                                </div>
                                <button type="number" class="btn btn-success" onClick={this.updatestate} >Find</button>
                                <div class="form-floating mb-3">
                                    <label for="floatingInput"> Building Details </label>
                                    <input type="text" class="form-control" id="floatingInput" value={this.state.buildingdetails} name={"buildingdetails"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Building Details" disabled={true} />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlSelect2">Select Status</label>
                                    <select multiple class="form-control" name={'status'} onChange={(e) => { this.handleInputChange(e) }} id="exampleFormControlSelect2">
                                        <option value='renewed'>RENEW</option>
                                        <option value='expired'>REJECT</option>
                                    </select>
                                </div>
                                <div class="form-floating">
                                    <label for="floatingPassword">Reneval Date</label>
                                    <input type="date" class="form-control" id="floatingPassword" value={this.state.expirydate} name={"expirydate"} onChange={(e) => { this.handleInputChange(e) }} placeholder="Enter Renewval Date" />
                                </div><br />
                                <button type="number" class="btn btn-success" onClick={this.onsubmit}>Renew</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }


}

export default CorporationUpdateInputForm;