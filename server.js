const express = require ('express');
const  dotenv = require ('dotenv');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const userRoute = require("./src/rotes/userRoute")


dotenv.config()
const app = express()


const PORT = process.env.PORT || 4000
const MONGO_URL  = process.env.MONGO_URL
const MARCHANT_ID = process.env.MARCHANT_ID

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use(cors())

//Routes
app.use("/user",userRoute)


app.get('/', (req,res) =>{
    res.send("CRYPTO")
})


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server started on port:${PORT}`))
}).catch((error) => console.log(error))

