const Userslogin=require('../models/userlogin')
const {bill} = require('../models/bill')
module.exports.billservices=async (userData) => {
    try{
         const newBill = new bill({
            Name: userData.Name,
            items: userData.items,
            Billno: userData.Billno,
            Discount: userData.Discount,
            shipping_charge: userData.shipping_charge
         })
         return await newBill.save()
     }
    catch(err){
        console.error(err)
        return err
    }
}