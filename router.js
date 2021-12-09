const express = require('express');
const User = require('../models/user')
const Customer = require('../models/costmer')
const router = express.Router();
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const Bill = require('../models/bill');
const { auth }=require("../models/auth")

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nikita20@navgurukul.org',
        pass: '9993633373'
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    }
    catch (err) {
        res.send(err)
    }
})

// for singup

router.post("/register", async (req, res) => {

    var otp = Math.random();
    otp = otp * 1000000;
    otpsend = parseInt(otp);

    const user = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        otp: otpsend,
        gstNo:req.body.gstNo
    }
    try {
        const a1= await User.create(user);

        const token = jwt.sign({ email: req.body.email }, "xyzxcvb", { expiresIn: '6h' })
        res.cookie('token', token).json(a1)


        let mailDetails = {
            from: 'nikita20@navgururkul.org',
            to: req.body.email,
            subject: 'otp for registetion',
            text: `${otpsend}`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent successfully', data);
                res.send({ messge: "email send" })
            }
        })
    }
    catch (err) {
        res.send(err)
    }

})
// otp varification


router.post("/otpvarification", auth, async(req,res)=>{
       const user=await User.findOne({otp:req.body.otp})
    try{
        if(user==null){
            await User.updateOne({$inc:{trys:1}})
            return res.send("invalid otp")
        }
        if(user.try>=3){
            return res.send("maximum attemt is 3 only")
        }
        if(user!==null){
            return res.send("varification is done..")
        }
    }
    catch (err){
            res.send(err)
        }
})

// login api 

router.post("login",async(req,res)=>{
    await User.findOne({email:req.body.email})
})


// constmer create api

router.post("/Newcustomer", async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        user_email: req.body.user_email,
    })
    User.find({ email: req.body.user_email })
        .then((userFound) => {
            customer.save()
            res.send("costmer is created")
        })
        .catch((err) => {
            res.send(err)
        })
})

// Bill create api

router.post("/Bill",async(req,res)=>{
    const customer_bill= new Bill({
        Name:req.body.Name,
        items:req.body.items,
        Billno:req.body.Billno,
        Discount:req.body.Discount
    })
    Customer.find({Name:req.body.name})
        .then(()=>{
            customer_bill.save()
            res.send("customer bill is created")
    })
    .catch((err)=>{
        res.send(err)
    })


})
router.put("/updateemail",async(req,res)=>{
    const id=req.body._id
    User.findByIdAndUpdate(id,req.body.email)
    .then((data)=>{
        if(!data){
            res.send("your email is updated")
        }else{
            res.send("your email is not updated")
        }
     })
     .catch((err)=>{
         res.send(err)
     })
})

router.put("/updatename",async(req,res)=>{
    const id=req.body._id
    User.findByIdAndUpdate(id,req.body.name)
    .then((data)=>{
        if(!data){
            res.send("your name is updated")
        }else{
            res.send("your name is not updated")
        }
     })
     .catch((err)=>{
         res.send(err)
     })
})

router.put("/updateaddress",async(req,res)=>{
    const id=req.body._id
    User.findByIdAndUpdate(id,req.body.address)
    .then((data)=>{
        if(!data){
            res.send("your address is updated")
        }else{
            res.send("your address is not updated")
        }
     })
     .catch((err)=>{
         res.send(err)
     })
})

router.put("/updategstno",async(req,res)=>{
    const id=req.body._id
    User.findByIdAndUpdate(id,req.body.gstNo)
    .then((data)=>{
        if(!data){
            res.send("your gstno is updated")
        }else{
            res.send("your gstno is not updated")
        }
     })
     .catch((err)=>{
         res.send(err)
     })
})
module.exports = router
