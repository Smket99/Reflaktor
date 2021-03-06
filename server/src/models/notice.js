const mongoose=require('mongoose')

const noticeSchema=mongoose.Schema({
    notice:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
    }
})

const Notice=mongoose.model('notice',noticeSchema)

module.exports=Notice
