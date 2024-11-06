const express = require("express");
const app=express()
const bodyParser=require('body-parser')
const cors=require("cors")
const AuthRouter=require("./Routes/AuthRouter")
const ProductRouter=require("./Routes/ProductRouter")


require('dotenv').config();
require('./Models/db')
const PORT=process.env.PORT || 8080




app.get("/",(req,res)=>{
    res.send("I am run away....")
})


app.use(bodyParser.json())
app.use(cors()) 

app.use("/auth",AuthRouter)
app.use("/products",ProductRouter)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
