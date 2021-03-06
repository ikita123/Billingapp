const mongoose = require("mongoose");
const { database } = require("./connection")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  address: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true                      
  },
  gstNo: {
    type: String,
    label: "GST No.",
    regEx: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    optional: true,

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

// const User = database.model("Users", UserSchema);
module.exports.User = database.model("Users", UserSchema);// User
