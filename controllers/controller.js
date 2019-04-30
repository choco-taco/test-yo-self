var express = require("express");
var router = express.Router();
var quizModel = require("../models/quizModel.js");

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.get("/user", function (req, res) {
    res.render("user");
});

router.get("/study-guide-form", function (req, res) {
    res.render("study-guide-form");
});

router.get("/dashboard", function (req, res) {
    res.render("dashboard");
});

router.get("/add-group", function (req, res) {
    res.render("add-group");
});


module.exports = router;