const { Bill } = require('../models/bill');

module.exports.deleteBillservice = async (userid) => {
    try{
        const deleteCostumer = await Bill.deleteMany({_id:userid._id})
        
        if(deleteCostumer){
            return true;
        }
    }
    catch(err){
        console.log(err)
        return err
    }
}