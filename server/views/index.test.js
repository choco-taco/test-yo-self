var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });

nightmare
    .goto("./index.handlebars")
    .wait("#links a")
    .click("#signUpButton")
    .type("#search_form_input_homepage", "github nightmare")
    .wait("#links a")
    .evaluate(function () {
        return document.querySelector("#links a").href;
    })
    .end()
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Search failed:", error);
    });
