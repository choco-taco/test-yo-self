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

router.get("/studyGuideForm", function (req, res) {
    res.render("studyGuideForm");
});

router.get("/dashboard", function (req, res) {
    res.render("dashboard");
});

router.get("/addGroup", function (req, res) {
    res.render("addGroup");
});


module.exports = router;