const { User } = require('../models/user')
const Userslogin=require('../models/userlogin')
const bcrypt = require('bcrypt');
const { costumer } = require('../models/costumer')
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const { bill } = require('../models/bill');
const { registrationServices, isUserExist, otpVaficationServices,updatetrys,updateLoginVerify} = require("../services/registationservices")
const {newCostumer}=require("../services/costumerservices")
const {billservices}=require("../services/billservices");
const {updateuserdetailsservices}=require("../services/updateuserdservices")
const {deletecostumetservice}=require("../services/deleteCostumerservices")
const {deleteBillservice }=require("../services/billdeleteservices")
const {isUserloginExist,loginServices,otpVaficationServiceslogin,updatetrysoflogin,updateVerify,uservarification}=require("../services/loginservices")
require("dotenv").config

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: 'infistack111@gmail.com',
        pass: 'infi@111'
    }
});

registration = async (req, res) => {
    try {
        const otp = Math.floor(Math.random() * 1000000);
        toHash = otp.toString();
        console.log("otp", toHash)

        const hashedOTP = await bcrypt.hash(toHash, 10);
        console.log("hashedOTP", hashedOTP);

        let mailDetails = {
            from: 'infistack111@gmail.com',
            to: req.body.email,
            subject: 'otp for registration',
            text: `${toHash}`
        };
        mailTransporter.sendMail(mailDetails, (err, data) => {
                if (err) {
                    console.log("Error " + err);
                }
                if (data) {
                    console.log(data);
                }
            });

        useObj = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            otp: hashedOTP,
            gstNo: req.body.gstNo
        }
        const checkUser = await isUserExist(useObj.email)
        if (checkUser) return res.status(500).send({ message: "User already exist please login" })

        const saveUser = await registrationServices(useObj)
        if(saveUser) {

            const token = jwt.sign({ email: req.body.email },process.env.TOKEN_KEY,{expiresIn: "1 day"});
            return res.status(200).send({ message : "Registered Successfully", token: token })
        } 
    }
    catch (err) {
        console.error({ ...err })
        return res.status(500).send(err.message)
    }

}

verification = async (req, res) => {
        let user = await otpVaficationServices(req.user.email)
        const isMatch = await bcrypt.compare(req.body.otp, user.otp)
        try {
          if (user.trys >= 3) {
            return res.send("maximum attempt is 3 ");
          }
          else if (isMatch == true) {
            await updateLoginVerify(req.user.email, { verified: true });
            return res.send("Verification complete..");
          }
          else if (isMatch == false) {
            await updatetrys(req.user.email, { $inc: { trys: 1 } });
            return res.send({ message: "Invalid OTP.." });
          }
        }catch (error) {
            return res.send(error);
        }
}
    
            
login =async(req,res)=>{
    try{
    const loginotp = Math.floor(Math.random() * 1000000);
        toHash = loginotp.toString();
        console.log("otp", toHash)

        const hashedOTP = await bcrypt.hash(toHash, 10);
        console.log("hashedOTP", hashedOTP);

        let mailDetails = {
            from: 'infistack111@gmail.com',
            to: req.body.email,
            subject: 'otp for login ',
            text: `${toHash}`
        };
        mailTransporter.sendMail(mailDetails, (err, data) => {
                if (err) {
                    console.log("Error " + err);
                }
                if (data) {
                    console.log(data);
                }
            });
            req.body.otp=hashedOTP
            const checkUser = await isUserloginExist(req.body.email)
            console.log(checkUser)
            if(checkUser) {

                    const loginUser = await loginServices(req.body)

            const token = jwt.sign({ email: req.body.email},process.env.TOKEN_KEY,{expiresIn: "1 day"});
            return res.status(200).send({ message : "login Successfully", token: token })
        }
    }catch (err) {
        res.send(err)
        console.log(err)
    }
}

verificationlogin = async (req, res) => {
    let user = await otpVaficationServiceslogin(req.user.email)
    const isMatch = await bcrypt.compare(req.body.otp,user.otp)
    try {
      if (user.trys >= 3) {
        return res.send("maximum attempt is 3 ");
      }
      if (isMatch == true) {
        await updateVerify(req.user.email, { verified: true });
        return res.send("Verification complete..");
      }
      if (isMatch == false) {
        await updatetrysoflogin(req.user.email, { $inc: { trys: 1 } });
        return res.send({ message: "Invalid OTP.." });
      }
    }catch (error) {
        return res.send(error);
    }
}
    

createCostumer = async (req, res) => {
    const useremail=req.Userslogin.email
    const user=await uservarification(useremail)
    try{
        if(user.email==req.body.email){
            return res.status(200).send({message:"user is present"})
        }
        const customerCreated = await newCostumer(useremail)
        if(customerCreated) {
            return res.status(200).send({ message : "costumer is created"})

        }else{
            return res.status(500).send({message:"costumer created unSuccessfully"})
        }
    
    }catch(err){
        res.send(err)
    }
}

createBill = async (req, res) => {
    const useremail =req.user.email
    const user=await uservarification(useremail)
    try{
        if(user.email==req.body.email){
            return res.status(200).send({message:"user is paresent"})
        }
        const billCreated =await billservices(req.body)
        if(billCreated){
            return res.status(200).send({message:"bill is created Successfully"})
        }else{
            return res.status(500).send({message:"error"})
        }
    }catch(err){
        res.send(err)
    }
}

// Updateuserdetails = async (req, res) => {
//     const useremail =req.user.email
//     const user=await uservarification(useremail)
//     try{
//         if(user.email==req.body.email){
//             return res.status(200).send({message:"user is paresent"})
//         }
//         req.body=JSON.parse(JSON.stringify(req.body));
//         await updateuserdetailsservices({email:req.email},req.body)
//         return res.status(200).send({message:"details is updated"})
//     }catch(err){
//         res.status(500).send({message:err})
//     }
// }

module.exports = {registration,verification,login,verificationlogin,createCostumer,createBill}

