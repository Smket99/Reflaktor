const express=require('express')
const Complaint=require('../models/complaints')
const Student = require('../models/student')
const route=express.Router()

route.post('/complaints',async(req,res)=>{
    try{
        console.log("HEkko")
        console.log(req.body)
        const student=await Student.findOne({email:req.body.email})
        if(!student){
            return res.status(404).send({"Message":"The studentID doesn't exits"})
        }
        var comp=req.body
        comp["date"]=new Date().toLocaleString('en-US',{timeZone:"Asia/Kolkata"})
        const complaint=new Complaint(comp)
        await complaint.save()
        res.status(202).send({"Message":"Complaints have been registered successfully"})
    }
    catch(e){
        res.status(504).send({"Message":"Error Encountered"})
    }
})

route.get('/complaints',async(req,res)=>{
    try{
        const complaint=await Complaint.find({})
        // console.log(complaint)
        res.status(202).send(complaint)
    }
    catch(e){
        res.status(505).send({"Message":"Error Encountered"})
    }
})
route.get('/complaints/:id',async(req,res)=>{
    try{
        // console.log(req.params.id)
        const complaints=await Complaint.find({email:req.params.id})
        // console.log(complaints)
        if(!complaints){
            return res.status(404).send({"Message":"There's no student with this id"})
        }
        // console.log("jksds")
        res.status(202).send(complaints)
    }
    catch(e){
        res.status(502).send({"Message":"Error Encountered"})
    }
})

route.patch('/complaints/:id',async(req,res)=>{
    try{
        console.log(req.params.id)
        console.log(req.body)
        const complaint=await Complaint.findById(req.params.id)
        console.log(complaint)
        if(!complaint){
            return res.status(404).send({"Message":"Complaint not found"})
        }

        if(req.body.rating!=='0'){
            complaint.rating=parseInt(req.body.rating);
        }
        if(req.body.comment!==""){
            complaint.comment=req.body.comment
        }
        
        complaint.dateResolved=req.body.dateResolved
        complaint.resolved=true;
        await complaint.save()

        console.log(complaint)
        res.status(202).send({"Message":"Complaint status changed to resolved"})
    }
    catch(e){
        res.status(500).send({"Message":"Error encountered!"})
    }
})

route.delete('/complaints/:id',async(req,res)=>{
    try{
        const complaint=await Complaint.findOneAndDelete({_id:req.params.id})
        if(!complaint){
            return res.status(404).send({"Message":"Complaint not found"})
        }
        res.status(202).send({"Message":"Complaint deleted successfully"})
    }
    catch(e){
        res.status(500).send({"Message":"Error encountered!"})
    }
})

module.exports=route
