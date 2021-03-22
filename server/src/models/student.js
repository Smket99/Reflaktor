const mongoose=require('mongoose')
const validator=require('validator')

const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    dob:{
        type:Date,
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
    _id:{
        type:String,
        required:true,
        unique:true,
        immutable: true
    },
    phone_number:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    hostel:{
        type:String,
        required:true,
        trim:true,
    },
    room_no:{
        type:String,
        required:true,
        trim:true,
    },
    complaints:[{
        complaint:{
            department:{
                type:String,
                required:true,
            },
            issue:{
                type:String,
                trim:true,
                required:true,
            },
            Date_of_filling:{
                type:Date,
                required:true,
            },
            Date_of_resolve:{
                type:Date,
            },
            resolved:{
                type:Boolean,
                default:false,
            },
            rating:{
                type:Number,
            }
        }
    }]


})

const Student=mongoose.model('student',studentSchema)
module.exports=Student