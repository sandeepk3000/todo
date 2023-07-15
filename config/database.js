const mongoose = require("mongoose")
const connectToDB = async()=>{
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/TodoList")
        console.log("your connection succefully stablied");
    } catch (error) {
        if(error){
            throw new Error(`this is error ${error}`)
        }
    }
}
module.exports = connectToDB;