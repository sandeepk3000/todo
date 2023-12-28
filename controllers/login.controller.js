
const Todo = require("../models/todo.model")
const creatTodo = async (req, res) => {
    let user;
    try {
        const { name, email, password } = req.body
        user = await Todo.findOne({ userEmail: email, userPassword: password })
        if (!user) {
            user = await Todo.create({
                userName: name,
                userEmail: email,
                userPassword: password,
                userTodo: []
            })
        }
        res.cookie("user",{
            userName:user.userName,
            status:true,
        },{
            maxAge:6600000
        })
        res.redirect(`/?q=${user._id}`)
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
        })
    }
}
module.exports = creatTodo