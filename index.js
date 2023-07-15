const express= require("express")
const app= express()
const { connection } = require("./config/db")
const cors = require("cors")
const { userRouter } = require("./routes/userRoute")
const { foodRouter } = require("./routes/foodRoute")
require("dotenv").config()
app.use(express.json())
app.use(cors())

app.use("/user", userRouter)

app.get("/", (req, res) => {
    res.send("Hello World!")
})
 
app.use("/food", foodRouter)
app.get("/products", (req, res) => {
    res.send("Products")
})

app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("Connected to Database")
    } catch (error) {
        console.log("error",error)
        console.log("Can not connect to Database !")
    }
    console.log(`server is Running on PORT : ${process.env.PORT}`)
})