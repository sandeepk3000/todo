
const Todo = require("../models/todo.model")
const creatTodo = async (req, res) => {
    console.log("here")
    try {
        const { name, email, password} = req.body
        const userExit = await Todo.findOne({ userEmail: email, userPassword: password })
        if (userExit) {
            const{_id}=await Todo.findOne({userPassword: password})
            res.redirect(`/dashboard?q=${_id}`)
        } 
        else {
            console.log("userCreat");
            const userHasCreated = await Todo.create({
                userName: name,
                userEmail: email,
                userPassword: password,
                userTodo: []
            })
            if (userHasCreated) {
                const{_id}=await Todo.findOne({userPassword: password})
                res.redirect(`/dashboard?q=${_id}`)
            }
        }
    } catch (error) {
        res.json({
            success: false,
        })
    }
}
module.exports = creatTodo