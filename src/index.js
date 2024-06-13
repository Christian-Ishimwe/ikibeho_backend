const express = require('express')
const app = express()
const dotenv= require("dotenv").config()
const cors= require("cors")
const morgan= require("morgan")
const bodyParser= require("body-parser")
const PORT= process.env.PORT || 8000
const userRouter= require("./routes/userRoutes")
const contactRoute= require("./routes/contactsRouter")
const blogsRoute= require("./routes/blogsRoute")
const donationRoute = require("./routes/donationRoute")
const dbConfig= require("./config/dbConfig")
app.use(cors());
app.use(morgan('tiny'))
app.use(bodyParser.json({extwended: true}))
app.get('/', function (req, res) {
  res.send('Welcome  to Ikibeho Dital Foundation')
})

app.use("/api/user", userRouter)
app.use("/api/contacts", contactRoute)
app.use("/api/blogs", blogsRoute)
app.use("/api/donations", donationRoute)
app.use((req,res)=>{
  res.send("Not Content Found")
})

app.listen(PORT,async ()=>{
  await dbConfig()
  console.log(`Running on port: ${PORT}`)
})