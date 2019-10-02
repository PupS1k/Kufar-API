const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const productsRouter = require('./routes/products')
const loginRouter = require('./routes/login')
const registrationRouter = require('./routes/registration')
const imagesRouter = require('./routes/images')
const setUpConnection = require('./db/connectMongo')

const app = express()

setUpConnection()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Origin', req.headers.origin)
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, auth-token')
	next()
})

app.use('/products', productsRouter)
app.use('/login', loginRouter)
app.use('/registration', registrationRouter)
app.use('/images', imagesRouter)

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
