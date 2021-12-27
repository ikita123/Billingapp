require("dotenv").config()
const express =require("express")
var bodyParser = require('body-parser')
// const mongo = require("./models/connection");
const app=express()

const route=require("./router/route")
const index=require("./router/index")



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/route",route)
app.use("/index",index)
const port = 7000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});