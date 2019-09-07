var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const moment = require('moment');
const config = require('../etc/config');
const User = require('./models/User');

router.post('/', (req, res) => {
    User.find({mail: req.body.mail, password: req.body.password})
        .then(users => users[0])
        .then(user =>{
            if(!user) return res.status(400).send('Email or password is wrong');

            const date = new Date();
            date.setHours(date.getHours()+24);

            const token = jwt.sign({
                _id: user._id,
                mail: user.mail,
                password: user.password,
                sellerStatus: user.sellerStatus,
                exp: moment(date).unix()
            }, config.secretKey);
            res.send(JSON.stringify(token));
        });
});

router.get('/', verify, (req, res) => {
    res.send(req.user);
});

module.exports = router;
