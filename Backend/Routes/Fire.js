const express=require('express')
const router=express.Router();
const {registration,getcertificate,updatecertificate}=require("../controllers/fire");
//Route for Fire Certificate Registering
router.post("/register",registration);
//Route for getting Fire Certificate 
router.post("/getcertificate",getcertificate);
//Route for Renewing Fire Cerificate
router.post("/updatefirecert",updatecertificate);

module.exports=router;