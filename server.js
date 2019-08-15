import express from 'express';
import bodyParser from'body-parser';
import {serverPort} from './etc/config.json';
import fs from 'fs';

import * as db from './utils/DateBaseUtils';

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

const server = app.listen(serverPort, () => {
  console.log(`Server: ${serverPort}`);
});
