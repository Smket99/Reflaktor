const express = require('express')
const app = express()
//const port = 3000
const port = process.env.port || 3000
const User = require('server/Database/userschema')
const bcrypt= require('bcryptjs');
const { response } = require('express');

const connectDB = require('./Database/connection.js');
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/',express.static(path.join(__dirname,'static')))
/* //login api 
app.use(bodyParser.json())

app.post('server/api/login',async (req,res) =>{
      //console.log(req.body)
      //User
      //hashing the password
      const {username,password: plainTextPassword } = req.body
      const password = await bycrypt.hash(password,15)
      try{  
           const res= await User.create({
                username,password  
            }) 
            console.log('Usercreated s',response)
      }catch (errpr){
            console.log(error)
            return res.json({status: 'error'})
      }
     
      res.json({status: 'ok'})
})
*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
