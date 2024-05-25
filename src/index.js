const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Welcome  to Ikibeho Dital Foundation')
})
app.use((req,res)=>{
  res.send("Not Content Found")
})

app.listen(3000)