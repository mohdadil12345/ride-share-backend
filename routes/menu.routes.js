const express = require("express")
const menuRouter = express.Router()
const { MenuModel } = require("../models/menu.model")

menuRouter.get("/food", async (req, res) => {
    try {
        const menu = await MenuModel.find()

        res.status(200).send(menu)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

menuRouter.get("/food/:id", async (req, res) => {
    try {
        const menu = await MenuModel.findOne({_id:req.params.id})

        res.status(200).send(menu)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = {
    menuRouter
}