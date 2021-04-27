const express = require('express')
const Staff = require('../models/staff')
const route = express.Router()
const Complaint=require('../models/complaints')

route.post('/staff/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const staff = await Staff.findOne({ email: req.params.id })
        if (staff) {
          console.log("STAFFFFFFFFUCK");
            res.status(202).send({ "Message": "Logging in" });
            return;
        }
        const staff1 = new Staff(req.body)
        console.log(staff1);
        await staff1.save()
        return res.status(202).send(staff1)
        // res.status(202).send(student)
    }
    catch (e) {
      console.log(e);
        res.status(404).send({ "Message": "Failed" })
    }
})

route.get('/staff/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const staff = await Staff.findOne({ email: req.params.id })
        if (!staff) {
            return res.status(404).send({ "Message": "staff Not Found!" })
        }
        console.log(staff)
        res.status(202).send(staff)
    }
    catch (e) {
        res.status(505).send({ "Message": "Error Encountered!" })
    }
})

route.patch('/staff/me', async (req, res) => {
    try {
        console.log(req.body)
        const updates = Object.keys(req.body)
        const staff = await Staff.findOne({ email: req.body.email })
        if (!staff) {
            return res.status(404).send({ "Message": "staff not found" })
        }
        updates.forEach(update => {
            staff[update] = req.body[update]
        })
        await staff.save()
        res.status(200).send({ "Message": "Updated Successfully" })
    }
    catch (e) {
        res.status(505).send({ "Message": "Error Encountered!" })
    }
})


route.get('/staffcomplaints/:id', async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query
        const staff=await Staff.findOne({email:req.params.id})
        const complaint = await Complaint.find({ dept: staff.dept, resolved: false }).limit(limit * 1).skip((page - 1) * limit);
        if(!complaint){
            return res.status(404).send({"Message":"No complaints found"});
        }
        console.log(complaint)
        res.status(202).send(complaint);
    }
    catch (e) {
        res.status(505).send({ "Message": "Error encountered" })
    }
})

module.exports = route
