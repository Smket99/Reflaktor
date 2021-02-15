const express = require('express')
const app = express()
//const port = 3000
const port = process.env.port || 3000
const connectDB = require('./Database/connection.js');

connectDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
