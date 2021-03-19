const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const cors=require('cors')
const Router=express.Router()

const port = process.env.port || 4000

const StudentProfile=require('./api/student-profile')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/api/student/profile',StudentProfile.update)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  