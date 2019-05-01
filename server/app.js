const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieParser())

app.use(express.static(path.join(__dirname, '/public')))

app.engine("handlebars", handlebars({ 
    defaultLayout: "main",
    helpers: {
        'check': function(arg1, arg2, options) {
            return (arg1 !== arg2) ? options.fn(this) : options.inverse(this)
        }
    }
}))
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "handlebars")

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/users', require('./routes/users'))
app.use('/dashboard', require('./routes/dashboard'))

module.exports = app