const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
const app=express();
const fireRoutes =require("./Routes/Fire");
const electricityRoutes =require("./Routes/electricity");
const corpRoutes =require("./Routes/corporation");
const {getfireevents,getfirerenewalvents,geteleccertificateevents,getelecrenewaleevents,getcorpcreationeevents,getcorprenewalevents} = require("./controllers/eventlisteners")
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/fire",fireRoutes);
app.use("/electricity",electricityRoutes);
app.use("/corporation",corpRoutes);


getfireevents();
getfirerenewalvents();
geteleccertificateevents();
getelecrenewaleevents();
getcorpcreationeevents();
getcorprenewalevents();


app.listen(8000,()=>{
    console.log("Port Running on 8000")
})