var express = require("express");
var router = express.Router();
var quizModel = require("../models/quizModel.js");

router.get("/", function(req, res) {
    cat.all(function(data) {
      var hbsObject = {
        cats: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

module.exports = router;