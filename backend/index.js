require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const { partnerRoute } = require('./routes/partner')
const { adminRoute } = require('./routes/admin')
const { registerRoute } = require('./routes/register')
const cors = require('cors')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.static(path.join(__dirname,"frontend","dist")))

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/partner", partnerRoute)
app.use("/api/v1/register", registerRoute)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'))
})


const main =()=>{
    app.listen(8000)
    console.log("App listing on 8000")
    mongoose.connect(process.env.DATABASE_URL).then(()=> console.log("database connected")).catch(err=> console.error(err))
}
main()