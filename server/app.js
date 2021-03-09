const express = require('express')
const app = express()
//const port = 3000
const port = process.env.port || 3000
const User = require('server/Database/userschema')
const bcrypt= require('bcryptjs');
const { response } = require('express');
//google auth
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);//smiket add your id as you implemented google auth

const connectDB = require('./Database/connection.js');
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//fetching token from frontend 
app.post('/login',(req,res)=>{
  let token = req.body.token;
  async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
    //console.log(payload);
}
verify()
.then(()=>{
  res.cookie('session-token',token);
  res.send('success');
}).catch(console.error);
  //console.log(token);
})

app.get('/logout',(req,res)=>{
  res.clearCookie('session-token');
  res.redirect('/login');
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
function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login')
      })

}
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
