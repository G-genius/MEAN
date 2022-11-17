const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require("./config/db")
const account = require("./routes/account")

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.json())

mongoose.connect(config.db, {useNewUrlParser: true})
//Если подключение успешно
mongoose.connection.on("connected", () => {
    console.log("Успешное подключение к mongodb")
})
//Если не успешно
mongoose.connection.on("error", (err) => {
    console.log("Ошибка подключения к mongodb " + err)
})

app.listen(port, () => {
    console.log("Сервер был запущен по порту " + port)
})

app.get("/", (req, res) => {
    res.send("Главная страница сайта")
})

app.use("/account", account)