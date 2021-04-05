const {clientApplication} = require('../Client/client');

//Corporation NOC registration
exports.registration= (req,res)=>{
const {tccertificateid, buildingid, buildingdetails, firecertificateid, electricitycertificateid,
  expirydate}=req.body.details;

    let CorporationClient = new clientApplication();
    CorporationClient.setRoleAndIdentity("corporation","admin")
    CorporationClient.initChannelAndChaincode("isachannel", "ISA");
    CorporationClient.generatedAndSubmitTxn(
        "createTcCertificate",
        tccertificateid, buildingid, buildingdetails, firecertificateid, electricitycertificateid,
         expirydate
      )
      .then(message => {
        res.send(message);
      });

}
//For Fetching Corporation NOC Certificate
exports.getcertificate=(req,res)=>{
  let CorporationClient = new clientApplication();
    CorporationClient.setRoleAndIdentity("corporation","admin")
    CorporationClient.initChannelAndChaincode("isachannel", "ISA");
    console.log(req.body.certid)
    CorporationClient.generatedAndSubmitTxn(
        "readTcCertificate",
       req.body.certid
      )
      .then(message => {
        res.send(message);
      });
}

//Corporation NOC Renewal
exports.updatecertificate= (req,res)=>{
  const {tccertificateid, status, electricitycertificateid,firecertificateid,
    expirydate}=req.body.details;
  console.log(req.body.details)
      let CorporationClient = new clientApplication();
      CorporationClient.setRoleAndIdentity("corporation","admin")
      CorporationClient.initChannelAndChaincode("isachannel", "ISA");
      CorporationClient.generatedAndSubmitTxn(
          "RenewTcCertificate",
          tccertificateid, status, electricitycertificateid,firecertificateid,
          expirydate
        )
        .then(message => {
          res.send(message);
        });
  
  }