const express = require('express')
const app = express()
const dotenv= require("dotenv").config()
const morgan= require("morgan")
const bodyParser= require("body-parser")
const PORT= process.env.PORT || 8000
const userRouter= require("./routes/userRoutes")
const dbConfig= require("./config/dbConfig")
app.use(morgan('tiny'))
app.use(bodyParser.json({extwended: true}))
app.get('/', function (req, res) {
  res.send('Welcome  to Ikibeho Dital Foundation')
})

app.use("/api/user", userRouter)
app.use((req,res)=>{
  res.send("Not Content Found")
})

app.listen(PORT,async ()=>{
  await dbConfig()
  console.log(`Running on port: ${PORT}`)
})