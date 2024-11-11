const mongoose = require('mongoose');
const mongoURl = "mongodb://localhost:27017/iNotebook"

const connectToMongo =  async () =>{
    await mongoose.connect(mongoURl)
    console.log("Connected to MongoDB successfully.");
}

module.exports = connectToMongo;