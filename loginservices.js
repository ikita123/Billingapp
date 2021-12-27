const { Userslogin } = require('../models/userlogin')
const { User } = require('../models/user')


module.exports.isUserloginExist =  async (email) =>{
        const check = await User.findOne({email})
        if(check){
            return true
        }
        return false;
}
module.exports.loginServices = async (userData) => {
    return await Userslogin.create(userData)
}
module.exports.otpVaficationServiceslogin= async(userEmail)=>{
    return await Userslogin.findOne({email: userEmail})
}

module.exports.updateVerify=async(userEmail,updatevarification)=>{
    return await Userslogin.findOneAndUpdate({email:userEmail},updatevarification)
}
module.exports.updatetrysoflogin=async(userEmail, updateContent)=>{
    return await Userslogin.findOneAndUpdate({email:userEmail}, updateContent)
}
module.exports.uservarification= async(userEmail)=>{
    return await Userslogin.findOne({email: userEmail})
}