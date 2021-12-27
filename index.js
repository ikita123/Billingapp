const router = require('express').Router();
const verifyToken = require('../middleware /auth');


const data = require('../controller/control')


router.post('/registration',data.registration)
router.post('/verification',verifyToken ,data.verification)
router.post("/login",data.login)
router.post("/verificationlogin",verifyToken,data.verificationlogin)


module.exports = router
