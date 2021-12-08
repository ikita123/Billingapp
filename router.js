const express = require('express');
const User = require('../models/user')
const Customer = require('../models/costmer')
const router = express.Router();
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const Bill = require('../models/bill');

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
        otp: otpsend
    }
    try {
        const a1 = await User.create(user);

        const token = jwt.sign({ email: req.body.email }, "xyzxcvb", { expiresIn: '6h' })
        res.cookie('token', token).json(a1)

    }
    catch (err) {
        res.send(err)
    }


    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nikita20@navgurukul.org',
            pass: '9993633373'
        }
    });

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
            console.log('Email sent successfully');
            res.send({ messge: "email send" })
        }
    })
    // otp varification

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
    const customer_bill= new Bill({Name:req.body.Name,
        iteam:req.body.iteam,
        Billno:req.body.Billno,
        Discount:req.body.Discount
    })
    Customer.find({Name:req.body.name})
    .exec()
    .then(()=>{
        customer_bill.save()
        res.send("customer bill is created")
    })
    .catch((err)=>{
        res.send(err)
    })


})

router.put("/update")

module.exports = router
