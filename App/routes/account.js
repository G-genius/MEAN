const express = require("express");
const router = express.Router()
const User = require("../models/user")

router.post("/reg", (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    })
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: "Пользователь не добавлен"
            })
        }
        else {
            res.json({
                success: true,
                msg: "Пользователь успешно добавлен"
            })
        }
    })
})

router.get("/auth", (req, res) => {
    res.send("Авторизация")
})

router.get("/dashboard", (req, res) => {
    res.send("Личный кабинет")
})

module.exports = router