
const Todo = require("../models/todo.model")
const dashboard = async (req, res) => {
    try {
        if (req._parsedUrl.query) {
            const userId = req._parsedUrl.query.split("=")[1]
            const exitUser = await Todo.findById({ _id: userId })
            if (exitUser) {
                res.render("userInterFace", exitUser)
            }
            else {
                res.render("userInterFace")
            }
        } else {
            res.render("userInterFace")
        }

    } catch (error) {
        console.log(error);
        res.send("OOP's")
    }

}
module.exports = dashboard
