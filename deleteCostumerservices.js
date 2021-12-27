const { costumer } = require('../models/costumer')

module.exports.deletecostumetservice = async (userid) => {
    try{
        const deleteCostumer = await costumer.deleteOne({_id:userid._id})
        
        if(deleteCostumer){
            return true;
        }
    }
    catch(err){
        console.log(err)
        return err
    }
}