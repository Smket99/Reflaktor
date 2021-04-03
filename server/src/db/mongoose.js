const mongoose=require('mongoose')

mongoose.connect(process.env.DB_CONNECT,{
useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology: true
})
// const URI = "mongodb+srv://dbUser:dbUser@cluster0.emvt7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const connectDB = async()=>{
//   await mongoose.connect(URI,{useUnifiedTopology: true,useNewUrlParser: true});
//   console.log('db connected');
// }
module.exports = mongoose;
