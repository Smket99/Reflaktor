const express=require('express')
const route=express.Router()
const Data=require("./Complaint_Data")

route.post('/getfilteredcomplaint',async(req,res)=>{
  try{
    console.log(req.body)
    var data=Data.filter(obj=>obj.date.split("/")[0]===req.body.month)
    console.log(data);
    res.status(200).send({data:data})
  }
  catch(e){
    res.status(505).send({"Message":"Error Encountered!"})
  }
})

module.exports=route
