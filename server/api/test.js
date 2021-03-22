var express = require('express');
let profData={
  name:"Sammy Asopa",
  id:'2018A7PS0101H',
  bmail:'f20180231@hyderabad.bits-pilani.ac.in',
  pnumber:'9926188556',
  address:"11 Palsikar Colony",
  hostel:'RAM',
  roomno:'R437',
  dob:'adssa',
  complaints:[],
}
module.exports={
    sendData:(req,res)=>{
        console.log(req.body);
        res.json(profData);
        res.send()
    }
}

/* GET users listing. */
