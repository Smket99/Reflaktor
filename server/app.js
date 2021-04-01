require('./src/db/mongoose')
const express=require('express')
const studentRouter=require('./src/routes/student')
const complaintRouter=require('./src/routes/complaints')

const app=express()

const port=process.env.PORT || 4000

app.use(express.json())
app.use(studentRouter)
app.use(complaintRouter)

app.listen(port,()=>{
    console.log("Server is up on the port: "+ port)
})
