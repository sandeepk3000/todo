const app = require("./app")
const port = process.env.PORT || 3000;
app.listen(port,(error)=>{
    console.log("server is started now ..........");
})