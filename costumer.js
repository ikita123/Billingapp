const mongoose=require("mongoose")
const { database } = require("./connection")

const customerSchema = new mongoose.Schema({
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
          validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email"
      },
      required: [true, "Email required"]
    },
    address:{
      type:String,
      required:true,
    },

  });
  
  const customer = database.model("customer", customerSchema);
  module.exports.customer = customer
  
  