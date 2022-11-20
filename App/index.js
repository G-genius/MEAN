const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require("./config/db")
const account = require("./routes/account")
const Post = require("./models/post")

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 1000000}))

app.use(passport.initialize())
// app.use(passport.session())

require("./config/passport")(passport)

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
    Post.find().then(posts => res.json(posts))
})

app.use("/account", account)