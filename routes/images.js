var express = require('express');
var router = express.Router();
var fs = require('fs');

const db = require( './dbMethods');

router.get('/:fileName', (req, res) =>{
  fs.readFile(`public/images/${req.params.fileName}`, (err, data) => {
    res.send(data);
  })
});

module.exports = router;
