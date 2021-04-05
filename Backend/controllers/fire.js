const {clientApplication} = require('../Client/client');
const {EventListner} = require('../Client/events')

//Fire NOC registration
exports.registration= (req,res)=>{
  try{
    const {firecertificateid, buildingid, buildingdetails, expirydate
      , totalarea, buildingheight, category, tankcapacity, nofirepumps, firepumpload, pumproomarea}=req.body.details;
    
        let FireClient = new clientApplication();
        FireClient.setRoleAndIdentity("fire","admin")
        FireClient.initChannelAndChaincode("isachannel", "ISA");
        FireClient.generatedAndSubmitTxn(
            "createfireCertificate",
            firecertificateid, buildingid, buildingdetails, expirydate
            , totalarea, buildingheight, category, tankcapacity, nofirepumps, firepumpload, pumproomarea
            )
          .then(message => {
            console.log(message)
            res.send( message);
          });
  }
catch(err){
  console.log(err)
}

}


//For Fetching Fire NOC Certificate
exports.getcertificate=(req,res)=>{
  let FireClient = new clientApplication();
    FireClient.setRoleAndIdentity("fire","admin")
    FireClient.initChannelAndChaincode("isachannel", "ISA");
    FireClient.generatedAndSubmitTxn(
        "readFireCertificate",
       req.body.certid
      )
      .then(message => {
        res.send(message);
      });
}

//Fire NOC Renewal
exports.updatecertificate= (req,res)=>{
  const {firecertificateid,expirydate,status
    }=req.body.details;
  
      let FireClient = new clientApplication();
      FireClient.setRoleAndIdentity("fire","admin")
      FireClient.initChannelAndChaincode("isachannel", "ISA");
      FireClient.generatedAndSubmitTxn(
          "RenewFireCertificate",
          firecertificateid,expirydate,status
          )
        .then(message => {
          res.send(message);
        });
  
  }
