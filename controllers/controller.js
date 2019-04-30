var express = require("express");
var router = express.Router();
var quizModel = require("../models/quizModel.js");

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.get("/study-guide", function (req, res) {
    res.render("study-guide");
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

router.get("/add-session", function (req, res) {
    res.render("add-session");
});


module.exports = router;