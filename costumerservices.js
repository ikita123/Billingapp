const Userslogin=require('../models/userlogin')
const { customer } = require('../models/costumer')

module.exports.newCostumer=async (userData) => {
    try{
         const newCustomer = new customer({
             name: userData.cname,
             email: userData.cemail,
             address: userData.caddress
         })
         return await newCustomer.save()
     }
    catch(err){
        console.error(err)
        return err
    }
}