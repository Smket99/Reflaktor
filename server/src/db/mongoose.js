const mongoose=require('mongoose')

/*mongoose.connect('mongodb://127.0.0.1:27017/hostel-management-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
})*/
const URI = "";
const connectDB = async()=>{
    await mongoose.connect(URI,{useUnifiedTopology: true,useNewUrlParser: true});
    console.log('db connected');
}
module.exports = connectDB;
