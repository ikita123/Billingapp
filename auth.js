const jwt=require("jsonwebtoken")
const Users=require("../models/user")

module.exports.auth = async(req,res, next)=>{
    try{
        const token=req.headers['authorization']
        const verfiyUser=jwt.verify(token, "xyzxcvb")
        const user= await Users.findOne({_id:verfiyUser._id})
        next()
    }
    catch(error){
        res.send(error)
    }

}