
const Todo = require("../models/todo.model")
const dashboard = async (req, res) => {
    try {
        const userId = req._parsedUrl.query.split("=")[1]
        const exitUser = await Todo.findById({ _id: userId })
        if (exitUser) {
            res.render("userInterFace", exitUser)
        }
        else {
            res.send("OOPs")
        }
    } catch (error) {
        res.send("OOP's")
    }

}
module.exports = dashboard
