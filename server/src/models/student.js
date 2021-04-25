const mongoose=require('mongoose')
const validator=require('validator')

const studentSchema=mongoose.Schema({
  name:{
        type:String,
        required:true,
        trim:true,
    },
    dob:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid email")
            }
        }
    },
    id:{
        type:String,
        unique:true,
    },
    phone_number:{
        type:String,
        validate(value){
            if(value.length!=10){
                throw new Error("Phone number must be of 10 digits")
            }
        },
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    hostel:{
        type:String,
        trim:true,
    },
    room_no:{
        type:String,
        trim:true,
    },
    imageUrl:{
        type:String,
    }
})

studentSchema.virtual('complaints',{
    ref:'Complaint',
    localField:'_id',
    foreignField:'studentID'
})

const Student=mongoose.model('student',studentSchema)
module.exports=Student
