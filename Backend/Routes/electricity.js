const express=require('express')
const router=express.Router();
const {registration,getcertificate,updatecertificate}=require("../controllers/electricity")
//Route for Registering Electricity Certificate
router.post("/register",registration);
//Route for getting Electricity Certificate
router.post("/getcertificate",getcertificate);
//Route for renewing Electricity Certificate
router.post("/updatecertificate",updatecertificate);
module.exports=router;