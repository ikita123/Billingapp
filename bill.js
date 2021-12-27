const mongoose=require("mongoose")
const autoIncrement = require("mongoose-auto-increment")
const { database } = require("./connection")

const BillSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
      },
    items:{
          type:String,
          required:true
    },
    Billno:{
     type:String,
     required:true
    },
    Discount:{
      type:Number,
      required:true

    },
    shipping_charge:{
      type:Number,
    required:true
    }
  
  });

  autoIncrement.initialize(database);
  BillSchema.plugin(autoIncrement.plugin,{
    model:"Billing",
    field:"Billno",
    startAt : 1,
    incrementBy : 1,
  })

  const bill = database.model("Billing", BillSchema);
  module.exports.customer = bill
  

  
  