const { EventListner } = require('../Client/events')
//Event Listener For Fire NOC Registration
exports.getfireevents = async (req, res) => {
    let FireEvent = new EventListner();
    FireEvent.setRoleAndIdentity("fire", "admin")
    FireEvent.initChannelAndChaincode("isachannel", "ISA");
    FireEvent.contractEventListner('FireCertificateCreation', 'addFireEvent').then(message => {
        // console.log(message);
        // res.send(message);
    })

}

// Event Listener For Fire NOC Renewal
exports.getfirerenewalvents = async (req, res) => {
    let FireEvent = new EventListner();
    FireEvent.setRoleAndIdentity("fire", "admin")
    FireEvent.initChannelAndChaincode("isachannel", "ISA");
    FireEvent.contractEventListner('FireCertificate Renewal', 'FireRenevalEvent').then(message => {
        // console.log(message);
        // res.send(message);
    })

}

//Event Listener For Electricity NOC Registration
exports.geteleccertificateevents = async (req, res) => {
    let FireEvent = new EventListner();
    FireEvent.setRoleAndIdentity("electricity", "admin")
    FireEvent.initChannelAndChaincode("isachannel", "ISA");
    FireEvent.contractEventListner('ElectricityCertificate Creation', 'addelectricityEvent').then(message => {
        // console.log(message);
        // res.send(message);
    })

}

// Event Listener For Electricity NOC Renewal
exports.getelecrenewaleevents = async (req, res) => {
    let FireEvent = new EventListner();
    FireEvent.setRoleAndIdentity("electricity", "admin")
    FireEvent.initChannelAndChaincode("isachannel", "ISA");
    FireEvent.contractEventListner('Electricity Renewal Certificate ', 'renewelectricityEvent').then(message => {
        // console.log(message);
        // res.send(message);
    })

}

//Event Listener For Corporation NOC Registration
exports.getcorpcreationeevents = async (req, res) => {
    let FireEvent = new EventListner();
    FireEvent.setRoleAndIdentity("corporation", "admin")
    FireEvent.initChannelAndChaincode("isachannel", "ISA");
    FireEvent.contractEventListner('Corporationcertificate Creation ', 'addcorporationEvent').then(message => {
        // console.log(message);
        // res.send(message);
    })

}

//Event Listener For Corporation NOC Regnewal
exports.getcorprenewalevents = async (req, res) => {
    let FireEvent = new EventListner();
    FireEvent.setRoleAndIdentity("corporation", "admin")
    FireEvent.initChannelAndChaincode("isachannel", "ISA");
    FireEvent.contractEventListner('Corporationcertificate Creation ', 'renewcorporationEvent').then(message => {
        // console.log(message);
        // res.send(message);
    })

}