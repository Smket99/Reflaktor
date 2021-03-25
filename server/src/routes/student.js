const express=require('express')
const Student=require('../models/student')
const app=express.Router()

app.post('/students',async(req,res)=>{
    try{
        const student=new Student(req.body)
        await student.save()
        res.status(202).send({"Message":"Success"})
    }
    catch(e){
        res.status(404).send({"Message":"Failed"})
    }
})

app.get('/students/me',async(req,res)=>{
    try{
        const student=await Student.findOne({email:req.body.email})
        if(!student){
            return res.status(404).send({"Message":"student Not Found!"})
        }
        res.status(202).send(student)
    }
    catch(e){
        res.status(505).send({"Message":"Error Encountered!"})
    }
})

app.patch('/students/me', async (req,res)=>{
    try{
        // console.log(req.body)
        const updates=Object.keys(req.body.updates)
        console.log(updates);
        console.log("Updates")
        const student=await Student.findOne({email:req.body.email})
        console.log("student")
        console.log(student)
        if(!student){
            return res.status(404).send({"Message":"student not found"})
        }
        updates.forEach(update=>{
            student[update]=req.body.updates[update]
        })
        await student.save()
        res.status(200).send({"Message":"Updated Successfully"})
    }
    catch(e){
        res.status(505).send({"Message":"Error Encountered!"})
    }
})

app.patch('/students/complaint/add', async (req,res)=>{
    console.log(req.body)
    try{
        const student=await Student.findOne({email:req.body.email})
        if(!student){
            return res.status(404).send({"Message":"student not found"})
        }
        const complaint=req.body.complaint
        student.complaints=student.complaints.concat({complaint:complaint})
        await student.save()
        console.log(student)
        // res.status(202).send({"Message":"Complaint added"})
        res.send(student)
    }
    catch(e){
        res.status(505).send({"Message":"Error encountered"})
    }
})

app.patch('/students/complaint/resolved',async(req,res)=>{
    try{
        const student=await Student.findOne({email:req.body.email})
        
        if(!student){
            return res.status(404).send({"Message":"student not found"})
        }
        let index=student.complaints.findIndex(complaint=>{
            return complaint._id.toString()===req.body.complaint_id
        })
        if(index<0){
            throw new Error("Not Found")
        }
        const updates=Object.keys(req.body.complaint)
        updates.forEach(update=>{
            student.complaints[index].complaint[update]=req.body.complaint[update]
        })
        await student.save()
        // res.status(202).send({"Message":"Complaint resolved"})
        res.send(student)
    }
    catch(e){
        res.status(505).send({"Message":"Error encountered"})
    }
})

app.patch('/students/complaint/delete',async (req,res)=>{
    try{
        const student=await Student.findOne({email:req.body.email})
        if(!student){
            return res.status(404).send({"Message":"student not found"})
        }
        student.complaints=student.complaints.filter(complaint=>{
            return complaint._id.toString()!==req.body.complaint_id;
        })
        await student.save()
        res.status(202).send({"Message":"Complaint Deleted"})
    }
    catch(e){
        res.status(505).send({"Message":"Error encountered"})
    }
})

module.exports=app
