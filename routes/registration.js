var express = require('express');
var router = express.Router();

const User = require('./models/User');

router.post('/', (req, res) => {
    User.find({mail: data.mail})
        .then(users => users[0])
        .then(emailExist => {
        if (emailExist) return res.status(400).send('Email already exists');
    });

    const user = new User({
        mail: req.body.mail,
        password: req.body.password,
        seller: req.body.seller
    });

    try {
        user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
