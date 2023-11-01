

const express = require("express")
require("dotenv").config()
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const cors = require("cors")

const app = express()


app.use(express.json())
app.use(cors())





app.use("/users", userRouter)



app.listen(process.env.port, async() => {
    try{

        await connection

    console.log(`connected to mongodb`)
    console.log(`port is running at ${process.env.port}`)

    }catch(err){
        console.log(err)
    }
})