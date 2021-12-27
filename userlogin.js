const mongoose = require("mongoose");
const { database } = require("./connection")

const UserloginSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "Email required"]
  },
  trys:{
    type:Number,
    default:0
  },
  verified: {
    type: Boolean,
    default: false
  }
})
module.exports.Userslogin = database.model("Userslogin", UserloginSchema);
