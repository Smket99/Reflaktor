require('dotenv').config()
require('./src/db/mongoose')
const express=require('express')
const studentRouter=require('./src/routes/student')
const complaintRouter=require('./src/routes/complaints')
const noticeRouter=require('./src/routes/notice')
const FilterRouter=require('./src/routes/sendComplaint')
const app=express()
const path=require('path')
const port=process.env.PORT

// const connectDB = require('./src/db/mongoose');
// connectDB();
app.use(express.json())
app.use(studentRouter)
app.use(complaintRouter)
app.use(noticeRouter)
app.use(FilterRouter)
app.use(express.static(path.join(__dirname, '/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(port,()=>{
    console.log("Server is up on the port: "+ port)
})
