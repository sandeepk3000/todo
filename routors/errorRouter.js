const express = require("express");
const errorShower = require("../controllers/error.controller");
const routor = express.Router();
routor.get("*",errorShower)
module.exports=routor