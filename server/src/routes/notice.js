const express=require('express')
const Notice=require('../models/notice')
const route=express.Router()


route.post('/notice',async(req,res)=>{
  try{
    console.log(req.body)
    var not=req.body
    not["date"]=new Date().toLocaleString('en-US',{timeZone:"Asia/Kolkata"})
    const notice=new Notice(not)
    console.log(req.body)
    await notice.save()
    console.log(req.body)
    res.status(202).send({"Message":"Notice has been uploaded successfully!"})
    console.log(req.body)
  }
  catch(e){
    res.status(505).send({"Message":"Error Encountered!"})
  }
})

route.get('/notice',async(req,res)=>{
  try{
    const notice=await Notice.find({})

    if(!notice){
      return res.status(404).send({"Message":"There's no notice at this moment"})
    }
    res.status(202).send(notice);
  }
  catch(e){
    res.status(505).send({"Message":"Error Encountered"})
  }
})

module.exports=route
