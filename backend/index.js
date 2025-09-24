require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const { partnerRoute } = require('./routes/partner')
const { adminRoute } = require('./routes/admin')
const { registerRoute } = require('./routes/register')

app.use(express.json())

app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/partner", partnerRoute)
app.use("/api/v1/register", registerRoute)




const main =()=>{
    app.listen(8000)
    console.log("App listing on 8000")
    mongoose.connect(process.env.DATABASE_URL).then(()=> console.log("database connected")).catch(err=> console.error(err))
}
main()