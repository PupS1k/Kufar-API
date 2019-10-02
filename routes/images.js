const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:fileName', (req, res) =>{
  fs.readFile(`public/images/${req.params.fileName}`, (err, data) => {
    if(err) return res.status(400).send('Error reading file');
    res.send(data);
  })
});

module.exports = router;
