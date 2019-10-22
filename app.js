const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const router = require('./routes');
const setUpConnection = require('./db/connectMongo');

const app = express();

setUpConnection();

app.use(fileUpload({createParentPath: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));


app.use('/', router);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
