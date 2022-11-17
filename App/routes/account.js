const express = require("express");
const router = express.Router()

router.get("/reg", (req, res) => {
    res.send("Регистрация")
})

router.get("/auth", (req, res) => {
    res.send("Авторизация")
})

router.get("/dashboard", (req, res) => {
    res.send("Личный кабинет")
})

module.exports = router