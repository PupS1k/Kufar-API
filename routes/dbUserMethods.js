const User = require('./models/User');

function findUser(data) {
    return User.find({mail: data.mail})
        .then(res => {
            if(!res.length) {
                const user = new User({
                    mail: data.mail,
                    password: data.password,
                    seller: data.seller
                });
                user.save();
                return false;
            }else return true;
        })
        .catch(err => console.log(err));
}

function getUser(data) {
    return User.find(data)
        .then(res => res.length ? res[0] : false)
        .catch(err => console.log(err));
}

module.exports = {
    getUser,
    findUser
};
