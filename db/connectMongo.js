const mongoose = require('mongoose');

function setUpConnection() {
	mongoose.connect('mongodb+srv://Den:tuborg99@cluster0-gt1ds.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
}

module.exports = setUpConnection;
