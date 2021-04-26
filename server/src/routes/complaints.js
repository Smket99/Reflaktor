const express=require('express')
const Complaint=require('../models/complaints')
const Student = require('../models/student')
const route=express.Router()


const data=require('./Complaint_Data');

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



route.post('/compla',async(req,res)=>{
    try{
        const emails=["f20180101@hyderabad.bits-pilani.ac.in","f20180231@hyderabad.bits-pilani.ac.in","f20180323@hyderabad.bits-pilani.ac.in","f20180187@hyderabad.bits-pilani.ac.in","f20180168@hyderabad.bits-pilani.ac.in"]
        for (let i = 0; i < data.length; i++) {
            console.log(i);
            var obj={};
            if(i%5<2){
                 obj = {
                    email: emails[i % 5],
                    dept: data[i].dept,
                    date: new Date(data[i].date).toLocaleString('en-US', { timeZone: "Asia/Kolkata" }),
                    resolved: false,
                    issue: data[i].issue,
                }
            }
            else{
                 obj = {
                    email: emails[i % 5],
                    dept: data[i].dept,
                    date: new Date(data[i].date).toLocaleString('en-US', { timeZone: "Asia/Kolkata" }),
                    resolved: true,
                    issue: data[i].issue,
                    dateResolved: new Date(data[i].dateResolve).toLocaleString('en-US', { timeZone: "Asia/Kolkata" }),
                    rating: i % 5
                }
            }
            const complaint=new Complaint(obj);
            await complaint.save();
        }
        res.send("Nothing");
    }
    catch(e){
        console.log(e);
        res.send("Nothing");
    }
    
})


route.get('/complaints',async(req,res)=>{
    try{
        const { page = 1, limit = 10 } = req.query
        const complaint = await Complaint.find({}).limit(limit * 1).skip((page - 1) * limit)
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
        const {page=1,limit=10}=req.query
        if(page===1){
            const count=await Complaint.count({email:req.params.id})
            const complaints = await Complaint.find({ email: req.params.id }).limit(limit * 1).skip((page - 1) * limit)
            return res.status(202).send({count:count,complaints:complaints});
        }
        const complaints=await Complaint.find({email:req.params.id}).limit(limit*1).skip((page-1)*limit)
        // console.log(complaints)
        if(!complaints){
            return res.status(404).send({"Message":"There's no student with this id"})
        }
        // console.log("jksds")
        res.status(202).send({complaints:complaints})
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
