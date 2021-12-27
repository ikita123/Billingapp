
const router = require('express').Router();
const data = require('../controller/control')
const verifyToken = require('../middleware /auth');


router.post("/createCostumer",verifyToken,data.createCostumer)
router.post("/createBill",verifyToken,data.createBill)


module.exports = router
