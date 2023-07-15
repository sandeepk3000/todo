const mongoose = require("mongoose")

const structureOfTodo =mongoose.Schema({
    userName:String,
    userEmail:String,
    userPassword:String,
    templates:Array
})
module.exports = mongoose.model("todoData",structureOfTodo)