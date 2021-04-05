export const submittransaction=(role)=>{
    let ManufacturerClient = new clientApplication();
    ManufacturerClient.setRoleAndIdentity("fire","admin")
    ManufacturerClient.initChannelAndChaincode("autochannel", "BMW");
    ManufacturerClient.generatedAndSubmitTxn(
        "addBmw",
        vin,make,model,color,DOM,flag
      )
      .then(message => {
        console.log(message);
      });

}