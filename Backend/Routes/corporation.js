const express=require('express')
const router=express.Router();
const {registration,getcertificate,updatecertificate}=require("../controllers/corporation")
//Route for Registering Corporation Certificate
router.post("/register",registration);
//Route for getting Fire Certificate
router.post("/getcertificate",getcertificate);
//Route for Updating Fire Certificate
router.post("/updatecertificate",updatecertificate);
module.exports=router;