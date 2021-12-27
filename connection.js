const mongoose = require("mongoose");
require('dotenv').config()
mongoose.Promise = require("bluebird");

// console.log(process.env)

const str = process.env.DB;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// const mdbInstance = mongoose.connect(str, options)

// if (mdbInstance) console.log(`Mongoose connection open to master DB`)

const database = mongoose.createConnection(str, options);

database.on("disconnected", () => {
  console.log("Mongoose connection disconnected for master DB");
});

database.on("connected", () => {
  console.log("Database connected successfullly");
});

module.exports.database = database;