const { User } = require('../models/user')

module.exports.updateuserdetailsservices=async (email,trys) => {
     await User.findOneAndUpdate(email,trys)
}
        

