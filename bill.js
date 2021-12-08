const mongoose=require("mongoose")

const BillSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
      },
      iteam:{
          type:String,
          required:true
    },
   Billno:{
      type:Number,
      required:true,
    },
    Discount:{
      type:Number,
      required:true

    }

  
  });
  
  const bill = mongoose.model("Billing", BillSchema);
  module.exports = bill
  
  