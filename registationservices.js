const { User } = require('../models/user')
const verifyToken=require("../middleware /auth")


module.exports.isUserExist =  async (email) =>{
        const check = await User.findOne({email})
        if(check){
            return true
        }
        return false;
}

module.exports.registrationServices = async (userData) => {
    return await User.create(userData)
}

module.exports.otpVaficationServices= async(userEmail)=>{
    return await User.findOne({email: userEmail})
}

module.exports.updateLoginVerify=async(userEmail,updatevarification)=>{
    return await User.findOneAndUpdate({email:userEmail},updatevarification)
}
module.exports.updatetrys=async(userEmail, updateContent)=>{
    return await User.findOneAndUpdate({email:userEmail}, updateContent)
}
