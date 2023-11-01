

const express = require("express")
const userRouter = express.Router()
const { UserModel } = require("../models/user.model")
const { BlacklistModel } = require("../models/blacklist.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


userRouter.post("/register", async (req, res) => {
    try {
        const { password, email, username } = req.body
        const user = await UserModel.findOne({ email })

        if (user) {

            res.status(400).json({ msg: "User already exist, please login" })

        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (hash) {
                    const user = new UserModel({ email, password: hash, username })
                    await user.save()
                    res.status(200).json({ msg: "Registration succesffull" })
                }
            })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})





// login


userRouter.post("/login", async (req, res) => {
    try {
        const { password, email } = req.body
        const user = await UserModel.findOne({ email })
        console.log("user", user)

        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
               
                const token = jwt.sign({userID : user._id, username:user.username}, "adil")
                await user.save()
                res.status(200).json({ msg: "Registration succesffull", token })
            }
        })
        
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



//  logout 
userRouter.post("/logout", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || null
       const atleastonetoken = await BlacklistModel.findOne()

       if(token){

        if(atleastonetoken){
          await BlacklistModel.updateMany({}, {$push : {blacklist :  [token]}})
          res.status(200).json({ msg: "Logout succesffull" })
        }else{
            const blacklistuser = new BlacklistModel({blacklist :  [token]})
            await blacklistuser.save()
            res.status(200).json({ msg: "Logout succesffull" })
        }

       }
  
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})







module.exports = {
    userRouter
}