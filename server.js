const express = require('express');
const bodyParser = require('body-parser');
const {serverPort} = require('./etc/config.json');
const fs = require('fs');
const db = require( './utils/DateBaseUtils');

// import * as fsDb from './fileSystem/FsUtils';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

// app.get('/kufar', (req, res) => {
//   fsDb.listProducts().then(data => res.send(data));
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/kufar', (req, res) => {
  db.listProducts().then(data => res.send(data));
});

app.post('/kufar', (req, res) => {
  db.createProducts(req.body).then(data => res.send(data));
});

app.get('/images/:fileName', (req, res) =>{
  fs.readFile(`images/${req.params.fileName}`, (err, data) => {
    res.send(data);
  })
});

app.post('/login', (req, res) => {
  db.logInUser(req.body).then(data => res.send(data))
});


app.post('/registration', (req, res) => {
  db.registrationUser(req.body).then(data => res.send(data))
});

const server = app.listen(serverPort, () => {
  console.log(`Server: ${serverPort}`);
});
