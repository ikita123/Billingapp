const mongoose = require('mongoose');
const express =require("express")
var bodyParser = require('body-parser')
const app=express()

const url ="mongodb+srv://nikita1:asdfghjkl@cluster0.avssg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex:true
})
const con =mongoose.connection
con.on("open",function(){
  console.log("connected....")
})
const route=require("../route/router")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

console.log('hi there');
app.use("/route",route)

const port = 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});