const mongoose = require('mongoose');

function setUpConnection() {
	mongoose.connect('mongodb+srv://prokop:den5691@kufar-gt1ds.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
}

module.exports = setUpConnection;
