const express = require("express");
const path = require("path")
const publicPath = path.join(__dirname, "../public")
const create = require("../controllers/login.controller")
const app = express();
const connectToDB = require("../config/database");
const hbs = require("hbs");
const updateRouter = require("../routors/updateRouter");
const dashboard = require("../controllers/dashboard");
const errorRouter = require("../routors/errorRouter")
connectToDB()
const partialPath = path.join(__dirname, "../templates/partials")
const viewsPath = path.join(__dirname, "../templates/views")
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(publicPath))
app.use("/", updateRouter)
// app.use("/",errorRouter)
app.post("/login", create);
app.get("/dashboard", dashboard)
module.exports = app;