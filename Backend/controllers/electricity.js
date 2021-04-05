const {clientApplication} = require('../Client/client');

//Electricity NOC registration
exports.registration= (req,res)=>{
const {electricitycertificateid, buildingid, buildingdetails, firecertificateid, expirydate,
  totalelectricity, firepumpload, nofirepumps, electricalroomarea, elecbuildingcat}=req.body.details;

    let ElectricityClient = new clientApplication();
    ElectricityClient.setRoleAndIdentity("electricity","admin")
    ElectricityClient.initChannelAndChaincode("isachannel", "ISA");
    ElectricityClient.generatedAndSubmitTxn(
        "createElectricityCertificate",electricitycertificateid, buildingid, buildingdetails, firecertificateid, expirydate,
        totalelectricity, firepumpload, nofirepumps, electricalroomarea, elecbuildingcat)
      .then(message => {
        res.send(message);
      });

}

//For Fetching Electricity NOC Certificate
exports.getcertificate=(req,res)=>{
  let ElectricityClient = new clientApplication();
    ElectricityClient.setRoleAndIdentity("electricity","admin")
    ElectricityClient.initChannelAndChaincode("isachannel", "ISA");
    console.log(req.body.certid)
    ElectricityClient.generatedAndSubmitTxn(
        "readElectricityCertificate",
       req.body.certid
      )
      .then(message => {
        res.send(message);
      });
}

//Electricity  NOC Renewal
exports.updatecertificate= (req,res)=>{
  const {electricitycertificateid, firecertificateid, expirydate,status
    }=req.body.details;
  
      let ElectricityClient = new clientApplication();
      ElectricityClient.setRoleAndIdentity("electricity","admin")
      ElectricityClient.initChannelAndChaincode("isachannel", "ISA");
      console.log(req.body.details)
      ElectricityClient.generatedAndSubmitTxn(
          "RenewElectricityCertificate",
          electricitycertificateid, firecertificateid, expirydate,status
          )
        .then(message => {
          res.send(message);
        });
  
  }