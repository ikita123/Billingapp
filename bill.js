const mongoose=require("mongoose")

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
      required:true,
    },
    Discount:{
      type:String,
      required:true

    }

  
  });
  
  const bill = mongoose.model("Billing", BillSchema);
  module.exports = bill
  
  