const Todo = require ("../models/todo.model")
const createUserInterface = async(req,res)=>{
    try {
        const templateId = req._parsedUrl.query.split("=")[2]
        const userId = req._parsedUrl.query.split("=")[1].split("&&")[0]
        const exitUser = await Todo.findById({_id:userId})
        if(exitUser&&req.method=="POST"){
            console.log("i am post method");
            const {templateName,discription}=req.body
            console.log(templateId,templateName,discription);
            const pushRes = await Todo.updateOne({_id:userId},{
                $push:{
                    templates:{
                        templateName:templateName,
                        discription:discription,
                        templateId:templateId
                    }
                }
            })
            res.json({pushRes})
        }else if(exitUser&&req.method=="DELETE"){
            console.log("i am  delete methode");
            const pushRes = await Todo.updateOne({_id:userId},{
                $pull:{
                    templates:{
                        templateId:templateId
                    }
                }
            })
            res.json({
                pushRes
            })
        }
        else{
            res.send("user is not defind")
        }
    } catch (error) {
        res.send("OOP's")
    }

}
module.exports = createUserInterface
