const mongoose=require('mongoose')
const validator=require('validator')


const complaintSchema=mongoose.Schema({
    dept:{
        type:String,
        required:true,
    },
    issue:{
        type:String,
        trim:true,
        required:true,
    },
    resolved:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
        ref:'Student'
    }
},{
    timestamps:true,
})

const Complaint=mongoose.model('complaint',complaintSchema)
module.exports=Complaint