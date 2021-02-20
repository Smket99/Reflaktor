const mongoose = require('mongoose');

//const URI = "mongodb+srv://dbuser:dbuser@cluster0.morkl.mongodb.net/<dbname>?retryWrites=true&w=majority"; // mongodb atlas connection
const URI = "mongodb://localhost:27017/login-app-db" // local mongoconnect

const connectDB = async() =>{
    await  mongoose.connect(URI,{ useUnifiedTopology: true , useNewUrlParser: true });
    console.log('DB connected');
}

module.exports= connectDB;
