var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const User = require('./models/User');

router.post('/', (req, res) => {
    User.find({mail: req.body.mail, password: req.body.password})
        .then(users => users[0])
        .then(user =>{
            if(!user) return res.status(400).send('Email or password is wrong');

            const token = jwt.sign(user, 'KEY_TOKEN');
            res.header('auth-token', token).send(token);
        });
});

router.get('/', verify, (req, res) => {
    res.send(req.user);
});

module.exports = router;
