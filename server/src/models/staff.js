const mongoose = require('mongoose')
const validator = require('validator')

const staffSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not a valid email")
            }
        }
    },
    phone_number: {
        type: String,
        validate(value) {
            if (value.length != 10) {
                throw new Error("Phone number must be of 10 digits")
            }
        },
        trim: true,
    },
    isStaff:{
        type:Boolean,
    },
    imageUrl: {
        type: String,
    },
    dept:{
        type:String,
    }
})

const Staff = mongoose.model('staff', staffSchema)
module.exports = Staff
