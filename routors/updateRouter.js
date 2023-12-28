const express = require("express")
const createUserInterface = require("../controllers/updateTemplate")
const routor = express.Router();
routor.delete("/updateTemplate",createUserInterface)
routor.post("/updateTemplate",createUserInterface)
routor.patch("/updateTemplate",createUserInterface)
module.exports = routor