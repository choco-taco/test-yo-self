var express = require("express");
var router = express.Router();
var quizModel = require("../models/quizModel.js");

router.get("/", function(req, res) {
      res.render("index", hbsObject);
    });
  });

module.exports = router;