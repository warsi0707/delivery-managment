require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const { partnerRoute } = require('./routes/partner')
const { adminRoute } = require('./routes/admin')
const { registerRoute } = require('./routes/register')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require("path")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))



app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/partner", partnerRoute)
app.use("/api/v1/register", registerRoute)




const main =()=>{
    app.listen(8000)
    console.log("App listing on 8000")
    mongoose.connect(process.env.DATABASE_URL).then(()=> console.log("database connected")).catch(err=> console.error(err))
}
main()